import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { useSeo, SITE_ORIGIN, ORG_ID } from "@/lib/seo";
import NotFound from "./not-found";

interface Section {
  heading: string;
  body: string[];
  /** Rendered as a ticked list beneath the body */
  points?: { label: string; text: string }[];
}

interface GetInvolvedPage {
  title: string;
  subtitle: string;
  metaDescription: string;
  /** Name of this page's schema.org action */
  actionName: string;
  image: string;
  imageAlt: string;
  intro: string[];
  sections: Section[];
  ctaHeading: string;
  ctaBody: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

const pages: Record<string, GetInvolvedPage> = {
  sponsor: {
    actionName: "Sponsor a girl through Treasured Vessels Girls' Centre",
    title: "Sponsor a Girl",
    subtitle: "Fund a plan, not a package",
    metaDescription:
      "Sponsor a girl's education in Jinja, Uganda. Every plan starts with an assessment, covers the barrier actually stopping her, and is reported on each term.",
    image: "images/gallery/young-mother-support.jpg",
    imageAlt:
      "A young mother and her baby meeting with a staff member at Treasured Vessels Girls' Centre in Jinja, Uganda",
    intro: [
      "Sponsorship keeps a girl learning. That sounds simple, and the money genuinely does that, but only if it is spent on the thing that is actually stopping her.",
      "For one girl that is unpaid fees. For another it is a uniform she has outgrown, or a period she has nothing to manage, or a baby with no one to mind him during the school day. Send all four the same package and you solve one problem four times and three problems never.",
    ],
    sections: [
      {
        heading: "How it works",
        body: [
          "Every plan begins with a documented assessment rather than a fixed bundle. We look at what interrupted her learning, what her household can realistically contribute, what is already covered by someone else, whether there are safety concerns to address first, and what she says she needs.",
        ],
        points: [
          { label: "Assess", text: "Understand what is actually blocking her, in her situation." },
          { label: "Agree the plan", text: "Decide which costs the sponsorship will cover." },
          { label: "Liaise with her school", text: "Confirm fees, materials and terms of return." },
          { label: "Follow up", text: "Track attendance across at least two terms." },
          { label: "Report", text: "Tell you what the money did, and what changed." },
        ],
      },
      {
        heading: "What sponsorship can cover",
        body: [
          "School fees are one line item. Depending on the assessment, a plan may also cover uniform and shoes, learning materials and exam fees, transport, menstrual supplies, disability access, childcare for a young mother, family engagement, or referral for counselling and protection.",
        ],
      },
      {
        heading: "What it costs",
        body: [
          "These are our published anchors. Which one is right depends entirely on what the assessment finds.",
        ],
        points: [
          { label: "$15", text: "A reusable sanitary kit that lasts about a year." },
          { label: "$50", text: "A term of schooling for a girl whose fees are the barrier." },
          { label: "$150", text: "A sewing machine for a young woman starting her own work." },
        ],
      },
      {
        heading: "What we will not offer",
        body: [
          "We do not send photographs of a sponsored girl, her personal details, or direct contact with her. This is deliberate. A name, a face and a school are enough to locate someone, and consent given at seventeen to the people helping you is not consent freely given.",
          "You get full accountability for the money: restricted, receipted and reported every term. She keeps her privacy. Both are possible at once, and we protect both.",
        ],
      },
    ],
    ctaHeading: "Sponsor an education plan",
    ctaBody:
      "Tell us what you are able to commit and we will match it to an assessed need. A single sustained term does more than a larger gift that stops mid-year.",
    ctaLabel: "Get in touch about sponsoring",
    ctaHref: "/contact",
    secondaryLabel: "Or make a donation",
    secondaryHref: "/donate",
  },

  partner: {
    actionName: "Discuss a partnership with Treasured Vessels Girls' Centre",
    title: "Partner With Us",
    subtitle: "What a good partner brings",
    metaDescription:
      "Partner with Treasured Vessels Girls' Centre in Jinja, Uganda. Schools, health providers, businesses, churches, NGOs and foundations working together for girls.",
    image: "images/gallery/tailoring-workshop.jpg",
    imageAlt:
      "The tailoring workshop at Treasured Vessels Girls' Centre, with sewing machines and trainees at work",
    intro: [
      "Most of what a girl in difficulty needs already exists somewhere in Jinja: schools, health services, probation officers, legal support, training. The barrier is rarely that these things are absent. It is that they are not connected, and she cannot reach them alone.",
      "That is where partnership does its work. We are a small, registered community-based organisation running six programmes with around 30 regular volunteers. What we offer is proximity and continuity. What we need from partners is the reach and specialist capability we do not have.",
    ],
    sections: [
      {
        heading: "What we are asking for, specifically",
        body: [
          "Vague offers of collaboration rarely turn into anything. These are the concrete things that would make a difference:",
        ],
        points: [
          {
            label: "Schools",
            text: "Prompt attendance reporting, non-discrimination for sponsored girls, a clear position on re-entry after pregnancy, and one confidential safeguarding contact.",
          },
          {
            label: "Health providers",
            text: "Tell us what adolescent-friendly services you genuinely offer and on what terms, so we stop sending girls to doors that will not open for them.",
          },
          {
            label: "Businesses",
            text: "Equipment for the skills rooms, market access and customers for our vocational graduates, or mentoring. Our trainees need buyers more than sympathy.",
          },
          {
            label: "Churches and groups",
            text: "Sustained group sponsorship of a whole plan across a full academic year, rather than a term.",
          },
          {
            label: "NGOs and foundations",
            text: "Outcome measurement, safeguarding review, and co-delivery where our programmes overlap with yours.",
          },
          {
            label: "Local government and probation",
            text: "Help us make sure what we tell girls about their rights and options matches what the system will actually deliver.",
          },
        ],
      },
      {
        heading: "What we bring",
        body: [
          "We live in this community. We hear that a girl has stopped attending before it becomes a statistic, and we are still here after a visiting team has gone home. We have run continuously since 2018 across education, vocational training, teenage mother support, menstrual health, protection and community outreach.",
        ],
      },
      {
        heading: "Where we are still building",
        body: [
          "We would rather say this at the start than have you discover it later. Our measurement systems are improving and are not yet where they should be. We can tell you what we do and who we work with; the longitudinal outcome tracking we would like to report is something we are building rather than something we can already evidence.",
          "If you are a partner who can help us strengthen that, you would be solving one of our real problems rather than a decorative one.",
        ],
      },
    ],
    ctaHeading: "Let's talk",
    ctaBody:
      "Get in touch and ask us difficult questions. We would rather have a partner who tested us properly at the start.",
    ctaLabel: "Start a conversation",
    ctaHref: "/contact",
  },

  volunteer: {
    actionName: "Enquire about volunteering with Treasured Vessels Girls' Centre",
    title: "Volunteer",
    subtitle: "Practical help, given reliably",
    metaDescription:
      "Volunteer with Treasured Vessels Girls' Centre in Jinja, Uganda. Around 30 volunteers support vocational training, school outreach and community events.",
    image: "images/gallery/hairdressing-training.jpg",
    imageAlt:
      "A hairdressing training session in progress at Treasured Vessels Girls' Centre in Jinja, Uganda",
    intro: [
      "Around 30 regular volunteers already keep this centre running. They are the reason a skills class happens on a Tuesday and a school outreach happens on a Thursday.",
      "We are always glad of more hands, but the most useful thing a volunteer offers is not enthusiasm. It is turning up, consistently, for long enough that the girls come to expect you.",
    ],
    sections: [
      {
        heading: "Where help is most needed",
        body: ["These are the areas where an extra pair of hands changes what we can deliver:"],
        points: [
          {
            label: "Vocational training support",
            text: "Tailoring, hairdressing, baking, soap-making, crafts and shoemaking. Assist a trainer, or teach a skill yourself.",
          },
          {
            label: "School outreach",
            text: "Helping deliver menstrual health education and distribute reusable kits in partner schools.",
          },
          {
            label: "Community events",
            text: "Set-up, logistics and running activities on outreach days.",
          },
          {
            label: "Mentoring",
            text: "Regular, ongoing encouragement for girls returning to learning or starting a trade.",
          },
          {
            label: "Skills we lack",
            text: "Bookkeeping, record-keeping, photography, and help with our digital systems, some of which can be done remotely.",
          },
        ],
      },
      {
        heading: "What we ask of volunteers",
        body: [
          "Because we work with vulnerable girls and young women, volunteering here comes with obligations as well as opportunities.",
        ],
        points: [
          {
            label: "Reliability",
            text: "A commitment you can actually keep matters more than a generous one you cannot.",
          },
          {
            label: "Safeguarding",
            text: "Anyone working directly with girls agrees to our safeguarding expectations and appropriate checks.",
          },
          {
            label: "Privacy",
            text: "No photographs, names or personal details of the girls shared publicly or on social media.",
          },
          {
            label: "Respect",
            text: "The girls here are capable and resilient. They are not a story to be told, and not anyone's project.",
          },
        ],
      },
      {
        heading: "Volunteering from outside Jinja",
        body: [
          "Most of our volunteering is hands-on and local. If you are elsewhere in Uganda or overseas and want to help, the honest answer is that remote, skills-based support in administration, record-keeping, design or fundraising is usually far more valuable to us than a short visit.",
        ],
      },
    ],
    ctaHeading: "Register your interest",
    ctaBody:
      "Tell us your skills, your availability, and whether you are in Jinja or elsewhere. We will come back to you about where you would fit.",
    ctaLabel: "Contact us about volunteering",
    ctaHref: "/contact",
  },
};

export default function GetInvolved() {
  const params = useParams();
  const key = params.type as string;
  const page = pages[key];
  const actionId = `${SITE_ORIGIN}/get-involved/${key}#action`;

  useSeo({
    title: page
      ? `${page.title} | Treasured Vessels Girls' Centre`
      : "Page not found | Treasured Vessels Girls' Centre",
    description: page?.metaDescription ?? "",
    path: `/get-involved/${key}`,
    image: page ? `${import.meta.env.BASE_URL}${page.image}` : undefined,
    noindex: !page,
    breadcrumb: page
      ? [{ name: page.title, path: `/get-involved/${key}` }]
      : undefined,
    webPage: page ? { potentialAction: { "@id": actionId } } : undefined,
    schema: page
      ? [
          {
            // Sponsorship is financial, so it is a DonateAction; partnering and
            // volunteering start as an enquiry, so they are CommunicateAction.
            "@type": key === "sponsor" ? "DonateAction" : "CommunicateAction",
            "@id": actionId,
            name: page.actionName,
            recipient: { "@id": ORG_ID },
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${SITE_ORIGIN}/get-involved/${key}`,
              actionPlatform: [
                "https://schema.org/DesktopWebPlatform",
                "https://schema.org/MobileWebPlatform",
              ],
            },
          },
        ]
      : undefined,
  });

  if (!page) return <NotFound />;

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[340px] md:h-[440px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}${page.image}`}
            alt={page.imageAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-plum/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-plum/85 via-brand-plum/35 to-transparent"></div>
        </div>
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6 relative z-10 pt-12">
          <span className="block text-brand-gold font-semibold tracking-wider uppercase mb-3 text-sm">
            {page.subtitle}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white max-w-3xl leading-tight">
            {page.title}
          </h1>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-[820px] px-4 md:px-6">
          {page.intro.map((para, i) => (
            <p
              key={i}
              className={`text-brand-charcoal/80 leading-relaxed mb-5 ${i === 0 ? "text-lg" : ""}`}
            >
              {para}
            </p>
          ))}

          {page.sections.map((section) => (
            <div key={section.heading} className="mt-12">
              <h2 className="font-serif text-2xl md:text-3xl text-brand-plum mb-4">
                {section.heading}
              </h2>
              {section.body.map((para, i) => (
                <p key={i} className="text-brand-charcoal/80 leading-relaxed mb-4">
                  {para}
                </p>
              ))}
              {section.points ? (
                <ul className="mt-6 space-y-3">
                  {section.points.map((point) => (
                    <li
                      key={point.label}
                      className="flex items-start gap-3 bg-white border border-border rounded-2xl p-4"
                    >
                      <span className="mt-0.5 w-6 h-6 rounded-full bg-brand-purple/10 text-brand-purple flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4" />
                      </span>
                      <span className="text-brand-charcoal/80 leading-relaxed">
                        <strong className="text-brand-plum">{point.label}</strong>
                        {": "}
                        {point.text}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}

          {/* CTA */}
          <div className="mt-16 bg-brand-plum text-white rounded-[32px] p-8 md:p-10">
            <h2 className="font-serif text-2xl md:text-3xl mb-3">{page.ctaHeading}</h2>
            <p className="text-brand-paleblue/90 leading-relaxed mb-8">{page.ctaBody}</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href={page.ctaHref}>
                <Button className="rounded-full bg-brand-pink hover:bg-brand-pink/90 text-white h-12 px-6 gap-2 border-0">
                  {page.ctaLabel} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              {page.secondaryLabel && page.secondaryHref ? (
                <Link href={page.secondaryHref}>
                  <Button
                    variant="outline"
                    className="rounded-full border-white/40 text-white hover:bg-white hover:text-brand-plum h-12 px-6 bg-transparent"
                  >
                    {page.secondaryLabel}
                  </Button>
                </Link>
              ) : null}
            </div>
          </div>

          {/* Cross-links */}
          <div className="mt-10 flex flex-wrap gap-3 text-sm">
            {Object.entries(pages)
              .filter(([k]) => k !== key)
              .map(([k, other]) => (
                <Link
                  key={k}
                  href={`/get-involved/${k}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-brand-purple hover:bg-brand-purple hover:text-white transition-colors"
                >
                  {other.title} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
