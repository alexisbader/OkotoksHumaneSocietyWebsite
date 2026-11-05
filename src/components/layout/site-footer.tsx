import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© Okotoks Humane Society</p>
        <div className="flex gap-4">
          <Link href="/contact" className="hover:text-neutral-900 hover:underline">
            Contact
          </Link>
          <Link href="/studio" className="hover:text-neutral-900 hover:underline">
            Studio
          </Link>
        </div>
      </div>
    </footer>
  );
}
