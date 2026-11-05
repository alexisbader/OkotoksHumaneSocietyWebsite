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
    <article className="space-y-6">
      <Link href="/news" className="text-sm text-neutral-600 hover:underline">
        ← Back to news
      </Link>
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
        {post.publishedAt ? (
          <p className="text-sm text-neutral-500">
            {new Date(post.publishedAt).toLocaleDateString()}
          </p>
        ) : null}
        {post.summary ? <p className="text-neutral-600">{post.summary}</p> : null}
      </header>
      <PortableBody value={post.body} />
    </article>
  );
}
