import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Lock, Heart, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ContactFields,
  emptyContactDetails,
  isContactComplete,
} from "@/components/ui/contact-fields";
import { PoweredByStripe } from "@/components/ui/powered-by-stripe";
import { useSeo, SITE_ORIGIN, ORG_ID } from "@/lib/seo";
import { trackEvent } from "@/lib/analytics";

const FUNDS = [
  { id: "where-needed", label: "Where needed most" },
  { id: "education", label: "Girls' Education" },
  { id: "skills", label: "Skills Training" },
  { id: "health", label: "Menstrual Health" },
];

export default function Donate() {
  const [isMonthly, setIsMonthly] = useState(false);
  const [amount, setAmount] = useState<string>("50");
  const [customAmount, setCustomAmount] = useState("");
  const [fund, setFund] = useState("where-needed");
  const [details, setDetails] = useState(emptyContactDetails);
  const [showErrors, setShowErrors] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Bots fill hidden fields in; real donors never see this one.
  const [honeypot, setHoneypot] = useState("");
  const detailsComplete = isContactComplete(details, false);

  const amounts = isMonthly ? ["15", "30", "50", "100"] : ["25", "50", "100", "250"];

  const chosenAmount = amount === "custom" ? customAmount : amount;
  const amountValid = Number(chosenAmount) >= 2 && Number(chosenAmount) <= 50000;

  const handleAmountSelect = (val: string) => {
    setAmount(val);
    setCustomAmount("");
  };

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setAmount("custom");
  };

  // Hands off to Stripe Checkout — the card is only ever entered on Stripe's
  // own page, so no payment details pass through this site.
  const handleDonate = async () => {
    if (!detailsComplete || !amountValid || sending) {
      setShowErrors(true);
      if (!amountValid) setError("Please choose or enter a donation amount.");
      return;
    }
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          amount: chosenAmount,
          monthly: isMonthly,
          fund,
          ...details,
          company: honeypot,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error || "Something went wrong.");
      trackEvent("begin_checkout", {
        currency: "USD",
        value: Number(chosenAmount),
        frequency: isMonthly ? "monthly" : "one-off",
        fund,
      });
      window.location.href = data.url;
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "We could not start the payment just now.",
      );
      setSending(false);
    }
  };

  useSeo({
    title: "Donate | Treasured Vessels Girls' Centre, Jinja Uganda",
    description:
      "Your donation funds education, vocational training and safe spaces for vulnerable girls and women in Jinja, Uganda. $15 provides a reusable sanitary kit for a year.",
    path: "/donate",
    image: `${import.meta.env.BASE_URL}images/hero.jpg`,
    webPage: { potentialAction: { "@id": `${SITE_ORIGIN}/donate#donateaction` } },
    breadcrumb: [{ name: "Donate", path: "/donate" }],
    schema: [
      {
        "@type": "DonateAction",
        "@id": `${SITE_ORIGIN}/donate#donateaction`,
        name: "Donate to Treasured Vessels Girls' Centre",
        description:
          "Make a donation to support Treasured Vessels Girls' Centre and its programmes in Jinja, Uganda.",
        recipient: { "@id": ORG_ID },
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_ORIGIN}/donate`,
          actionPlatform: [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/MobileWebPlatform",
          ],
        },
      },
    ],
  });

  return (
    <div className="bg-brand-cream min-h-screen py-16 md:py-20">
      <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Heart className="w-12 h-12 text-brand-pink mx-auto mb-4" />
          <h1 className="font-serif text-4xl md:text-5xl text-brand-plum mb-4">Invest in a Girl's Future</h1>
          <p className="text-lg text-brand-charcoal/70">
            Your generous donation directly funds education, vocational training, and safe spaces for vulnerable young women in Uganda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-start">
          
          {/* Donation Form */}
          <div className="lg:col-span-7 bg-white p-6 md:p-10 rounded-[32px] shadow-xl border border-border">
            
            {/* Toggle */}
            <div className="flex bg-brand-paleblue rounded-full p-1 mb-8">
              <button 
                onClick={() => setIsMonthly(false)}
                className={`flex-1 py-3 text-sm font-semibold rounded-full transition-all ${!isMonthly ? 'bg-white text-brand-plum shadow-sm' : 'text-brand-charcoal/60 hover:text-brand-plum'}`}
              >
                Give Once
              </button>
              <button 
                onClick={() => setIsMonthly(true)}
                className={`flex-1 py-3 text-sm font-semibold rounded-full transition-all flex items-center justify-center gap-2 ${isMonthly ? 'bg-white text-brand-plum shadow-sm' : 'text-brand-charcoal/60 hover:text-brand-plum'}`}
              >
                <Heart className="w-4 h-4 text-brand-pink" /> Give Monthly
              </button>
            </div>

            {/* Amounts */}
            <div className="mb-8">
              <Label className="text-brand-plum font-semibold mb-4 block text-base">Select Amount (USD)</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {amounts.map(val => (
                  <button
                    key={val}
                    onClick={() => handleAmountSelect(val)}
                    className={`py-4 rounded-2xl border-2 font-bold text-lg transition-all ${
                      amount === val 
                        ? 'border-brand-pink bg-brand-pink text-white' 
                        : 'border-border text-brand-charcoal hover:border-brand-pink/50'
                    }`}
                  >
                    ${val}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-charcoal/50 font-bold">$</span>
                <Input 
                  type="number" 
                  placeholder="Custom Amount" 
                  value={customAmount}
                  onChange={handleCustomAmount}
                  className={`pl-8 h-14 rounded-2xl text-lg ${amount === 'custom' ? 'border-brand-pink ring-1 ring-brand-pink' : ''}`}
                />
              </div>
            </div>

            {/* Donor details */}
            <div className="mb-10">
              <Label className="text-brand-plum font-semibold mb-4 block text-base">Your details</Label>
              <ContactFields
                idPrefix="donate"
                values={details}
                onChange={setDetails}
                messageLabel="Message"
                messagePlaceholder="Anything you would like us to know about your gift"
                showErrors={showErrors}
              />
            </div>

            {/* Fund Allocation */}
            <div className="mb-10">
              <Label className="text-brand-plum font-semibold mb-4 block text-base">Direct my donation to</Label>
              <RadioGroup
                value={fund}
                onValueChange={setFund}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                {FUNDS.map(option => (
                  <div key={option.id} className="flex items-center space-x-2 border border-border p-3 rounded-xl hover:bg-brand-paleblue/50 transition-colors">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label htmlFor={option.id} className="flex-1 cursor-pointer">{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Honeypot — visually hidden, ignored by real donors */}
            <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
              <label htmlFor="donate-company">Company</label>
              <input
                id="donate-company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            {error ? (
              <div className="mb-6 rounded-2xl border border-brand-pink/40 bg-brand-blush p-4">
                <p className="text-sm text-brand-plum">
                  {error} If it keeps happening, please email us at{" "}
                  <a href="mailto:treasuredvesselsug@gmail.com" className="font-semibold underline">
                    treasuredvesselsug@gmail.com
                  </a>
                  .
                </p>
              </div>
            ) : null}

            <Button
              onClick={handleDonate}
              disabled={sending}
              className="w-full h-14 rounded-2xl bg-brand-gold hover:bg-yellow-400 text-brand-charcoal font-bold text-lg shadow-lg mb-6 gap-2 disabled:opacity-70"
            >
              {sending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Taking you to Stripe…
                </>
              ) : (
                <>
                  Donate ${chosenAmount || "0"}{isMonthly ? " a month" : ""}
                </>
              )}
            </Button>

            <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground bg-gray-50 py-4 rounded-lg">
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4" /> Secure, encrypted transaction.
              </span>
              <PoweredByStripe />
            </div>
            <p className="text-center text-[11px] text-muted-foreground mt-4">
              You will be taken to Stripe to complete your donation. Card details are entered on
              Stripe&rsquo;s secure page and never touch this website. All amounts are in US dollars.
            </p>

          </div>

          {/* Info Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-brand-plum text-white p-8 rounded-[32px] shadow-lg">
              <h3 className="font-serif text-2xl mb-6">What Your Gift Does</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-pink/20 text-brand-pink flex items-center justify-center flex-shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4" /></div>
                  <span className="text-brand-paleblue/90 text-sm"><strong>$15</strong> provides a girl with a reusable sanitary kit for a year.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-pink/20 text-brand-pink flex items-center justify-center flex-shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4" /></div>
                  <span className="text-brand-paleblue/90 text-sm"><strong>$50</strong> keeps a vulnerable girl in school for a full academic term.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-pink/20 text-brand-pink flex items-center justify-center flex-shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4" /></div>
                  <span className="text-brand-paleblue/90 text-sm"><strong>$150</strong> buys a sewing machine for a vocational graduate to start her business.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-border">
              <h3 className="font-serif text-xl text-brand-plum mb-4">Financial Transparency</h3>
              <p className="text-sm text-brand-charcoal/70 mb-4">
                We are committed to accountable stewardship of every donation. Read more about how we are governed and how funds are reported.
              </p>
              <div className="flex flex-col gap-2">
                <Link href="/about/governance" className="text-brand-blue text-sm font-semibold hover:underline">Governance & Financial Reporting</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
