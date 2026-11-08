import Link from "next/link";
import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Donate",
};

export default function DonatePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-12 sm:px-6">
      <PageHero
        title="Donate"
        description="Your support helps feed, shelter, and care for animals waiting for their forever homes."
      />
      <Card>
        <CardHeader>
          <CardTitle>Online giving coming soon</CardTitle>
          <CardDescription>
            Donation processing is not wired up yet. This page is a clear
            placeholder so visitors know how to help.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-base text-muted-foreground">
          <p>
            Prefer to reach us directly? Use the contact form and mention
            “donation” in your message — staff will follow up with next steps.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Contact us about giving</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
