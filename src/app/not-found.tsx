import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-6xl flex-col items-start justify-center gap-4 px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-ohs-navy">
        Page not found
      </h1>
      <p className="max-w-lg text-lg text-muted-foreground">
        That page does not exist or has not been published in Sanity yet.
      </p>
      <Button asChild size="lg">
        <Link href="/">Back home</Link>
      </Button>
    </div>
  );
}
