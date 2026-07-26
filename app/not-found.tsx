import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = { title: "404 — page not found" };

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col justify-between px-6 pt-24 pb-10 sm:px-10 lg:px-14">
      <p className="meta">{site.stamp}</p>

      <div className="py-14">
        <h1 className="display text-[18vw] leading-[0.86] lg:text-[11rem]">
          <span className="outlined block">404</span>
        </h1>
        <p className="mt-10 max-w-xl text-lg text-fg-muted">
          Nothing here. Every route on this site is statically generated, so this one
          genuinely does not exist rather than having quietly broken.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            className="meta rounded-full border border-accent px-4 py-2.5 text-accent transition-colors hover:bg-accent hover:text-accent-fg"
          >
            [ Back to the start ]
          </Link>
          <Link
            href="/#work"
            className="meta rounded-full border border-line px-4 py-2.5 text-fg transition-colors hover:border-accent hover:text-accent"
          >
            Selected work
          </Link>
        </div>
      </div>

      <p className="meta text-fg-faint">
        {site.locationShort} · {site.coordinates}
      </p>
    </main>
  );
}
