import treasuredVesselBody from "@/content/what-it-means-to-be-a-treasured-vessel.md?raw";
import jinjaBusogaBody from "@/content/why-jinja-and-busoga-need-a-girls-support-centre.md?raw";

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
    slug: "why-jinja-and-busoga-need-a-girls-support-centre",
    title: "Why Jinja and Busoga Need a Girls' Support Centre",
    eyebrow: "Our Community",
    date: "11 August 2026",
    isoDate: "2026-08-11",
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
    date: "10 August 2026",
    isoDate: "2026-08-10",
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
