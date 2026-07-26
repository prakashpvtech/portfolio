import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

/* next/font self-hosts and preloads these at build time — no third-party
   request, no layout shift (guardrail I). */
const display = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Full-stack developer`,
    template: `%s — ${site.name}`,
  },
  description: site.positioning,
  openGraph: {
    title: `${site.name} — Full-stack developer`,
    description: site.positioning,
    type: "website",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

/* Applied before first paint so an explicit theme choice never flashes the
   wrong palette. Kept deliberately tiny. */
const themeInit = `try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} h-full`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {/* Motion serialises its `initial` state into the server HTML, so without
            JS every revealed block would render at opacity 0 — a blank page.
            Guardrail I says the content must be readable, so force it visible. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="grain min-h-full antialiased">
        <a
          href="#intro"
          className="meta sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:border focus:border-accent focus:bg-bg focus:px-4 focus:py-2 focus:text-accent"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
