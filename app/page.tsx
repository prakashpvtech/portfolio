import { Chrome } from "@/components/chrome";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { ProjectList } from "@/components/project-list";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <main>
      <Chrome />
      <Hero />

      <Section
        id="work"
        index="02"
        label="Selected Work"
        counter={`ACTIVE 01 / 0${projects.length}`}
        statement="Four projects, built end to end."
        lede="Each one shipped with a README, a CI pipeline and tests. The case studies say what they do — and what they don't."
      >
        <ProjectList />
      </Section>

      <Section
        id="how-i-build"
        index="03"
        label="How I Build"
        counter="IN FOCUS 01 / 04"
        statement="Logic belongs in one place, and it belongs under test."
        lede="Placeholder — this section is next."
      />

      <Section
        id="about"
        index="04"
        label="About"
        statement={`${site.education.degree} candidate, writing backends.`}
        lede="Placeholder — this section is next."
      />

      <Section
        id="contact"
        index="05"
        label="Contact"
        statement="Let's talk."
        lede="Placeholder — this section is next."
      />
    </main>
  );
}
