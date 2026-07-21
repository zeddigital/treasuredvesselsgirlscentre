import { LucideIcon } from "lucide-react";
import { Link } from "wouter";

export function SectionHeading({ 
  title, 
  subtitle, 
  align = "left", 
  light = false 
}: { 
  title: string; 
  subtitle?: string; 
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={`mb-12 md:mb-16 ${align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}`}>
      {subtitle && (
        <span className={`block text-sm font-semibold tracking-wider uppercase mb-3 ${light ? "text-brand-gold" : "text-brand-purple"}`}>
          {subtitle}
        </span>
      )}
      <h2 className={`font-serif text-3xl md:text-4xl lg:text-5xl leading-tight ${light ? "text-white" : "text-brand-plum"}`}>
        {title}
      </h2>
    </div>
  );
}

export function ProgramCard({
  title,
  description,
  href,
  icon: Icon
}: {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}) {
  return (
    <Link href={href} className="group block h-full">
      <div className="bg-white border border-border p-8 rounded-[20px] h-full transition-all duration-300 hover:shadow-xl hover:border-brand-paleblue hover:-translate-y-1 hover-elevate">
        <div className="w-14 h-14 rounded-2xl bg-brand-paleblue text-brand-blue flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:bg-brand-blue group-hover:text-white duration-300">
          <Icon className="w-7 h-7" strokeWidth={1.5} />
        </div>
        <h3 className="font-serif text-2xl text-brand-plum mb-3 group-hover:text-brand-purple transition-colors">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          {description}
        </p>
        <div className="flex items-center text-brand-blue text-sm font-semibold">
          Explore Program <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  );
}
