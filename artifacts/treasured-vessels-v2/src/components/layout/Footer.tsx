import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-plum text-white pt-20 pb-8">
      <div className="container mx-auto max-w-[1240px] px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <img
                src="/images/logo-icon-footer.png"
                alt="Treasured Vessels Girls' Centre logo"
                className="w-12 h-12 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-serif text-xl leading-tight text-white">Treasured Vessels</span>
                <span className="text-xs uppercase tracking-widest text-brand-paleblue/80 font-medium">Girls' Centre</span>
              </div>
            </Link>
            <p className="text-brand-paleblue/80 text-sm leading-relaxed mb-8 pr-4">
              A women-led, registered community organisation founded in 2018 in Eastern Uganda, supporting vulnerable girls, teenage mothers, and women to build stronger futures.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-pink transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-pink transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-pink transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-lg mb-6">Organisation</h4>
            <ul className="space-y-4 text-sm text-brand-paleblue/80">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/about/founder" className="hover:text-white transition-colors">Our Founder</Link></li>
              <li><Link href="/impact" className="hover:text-white transition-colors">Our Impact</Link></li>
              <li><Link href="/stories" className="hover:text-white transition-colors">Stories of Change</Link></li>
              <li><Link href="/news" className="hover:text-white transition-colors">News & Updates</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-lg mb-6">Our Programs</h4>
            <ul className="space-y-4 text-sm text-brand-paleblue/80">
              <li><Link href="/programs/girls-education" className="hover:text-white transition-colors">Girls' Education</Link></li>
              <li><Link href="/programs/skills-training" className="hover:text-white transition-colors">Vocational Skills</Link></li>
              <li><Link href="/programs/teenage-mother-support" className="hover:text-white transition-colors">Teenage Mother Support</Link></li>
              <li><Link href="/programs/menstrual-health" className="hover:text-white transition-colors">Menstrual Health</Link></li>
              <li><Link href="/programs/protection" className="hover:text-white transition-colors">Protection & Rehab</Link></li>
              <li><Link href="/programs/community-outreach" className="hover:text-white transition-colors">Community Outreach</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-lg mb-6">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-brand-paleblue/80 mb-8">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-brand-pink" />
                <a
                  href="https://maps.app.goo.gl/Z1XvjQeUSutmSnAP8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Walukuba-Masese Rd<br/>Jinja District, Uganda
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0 text-brand-pink" />
                <span>+256 756 233 041</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0 text-brand-pink" />
                <a href="mailto:treassuredvesselsug@gmail.com" className="hover:text-white transition-colors break-all">treassuredvesselsug@gmail.com</a>
              </li>
            </ul>
            <Link href="/donate">
              <Button className="w-full bg-brand-pink hover:bg-brand-pink/90 text-white rounded-full shadow-lg border-0 gap-2 h-12">
                <Heart className="w-4 h-4" />
                Donate to Empower
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-paleblue/60">
          <p>© {currentYear} Treasured Vessels Girls' Centre. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 md:gap-6 justify-center">
            <Link href="/policies/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/policies/safeguarding" className="hover:text-white transition-colors">Safeguarding Policy</Link>
            <Link href="/policies/donation" className="hover:text-white transition-colors">Donation Policy</Link>
            <Link href="/about/governance" className="hover:text-white transition-colors">Governance & Transparency</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
