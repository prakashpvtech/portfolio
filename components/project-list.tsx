"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { projects, type Project } from "@/lib/projects";

function StatusBadge({ project }: { project: Project }) {
  const live = project.status === "live";
  return (
    <span
      className={`meta inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${
        live ? "border-ok/40 text-ok" : "border-line-strong text-fg-faint"
      }`}
    >
      {live && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ok" />}
      {live ? "Live" : "Self-hosted"}
    </span>
  );
}

function Row({ project, i }: { project: Project; i: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? undefined : { opacity: 0, y: 26 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={
        reduce ? undefined : { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
      }
      data-reveal
      className="group border-t border-line py-10 first:border-t-0 first:pt-0"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
        <p className="meta shrink-0 pt-1 text-fg-faint lg:w-16">{project.index}</p>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <p className="meta text-accent">{project.category}</p>
            <StatusBadge project={project} />
            {project.flagship && (
              <span className="meta rounded-full border border-accent/40 px-2.5 py-1 text-accent">
                Flagship
              </span>
            )}
          </div>

          <h3
            className={`display mt-4 ${
              project.flagship ? "text-3xl sm:text-5xl" : "text-2xl sm:text-4xl"
            }`}
          >
            {project.name}
          </h3>

          <p className="mt-4 max-w-2xl text-fg-muted">{project.value}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="meta rounded-full border border-line px-2.5 py-1 text-fg-muted"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            {project.links.demo && (
              <a
                href={project.links.demo}
                className="meta inline-flex items-center gap-1.5 text-fg underline decoration-line-strong decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                Live demo <span aria-hidden>↗</span>
              </a>
            )}
            <Link
              href={`/work/${project.slug}`}
              className="meta inline-flex items-center gap-1.5 text-fg underline decoration-line-strong decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              Case study <span aria-hidden>→</span>
            </Link>
            <a
              href={project.links.source}
              className="meta inline-flex items-center gap-1.5 text-fg-muted transition-colors hover:text-accent"
            >
              Source <span aria-hidden>↗</span>
            </a>
            <p className="meta text-fg-faint">{project.statusNote}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectList() {
  return (
    <div>
      {projects.map((project, i) => (
        <Row key={project.slug} project={project} i={i} />
      ))}
    </div>
  );
}
