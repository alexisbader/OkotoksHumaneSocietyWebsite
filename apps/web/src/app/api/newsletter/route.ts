import { NextResponse } from "next/server";
import { Resend } from "resend";

import { isValidEmail } from "@/lib/validate-email";
import { getContactPage } from "@/sanity/lib/fetch";

type NewsletterPayload = {
  email?: string;
};

export async function POST(request: Request) {
  let body: NewsletterPayload;

  try {
    body = (await request.json()) as NewsletterPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email = body.email?.trim() || "";

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const contactPage = await getContactPage();
  const toEmail = process.env.CONTACT_TO_EMAIL || contactPage?.email;
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL || "Okotoks Humane Society <onboarding@resend.dev>";

  if (!apiKey || !toEmail) {
    console.warn(
      "[newsletter] Missing RESEND_API_KEY or a destination email — signup accepted but not emailed.",
    );
    return NextResponse.json(
      { error: "Newsletter signup is not configured yet." },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: "[OHS] New newsletter signup",
      text: `New newsletter signup: ${email}`,
    });

    if (error) {
      console.error("[newsletter] Resend error", error);
      return NextResponse.json(
        { error: "Failed to sign up. Please try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[newsletter] Unexpected error", error);
    return NextResponse.json(
      { error: "Failed to sign up. Please try again later." },
      { status: 500 },
    );
  }
}
