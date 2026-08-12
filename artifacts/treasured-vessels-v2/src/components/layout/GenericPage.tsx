import { useLocation } from "wouter";
import { useSeo } from "@/lib/seo";

interface GenericPageProps {
  title: string;
  /** Falls back to a generic line if a page hasn't supplied its own */
  description?: string;
  webPageType?: string;
  /** Extra JSON-LD nodes appended to this page's @graph */
  schema?: Record<string, unknown>[];
  /** Merged into this page's WebPage node */
  webPage?: Record<string, unknown>;
  children: React.ReactNode;
}

export default function GenericPage({
  title,
  description,
  webPageType,
  schema,
  webPage,
  children,
}: GenericPageProps) {
  const [location] = useLocation();

  useSeo({
    title: `${title} | Treasured Vessels Girls' Centre`,
    description:
      description ??
      `${title} — Treasured Vessels Girls' Centre, a women-led community organisation supporting vulnerable girls and women in Jinja, Uganda.`,
    path: location,
    webPageType,
    schema,
    webPage,
  });

  return (
    <div className="pb-24">
      <section className="bg-brand-paleblue py-16">
        <div className="container mx-auto max-w-[800px] px-4 md:px-6">
          <h1 className="font-serif text-4xl md:text-5xl text-brand-plum">{title}</h1>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-[800px] px-4 md:px-6 prose prose-lg prose-purple">
          {children}
        </div>
      </section>
    </div>
  );
}
