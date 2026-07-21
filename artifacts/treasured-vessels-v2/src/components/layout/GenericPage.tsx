import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function GenericPage({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="pb-24">
      <section className="bg-brand-paleblue py-16">
        <div className="container mx-auto max-w-[800px] px-4 md:px-6">
          <h1 className="font-serif text-4xl md:text-5xl text-brand-plum">{title}</h1>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-[800px] px-4 md:px-6 prose prose-lg prose-purple">
          {children}
        </div>
      </section>
    </div>
  );
}
