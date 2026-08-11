import { Link, useParams } from "wouter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBlogPost } from "@/lib/blog";
import { useSeo, SITE_ORIGIN, ORG_ID } from "@/lib/seo";
import NotFound from "./not-found";

export default function BlogArticle() {
  const params = useParams();
  const post = getBlogPost(params.slug as string);

  useSeo({
    title: post ? post.seoTitle : "Article not found | Treasured Vessels Girls' Centre",
    description: post?.metaDescription ?? "",
    path: post ? `/blog/${post.slug}` : "/blog",
    image: post?.image,
    type: "article",
    webPageType: "ItemPage",
    keywords: post?.keywords,
    schema: post
      ? [
          {
            "@type": "BlogPosting",
            headline: post.title,
            description: post.metaDescription,
            image: `${SITE_ORIGIN}${post.image}`,
            datePublished: post.isoDate,
            dateModified: post.isoDate,
            author: { "@id": ORG_ID },
            publisher: { "@id": ORG_ID },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${SITE_ORIGIN}/blog/${post.slug}`,
            },
            keywords: post.keywords.join(", "),
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
              { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_ORIGIN}/blog` },
              {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: `${SITE_ORIGIN}/blog/${post.slug}`,
              },
            ],
          },
        ]
      : undefined,
  });

  if (!post) {
    return <NotFound />;
  }

  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="relative h-[400px] md:h-[520px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img src={post.image} alt={post.imageAlt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brand-plum/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-plum/85 via-brand-plum/30 to-transparent"></div>
        </div>
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6 relative z-10 pt-16">
          <Link
            href="/blog"
            className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Link>
          <span className="block text-brand-gold font-semibold tracking-wider uppercase mb-3 text-sm">
            {post.eyebrow}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white max-w-3xl leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/80 text-sm">
            <time dateTime={post.isoDate}>{post.date}</time>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4" /> {post.readingMinutes} min read
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-[800px] px-4 md:px-6 prose prose-lg prose-purple prose-headings:font-serif prose-headings:text-brand-plum prose-a:text-brand-purple prose-blockquote:border-brand-pink prose-blockquote:text-brand-charcoal/80 prose-img:rounded-[24px] prose-img:shadow-lg prose-img:w-full">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({ src, alt }) => {
                // Portraits (e.g. the founder's note) sit beside the text on
                // wider screens and stack above it on mobile.
                const isPortrait = /founder/.test(String(src));
                if (isPortrait) {
                  return (
                    <figure className="not-prose sm:float-left sm:w-[46%] sm:mr-8 mb-6 mt-2">
                      <img
                        src={src as string}
                        alt={alt ?? ""}
                        loading="lazy"
                        className="w-full rounded-[24px] shadow-lg"
                      />
                      {alt ? (
                        <figcaption className="mt-3 text-sm text-brand-charcoal/60">{alt}</figcaption>
                      ) : null}
                    </figure>
                  );
                }
                return (
                  <figure className="my-10 clear-both">
                    <img src={src as string} alt={alt ?? ""} loading="lazy" className="w-full rounded-[24px] shadow-lg" />
                    {alt ? (
                      <figcaption className="mt-3 text-sm text-brand-charcoal/60 text-center">{alt}</figcaption>
                    ) : null}
                  </figure>
                );
              },
              // Stop a floated portrait from bleeding into the next section
              h2: ({ children }) => <h2 className="clear-both">{children}</h2>,
              hr: () => <hr className="clear-both" />,
            }}
          >
            {post.body}
          </ReactMarkdown>
        </div>
        <div className="container mx-auto max-w-[800px] px-4 md:px-6 mt-12">
          <Link href="/blog">
            <Button
              variant="outline"
              className="border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white rounded-full h-12 gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
