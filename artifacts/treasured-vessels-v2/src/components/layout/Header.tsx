import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, ChevronDown } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [openSection, setOpenSection] = React.useState<string | null>(null);

  const toggleSection = (section: string) =>
    setOpenSection((prev) => (prev === section ? null : section));

  const close = () => {
    setMobileMenuOpen(false);
    setOpenSection(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto max-w-[1240px] px-4 md:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src="/images/logo-icon.png"
            alt="Treasured Vessels Girls' Centre logo"
            className="w-10 h-10 object-contain"
          />
          <div className="flex flex-col">
            <span className="font-serif text-lg leading-tight text-brand-plum">Treasured Vessels</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Girls' Centre</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent h-10 text-[15px]">About</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <ListItem href="/about" title="Who We Are">Discover our mission, vision, and values.</ListItem>
                    <ListItem href="/about/founder" title="Our Founder">Meet the heart behind our mission.</ListItem>
                    <ListItem href="/about/governance" title="Governance & Transparency">Our commitment to accountability.</ListItem>
                    <ListItem href="/about/faqs" title="FAQs">Common questions about our work.</ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent h-10 text-[15px]">Our Programs</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <ListItem href="/programs" title="Overview">All our programs.</ListItem>
                    <ListItem href="/programs/girls-education" title="Girls' Education">Keeping girls in school.</ListItem>
                    <ListItem href="/programs/skills-training" title="Vocational Skills">Economic empowerment through training.</ListItem>
                    <ListItem href="/programs/teenage-mother-support" title="Teenage Mother Support">Care and skills for young mothers.</ListItem>
                    <ListItem href="/programs/menstrual-health" title="Menstrual Health">Education and sanitary products.</ListItem>
                    <ListItem href="/programs/protection" title="Protection & Rehab">Safe spaces and counseling.</ListItem>
                    <ListItem href="/programs/community-outreach" title="Community Outreach">Engaging families and leaders.</ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent h-10 text-[15px]")}>
                  <Link href="/impact">Our Impact</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent h-10 text-[15px]")}>
                  <Link href="/stories">Stories</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent h-10 text-[15px]">Get Involved</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <ListItem href="/donate" title="Donate">Support our ongoing work.</ListItem>
                    <ListItem href="/get-involved/sponsor" title="Sponsor a Girl">Direct support for education.</ListItem>
                    <ListItem href="/get-involved/partner" title="Partner With Us">Corporate and NGO partnerships.</ListItem>
                    <ListItem href="/get-involved/volunteer" title="Volunteer">Give your time and skills.</ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent h-10 text-[15px]")}>
                  <Link href="/news">News</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
          <Link href="/donate">
            <Button className="rounded-full shadow-md gap-2 pl-4 pr-5 h-11 bg-brand-pink hover:bg-brand-pink/90 text-white font-medium">
              <Heart className="w-4 h-4" />
              Donate
            </Button>
          </Link>
        </div>

        <button className="lg:hidden p-2 text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-border shadow-lg py-2 px-6 flex flex-col max-h-[80vh] overflow-y-auto">

          {/* About — accordion */}
          <button
            className="flex items-center justify-between w-full font-medium text-base py-3 border-b text-left"
            onClick={() => toggleSection("about")}
          >
            About
            <ChevronDown className={cn("w-4 h-4 transition-transform", openSection === "about" && "rotate-180")} />
          </button>
          {openSection === "about" && (
            <div className="flex flex-col pl-4 pb-2">
              <Link href="/about" onClick={close} className="py-2 text-sm text-brand-charcoal/80 border-b border-border/50">Who We Are</Link>
              <Link href="/about/founder" onClick={close} className="py-2 text-sm text-brand-charcoal/80 border-b border-border/50">Our Founder</Link>
              <Link href="/about/governance" onClick={close} className="py-2 text-sm text-brand-charcoal/80 border-b border-border/50">Governance &amp; Transparency</Link>
              <Link href="/about/faqs" onClick={close} className="py-2 text-sm text-brand-charcoal/80">FAQs</Link>
            </div>
          )}

          {/* Programs — accordion */}
          <button
            className="flex items-center justify-between w-full font-medium text-base py-3 border-b text-left"
            onClick={() => toggleSection("programs")}
          >
            Our Programs
            <ChevronDown className={cn("w-4 h-4 transition-transform", openSection === "programs" && "rotate-180")} />
          </button>
          {openSection === "programs" && (
            <div className="flex flex-col pl-4 pb-2">
              <Link href="/programs" onClick={close} className="py-2 text-sm text-brand-charcoal/80 border-b border-border/50">Overview</Link>
              <Link href="/programs/girls-education" onClick={close} className="py-2 text-sm text-brand-charcoal/80 border-b border-border/50">Girls' Education</Link>
              <Link href="/programs/skills-training" onClick={close} className="py-2 text-sm text-brand-charcoal/80 border-b border-border/50">Vocational Skills</Link>
              <Link href="/programs/teenage-mother-support" onClick={close} className="py-2 text-sm text-brand-charcoal/80 border-b border-border/50">Teenage Mother Support</Link>
              <Link href="/programs/menstrual-health" onClick={close} className="py-2 text-sm text-brand-charcoal/80 border-b border-border/50">Menstrual Health</Link>
              <Link href="/programs/protection" onClick={close} className="py-2 text-sm text-brand-charcoal/80 border-b border-border/50">Protection &amp; Rehabilitation</Link>
              <Link href="/programs/community-outreach" onClick={close} className="py-2 text-sm text-brand-charcoal/80">Community Outreach</Link>
            </div>
          )}

          {/* Flat links */}
          <Link href="/impact" onClick={close} className="font-medium text-base py-3 border-b">Our Impact</Link>
          <Link href="/stories" onClick={close} className="font-medium text-base py-3 border-b">Stories</Link>
          <Link href="/news" onClick={close} className="font-medium text-base py-3 border-b">News</Link>

          {/* Get Involved — accordion */}
          <button
            className="flex items-center justify-between w-full font-medium text-base py-3 border-b text-left"
            onClick={() => toggleSection("getinvolved")}
          >
            Get Involved
            <ChevronDown className={cn("w-4 h-4 transition-transform", openSection === "getinvolved" && "rotate-180")} />
          </button>
          {openSection === "getinvolved" && (
            <div className="flex flex-col pl-4 pb-2">
              <Link href="/get-involved/sponsor" onClick={close} className="py-2 text-sm text-brand-charcoal/80 border-b border-border/50">Sponsor a Girl</Link>
              <Link href="/get-involved/partner" onClick={close} className="py-2 text-sm text-brand-charcoal/80 border-b border-border/50">Partner With Us</Link>
              <Link href="/get-involved/volunteer" onClick={close} className="py-2 text-sm text-brand-charcoal/80">Volunteer</Link>
            </div>
          )}

          <Link href="/contact" onClick={close} className="font-medium text-base py-3 border-b">Contact</Link>

          <Link href="/donate" onClick={close} className="mt-4 mb-4">
            <Button className="w-full rounded-full bg-brand-pink hover:bg-brand-pink/90 text-white gap-2">
              <Heart className="w-4 h-4" /> Donate Now
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}

const ListItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & { href: string; title: string }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <Link href={href}>
        <div
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-paleblue hover:text-brand-plum focus:bg-brand-paleblue focus:text-brand-plum cursor-pointer",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
            {children}
          </p>
        </div>
      </Link>
    </li>
  );
});
ListItem.displayName = "ListItem";
