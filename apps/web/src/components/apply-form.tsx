"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { CompactPortableText } from "@/components/portable-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { PortableBlock } from "@/sanity/lib/fetch";

export type ApplyKind = "job" | "volunteer" | "personalizedDonation" | "corporateSponsorship";

type Status = "idle" | "loading" | "success" | "error";

export function ApplyForm({
  kind,
  slug,
  consentText,
  submitLabel = "Submit application",
  messageLabel = "Tell us about yourself",
}: {
  kind: ApplyKind;
  slug?: string;
  consentText?: PortableBlock[];
  submitLabel?: string;
  messageLabel?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      kind,
      slug,
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      message: String(formData.get("message") || ""),
      consent: formData.get("consent") === "on",
    };

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string; ok?: boolean };

      if (!response.ok) {
        setStatus("error");
        setFeedback(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setFeedback("Thanks — we received your submission and sent you a confirmation email.");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
      setFeedback("Unable to submit right now. Please try again later.");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="text-base font-medium text-ohs-navy">
        {feedback}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor={`${kind}-name`}>Name</Label>
        <Input id={`${kind}-name`} name="name" required autoComplete="name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${kind}-email`}>Email</Label>
        <Input id={`${kind}-email`} name="email" type="email" required autoComplete="email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${kind}-phone`}>Phone (optional)</Label>
        <Input id={`${kind}-phone`} name="phone" type="tel" autoComplete="tel" />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${kind}-message`}>{messageLabel}</Label>
        <Textarea id={`${kind}-message`} name="message" required />
      </div>

      {consentText?.length ? (
        <div className="rounded-xl border border-border/80 bg-ohs-navy-soft/40 px-4 py-3">
          <CompactPortableText value={consentText} />
        </div>
      ) : null}

      <div className="flex items-start gap-2.5">
        <input
          id={`${kind}-consent`}
          name="consent"
          type="checkbox"
          required
          className="mt-1 size-4 shrink-0 rounded border-border text-ohs-navy focus-visible:ring-2 focus-visible:ring-ohs-sky"
        />
        <Label htmlFor={`${kind}-consent`} className="text-sm font-normal">
          I have read and agree to how my information will be used, as
          described above and in the{" "}
          <Link href="/privacy-policy" className="underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </Label>
      </div>

      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Submitting…" : submitLabel}
      </Button>
      {feedback ? (
        <p role="status" className="text-sm text-red-700">
          {feedback}
        </p>
      ) : null}
    </form>
  );
}
