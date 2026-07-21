import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import NotFound from "./not-found";

const programData = {
  "girls-education": {
    title: "Girls' Education",
    subtitle: "Keeping Girls in the Classroom",
    image: `${import.meta.env.BASE_URL}images/education.jpg`,
    need: "In many parts of Eastern Uganda, poverty dictates that families prioritize boys' education over girls'. When funds run out, girls are pulled from school, exposing them to risks of early marriage and exploitation.",
    provides: "We provide tuition assistance, scholastic materials (books, pens, uniforms), and ongoing mentorship to ensure girls not only stay in school but thrive academically.",
    supports: "Primary and secondary school-aged girls at high risk of dropping out due to financial constraints.",
    howItWorks: "We partner with local schools to identify vulnerable girls, cover their fees directly, and assign them mentors who monitor their academic progress and well-being.",
    outcomes: ["Increased school retention rates", "Higher academic performance", "Delayed marriage and pregnancy"],
    needs: "$50 keeps a girl in school for a term. We are currently seeking sponsors for 30 girls.",
    story: "After my father passed away, my mother couldn't afford school fees. Treasured Vessels stepped in, and today I am completing my secondary education with dreams of becoming a nurse."
  },
  "skills-training": {
    title: "Vocational Skills & Economic Empowerment",
    subtitle: "Building Independence Through Trade",
    image: `${import.meta.env.BASE_URL}images/tailoring.jpg`,
    need: "Young women who drop out of school often face a lifetime of dependency and poverty, lacking the skills to participate in the local economy.",
    provides: "Hands-on training in marketable trades including tailoring, hairdressing, baking, and crafts, alongside basic business and financial literacy.",
    supports: "Out-of-school girls, young mothers, and marginalized women.",
    howItWorks: "Participants enrol in an intensive 6-12 month training program. Upon graduation, they receive start-up kits (like sewing machines) to launch their own micro-businesses.",
    outcomes: ["Self-reliance and income generation", "Restored dignity and confidence", "Ability to support their own families"],
    needs: "We need funding for 10 new sewing machines ($150 each) and training materials for our next cohort.",
    story: "I felt useless when I had to leave school. Now, I make and sell clothes. I can feed my child and I have a skill no one can take away from me."
  },
  "teenage-mother-support": {
    title: "Teenage Mother Support",
    subtitle: "A Second Chance for Young Mothers",
    image: `${import.meta.env.BASE_URL}images/teen-mothers.jpg`,
    need: "Teenage pregnancy often results in school expulsion, family abandonment, and severe social stigma, leaving young mothers deeply vulnerable.",
    provides: "A safe, non-judgmental space offering parenting guidance, emotional support, and pathways to return to formal education or join vocational training.",
    supports: "Girls aged 13-19 who are pregnant or have young children.",
    howItWorks: "We run weekly support groups and parenting workshops, provide emergency baby supplies, and advocate with schools to allow mothers to re-enroll.",
    outcomes: ["Improved maternal and child health", "Re-entry into education or training", "Reduced isolation and depression"],
    needs: "We need baby supplies, nutritional supplements, and funding to run our weekly safe-space meetings.",
    story: "When I got pregnant, I thought my life was over. Treasured Vessels gave me a safe place to cry, learn how to care for my baby, and finally start learning a trade."
  },
  "menstrual-health": {
    title: "Menstrual Health & School Outreach",
    subtitle: "Ending Period Poverty",
    image: `${import.meta.env.BASE_URL}images/health.jpg`,
    need: "Many girls miss up to 20% of the school year because they lack access to sanitary products, eventually falling so far behind that they drop out entirely.",
    provides: "Distribution of reusable sanitary pads, menstrual health education, and the dismantling of harmful stigmas surrounding menstruation.",
    supports: "Schoolgirls across partner primary and secondary schools.",
    howItWorks: "Our team visits schools to deliver health workshops to both girls and boys, distributing sanitary kits that last up to a year.",
    outcomes: ["Reduced school absenteeism", "Improved bodily autonomy and knowledge", "Destigmatization of menstruation in communities"],
    needs: "$15 provides a reusable sanitary kit that keeps a girl in school for a full year.",
    story: "I used to stay home and miss exams because I had nothing to use. With my reusable kit, I don't have to feel ashamed or miss class anymore."
  },
  "protection": {
    title: "Protection & Rehabilitation",
    subtitle: "Safety and Healing for Survivors",
    image: `${import.meta.env.BASE_URL}images/protection.jpg`,
    need: "Gender-based violence and the threat of early forced marriage are stark realities for many girls in our operating communities.",
    provides: "Advocacy, vital trauma counselling, safe spaces, and critical referrals to medical and legal services.",
    supports: "Girls and women who are survivors of, or at risk of, violence, abuse, and forced marriage.",
    howItWorks: "We provide immediate crisis support, coordinate with local authorities for rescue/intervention, and offer long-term psychosocial counselling.",
    outcomes: ["Prevention of early marriages", "Healing from trauma", "Increased awareness of legal rights"],
    needs: "Funding for an in-house trauma counsellor and emergency transport/medical funds for survivors.",
    story: "They were arranging my marriage, but I wanted to study. The Centre helped intervene, and now I am safe and back in the classroom."
  },
  "community-outreach": {
    title: "Community Outreach",
    subtitle: "Changing the Narrative Together",
    image: `${import.meta.env.BASE_URL}images/community-outreach.jpg`,
    need: "True empowerment cannot happen in a vacuum; it requires the transformation of the environments and cultural mindsets in which girls live.",
    provides: "Sensitization campaigns, community dialogues, and engagement with local leaders, parents, and men.",
    supports: "The wider community, focusing on local leadership structures and family units.",
    howItWorks: "We host community meetings to discuss girls' education, the dangers of early marriage, and women's rights, turning potential barriers into advocates.",
    outcomes: ["Shifted cultural attitudes", "More parents championing girls' education", "Safer community environments"],
    needs: "Support for community dialogue events, transport for outreach workers, and printed educational materials.",
    story: "I used to think girls only belonged in the kitchen. The community dialogues opened my eyes. Now, I am my daughter's biggest supporter in her education."
  }
};

export default function ProgramDetail() {
  const params = useParams();
  const id = params.id as keyof typeof programData;
  const program = programData[id];

  if (!program) {
    return <NotFound />;
  }

  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="relative h-[400px] md:h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brand-plum/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-plum/85 via-brand-plum/30 to-transparent"></div>
        </div>
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6 relative z-10 pt-16">
          <Link href="/programs" className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Programs
          </Link>
          <span className="block text-brand-gold font-semibold tracking-wider uppercase mb-3 text-sm">
            {program.subtitle}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white max-w-3xl leading-tight">
            {program.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-12">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl text-brand-plum mb-4">The Need</h2>
                <p className="text-lg text-brand-charcoal/80 leading-relaxed">{program.need}</p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="bg-brand-paleblue p-8 rounded-[24px]">
                  <h3 className="font-serif text-xl text-brand-plum mb-3">What We Provide</h3>
                  <p className="text-brand-charcoal/80">{program.provides}</p>
                </div>
                <div className="bg-brand-blush p-8 rounded-[24px]">
                  <h3 className="font-serif text-xl text-brand-plum mb-3">Who It Supports</h3>
                  <p className="text-brand-charcoal/80">{program.supports}</p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl md:text-3xl text-brand-plum mb-4">How It Works</h2>
                <p className="text-lg text-brand-charcoal/80 leading-relaxed">{program.howItWorks}</p>
              </div>

              <div>
                <h2 className="font-serif text-2xl md:text-3xl text-brand-plum mb-6">Program Outcomes</h2>
                <ul className="space-y-4">
                  {program.outcomes.map((outcome, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-brand-blue flex-shrink-0" />
                      <span className="text-lg text-brand-charcoal/80">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-brand-cream border border-brand-gold/30 p-8 md:p-10 rounded-[24px] relative">
                <div className="absolute top-8 left-8 text-6xl text-brand-gold/30 font-serif leading-none">"</div>
                <div className="relative z-10 pl-4">
                  <p className="text-xl text-brand-plum font-serif italic leading-relaxed mb-6">
                    {program.story}
                  </p>
                  <p className="text-sm font-semibold text-brand-charcoal/60 uppercase tracking-wider">
                    — Program Participant
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-2">*Illustrative placeholder story</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 bg-white border border-border p-8 rounded-[24px] shadow-xl">
                <h3 className="font-serif text-2xl text-brand-plum mb-4">Support This Program</h3>
                <p className="text-brand-charcoal/80 mb-8 pb-8 border-b border-border">
                  {program.needs}
                </p>
                <div className="space-y-4">
                  <Link href="/donate" className="block w-full">
                    <Button className="w-full h-14 rounded-full bg-brand-pink hover:bg-brand-pink/90 text-white text-base shadow-lg">
                      Donate Now
                    </Button>
                  </Link>
                  <Link href="/get-involved/partner" className="block w-full">
                    <Button variant="outline" className="w-full h-14 rounded-full border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white text-base">
                      Partner With Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
