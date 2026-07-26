import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-10 sm:px-10 lg:px-14">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
        <p className="meta text-fg-faint">
          © 2026 {site.name} · {site.locationShort}
        </p>
        <p className="meta text-fg-faint">
          Next.js · Tailwind · Motion ·{" "}
          <a href={site.sourceRepo} className="text-fg-muted transition-colors hover:text-accent">
            source ↗
          </a>
        </p>
      </div>
    </footer>
  );
}
