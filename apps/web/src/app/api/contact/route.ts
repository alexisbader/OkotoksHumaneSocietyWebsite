import { NextResponse } from "next/server";
import { Resend } from "resend";

import { getContactPage } from "@/sanity/lib/fetch";
import { isValidEmail } from "@/lib/validate-email";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = body.name?.trim() || "";
  const email = body.email?.trim() || "";
  const subject = body.subject?.trim() || "";
  const message = body.message?.trim() || "";

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "Name, email, subject, and message are required." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const contactPage = await getContactPage();
  const toEmail = process.env.CONTACT_TO_EMAIL || contactPage?.email;
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL || "Okotoks Humane Society <onboarding@resend.dev>";

  if (!apiKey || !toEmail) {
    console.warn(
      "[contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL — form accepted but not emailed.",
    );
    return NextResponse.json(
      {
        error:
          "Email delivery is not configured. Set RESEND_API_KEY and CONTACT_TO_EMAIL.",
      },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `[OHS Contact] ${subject}`,
      text: [`From: ${name} <${email}>`, "", message].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend error", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Unexpected error", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 },
    );
  }
}
