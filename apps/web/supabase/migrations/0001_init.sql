-- OHS donations/fundraising schema.
-- Run this in the Supabase SQL editor (or `supabase db push` once the project is linked).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- updated_at trigger helper
-- ---------------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- staff_profiles — links auth.users to a role; drives RLS everywhere else
-- ---------------------------------------------------------------------------
create table staff_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  role text not null check (role in ('admin', 'staff', 'viewer')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger staff_profiles_set_updated_at
  before update on staff_profiles
  for each row execute function set_updated_at();

-- security definer helpers so RLS policies can check role without recursive
-- RLS lookups on staff_profiles itself
create or replace function is_staff()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from staff_profiles where id = auth.uid()
  );
$$;

create or replace function is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from staff_profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- ---------------------------------------------------------------------------
-- donors
-- ---------------------------------------------------------------------------
create table donors (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  first_name text,
  last_name text,
  phone text,
  consent_marketing boolean not null default false,
  consent_recorded_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger donors_set_updated_at
  before update on donors
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- campaigns — mirrors a Sanity document via sanity_document_id; Sanity owns
-- title/description/images, this table owns money + approval state
-- ---------------------------------------------------------------------------
create table campaigns (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  sanity_document_id text unique,
  goal_cents integer check (goal_cents > 0),
  status text not null default 'pending_approval'
    check (status in ('pending_approval', 'active', 'completed', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger campaigns_set_updated_at
  before update on campaigns
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- subscriptions — recurring (monthly) donation arrangements
-- ---------------------------------------------------------------------------
create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  donor_id uuid not null references donors (id),
  campaign_id uuid references campaigns (id),
  payment_provider text not null check (payment_provider in ('stripe', 'square')),
  provider_subscription_id text not null unique,
  amount_cents integer not null check (amount_cents > 0),
  currency text not null default 'CAD',
  status text not null
    check (status in ('active', 'past_due', 'canceled', 'incomplete')),
  canceled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger subscriptions_set_updated_at
  before update on subscriptions
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- donations — the ledger; only 'succeeded' rows count toward totals
-- ---------------------------------------------------------------------------
create table donations (
  id uuid primary key default gen_random_uuid(),
  donor_id uuid not null references donors (id),
  campaign_id uuid references campaigns (id),
  subscription_id uuid references subscriptions (id),

  amount_cents integer not null check (amount_cents > 0),
  currency text not null default 'CAD',
  status text not null
    check (status in ('pending', 'succeeded', 'failed', 'refunded', 'partially_refunded')),

  payment_provider text not null check (payment_provider in ('stripe', 'square')),
  provider_payment_id text unique,
  provider_fee_cents integer,
  refunded_cents integer not null default 0 check (refunded_cents >= 0),

  receipt_sent_at timestamptz,
  donated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index donations_campaign_id_idx on donations (campaign_id);
create index donations_donor_id_idx on donations (donor_id);
create index donations_status_idx on donations (status);

create trigger donations_set_updated_at
  before update on donations
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- payment_events — raw webhook deliveries, keyed by provider event id so
-- duplicate deliveries are a no-op (idempotency)
-- ---------------------------------------------------------------------------
create table payment_events (
  id uuid primary key default gen_random_uuid(),
  payment_provider text not null check (payment_provider in ('stripe', 'square')),
  provider_event_id text not null,
  event_type text not null,
  payload jsonb not null,
  processed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (payment_provider, provider_event_id)
);

-- ---------------------------------------------------------------------------
-- sponsorship_packages — first-come inventory; reserved_count is a
-- short-lived hold while payment is in flight, sold_count is confirmed
-- ---------------------------------------------------------------------------
create table sponsorship_packages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  sanity_document_id text unique,
  price_cents integer not null check (price_cents > 0),
  total_inventory integer not null check (total_inventory >= 0),
  reserved_count integer not null default 0 check (reserved_count >= 0),
  sold_count integer not null default 0 check (sold_count >= 0),
  status text not null default 'active' check (status in ('active', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint sponsorship_inventory_not_oversold
    check (reserved_count + sold_count <= total_inventory)
);

create trigger sponsorship_packages_set_updated_at
  before update on sponsorship_packages
  for each row execute function set_updated_at();

-- Atomically hold inventory before sending the visitor to checkout. The
-- WHERE clause makes the check-and-increment a single row operation, so two
-- concurrent requests for the last unit can't both succeed.
create or replace function reserve_sponsorship_package(p_package_id uuid, p_qty integer default 1)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_updated integer;
begin
  update sponsorship_packages
  set reserved_count = reserved_count + p_qty
  where id = p_package_id
    and status = 'active'
    and reserved_count + sold_count + p_qty <= total_inventory;

  get diagnostics v_updated = row_count;
  return v_updated > 0;
end;
$$;

-- Move a held reservation to a confirmed sale once the webhook confirms payment.
create or replace function confirm_sponsorship_package(p_package_id uuid, p_qty integer default 1)
returns void
language sql
security definer
set search_path = public
as $$
  update sponsorship_packages
  set reserved_count = greatest(reserved_count - p_qty, 0),
      sold_count = sold_count + p_qty
  where id = p_package_id;
$$;

-- Release a hold if payment fails or the checkout session expires.
create or replace function release_sponsorship_package(p_package_id uuid, p_qty integer default 1)
returns void
language sql
security definer
set search_path = public
as $$
  update sponsorship_packages
  set reserved_count = greatest(reserved_count - p_qty, 0)
  where id = p_package_id;
$$;

revoke all on function reserve_sponsorship_package(uuid, integer) from public;
revoke all on function confirm_sponsorship_package(uuid, integer) from public;
revoke all on function release_sponsorship_package(uuid, integer) from public;
grant execute on function reserve_sponsorship_package(uuid, integer) to service_role;
grant execute on function confirm_sponsorship_package(uuid, integer) to service_role;
grant execute on function release_sponsorship_package(uuid, integer) to service_role;

-- ---------------------------------------------------------------------------
-- Reporting views for the admin dashboard
-- ---------------------------------------------------------------------------
create view campaign_progress as
select
  c.id as campaign_id,
  c.slug,
  c.goal_cents,
  c.status,
  coalesce(sum(d.amount_cents) filter (where d.status = 'succeeded'), 0) as raised_cents,
  count(d.id) filter (where d.status = 'succeeded') as donation_count
from campaigns c
left join donations d on d.campaign_id = c.id
group by c.id;

create view donation_summary as
select
  count(*) as donation_count,
  coalesce(sum(amount_cents), 0) as total_cents,
  coalesce(avg(amount_cents), 0) as average_cents
from donations
where status = 'succeeded';

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table staff_profiles enable row level security;
alter table donors enable row level security;
alter table campaigns enable row level security;
alter table subscriptions enable row level security;
alter table donations enable row level security;
alter table payment_events enable row level security;
alter table sponsorship_packages enable row level security;

-- staff_profiles: staff can see their own row, admins can see/manage everyone
create policy staff_profiles_select_self on staff_profiles
  for select using (id = auth.uid() or is_admin());
create policy staff_profiles_admin_write on staff_profiles
  for all using (is_admin()) with check (is_admin());

-- donors / donations / subscriptions / payment_events: no anon/authenticated
-- access at all. Written by the service role from webhooks and server
-- actions; read by staff through server-side queries using the service role
-- (or the staff policies below).
create policy donors_staff_read on donors
  for select using (is_staff());
create policy donations_staff_read on donations
  for select using (is_staff());
create policy subscriptions_staff_read on subscriptions
  for select using (is_staff());
create policy payment_events_staff_read on payment_events
  for select using (is_staff());

-- campaigns: public can see active/completed campaigns (for progress bars),
-- staff can see and manage everything
create policy campaigns_public_read on campaigns
  for select using (status in ('active', 'completed'));
create policy campaigns_staff_all on campaigns
  for all using (is_staff()) with check (is_staff());

-- sponsorship_packages: public can see active packages (for availability),
-- staff can manage everything. Inventory mutations only happen through the
-- SECURITY DEFINER functions above (service role), never direct UPDATE.
create policy sponsorship_packages_public_read on sponsorship_packages
  for select using (status = 'active');
create policy sponsorship_packages_staff_all on sponsorship_packages
  for all using (is_staff()) with check (is_staff());
