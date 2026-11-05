import { PortableText, type PortableTextComponents } from "@portabletext/react";

import type { PortableBlock } from "@/sanity/lib/fetch";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-8 mb-3 text-2xl font-semibold text-neutral-900">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-2 text-xl font-semibold text-neutral-900">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-neutral-700">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-1 pl-5 text-neutral-700">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-1 pl-5 text-neutral-700">{children}</ol>
    ),
  },
};

export function PortableBody({ value }: { value?: PortableBlock[] }) {
  if (!value?.length) {
    return null;
  }

  return <PortableText value={value} components={components} />;
}
