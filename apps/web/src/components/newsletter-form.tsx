"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { error?: string; ok?: boolean };

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage("You're signed up — thanks for staying in touch!");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
      setMessage("Unable to sign up right now. Please try again later.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-start">
      <div className="flex-1 space-y-1.5">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <Input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="border-white/20 bg-white/10 text-white placeholder:text-white/50 focus-visible:border-ohs-sky-bright"
        />
        <p className="text-xs text-white/60">
          By signing up, you agree to our{" "}
          <a href="/privacy-policy" className="underline underline-offset-2 hover:text-white">
            Privacy Policy
          </a>
          .
        </p>
      </div>
      <Button type="submit" variant="secondary" disabled={status === "loading"} className="shrink-0">
        {status === "loading" ? "Signing up…" : "Sign up"}
      </Button>
      {message ? (
        <p
          role="status"
          className={
            status === "success"
              ? "text-sm text-ohs-sky-bright sm:basis-full"
              : "text-sm text-red-300 sm:basis-full"
          }
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
