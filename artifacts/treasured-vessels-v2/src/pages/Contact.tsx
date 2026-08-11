import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Send, Loader2 } from "lucide-react";
import {
  ContactFields,
  emptyContactDetails,
  isContactComplete,
} from "@/components/ui/contact-fields";
import { useSeo } from "@/lib/seo";
import { trackEvent } from "@/lib/analytics";

const EMAIL = "treassuredvesselsug@gmail.com";
const MAPS_URL = "https://maps.app.goo.gl/Z1XvjQeUSutmSnAP8";

export default function Contact() {
  const [values, setValues] = useState(emptyContactDetails);
  const [sent, setSent] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Bots fill hidden fields in; real visitors never see this one.
  const [honeypot, setHoneypot] = useState("");
  const complete = isContactComplete(values, true);

  useSeo({
    title: "Contact Us | Treasured Vessels Girls' Centre, Jinja Uganda",
    description:
      "Get in touch with Treasured Vessels Girls' Centre in Jinja, Uganda — to volunteer, partner with us, refer a girl, or learn more about our work.",
    path: "/contact",
    webPageType: "ContactPage",
  });

  // Posts to the Cloudflare Pages Function at functions/api/contact.ts, which
  // sends the enquiry to the centre and a confirmation to the sender via Resend.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!complete || sending) {
      setShowErrors(true);
      return;
    }
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, company: honeypot }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setSent(true);
      trackEvent("contact_form_submit", { form: "contact" });
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "We could not send your message just now.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="pb-24">
      <section className="bg-brand-paleblue py-16">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <h1 className="font-serif text-4xl md:text-5xl text-brand-plum mb-4">Contact Us</h1>
          <p className="text-lg text-brand-charcoal/80 max-w-2xl leading-relaxed">
            We&rsquo;d love to hear from you &mdash; whether you want to volunteer, partner with us,
            or simply learn more about our work.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form */}
            <div className="lg:col-span-7 bg-white p-6 md:p-10 rounded-[32px] shadow-xl border border-border">
              <h2 className="font-serif text-2xl text-brand-plum mb-6">Send us a message</h2>

              {sent ? (
                <div className="rounded-2xl bg-brand-paleblue p-6">
                  <p className="text-brand-plum font-semibold mb-2">Thank you — your message is on its way.</p>
                  <p className="text-sm text-brand-charcoal/80">
                    We have sent a confirmation to <strong>{values.email}</strong>. Someone from our
                    team in Jinja will read your message personally and normally replies within a few
                    working days. If it is urgent, please call{" "}
                    <a href="tel:+256756233041" className="font-semibold">+256 756 233 041</a>.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSent(false);
                      setShowErrors(false);
                      setError(null);
                      setValues(emptyContactDetails);
                    }}
                    className="mt-5 rounded-full border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white"
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="relative">
                  <ContactFields
                    idPrefix="contact"
                    values={values}
                    onChange={setValues}
                    messageRequired
                    messagePlaceholder="How can we help?"
                    showErrors={showErrors}
                  />

                  {/* Honeypot — visually hidden, ignored by real users */}
                  <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
                    <label htmlFor="contact-company">Company</label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {error ? (
                    <div className="mt-6 rounded-2xl border border-brand-pink/40 bg-brand-blush p-4">
                      <p className="text-sm text-brand-plum">
                        {error} Please try again, or email us directly at{" "}
                        <a href={`mailto:${EMAIL}`} className="font-semibold underline">
                          {EMAIL}
                        </a>
                        .
                      </p>
                    </div>
                  ) : null}

                  <Button
                    type="submit"
                    disabled={sending}
                    className="w-full h-14 mt-6 rounded-2xl bg-brand-pink hover:bg-brand-pink/90 text-white font-bold text-base shadow-lg gap-2 disabled:opacity-70"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Message
                      </>
                    )}
                  </Button>
                  <p className="text-center text-[11px] text-muted-foreground mt-4">
                    Fields marked <span className="text-brand-pink">*</span> are required.
                  </p>
                </form>
              )}
            </div>

            {/* Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-brand-plum text-white p-8 rounded-[32px]">
                <h2 className="font-serif text-2xl mb-6">Get in Touch</h2>
                <ul className="space-y-5 text-sm text-brand-paleblue/90">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-brand-pink" />
                    <a
                      href={MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      Walukuba-Masese Rd
                      <br />
                      Jinja District, Uganda
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-brand-pink" />
                    <span className="flex flex-col">
                      <a href="tel:+256756233041" className="hover:text-white transition-colors">
                        +256 756 233 041
                      </a>
                      <a href="tel:+256774427101" className="hover:text-white transition-colors">
                        +256 774 427 101
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 text-brand-pink" />
                    <a
                      href={`mailto:${EMAIL}`}
                      className="hover:text-white transition-colors break-all"
                    >
                      {EMAIL}
                    </a>
                  </li>
                </ul>
              </div>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
                aria-label="Open the Treasured Vessels Girls' Centre location in Google Maps (opens in a new tab)"
              >
                <img
                  src={`${import.meta.env.BASE_URL}images/map.png`}
                  alt="Map showing the location of Treasured Vessels Girls' Centre"
                  className="w-full rounded-[24px] shadow-lg border border-border transition-shadow group-hover:shadow-xl"
                />
                <span className="mt-3 block text-sm font-medium text-brand-pink">
                  Open in Google Maps &#8599;
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
