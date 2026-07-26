import { Chrome } from "@/components/chrome";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { ProjectList } from "@/components/project-list";
import { PracticeList } from "@/components/practice-list";
import { StatRow } from "@/components/stat-row";
import { CodeRunner } from "@/components/code-runner";
import { Footer } from "@/components/footer";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Chrome />
      <main>
        <Hero />

        <Section
          id="work"
          index="02"
          label="Selected Work"
          counter={`ACTIVE 01 / 0${projects.length}`}
          statement="Four projects, built end to end."
          lede="Each shipped with a README, a CI pipeline and tests. The case studies cover what they do — and what they don't."
        >
          <ProjectList />
        </Section>

        <Section
          id="how-i-build"
          index="03"
          label="How I Build"
          counter="IN FOCUS 01 / 04"
          statement="Logic belongs in one place, and it belongs under test."
          lede="Four habits that show up in every repository above."
        >
          <div className="space-y-16">
            <StatRow />
            <PracticeList />

            <div>
              <h3 className="display text-2xl sm:text-3xl">
                Or just run something I built.
              </h3>
              <p className="mt-4 max-w-2xl text-fg-muted">
                This editor posts to the code judge from CodeForge — the real deployed one.
                Your solution is executed against generated test cases and the verdicts
                below are what it actually returned. Break the code on purpose and watch a
                case fail.
              </p>
              <div className="mt-8">
                <CodeRunner />
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="about"
          index="04"
          label="About"
          statement="Studying in Bengaluru, learning by shipping."
        >
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
            <div className="space-y-5 text-fg-muted">
              <p>
                I&apos;m a {site.education.degree} candidate at {site.education.school},
                graduating {site.education.graduation.toLowerCase()}. Most of what I know
                came from building the four projects above rather than from coursework —
                including the parts that went wrong.
              </p>
              <p>
                FinPilot started as a design document and became a thirteen-module backend.
                CodeForge&apos;s judge silently rejected every submission for weeks because
                a regular expression had one backslash too many. That kind of thing is the
                actual education.
              </p>
              <p>
                I&apos;m looking for a junior software engineering role where I can work on
                a real backend with people who review code carefully.
              </p>
            </div>

            <dl className="space-y-6">
              {[
                ["Education", `${site.education.degree}, ${site.education.graduation}`],
                ["Based in", `${site.location} · ${site.relocate}`],
                ["Focus", "Python / FastAPI · TypeScript / Next.js"],
                ["Looking for", "Junior software engineering role"],
              ].map(([label, value]) => (
                <div key={label} className="border-t border-line pt-4">
                  <dt className="meta text-fg-faint">{label}</dt>
                  <dd className="mt-2 text-sm">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>

        <Section
          id="contact"
          index="05"
          label="Contact"
          statement="Let's talk."
          lede="Hiring, a question about any of the code above, or something you think I got wrong — all welcome."
        >
          <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
            <a
              href={`mailto:${site.email}`}
              className="display text-2xl underline decoration-line-strong decoration-1 underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent sm:text-4xl"
            >
              {site.email}
            </a>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            {[
              ["GitHub", site.github],
              ["LinkedIn", site.linkedin],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="meta rounded-full border border-line px-4 py-2.5 text-fg transition-colors hover:border-accent hover:text-accent"
              >
                {label} ↗
              </a>
            ))}
            <a
              href={`mailto:${site.email}`}
              className="meta rounded-full border border-accent px-4 py-2.5 text-accent transition-colors hover:bg-accent hover:text-accent-fg"
            >
              [ Get in touch ]
            </a>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
