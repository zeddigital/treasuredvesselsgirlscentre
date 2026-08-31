import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { useSeo } from '@/lib/seo';

const SUGGESTIONS = [
  { href: '/programs', label: 'Our Programs' },
  { href: '/blog', label: 'Blog' },
  { href: '/news', label: 'News' },
  { href: '/get-involved/sponsor', label: 'Sponsor a Girl' },
  { href: '/contact', label: 'Contact Us' },
];

export default function NotFound() {
  useSeo({
    title: "Page not found | Treasured Vessels Girls' Centre",
    description: 'The page you are looking for could not be found.',
    path: '/404',
    noindex: true,
  });

  return (
    <div>
      <section className="bg-brand-paleblue py-20 md:py-28">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <span className="block text-brand-pink font-semibold tracking-wider uppercase mb-3 text-sm">
            Error 404
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-brand-plum mb-4">
            We couldn&rsquo;t find that page
          </h1>
          <p className="text-lg text-brand-charcoal/80 max-w-2xl leading-relaxed">
            The page may have moved, or the link may be out of date. Everything below is a
            good place to pick up from.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="flex flex-wrap gap-3 mb-10">
            {SUGGESTIONS.map(({ href, label }) => (
              <Link key={href} href={href}>
                <Button
                  variant="outline"
                  className="rounded-full border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white h-11"
                >
                  {label}
                </Button>
              </Link>
            ))}
          </div>
          <Link href="/">
            <Button className="rounded-full bg-brand-pink hover:bg-brand-pink/90 text-white h-12 px-8 font-bold">
              Back to the homepage
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
