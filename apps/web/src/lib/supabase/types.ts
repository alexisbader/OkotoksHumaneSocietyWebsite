// Mirrors supabase/migrations/0001_init.sql. Written by hand since the
// Supabase CLI (which can generate this from the live schema via
// `supabase gen types typescript`) isn't set up in this project yet.
// Regenerate with that command once the project is linked and keep this
// file in sync with future migrations.

export type PaymentProvider = "stripe" | "square";
export type DonationStatus =
  | "pending"
  | "succeeded"
  | "failed"
  | "refunded"
  | "partially_refunded";
export type SubscriptionStatus = "active" | "past_due" | "canceled" | "incomplete";
export type CampaignStatus = "pending_approval" | "active" | "completed" | "archived";
export type SponsorshipStatus = "active" | "archived";
export type StaffRole = "admin" | "staff" | "viewer";

export interface Database {
  public: {
    Tables: {
      staff_profiles: {
        Row: {
          id: string;
          email: string;
          role: StaffRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          role: StaffRole;
        };
        Update: Partial<{
          email: string;
          role: StaffRole;
        }>;
      };
      donors: {
        Row: {
          id: string;
          email: string;
          first_name: string | null;
          last_name: string | null;
          phone: string | null;
          consent_marketing: boolean;
          consent_recorded_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          first_name?: string | null;
          last_name?: string | null;
          phone?: string | null;
          consent_marketing?: boolean;
          consent_recorded_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["donors"]["Insert"]>;
      };
      campaigns: {
        Row: {
          id: string;
          slug: string;
          sanity_document_id: string | null;
          goal_cents: number | null;
          status: CampaignStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          sanity_document_id?: string | null;
          goal_cents?: number | null;
          status?: CampaignStatus;
        };
        Update: Partial<Database["public"]["Tables"]["campaigns"]["Insert"]>;
      };
      subscriptions: {
        Row: {
          id: string;
          donor_id: string;
          campaign_id: string | null;
          payment_provider: PaymentProvider;
          provider_subscription_id: string;
          amount_cents: number;
          currency: string;
          status: SubscriptionStatus;
          canceled_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          donor_id: string;
          campaign_id?: string | null;
          payment_provider: PaymentProvider;
          provider_subscription_id: string;
          amount_cents: number;
          currency?: string;
          status: SubscriptionStatus;
          canceled_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["subscriptions"]["Insert"]>;
      };
      donations: {
        Row: {
          id: string;
          donor_id: string;
          campaign_id: string | null;
          subscription_id: string | null;
          amount_cents: number;
          currency: string;
          status: DonationStatus;
          payment_provider: PaymentProvider;
          provider_payment_id: string | null;
          provider_fee_cents: number | null;
          refunded_cents: number;
          receipt_sent_at: string | null;
          donated_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          donor_id: string;
          campaign_id?: string | null;
          subscription_id?: string | null;
          amount_cents: number;
          currency?: string;
          status: DonationStatus;
          payment_provider: PaymentProvider;
          provider_payment_id?: string | null;
          provider_fee_cents?: number | null;
          refunded_cents?: number;
          receipt_sent_at?: string | null;
          donated_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["donations"]["Insert"]>;
      };
      payment_events: {
        Row: {
          id: string;
          payment_provider: PaymentProvider;
          provider_event_id: string;
          event_type: string;
          payload: Record<string, unknown>;
          processed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          payment_provider: PaymentProvider;
          provider_event_id: string;
          event_type: string;
          payload: Record<string, unknown>;
          processed_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["payment_events"]["Insert"]>;
      };
      sponsorship_packages: {
        Row: {
          id: string;
          slug: string;
          sanity_document_id: string | null;
          price_cents: number;
          total_inventory: number;
          reserved_count: number;
          sold_count: number;
          status: SponsorshipStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          sanity_document_id?: string | null;
          price_cents: number;
          total_inventory: number;
          reserved_count?: number;
          sold_count?: number;
          status?: SponsorshipStatus;
        };
        Update: Partial<Database["public"]["Tables"]["sponsorship_packages"]["Insert"]>;
      };
    };
    Views: {
      campaign_progress: {
        Row: {
          campaign_id: string;
          slug: string;
          goal_cents: number | null;
          status: CampaignStatus;
          raised_cents: number;
          donation_count: number;
        };
      };
      donation_summary: {
        Row: {
          donation_count: number;
          total_cents: number;
          average_cents: number;
        };
      };
    };
    Functions: {
      reserve_sponsorship_package: {
        Args: { p_package_id: string; p_qty?: number };
        Returns: boolean;
      };
      confirm_sponsorship_package: {
        Args: { p_package_id: string; p_qty?: number };
        Returns: undefined;
      };
      release_sponsorship_package: {
        Args: { p_package_id: string; p_qty?: number };
        Returns: undefined;
      };
    };
  };
}
