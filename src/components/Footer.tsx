import atSign from "../assets/icons/at-sign.svg";
import atSignCircle from "../assets/icons/at-sign-circle.svg";
import { Tooltip, TooltipPill } from "./tooltip/index.ts";
import Panel from "./Panel.tsx";
import Reveal from "./Reveal.tsx";

const EMAIL = "zahrawibisana@gmail.com";

const socials = [
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Resume", href: "#" },
];

const emailIcon = (
  <span className="relative grid size-6 shrink-0 place-items-center">
    <img src={atSignCircle} alt="" width={36} height={36} className="absolute inset-0 size-full" />
    <img src={atSign} alt="" width={16.25} height={16.25} className="relative size-[10.8px]" />
  </span>
);

export default function Footer() {
  return (
    <Panel
      as="footer"
      className="mt-4 mb-[clamp(16px,2.5vw,28px)] flex flex-col items-center gap-[clamp(72px,12.8vw,185px)] px-5 pt-[clamp(80px,13.9vw,200px)] pb-10 text-center md:mt-8"
    >
      <Reveal className="flex flex-col gap-[15px]">
        <h2 className="font-display text-[clamp(24px,2.2vw,30px)]">So... you’ve reached the end of this page</h2>
        <p className="text-[18px]">
          Want to see more?{" "}
          <Tooltip content={<TooltipPill icon={emailIcon} label={EMAIL} />}>
            <a href={`mailto:${EMAIL}`} className="text-link transition-colors hover:text-[#9aac63]">
              Let’s chat
            </a>
          </Tooltip>
        </p>
      </Reveal>
      <Reveal delay={150}>
        <nav
          aria-label="Social"
          className="font-display flex flex-wrap justify-center gap-x-9 gap-y-3 text-[18px] text-link md:gap-x-[60px] md:gap-y-4 md:text-[20px]"
        >
          {socials.map(({ label, href }) => (
            <a key={label} href={href} className="hover:text-ink">
              {label}
            </a>
          ))}
        </nav>
      </Reveal>
    </Panel>
  );
}
