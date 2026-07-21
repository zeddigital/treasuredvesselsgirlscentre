import type { ReactNode } from "react";

export interface NewsPost {
  slug: string;
  title: string;
  eyebrow: string;
  date?: string;
  image: string;
  excerpt: string;
  body: ReactNode;
}

// Add new stories to the top of this array — the News page and article
// routes are generated from it automatically.
export const newsPosts: NewsPost[] = [
  {
    slug: "hope-restored-joans-story",
    title: "Hope Restored: Joan's Story",
    eyebrow: "How We Started",
    image: `${import.meta.env.BASE_URL}images/joan-story.jpg`,
    excerpt:
      "At Treasured Vessels Girls' Centre, every transformed life reminds us why this ministry exists. Joan's story is one of restoration, resilience, and renewed purpose.",
    body: (
      <>
        <p>
          At Treasured Vessels Girls' Centre, every transformed life reminds us why this ministry
          exists. Joan's story is one of restoration, resilience, and renewed purpose.
        </p>
        <p>Meet Joan.</p>
        <p>
          At just 16 years old, Joan became a teenage mother. The father of her child left, and with
          him seemed to disappear every dream she once held. There were nights when her baby cried
          from hunger and Joan had nothing to give.
        </p>
        <blockquote>
          &ldquo;I thought my life was over,&rdquo; she shared during a counseling session with our
          founder, Ma Rachael. &ldquo;I was a mother with no food, no education, and no hope.&rdquo;
        </blockquote>
        <p>But shame was never meant to be the final chapter of her story.</p>
        <p>
          Through counseling and discipleship at Treasured Vessels Girls' Centre, Joan encountered a
          message of hope:
        </p>
        <blockquote>
          <em>
            &ldquo;Your purpose did not end when you became a mother. God still has a plan for your
            life.&rdquo;
          </em>
        </blockquote>
        <p>
          Today, Joan is enrolled in our Hairdressing Skills Program. She continues to learn and grow
          each day, but she is no longer defined by her circumstances. She has begun using her skills
          to braid hair in her community, helping provide for her child while building a brighter
          future.
        </p>
        <p>Most importantly, Joan now wakes each morning with purpose.</p>
        <p>In her own words:</p>
        <blockquote>
          <em>
            &ldquo;Ma Rachael saw value in me when I could no longer see it in myself. I am not just a
            teenage mother&mdash;I am a future hairdresser. I am a mother with hope. Thank you,
            Treasured Vessels, for standing beside me when I felt forgotten.&rdquo;
          </em>
        </blockquote>
        <p>Stories like Joan's are why we do what we do.</p>
        <h2>Counseling + Skills Training + Christ = Restored Lives</h2>
        <p>
          To every young woman reading this: <strong>your story is not over. Shame is not your
          identity. There is hope, there is purpose, and there is a future.</strong>
        </p>
        <p>
          Treasured Vessels Girls' Centre exists to raise young women of dignity, faith, and
          purpose&mdash;one life at a time.
        </p>
      </>
    ),
  },
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
