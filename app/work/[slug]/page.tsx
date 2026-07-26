import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { projects, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: `${project.name} — case study`, description: project.value };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = projects.findIndex((p) => p.slug === slug);
  const next = projects[(i + 1) % projects.length];

  return (
    <main className="px-6 pt-24 pb-24 sm:px-10 lg:px-14">
      <Link href="/#work" className="meta text-fg-muted transition-colors hover:text-accent">
        ← Selected work
      </Link>

      <header className="mt-12 max-w-4xl">
        <p className="meta text-accent">{project.category}</p>
        <h1 className="display mt-4 text-5xl sm:text-6xl lg:text-7xl">{project.name}</h1>
        <p className="mt-7 max-w-2xl text-lg text-fg-muted">{project.value}</p>

        <ul className="mt-8 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="meta rounded-full border border-line px-2.5 py-1 text-fg-muted"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          {project.links.demo && (
            <a
              href={project.links.demo}
              className="meta text-fg underline decoration-line-strong underline-offset-4 hover:text-accent"
            >
              Live demo ↗
            </a>
          )}
          <a
            href={project.links.source}
            className="meta text-fg underline decoration-line-strong underline-offset-4 hover:text-accent"
          >
            Source ↗
          </a>
        </div>
      </header>

      {project.study.stats && (
        <dl className="mt-16 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
          {project.study.stats.map((stat) => (
            <div key={stat.label} className="bg-bg p-5">
              <dt className="meta text-fg-faint">{stat.label}</dt>
              <dd className="display mt-2 text-3xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-20 max-w-3xl space-y-16">
        <section>
          <h2 className="meta">The problem</h2>
          <p className="mt-5 text-lg leading-relaxed">{project.study.problem}</p>
        </section>

        <section>
          <h2 className="meta">Architecture</h2>
          {project.slug === "finpilot" && (
            <div className="mt-6">
              <ArchitectureDiagram />
            </div>
          )}
          <ul className="mt-5 space-y-3">
            {project.study.architecture.map((line) => (
              <li key={line} className="flex gap-4">
                <span aria-hidden className="mt-2 h-1 w-4 shrink-0 bg-accent" />
                <span className="text-fg-muted">{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="meta">Decisions</h2>
          <div className="mt-5 space-y-9">
            {project.study.decisions.map((d) => (
              <div key={d.title}>
                <h3 className="text-lg font-semibold tracking-tight">{d.title}</h3>
                <p className="mt-2 text-fg-muted">{d.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The credibility multiplier. */}
        <section className="rounded-lg border border-line border-l-2 border-l-accent bg-bg-elevated p-6 sm:p-8">
          <h2 className="meta">What it does not do</h2>
          <p className="mt-4 text-sm text-fg-muted">
            Listing the gaps is part of the case study. Each of these is a tradeoff I made
            knowingly, not an oversight I hope nobody notices.
          </p>
          <ul className="mt-6 space-y-3">
            {project.study.limits.map((limit) => (
              <li key={limit} className="flex gap-4">
                <span aria-hidden className="mt-2 h-1 w-4 shrink-0 bg-line-strong" />
                <span className="text-fg-muted">{limit}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <nav className="mt-24 border-t border-line pt-8">
        <p className="meta text-fg-faint">Next</p>
        <Link href={`/work/${next.slug}`} className="group mt-3 inline-block">
          <span className="display text-3xl transition-colors group-hover:text-accent sm:text-4xl">
            {next.name}
          </span>
        </Link>
      </nav>
    </main>
  );
}
