import { BookOpen, Scissors, Baby, Droplets, Shield, Users, ArrowRight, CheckCircle2, Heart } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SectionHeading, ProgramCard } from "@/components/ui/shared";

export default function Home() {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-brand-cream pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-paleblue/40 rounded-bl-[100px] -z-10 hidden lg:block"></div>
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="max-w-xl">
              <span className="inline-block py-1 px-3 rounded-full bg-brand-purple/10 text-brand-purple text-sm font-semibold tracking-wide mb-6">
                Girls deserve safety, opportunity and a future.
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-plum leading-[1.1] mb-6">
                Empowering Girls to Build Stronger Futures
              </h1>
              <p className="text-lg text-brand-charcoal/80 mb-8 leading-relaxed">
                Treasured Vessels Girls' Centre supports vulnerable girls, teenage mothers and women in Eastern Uganda through education, practical skills, mentoring, advocacy and community care.
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <Link href="/donate">
                  <Button size="lg" className="rounded-full bg-brand-pink hover:bg-brand-pink/90 text-white shadow-lg text-base h-14 px-8">
                    Donate to Empower a Girl
                  </Button>
                </Link>
                <Link href="/programs">
                  <Button size="lg" variant="outline" className="rounded-full border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white h-14 px-8 text-base bg-transparent">
                    Discover Our Work
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-3 text-sm text-brand-charcoal/70 font-medium">
                <CheckCircle2 className="w-5 h-5 text-brand-blue" />
                <p>A registered, women-led community organisation serving girls and families since 2018.</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-[32px] overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-auto lg:h-[600px] w-full bg-brand-paleblue">
                <img 
                  src={`${import.meta.env.BASE_URL}images/hero.jpg`} 
                  alt="Young women engaging in group mentoring" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-[24px] shadow-xl max-w-[240px] hidden md:block">
                <div className="text-brand-purple font-serif text-4xl mb-2">8 Years</div>
                <div className="text-sm text-brand-charcoal font-medium leading-snug">
                  In mission in Jinja District since 2018
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CREDIBILITY STRIP */}
      <section className="bg-brand-plum py-8 text-white relative z-10">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-gold"></div>
              <span className="font-medium text-brand-paleblue">Community-led since 2018</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-pink"></div>
              <span className="font-medium text-brand-paleblue">Women-led organisation</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-blue"></div>
              <span className="font-medium text-brand-paleblue">Practical locally delivered programs</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <span className="font-medium text-brand-paleblue">Transparent & accountable support</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div className="mt-12 rounded-[24px] overflow-hidden shadow-lg">
                  <img src={`${import.meta.env.BASE_URL}images/education.jpg`} alt="Girls in education" className="w-full h-full object-cover aspect-[4/5]" />
                </div>
                <div className="rounded-[24px] overflow-hidden shadow-lg">
                  <img src={`${import.meta.env.BASE_URL}images/tailoring.jpg`} alt="Vocational tailoring skills" className="w-full h-full object-cover aspect-[4/5]" />
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-brand-gold rounded-full flex items-center justify-center shadow-xl border-4 border-white z-10">
                <span className="font-serif text-brand-plum text-2xl font-bold italic">TV</span>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <SectionHeading 
                subtitle="Who We Are" 
                title="Every Girl Is a Treasured Vessel" 
              />
              <p className="text-lg text-brand-charcoal/80 mb-6 leading-relaxed">
                We believe that no girl should be left behind due to poverty, early marriage, teenage pregnancy, or gender-based violence. 
              </p>
              <p className="text-base text-brand-charcoal/70 mb-10 leading-relaxed">
                Founded in 2018 by Racheal Muggaga Achen in Jinja District, Eastern Uganda, Treasured Vessels is a women-led community based organisation. We provide safe spaces, practical training, and essential resources to help girls regain their dignity, rebuild their confidence, and step into self-reliance. We don't just see vulnerability; we see immense potential waiting to be unlocked.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/about">
                  <Button className="rounded-full bg-brand-purple hover:bg-brand-plum text-white px-6 h-12">
                    Our Story
                  </Button>
                </Link>
                <Link href="/about/founder">
                  <Button variant="outline" className="rounded-full border-brand-purple text-brand-purple hover:bg-brand-purple/5 px-6 h-12 bg-transparent">
                    Meet Our Founder
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHALLENGE VS RESPONSE */}
      <section className="py-20 bg-brand-blush">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-brand-plum mb-6">Addressing the Challenges, Delivering Real Solutions</h2>
            <p className="text-brand-charcoal/80">We tackle systemic barriers with holistic, practical interventions tailored to the realities of Eastern Uganda.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            <div className="bg-white p-8 md:p-10 rounded-[24px] shadow-sm border border-red-100">
              <h3 className="text-red-500 font-semibold tracking-wide uppercase text-sm mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span> The Challenges
              </h3>
              <ul className="space-y-4">
                {[
                  "School dropout & interrupted education",
                  "Teenage pregnancy & early marriage",
                  "Gender-based violence & exploitation",
                  "Poverty & high youth unemployment",
                  "Menstrual product insecurity",
                  "Family instability & abandonment"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-brand-charcoal/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-300 mt-2 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-brand-paleblue p-8 md:p-10 rounded-[24px] shadow-sm border border-brand-blue/20">
              <h3 className="text-brand-blue font-semibold tracking-wide uppercase text-sm mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-blue"></span> Our Responses
              </h3>
              <ul className="space-y-4">
                {[
                  "Education sponsorship & school reintegration",
                  "Vocational training & economic empowerment",
                  "Mentoring & parenting support",
                  "Health awareness & sanitary kit provision",
                  "Counselling, safe spaces & referrals",
                  "Community sensitization & advocacy"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-brand-plum font-medium">
                    <CheckCircle2 className="w-5 h-5 text-brand-blue flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <SectionHeading 
            subtitle="Our Work" 
            title="Practical Programs That Create Lasting Change" 
            align="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-16">
            <ProgramCard 
              title="Girls' Education"
              description="Supporting girls to stay in school through tuition assistance, scholastic materials, and mentoring."
              href="/programs/girls-education"
              icon={BookOpen}
            />
            <ProgramCard 
              title="Skills & Empowerment"
              description="Equipping young women with marketable vocational skills like tailoring, baking, and hairdressing."
              href="/programs/skills-training"
              icon={Scissors}
            />
            <ProgramCard 
              title="Teenage Mother Support"
              description="Creating safe, non-judgmental spaces for young mothers to learn parenting skills and build futures."
              href="/programs/teenage-mother-support"
              icon={Baby}
            />
            <ProgramCard 
              title="Menstrual Health"
              description="Providing sanitary pads, hygiene education, and tackling the stigma that keeps girls out of class."
              href="/programs/menstrual-health"
              icon={Droplets}
            />
            <ProgramCard 
              title="Protection & Rehab"
              description="Advocating against early marriage and violence, providing counselling and safe referrals."
              href="/programs/protection"
              icon={Shield}
            />
            <ProgramCard 
              title="Community Outreach"
              description="Engaging local leaders, men, and families to create protective, supportive environments for girls."
              href="/programs/community-outreach"
              icon={Users}
            />
          </div>
        </div>
      </section>

      {/* FEATURED IMPACT STORY */}
      <section className="py-0">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="bg-brand-plum rounded-[32px] overflow-hidden flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
              <span className="text-brand-gold text-sm font-semibold tracking-wider uppercase mb-6">Impact Story</span>
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-8 leading-tight">
                "I never thought I could return to school. Now, I am learning tailoring and starting my own business."
              </h2>
              <p className="text-brand-paleblue/80 mb-8 italic">
                — Sarah, Vocational Program Participant
              </p>
              <div className="mt-auto">
                <Link href="/stories" className="inline-flex items-center text-brand-gold font-semibold hover:text-white transition-colors group">
                  Read Sarah's Story <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="text-[10px] text-white/40 mt-6">*Illustrative placeholder story</p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 min-h-[400px]">
              <img 
                src={`${import.meta.env.BASE_URL}images/story.jpg`} 
                alt="Young confident woman" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-brand-plum mb-4">Our Growing Impact</h2>
            <p className="text-lg text-brand-charcoal/70">Every number represents a girl, a family and a future strengthened.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 lg:gap-8">
            {[
              { number: "13", label: "Successful Donations" },
              { number: "30", label: "Regular Volunteers" },
              { number: "6", label: "Active Programs" },
              { number: "8", label: "Years in Mission" },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-[24px] bg-brand-cream/50">
                <div className="font-serif text-4xl lg:text-5xl text-brand-purple mb-3">{stat.number}</div>
                <div className="text-sm md:text-base font-medium text-brand-charcoal/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VOCATIONAL GALLERY */}
      <section className="py-20 bg-brand-cream">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
            <div className="md:w-1/2">
              <SectionHeading 
                subtitle="Skills & Independence" 
                title="Equipped for the Future" 
                align="left"
              />
              <p className="text-lg text-brand-charcoal/80 mb-6">
                Our vocational programs don't just teach a trade; they restore confidence. By learning tailoring, baking, hairdressing, and crafts, young women who were once marginalized become business owners, income earners, and role models in their communities.
              </p>
              <Link href="/programs/skills-training">
                <Button className="rounded-full bg-brand-purple hover:bg-brand-plum text-white px-6">
                  Explore Vocational Programs
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
               <div className="space-y-4">
                 <img src={`${import.meta.env.BASE_URL}images/hairdressing.jpg`} alt="Hairdressing training" className="w-full h-48 md:h-64 object-cover rounded-[20px] shadow-sm" />
                 <img src={`${import.meta.env.BASE_URL}images/baking.jpg`} alt="Baking class" className="w-full h-32 md:h-40 object-cover rounded-[20px] shadow-sm" />
               </div>
               <div className="space-y-4 pt-8 md:pt-12">
                 <img src={`${import.meta.env.BASE_URL}images/community-outreach.jpg`} alt="Community group" className="w-full h-32 md:h-40 object-cover rounded-[20px] shadow-sm" />
                 <img src={`${import.meta.env.BASE_URL}images/health.jpg`} alt="Health education" className="w-full h-48 md:h-64 object-cover rounded-[20px] shadow-sm" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* DONATION CTA SECTION */}
      <section className="py-24 bg-brand-plum text-white text-center relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-brand-purple/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-brand-pink/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto max-w-3xl px-4 md:px-6 relative z-10">
          <Heart className="w-12 h-12 text-brand-pink mx-auto mb-6" />
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Help a Girl Take Her Next Step</h2>
          <p className="text-lg text-brand-paleblue/90 mb-10 leading-relaxed">
            Your support provides tuition fees, sanitary kits, sewing machines, and safe spaces. Whether you give once or monthly, your contribution directly empowers vulnerable girls to rewrite their stories.
          </p>
          
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[24px] max-w-xl mx-auto mb-10">
            <div className="flex gap-4 mb-6 justify-center">
              <Button variant="outline" className="bg-white text-brand-plum hover:bg-brand-paleblue border-0 rounded-full px-8">Give Once</Button>
              <Button variant="outline" className="bg-transparent text-white hover:bg-white/10 border-white/30 rounded-full px-8">Monthly</Button>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="py-3 text-center rounded-xl bg-white/5 border border-white/20 font-semibold cursor-pointer hover:bg-brand-pink transition-colors">$25</div>
              <div className="py-3 text-center rounded-xl bg-brand-pink border border-brand-pink font-semibold cursor-pointer shadow-lg">$50</div>
              <div className="py-3 text-center rounded-xl bg-white/5 border border-white/20 font-semibold cursor-pointer hover:bg-brand-pink transition-colors">$100</div>
            </div>
            <Link href="/donate" className="block w-full">
              <Button className="w-full h-14 rounded-xl bg-brand-gold text-brand-charcoal hover:bg-yellow-400 font-bold text-lg shadow-xl">
                Donate Now
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-brand-paleblue/70">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold" /> Secure Giving</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold" /> Clear Fund Allocation</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold" /> Regular Updates</span>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-brand-paleblue">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-plum mb-8">Together, We Can Help Girls Build Safer, Stronger Futures.</h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/donate">
              <Button size="lg" className="rounded-full bg-brand-pink hover:bg-brand-pink/90 text-white shadow-lg text-base h-14 px-8">
                Make a Donation
              </Button>
            </Link>
            <Link href="/get-involved/partner">
              <Button size="lg" variant="outline" className="rounded-full border-2 border-brand-plum text-brand-plum hover:bg-brand-plum hover:text-white h-14 px-8 text-base bg-transparent">
                Partner With Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
