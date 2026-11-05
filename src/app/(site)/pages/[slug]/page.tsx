import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { PortableBody } from "@/components/portable-text";
import { getPageBySlug } from "@/sanity/lib/fetch";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  return {
    title: page?.title || "Page",
    description: page?.summary,
  };
}

export default async function GenericPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{page.title}</h1>
        {page.summary ? <p className="text-neutral-600">{page.summary}</p> : null}
      </header>
      <PortableBody value={page.body} />
    </article>
  );
}
