import treasuredVesselBody from "@/content/what-it-means-to-be-a-treasured-vessel.md?raw";
import jinjaBusogaBody from "@/content/why-jinja-and-busoga-need-a-girls-support-centre.md?raw";
import fiveBarriersBody from "@/content/five-barriers-that-push-a-girl-out-of-school.md?raw";
import sponsorshipBody from "@/content/what-responsible-education-sponsorship-should-include.md?raw";
import returnToLearningBody from "@/content/returning-to-learning-after-teenage-pregnancy.md?raw";

export interface BlogPost {
  slug: string;
  title: string;
  /** Short label shown above the title, e.g. the content pillar */
  eyebrow: string;
  date: string;
  /** ISO date used for schema.org and <time> elements */
  isoDate: string;
  image: string;
  imageAlt: string;
  excerpt: string;
  /** <=156 chars, used for <meta name="description"> */
  metaDescription: string;
  seoTitle: string;
  keywords: string[];
  readingMinutes: number;
  body: string;
}

// Newest first — the blog index and article routes are generated from this.
export const blogPosts: BlogPost[] = [
  {
    slug: "returning-to-learning-after-teenage-pregnancy",
    title: "Returning to Learning After Teenage Pregnancy",
    eyebrow: "Teenage Mothers",
    date: "12 August 2026",
    isoDate: "2026-08-12",
    image: `${import.meta.env.BASE_URL}images/gallery/young-mother-support.jpg`,
    imageAlt:
      "A young mother and her baby meeting with a staff member at Treasured Vessels Girls' Centre in Jinja, Uganda",
    excerpt:
      "Uganda allows girls to return to school after childbirth. Only about one in three actually does. The barriers in between \u2014 and a pathway back that survives contact with reality.",
    metaDescription:
      "Only about a third of Ugandan adolescent mothers return to school after childbirth. The real barriers, and a six-step pathway back to learning.",
    seoTitle:
      "Returning to Learning After Teenage Pregnancy | Treasured Vessels",
    keywords: [
      "teenage mothers return to school Uganda",
      "school re-entry after pregnancy",
      "young mothers education",
      "teenage pregnancy school guidelines Uganda",
      "adolescent mothers Jinja",
    ],
    readingMinutes: 10,
    body: returnToLearningBody,
  },
  {
    slug: "what-responsible-education-sponsorship-should-include",
    title: "What Responsible Education Sponsorship Should Include",
    eyebrow: "Sponsorship",
    date: "11 August 2026",
    isoDate: "2026-08-11",
    image: `${import.meta.env.BASE_URL}images/gallery/tailoring-classroom.jpg`,
    imageAlt:
      "A learning session in progress at Treasured Vessels Girls' Centre in Jinja, Uganda",
    excerpt:
      "What does sponsorship actually buy, who decides, and how would you know it worked? A transparent service model \u2014 and why we will never send you a photograph of the girl.",
    metaDescription:
      "What responsible child sponsorship should include: assessment first, nine cost components, termly reporting \u2014 and why photographs are not a donor benefit.",
    seoTitle:
      "What Responsible Education Sponsorship Should Include | Treasured Vessels",
    keywords: [
      "sponsor a girl's education Uganda",
      "transparent child sponsorship",
      "girls education Jinja",
      "ethical child sponsorship",
      "education sponsorship Uganda",
    ],
    readingMinutes: 10,
    body: sponsorshipBody,
  },
  {
    slug: "five-barriers-that-push-a-girl-out-of-school",
    title: "Five Barriers That Can Push a Girl Out of School",
    eyebrow: "Girls' Education",
    date: "10 August 2026",
    isoDate: "2026-08-10",
    image: `${import.meta.env.BASE_URL}images/gallery/handcraft-skills-class.jpg`,
    imageAlt:
      "Young women learning practical skills together in a class at Treasured Vessels Girls' Centre, Jinja",
    excerpt:
      "Most people assume pregnancy is why girls leave school. The evidence says cost is — by a distance. Here are the five barriers that actually compound, and what answers each one.",
    metaDescription:
      "Why girls really leave school in Uganda: cost, not pregnancy, is the leading cause. The five barriers that compound — and the practical response to each.",
    seoTitle:
      "Five Barriers That Can Push a Girl Out of School | Treasured Vessels",
    keywords: [
      "girls' school dropout Uganda",
      "keep girls in school",
      "education sponsorship Uganda",
      "why girls leave school Uganda",
      "school dropout causes Uganda",
    ],
    readingMinutes: 10,
    body: fiveBarriersBody,
  },
  {
    slug: "why-jinja-and-busoga-need-a-girls-support-centre",
    title: "Why Jinja and Busoga Need a Girls' Support Centre",
    eyebrow: "Our Community",
    date: "9 August 2026",
    isoDate: "2026-08-09",
    image: `${import.meta.env.BASE_URL}images/gallery/community-outreach-session.jpg`,
    imageAlt:
      "Women and children gathered for a Treasured Vessels community session in Jinja, Uganda",
    excerpt:
      "Busoga carries a disproportionate share of Uganda's teenage pregnancy burden — but the district-level variation is the part that matters, and it is what national averages hide.",
    metaDescription:
      "Teenage pregnancy in Jinja and Busoga: what the district-level data really shows, why national averages mislead, and how local institutions can work together.",
    seoTitle:
      "Why Jinja and Busoga Need a Girls' Support Centre | Treasured Vessels",
    keywords: [
      "teenage pregnancy Jinja",
      "girls support Busoga",
      "women's empowerment Jinja Uganda",
      "teenage pregnancy Busoga statistics",
      "child marriage Jinja",
    ],
    readingMinutes: 10,
    body: jinjaBusogaBody,
  },
  {
    slug: "what-it-means-to-be-a-treasured-vessel",
    title: "What It Means to Be a Treasured Vessel",
    eyebrow: "Who We Are",
    date: "8 August 2026",
    isoDate: "2026-08-08",
    image: `${import.meta.env.BASE_URL}images/blog-treasured-vessel.jpg`,
    imageAlt:
      "Young women in Treasured Vessels Girls' Centre shirts dancing together at a community celebration in Jinja, Uganda",
    excerpt:
      "Who we are, why the centre exists, how our five-stage pathway works, what we can honestly do today — and how you can stand with girls in Jinja.",
    metaDescription:
      "Treasured Vessels Girls' Centre supports vulnerable girls and women in Jinja, Uganda. Who we are, how our five-stage pathway works, and how to help.",
    seoTitle:
      "What It Means to Be a Treasured Vessel | Girls' Centre in Jinja, Uganda",
    keywords: [
      "Treasured Vessels Girls Centre Uganda",
      "girls centre Jinja",
      "support girls in Uganda",
      "women's empowerment Jinja Uganda",
      "sponsor a girl Uganda",
    ],
    readingMinutes: 17,
    body: treasuredVesselBody,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
