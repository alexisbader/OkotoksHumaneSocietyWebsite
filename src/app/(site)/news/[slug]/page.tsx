import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { PortableBody } from "@/components/portable-text";
import { getNewsBySlug } from "@/sanity/lib/fetch";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);
  return {
    title: post?.title || "News",
    description: post?.summary,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl space-y-6 px-4 py-12 sm:px-6">
      <Link
        href="/news"
        className="inline-flex min-h-11 items-center text-base font-medium text-ohs-navy hover:underline"
      >
        ← Back to news
      </Link>
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-ohs-navy sm:text-4xl">
          {post.title}
        </h1>
        {post.publishedAt ? (
          <p className="text-base text-muted-foreground">
            {new Date(post.publishedAt).toLocaleDateString()}
          </p>
        ) : null}
        {post.summary ? (
          <p className="text-lg text-muted-foreground">{post.summary}</p>
        ) : null}
      </header>
      <PortableBody value={post.body} />
    </article>
  );
}
