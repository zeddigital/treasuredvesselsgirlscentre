import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/shared";
import { BookOpen, Scissors, Baby, Droplets, Shield, Users } from "lucide-react";

const programs = [
  {
    id: "girls-education",
    title: "Girls' Education",
    icon: BookOpen,
    desc: "Addressing school dropout by providing tuition assistance, scholastic materials, and mentorship to keep girls in the classroom where they belong.",
    img: `${import.meta.env.BASE_URL}images/education.jpg`
  },
  {
    id: "skills-training",
    title: "Vocational Skills & Economic Empowerment",
    icon: Scissors,
    desc: "Equipping young women and out-of-school girls with marketable skills such as tailoring, baking, and hairdressing to build financial independence.",
    img: `${import.meta.env.BASE_URL}images/tailoring.jpg`
  },
  {
    id: "teenage-mother-support",
    title: "Teenage Mother Support",
    icon: Baby,
    desc: "A safe, non-judgmental space for young mothers offering parenting guidance, emotional support, and pathways to return to school or earn an income.",
    img: `${import.meta.env.BASE_URL}images/teen-mothers.jpg`
  },
  {
    id: "menstrual-health",
    title: "Menstrual Health & School Outreach",
    icon: Droplets,
    desc: "Providing sanitary kits and essential hygiene education to tackle period poverty, a leading cause of absenteeism among schoolgirls.",
    img: `${import.meta.env.BASE_URL}images/health.jpg`
  },
  {
    id: "protection",
    title: "Protection & Rehabilitation",
    icon: Shield,
    desc: "Advocating against early marriage and gender-based violence, whilst providing vital counselling, safe spaces, and referral support for survivors.",
    img: `${import.meta.env.BASE_URL}images/protection.jpg`
  },
  {
    id: "community-outreach",
    title: "Community Outreach",
    icon: Users,
    desc: "Engaging local leaders, parents, and men to change cultural narratives, raise awareness on girls' rights, and foster a supportive environment.",
    img: `${import.meta.env.BASE_URL}images/community-outreach.jpg`
  }
];

export default function ProgramsOverview() {
  return (
    <div>
      {/* Header */}
      <section className="bg-brand-paleblue py-16 md:py-24">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-plum mb-6">Our Programs</h1>
            <p className="text-lg text-brand-charcoal/80 leading-relaxed">
              We take a holistic approach to empowerment. From keeping girls in school to teaching practical trades and supporting young mothers, our programs address the root causes of vulnerability in Eastern Uganda.
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {programs.map((prog, i) => (
              <div key={i} className="bg-white border border-border rounded-[24px] overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="h-64 overflow-hidden relative">
                  <img src={prog.img} alt={prog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-blue shadow-md">
                    <prog.icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="font-serif text-2xl text-brand-plum mb-4">{prog.title}</h3>
                  <p className="text-brand-charcoal/70 mb-8 leading-relaxed flex-1">
                    {prog.desc}
                  </p>
                  <Link href={`/programs/${prog.id}`}>
                    <Button variant="outline" className="w-full border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white rounded-full h-12">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
