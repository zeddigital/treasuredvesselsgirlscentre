import treasuredVesselBody from "@/content/what-it-means-to-be-a-treasured-vessel.md?raw";
import jinjaBusogaBody from "@/content/why-jinja-and-busoga-need-a-girls-support-centre.md?raw";
import fiveBarriersBody from "@/content/five-barriers-that-push-a-girl-out-of-school.md?raw";
import sponsorshipBody from "@/content/what-responsible-education-sponsorship-should-include.md?raw";
import returnToLearningBody from "@/content/returning-to-learning-after-teenage-pregnancy.md?raw";
import sixMythsBody from "@/content/six-myths-about-teenage-mothers.md?raw";
import skillsRoomBody from "@/content/inside-the-skills-room.md?raw";
import endingChildMarriageBody from "@/content/ending-child-marriage-and-teenage-pregnancy-in-uganda.md?raw";

export interface BlogPost {
  slug: string;
  title: string;
  /** Short label shown above the title, e.g. the content pillar */
  eyebrow: string;
  date: string;
  /** Publication date, YYYY-MM-DD. Combined with `publishTime` for schema.org. */
  isoDate: string;
  /** Local time of day the article went live. Defaults to 09:00 East Africa Time. */
  publishTime?: string;
  image: string;
  imageAlt: string;
  excerpt: string;
  /** <=156 chars, used for <meta name="description"> */
  metaDescription: string;
  seoTitle: string;
  keywords: string[];
  readingMinutes: number;
  /** Set only when the article has been substantively revised after publishing */
  modifiedDate?: string;
  /** Local time of the revision. Defaults to `publishTime`. */
  modifiedTime?: string;
  /** schema.org articleSection — the primary category */
  articleSection: string;
  /** The main subject the article is about, for schema.org `about` */
  subject: string;
  /** The place the article concerns, for schema.org `about` */
  place: string;
  /** Direct URLs of the sources the article draws on, for schema.org `citation` */
  citations: string[];
  body: string;
}

// Newest first — the blog index and article routes are generated from this.
export const blogPosts: BlogPost[] = [
  {
    slug: "ending-child-marriage-and-teenage-pregnancy-in-uganda",
    title: "Ending Child Marriage and Teenage Pregnancy in Uganda",
    eyebrow: "Advocacy",
    date: "15 August 2026",
    isoDate: "2026-08-15",
    image: `${import.meta.env.BASE_URL}images/gallery/tvgc-women-and-young-mothers-group.jpg`,
    imageAlt:
      "Women and young mothers of Treasured Vessels Girls' Centre standing together outside the centre in Jinja, Uganda",
    excerpt:
      "Three figures get quoted as though they describe the same girls. They do not. What Uganda's numbers actually measure, what the law requires, why it keeps happening, and what a serious response in Busoga looks like.",
    metaDescription:
      "Child marriage and teenage pregnancy in Uganda: what the statistics really measure, what the law says, the six drivers behind them, and a prevention framework.",
    seoTitle:
      "Ending Child Marriage and Teenage Pregnancy in Uganda | Treasured Vessels",
    keywords: [
      "child marriage Uganda statistics",
      "teenage pregnancy Uganda 2026",
      "end child marriage Busoga",
      "legal marriage age Uganda",
      "adolescent pregnancy Uganda data",
    ],
    readingMinutes: 22,
    articleSection: "Advocacy",
    subject: "Child marriage and adolescent pregnancy",
    place: "Busoga sub-region, Uganda",
    citations: [
      "https://www.ubos.org/wp-content/uploads/publications/UDHS-2022-Report.pdf",
      "https://www.unicef.org/uganda/reports/national-strategy-end-child-marriage-and-teenage-pregnancy-20222023-20262027",
      "https://www.girlsnotbrides.org/en/learning-resources/child-marriage-atlas/regions-and-countries/uganda/",
      "https://www.law.berkeley.edu/wp-content/uploads/2015/10/Uganda_Penal-Code-Amendment-Act_2007.pdf",
      "https://www.unicef.org/uganda/topics/teenage-pregnancy",
      "https://www.worldbank.org/en/country/uganda/publication/educating-girls-a-way-of-ending-child-marriage-and-teenage-pregnancy",
    ],
    body: endingChildMarriageBody,
  },
  {
    slug: "inside-the-skills-room",
    title: "Inside the Skills Room: Learning Tailoring, Baking and Hairdressing",
    eyebrow: "Vocational Training",
    date: "14 August 2026",
    isoDate: "2026-08-14",
    image: `${import.meta.env.BASE_URL}images/gallery/skills-room-tailoring-lesson.jpg`,
    imageAlt:
      "Trainees working through a tailoring lesson in the skills room at Treasured Vessels Girls' Centre, Jinja, with treadle sewing machines along the wall",
    excerpt:
      "What a vocational class actually involves — the blackboard, the exercise books, the quality standard, and why a $150 treadle machine decides whether six months of training was worth anything.",
    metaDescription:
      "Inside a vocational training class in Jinja, Uganda: one tailoring lesson start to finish, what we run, what equipment costs, and how businesses can help.",
    seoTitle:
      "Inside the Skills Room: Tailoring, Baking and Hairdressing | Treasured Vessels",
    keywords: [
      "vocational training Uganda",
      "tailoring training Jinja",
      "skills training for women Uganda",
      "sewing machine donation Uganda",
      "women's economic empowerment Jinja",
    ],
    readingMinutes: 10,
    articleSection: "Vocational Training",
    subject: "Vocational skills training",
    place: "Jinja, Uganda",
    citations: [
      "https://www.unicef.org/uganda/what-we-do/education",
      "https://www.worldbank.org/en/country/uganda/publication/educating-girls-a-way-of-ending-child-marriage-and-teenage-pregnancy",
    ],
    body: skillsRoomBody,
  },
  {
    slug: "six-myths-about-teenage-mothers",
    title: "Six Myths About Teenage Mothers",
    eyebrow: "Teenage Mothers",
    date: "13 August 2026",
    isoDate: "2026-08-13",
    image: `${import.meta.env.BASE_URL}images/gallery/tvgc-women-and-young-mothers-group.jpg`,
    imageAlt:
      "Women and young mothers of Treasured Vessels Girls' Centre standing together outside the centre in Jinja, Uganda",
    excerpt:
      "Around one in four Ugandan girls aged 15 to 19 has begun childbearing. What gets said about them in the classroom and the church decides what happens next — and most of it is wrong.",
    metaDescription:
      "Six things commonly said about teenage mothers in Uganda, and what the law and the evidence actually say. Child marriage, school re-entry, consent and support.",
    seoTitle: "Six Myths About Teenage Mothers | Treasured Vessels",
    keywords: [
      "myths about teenage mothers",
      "teenage pregnancy stigma Uganda",
      "child marriage Uganda law",
      "adolescent mothers school re-entry",
      "teenage mothers Jinja",
    ],
    readingMinutes: 10,
    articleSection: "Teenage Mothers",
    subject: "Stigma against adolescent mothers",
    place: "Jinja, Uganda",
    citations: [
      "https://www.ubos.org/wp-content/uploads/publications/UDHS-2022-Report.pdf",
      "https://www.unicef.org/uganda/topics/teenage-pregnancy",
      "https://www.ungei.org/publication/revised-guidelines-prevention-and-management-teenage-pregnancy-school-settings-uganda",
      "https://www.law.berkeley.edu/wp-content/uploads/2015/10/Uganda_Penal-Code-Amendment-Act_2007.pdf",
      "https://www.worldbank.org/en/country/uganda/publication/educating-girls-a-way-of-ending-child-marriage-and-teenage-pregnancy",
    ],
    body: sixMythsBody,
  },
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
    articleSection: "Teenage Mothers",
    subject: "School re-entry for adolescent mothers",
    place: "Jinja, Uganda",
    citations: [
      "https://www.unicef.org/uganda/topics/teenage-pregnancy",
      "https://www.ungei.org/publication/revised-guidelines-prevention-and-management-teenage-pregnancy-school-settings-uganda",
      "https://www.unicef.org/uganda/what-we-do/education",
      "https://uganda.unfpa.org/en/topics/adolescents-and-youth-9",
      "https://www.worldbank.org/en/country/uganda/publication/educating-girls-a-way-of-ending-child-marriage-and-teenage-pregnancy",
    ],
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
    articleSection: "Sponsorship",
    subject: "Child education sponsorship",
    place: "Jinja, Uganda",
    citations: [
      "https://www.unicef.org/media/reporting-guidelines",
      "https://www.unicef.org/eca/media/ethical-guidelines",
      "https://www.unicef.org/uganda/what-we-do/education",
      "https://www.worldbank.org/en/country/uganda/publication/educating-girls-a-way-of-ending-child-marriage-and-teenage-pregnancy",
    ],
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
    articleSection: "Girls' Education",
    subject: "School dropout among girls",
    place: "Uganda",
    citations: [
      "https://www.unicef.org/uganda/what-we-do/education",
      "https://www.unicef.org/uganda/what-we-do/quality-education",
      "https://www.unicef.org/uganda/media/16861/file/Challenges%20of%20Education%20Sector%20in%20Uganda%20in%20Brief.pdf.pdf",
      "https://data.worldbank.org/indicator/SE.PRM.CMPT.ZS?locations=UG",
      "https://www.education-inequalities.org/indicators/comp_prim_v2/uganda",
    ],
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
    articleSection: "Our Community",
    subject: "Teenage pregnancy",
    place: "Busoga sub-region, Uganda",
    citations: [
      "https://www.monitor.co.ug/uganda/news/national/busoga-tops-teenage-pregnancies-survey-3713182",
      "https://www.monitor.co.ug/uganda/news/national/jinja-district-passes-by-laws-to-curb-teen-pregnancies-child-marriages-5220112",
      "https://uganda.unfpa.org/en/publications/child-marriage-and-teenage-pregnancy-uganda",
      "https://www.unicef.org/uganda/topics/teenage-pregnancy",
      "https://www.worldbank.org/en/country/uganda/publication/educating-girls-a-way-of-ending-child-marriage-and-teenage-pregnancy",
    ],
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
    articleSection: "Who We Are",
    subject: "Treasured Vessels Girls' Centre",
    place: "Jinja, Uganda",
    citations: [
      "https://uganda.unfpa.org/en/publications/magnitude-teenage-pregnancy-uganda",
      "https://www.unicef.org/uganda/what-we-do/adolescent-development",
      "https://data.worldbank.org/indicator/SP.ADO.TFRT?locations=UG",
      "https://www.ubos.org/",
    ],
    body: treasuredVesselBody,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

/**
 * East Africa Time. The centre is in Jinja, so articles are stamped in the
 * local time they actually went live rather than in UTC.
 */
const TIME_ZONE_OFFSET = "+03:00";
const DEFAULT_PUBLISH_TIME = "09:00:00";

/** A bare date plus a local time, as the full ISO 8601 stamp schema.org expects. */
function timestamp(date: string, time = DEFAULT_PUBLISH_TIME): string {
  return `${date}T${time}${TIME_ZONE_OFFSET}`;
}

/** `datePublished` — full ISO 8601 with offset, e.g. 2026-08-12T09:00:00+03:00 */
export function publishedAt(post: BlogPost): string {
  return timestamp(post.isoDate, post.publishTime);
}

/** `dateModified` — the publication stamp unless the article has been revised. */
export function modifiedAt(post: BlogPost): string {
  return timestamp(
    post.modifiedDate ?? post.isoDate,
    post.modifiedTime ?? post.publishTime,
  );
}

/** Heading text -> the `id` the article renderer gives it, so schema can link to it. */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Word count of the rendered article, for schema.org `wordCount`. Strips image
 * markup, links, tables and formatting so the figure reflects what a reader sees.
 */
export function countWords(body: string): number {
  const text = body
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> their text
    .replace(/^\s*\|.*\|\s*$/gm, "") // tables
    .replace(/[#>*_`~-]/g, " ");
  return text.split(/\s+/).filter(Boolean).length;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

/**
 * Pulls the visible "Frequently asked questions" section out of the article body
 * so the FAQPage schema always matches the text on the page — Google requires
 * the two to agree, and generating it from the copy keeps them from drifting.
 */
export function extractFaq(body: string): FaqEntry[] {
  const section = body.match(
    /^##\s+Frequently asked questions\s*$([\s\S]*?)(?=^##[^#]|$(?![\s\S]))/im,
  );
  if (!section) return [];

  const entries: FaqEntry[] = [];
  const blocks = section[1].split(/^###\s+/m).slice(1);
  for (const block of blocks) {
    const [head, ...rest] = block.split("\n");
    const answer = rest
      .join("\n")
      .replace(/^---+$/gm, "")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/[*_`]/g, "")
      .split(/\n\s*\n/)
      .map((p) => p.replace(/\s+/g, " ").trim())
      .filter(Boolean)
      .join(" ");
    const question = head.replace(/\s+/g, " ").trim();
    if (question && answer) entries.push({ question, answer });
  }
  return entries;
}
