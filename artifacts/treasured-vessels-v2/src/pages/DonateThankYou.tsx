import { Link } from "wouter";
import { Heart, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSeo } from "@/lib/seo";

const EMAIL = "treasuredvesselsug@gmail.com";

/**
 * Where Stripe returns a donor after a successful Checkout. Deliberately makes
 * no claim about the amount: this page is reachable by anyone who lands on the
 * URL, and Stripe sends the authoritative receipt by email.
 */
export default function DonateThankYou() {
  useSeo({
    title: "Thank you for your donation | Treasured Vessels Girls' Centre",
    description: "Thank you for supporting girls and women in Jinja, Uganda.",
    path: "/donate/thank-you",
    // A transactional endpoint, not a page anyone should reach from search.
    noindex: true,
    breadcrumb: [
      { name: "Donate", path: "/donate" },
      { name: "Thank you", path: "/donate/thank-you" },
    ],
  });

  return (
    <div className="bg-brand-cream min-h-screen pt-12 pb-24">
      <div className="container mx-auto max-w-[760px] px-4 md:px-6">
        <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-xl border border-border text-center">
          <Heart className="w-14 h-14 text-brand-pink mx-auto mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl text-brand-plum mb-5">
            Thank you
          </h1>
          <p className="text-lg text-brand-charcoal/80 leading-relaxed mb-4">
            Your donation has gone through, and it will be put to work in Jinja by the
            people who know these girls by name.
          </p>
          <p className="text-brand-charcoal/70 leading-relaxed mb-8">
            Stripe will email you a receipt shortly. If you set up a monthly gift, you can
            change or cancel it at any time &mdash; just get in touch and we will sort it
            out, no questions asked.
          </p>

          <div className="bg-brand-paleblue rounded-2xl p-6 text-left mb-8">
            <p className="text-sm text-brand-charcoal/80 leading-relaxed">
              <strong className="text-brand-plum">A note on what happens next.</strong>{" "}
              We do not send photographs of individual girls to donors, and we never share
              identifying details. What we do send is an honest account of what your
              support funded and what changed. If you would like that, email us at{" "}
              <a href={`mailto:${EMAIL}`} className="font-semibold">
                {EMAIL}
              </a>{" "}
              and we will add you to it.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button className="rounded-full bg-brand-pink hover:bg-brand-pink/90 text-white h-12 px-8 font-bold w-full sm:w-auto">
                Back to the homepage
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="rounded-full border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white h-12 px-8 gap-2 w-full sm:w-auto"
              >
                <Mail className="w-4 h-4" /> Get in touch
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
