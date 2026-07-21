import type { ReactNode } from "react";

export interface NewsPost {
  slug: string;
  title: string;
  eyebrow: string;
  date: string;
  image: string;
  excerpt: string;
  body: ReactNode;
}

// Add new stories to the top of this array — the News page and article
// routes are generated from it automatically.
export const newsPosts: NewsPost[] = [
  {
    slug: "treasured-skills-graduation-2024",
    title: "Treasured Skills Graduation 2024",
    eyebrow: "Our First Success Story",
    date: "2024",
    image: `${import.meta.env.BASE_URL}images/graduation-2024.jpg`,
    excerpt:
      "This past year marked a significant milestone for Treasured Vessels Girls' Centre as we celebrated our very first Treasured Skills Graduation Ceremony.",
    body: (
      <>
        <p>
          This past year marked a significant milestone for Treasured Vessels Girls' Centre as we
          celebrated our very first <strong>Treasured Skills Graduation Ceremony</strong>.
        </p>
        <p>
          For many of these young women, graduation represented far more than receiving a
          certificate. It was a celebration of restored confidence, renewed hope, and transformed
          lives. We watched them walk across the stage with heads held high, carrying not only their
          achievements but also the promise of a brighter future.
        </p>
        <p>What was once broken is being made whole.</p>
        <p>
          Through skills training, mentorship, and the love of Christ, we have witnessed young women
          discover their value, develop practical skills, and begin to believe in the future God has
          prepared for them. Their success is a testament to the power of investing in girls and the
          lasting impact that investment has on families, communities, and future generations.
        </p>
        <p>This graduation was not simply an event&mdash;it was a declaration that restoration is possible.</p>
        <p>
          We are deeply grateful to every supporter, volunteer, partner, and prayer warrior who has
          stood alongside us. Your generosity and encouragement have helped make this moment a
          reality.
        </p>
        <p>And this is only the beginning.</p>
        <p>
          As we look ahead, we remain committed to equipping vulnerable girls and young women with
          the tools, opportunities, and support they need to thrive.
        </p>
        <h2>Building Futures. Restoring Hope. Raising Treasured Vessels.</h2>
        <blockquote>&ldquo;When you invest in a girl, you invest in an entire community.&rdquo;</blockquote>
        <p>
          <strong>Treasured Skills Graduation 2024</strong> stands as a powerful reminder that every
          life restored becomes a testimony of God's faithfulness and grace.
        </p>
      </>
    ),
  },
];

export function getNewsPost(slug: string): NewsPost | undefined {
  return newsPosts.find((post) => post.slug === slug);
}
