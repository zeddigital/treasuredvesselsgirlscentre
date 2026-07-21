import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { newsPosts } from "@/lib/news";

export default function News() {
  return (
    <div>
      {/* Header */}
      <section className="bg-brand-paleblue py-16 md:py-24">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-plum mb-6">News & Updates</h1>
            <p className="text-lg text-brand-charcoal/80 leading-relaxed">
              The latest stories, milestones and updates from Treasured Vessels Girls' Centre in Jinja District, Uganda.
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {newsPosts.map((post) => (
              <article key={post.slug} className="bg-white border border-border rounded-[24px] overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col">
                <Link href={`/news/${post.slug}`} className="block h-56 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </Link>
                <div className="p-8 flex flex-col flex-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-pink mb-3">{post.eyebrow} &middot; {post.date}</span>
                  <h2 className="font-serif text-2xl text-brand-plum mb-4">
                    <Link href={`/news/${post.slug}`} className="hover:text-brand-purple transition-colors">{post.title}</Link>
                  </h2>
                  <p className="text-brand-charcoal/70 mb-8 leading-relaxed flex-1">{post.excerpt}</p>
                  <Link href={`/news/${post.slug}`}>
                    <Button variant="outline" className="w-full border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white rounded-full h-12 gap-2">
                      Read Story <ArrowRight className="w-4 h-4" />
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
