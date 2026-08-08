import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import {
  ContactFields,
  emptyContactDetails,
  isContactComplete,
} from "@/components/ui/contact-fields";
import { useSeo } from "@/lib/seo";

const EMAIL = "treassuredvesselsug@gmail.com";
const MAPS_URL = "https://maps.app.goo.gl/Z1XvjQeUSutmSnAP8";

export default function Contact() {
  const [values, setValues] = useState(emptyContactDetails);
  const [sent, setSent] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const complete = isContactComplete(values, true);

  useSeo({
    title: "Contact Us | Treasured Vessels Girls' Centre, Jinja Uganda",
    description:
      "Get in touch with Treasured Vessels Girls' Centre in Jinja, Uganda — to volunteer, partner with us, refer a girl, or learn more about our work.",
    path: "/contact",
  });

  // No form backend is connected yet, so the form composes an email the
  // visitor's own mail client sends. This works today and can be swapped for
  // an API endpoint later without changing the fields.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complete) {
      setShowErrors(true);
      return;
    }
    const subject = `Website enquiry from ${values.firstName} ${values.lastName}`;
    const body = [
      `Name: ${values.firstName} ${values.lastName}`,
      `Email: ${values.email}`,
      values.phone ? `Phone: ${values.phone}` : null,
      "",
      values.message,
    ]
      .filter((line) => line !== null)
      .join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
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
                  <p className="text-brand-plum font-semibold mb-2">Thank you.</p>
                  <p className="text-sm text-brand-charcoal/80">
                    Your email client should have opened with your message ready to send. If it did
                    not, please email us directly at{" "}
                    <a href={`mailto:${EMAIL}`} className="font-semibold">
                      {EMAIL}
                    </a>
                    .
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSent(false);
                      setShowErrors(false);
                      setValues(emptyContactDetails);
                    }}
                    className="mt-5 rounded-full border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white"
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <ContactFields
                    idPrefix="contact"
                    values={values}
                    onChange={setValues}
                    messageRequired
                    messagePlaceholder="How can we help?"
                    showErrors={showErrors}
                  />
                  <Button
                    type="submit"
                    className="w-full h-14 mt-6 rounded-2xl bg-brand-pink hover:bg-brand-pink/90 text-white font-bold text-base shadow-lg gap-2"
                  >
                    <Send className="w-4 h-4" /> Send Message
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
