import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
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
    <article className="mx-auto max-w-3xl space-y-6 px-4 py-12 sm:px-6">
      <PageHero title={page.title || "Page"} description={page.summary} />
      <PortableBody value={page.body} />
    </article>
  );
}
