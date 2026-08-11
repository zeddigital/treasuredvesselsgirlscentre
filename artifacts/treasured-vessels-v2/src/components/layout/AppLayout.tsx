import { Link } from "wouter";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ReactNode } from "react";
import { usePageViews } from "@/lib/analytics";

export function AppLayout({ children }: { children: ReactNode }) {
  // Called from the layout rather than a page: React runs child effects before
  // parent effects, so each page's useSeo has already set document.title by the
  // time the page_view is sent.
  usePageViews();

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
