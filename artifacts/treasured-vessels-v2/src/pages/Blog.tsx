import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blog";
import { useSeo, SITE_ORIGIN } from "@/lib/seo";

export default function Blog() {
  useSeo({
    title: "Blog | Treasured Vessels Girls' Centre, Jinja Uganda",
    description:
      "Evidence-based writing on girls' education, women's empowerment and community development in Jinja, Uganda, from Treasured Vessels Girls' Centre.",
    path: "/blog",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Treasured Vessels Girls' Centre Blog",
        url: `${SITE_ORIGIN}/blog`,
        blogPost: blogPosts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          datePublished: post.isoDate,
          url: `${SITE_ORIGIN}/blog/${post.slug}`,
        })),
      },
    ],
  });

  return (
    <div>
      {/* Header */}
      <section className="bg-brand-paleblue py-16 md:py-24">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-plum mb-6">Blog</h1>
            <p className="text-lg text-brand-charcoal/80 leading-relaxed">
              Evidence-based writing on girls' education, women's empowerment and life in our
              community &mdash; from the team in Jinja, Uganda.
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white border border-border rounded-[24px] overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <Link href={`/blog/${post.slug}`} className="block h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </Link>
                <div className="p-8 flex flex-col flex-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-pink mb-3">
                    {post.eyebrow} &middot; {post.date}
                  </span>
                  <h2 className="font-serif text-2xl text-brand-plum mb-4">
                    <Link href={`/blog/${post.slug}`} className="hover:text-brand-purple transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-brand-charcoal/70 mb-8 leading-relaxed flex-1">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`}>
                    <Button
                      variant="outline"
                      className="w-full border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white rounded-full h-12 gap-2"
                    >
                      Read Article <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
