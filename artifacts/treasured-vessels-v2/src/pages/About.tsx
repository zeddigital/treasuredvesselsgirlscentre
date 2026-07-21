import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="bg-brand-paleblue py-16 md:py-24">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="max-w-3xl">
            <span className="block text-brand-purple font-semibold tracking-wider uppercase mb-4 text-sm">Who We Are</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-plum mb-6">Built by the Community, for the Community.</h1>
            <p className="text-lg text-brand-charcoal/80 leading-relaxed">
              Treasured Vessels Girls' Centre is a fully registered, women-led community based organisation (CBO) founded in 2018 by Racheal Muggaga Achen in Jinja District, Uganda. We exist to catch the girls who fall through the cracks.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            <div className="space-y-12">
              <div>
                <h2 className="font-serif text-3xl text-brand-plum mb-4">Our Story</h2>
                <p className="text-brand-charcoal/80 leading-relaxed mb-4">
                  Treasured Vessels Girls' Centre was founded in 2018 by Racheal Muggaga Achen in Jinja District, Uganda, in response to the number of girls and women left without adequate care and support &mdash; among them children affected by the loss of parents to HIV/AIDS, women navigating remarriage, divorce or widowhood, families in dispute, and girls at risk of trafficking and sexual exploitation.
                </p>
                <p className="text-brand-charcoal/80 leading-relaxed">
                  Today, as a fully registered community based organisation (CBO), we work in schools, institutions and directly with communities &mdash; training girls and women in practical skills, supporting survivors of gender-based violence, and addressing the health and social challenges facing our community.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-3xl text-brand-plum mb-4">Vision & Mission</h2>
                <div className="bg-brand-cream p-8 rounded-[24px] mb-6 border border-brand-gold/20">
                  <h3 className="font-semibold text-brand-gold uppercase tracking-wider text-sm mb-2">Our Vision</h3>
                  <p className="font-serif text-xl text-brand-plum leading-snug">
                    To empower girls both in and out of school to overcome prejudice, exclusion and poverty.
                  </p>
                </div>
                <div className="bg-brand-blush p-8 rounded-[24px] border border-brand-pink/20">
                  <h3 className="font-semibold text-brand-pink uppercase tracking-wider text-sm mb-2">Our Mission</h3>
                  <p className="font-serif text-xl text-brand-plum leading-snug">
                    To mobilise school girls and women in our community to achieve equal opportunity, access to self-actualisation, and the chance to realise the girl-child's contribution to society &mdash; through training and initiatives that build a strong girl, and in turn a stronger world.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <img src={`${import.meta.env.BASE_URL}images/community-outreach.jpg`} alt="Community" className="w-full h-64 object-cover rounded-[24px] shadow-md" />
               <img src={`${import.meta.env.BASE_URL}images/education.jpg`} alt="Education" className="w-full h-64 object-cover rounded-[24px] shadow-md mt-12" />
               <img src={`${import.meta.env.BASE_URL}images/story.jpg`} alt="Mentorship" className="w-full object-contain rounded-[24px] shadow-md col-span-2" />
            </div>

          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-brand-plum text-white">
        <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Honesty & Trustworthiness", desc: "We deal openly and truthfully with the girls, families and partners who place their trust in us." },
              { title: "Continuous Development", desc: "We keep learning and improving how we serve the girls and women in our care." },
              { title: "Result Oriented", desc: "We focus our energy on interventions that create real, measurable change." },
              { title: "Accountability & Transparency", desc: "We are answerable for our actions and transparent stewards of the resources entrusted to us." },
              { title: "Empathy", desc: "We meet every girl and woman with compassion, never judgment." },
              { title: "Non-Discrimination", desc: "We serve every girl and woman equally, regardless of background or circumstance." }
            ].map((value, i) => (
              <div key={i} className="bg-white/10 p-8 rounded-[24px] border border-white/20">
                <h3 className="font-serif text-xl text-brand-gold mb-3">{value.title}</h3>
                <p className="text-brand-paleblue/80 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
