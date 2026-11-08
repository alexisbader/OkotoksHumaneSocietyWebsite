import { NextResponse } from "next/server";
import { Resend } from "resend";

import { isValidEmail } from "@/lib/validate-email";
import {
  getContactPage,
  getCorporatePage,
  getJobBySlug,
  getPersonalizedDonationPage,
  getVolunteerPositionBySlug,
} from "@/sanity/lib/fetch";

type ApplyKind = "job" | "volunteer" | "personalizedDonation" | "corporateSponsorship";

type ApplyPayload = {
  kind?: ApplyKind;
  slug?: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  consent?: boolean;
};

const KIND_LABELS: Record<ApplyKind, string> = {
  job: "job application",
  volunteer: "volunteer application",
  personalizedDonation: "personalized donation page application",
  corporateSponsorship: "corporate sponsorship inquiry",
};

async function resolveRecipient(
  kind: ApplyKind,
  slug?: string,
): Promise<{ email: string; context?: string } | null> {
  if (kind === "job" && slug) {
    const job = await getJobBySlug(slug);
    if (job?.applicationEmail) return { email: job.applicationEmail, context: job.title };
  }

  if (kind === "volunteer" && slug) {
    const position = await getVolunteerPositionBySlug(slug);
    if (position?.applicationEmail) {
      return { email: position.applicationEmail, context: position.title };
    }
  }

  if (kind === "personalizedDonation") {
    const page = await getPersonalizedDonationPage();
    if (page?.applicationEmail) return { email: page.applicationEmail };
  }

  if (kind === "corporateSponsorship") {
    const page = await getCorporatePage();
    if (page?.eventSponsorship?.contactEmail) {
      return { email: page.eventSponsorship.contactEmail };
    }
  }

  const contactPage = await getContactPage();
  return contactPage?.email ? { email: contactPage.email } : null;
}

export async function POST(request: Request) {
  let body: ApplyPayload;

  try {
    body = (await request.json()) as ApplyPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const kind = body.kind;
  const name = body.name?.trim() || "";
  const email = body.email?.trim() || "";
  const phone = body.phone?.trim() || "";
  const message = body.message?.trim() || "";
  const consent = Boolean(body.consent);

  if (!kind || !(kind in KIND_LABELS)) {
    return NextResponse.json({ error: "Unknown submission type." }, { status: 400 });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  if (!consent) {
    return NextResponse.json(
      { error: "Please confirm you agree before submitting." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL || "Okotoks Humane Society <onboarding@resend.dev>";
  const recipient = await resolveRecipient(kind, body.slug);
  const label = KIND_LABELS[kind];

  if (!apiKey || !recipient) {
    console.warn(
      `[apply] Missing RESEND_API_KEY or a destination email for ${kind} — submission accepted but not emailed.`,
    );
    return NextResponse.json(
      { error: "Email delivery is not configured for this form yet." },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const subject = recipient.context
      ? `[OHS] New ${label}: ${recipient.context}`
      : `[OHS] New ${label}`;

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [recipient.email],
      replyTo: email,
      subject,
      text: [
        `From: ${name} <${email}>`,
        phone ? `Phone: ${phone}` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      console.error("[apply] Resend error", error);
      return NextResponse.json(
        { error: "Failed to submit. Please try again later." },
        { status: 502 },
      );
    }

    await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: `We received your ${label}`,
      text: `Hi ${name},\n\nThanks — we received your ${label} for Okotoks Humane Society and will be in touch soon.\n\n— Okotoks Humane Society`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[apply] Unexpected error", error);
    return NextResponse.json(
      { error: "Failed to submit. Please try again later." },
      { status: 500 },
    );
  }
}
