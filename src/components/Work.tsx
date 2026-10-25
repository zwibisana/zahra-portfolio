import ArrowButton from "./ArrowButton.tsx";
import Panel from "./Panel.tsx";
import Reveal from "./Reveal.tsx";

type Project = {
  tag: string;
  title: string;
  dates: string;
  href: string;
};

const projects: Project[] = [
  {
    tag: "Internship",
    title: "Designing a seamless path to continuous data for Type 1 diabetic patients",
    dates: "May 2026 – August 2026",
    href: "#",
  },
  {
    tag: "Co-op",
    title: "Increasing personalization adoption within the email editor in Klaviyo",
    dates: "September 2026 – October 2026",
    href: "#",
  },
  {
    tag: "Co-op",
    title: "Empowering interdisciplinary environmental change through digital design & storytelling",
    dates: "September 2026 – October 2026",
    href: "#",
  },
];

function ProjectCard({ tag, title, dates, href }: Project) {
  return (
    <article className="flex flex-col items-start gap-[16.698px]">
      <div className="flex w-full flex-col items-start gap-[13.358px]">
        <span className="flex rounded-[33.396px] bg-line px-[13.358px] py-[6.679px] text-[13.358px] font-medium text-tag-text">
          <span className="trim-caps">{tag}</span>
        </span>
        <h3 className="text-[20.038px] leading-[1.2] font-normal">{title}</h3>
        <p className="text-[13.358px] text-muted">{dates}</p>
      </div>
      <div className="aspect-[4/3] w-full rounded-[16.698px] bg-bg md:aspect-auto md:h-[240px] lg:h-[303px]" />
      <ArrowButton href={href} label="View work" variant="secondary" />
    </article>
  );
}

export default function Work() {
  return (
    <Panel id="work" className="px-5 pt-6 pb-8 md:pt-14 md:pr-[37px] md:pb-[33px] md:pl-9">
      <Reveal className="flex items-center justify-between gap-4">
        <h2 className="text-[clamp(18px,1.6vw,22px)] font-normal">Highlighted work</h2>
        <ArrowButton href="#" label="See more" />
      </Reveal>

      <div className="mt-10 grid md:mt-[70px] grid-cols-1 gap-14 md:grid-cols-3 md:gap-5 lg:gap-8">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 150}>
            <ProjectCard {...project} />
          </Reveal>
        ))}
      </div>
    </Panel>
  );
}
