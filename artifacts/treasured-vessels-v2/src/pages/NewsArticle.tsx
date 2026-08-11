import { Link, useParams } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getNewsPost } from "@/lib/news";
import NotFound from "./not-found";
import { useSeo, SITE_ORIGIN, ORG_ID } from "@/lib/seo";

export default function NewsArticle() {
  const params = useParams();
  const post = getNewsPost(params.slug as string);

  useSeo({
    title: post
      ? `${post.title} | Treasured Vessels Girls' Centre`
      : "Story not found | Treasured Vessels Girls' Centre",
    description: post?.excerpt ?? "",
    path: post ? `/news/${post.slug}` : "/news",
    image: post?.image,
    type: "article",
    webPageType: "ItemPage",
    noindex: !post,
    schema: post
      ? [
          {
            "@type": "NewsArticle",
            headline: post.title,
            description: post.excerpt,
            image: `${SITE_ORIGIN}${post.image}`,
            author: { "@id": ORG_ID },
            publisher: { "@id": ORG_ID },
            mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_ORIGIN}/news/${post.slug}` },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
              { "@type": "ListItem", position: 2, name: "News", item: `${SITE_ORIGIN}/news` },
              { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_ORIGIN}/news/${post.slug}` },
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
      <section className="relative h-[400px] md:h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brand-plum/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-plum/85 via-brand-plum/30 to-transparent"></div>
        </div>
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6 relative z-10 pt-16">
          <Link href="/news" className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to News
          </Link>
          <span className="block text-brand-gold font-semibold tracking-wider uppercase mb-3 text-sm">
            {post.eyebrow}{post.date ? ` · ${post.date}` : ""}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white max-w-3xl leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-[800px] px-4 md:px-6 prose prose-lg prose-purple">
          {post.body}
        </div>
        <div className="container mx-auto max-w-[800px] px-4 md:px-6 mt-12">
          <Link href="/news">
            <Button variant="outline" className="border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white rounded-full h-12 gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to News
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
