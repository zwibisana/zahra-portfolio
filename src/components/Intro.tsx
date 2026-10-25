import klaviyoLogo from "../assets/images/klaviyo-logo.png";
import { Tooltip, TooltipPill } from "./tooltip/index.ts";
import Reveal from "./Reveal.tsx";

export default function Intro() {
  return (
    <section className="container-page pt-[31px] pb-[clamp(40px,7.5vw,105px)]">
      <Reveal as="p" className="text-[clamp(18px,1.6vw,22px)]">
        Currently at{" "}
        <Tooltip content={<TooltipPill icon={klaviyoLogo} label="Klaviyo" />}>
          <a
            href="https://www.klaviyo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent transition-colors hover:text-[#9aac63]"
          >
            Klaviyo
          </a>
        </Tooltip>{" "}
        in Boston, MA
      </Reveal>
      <Reveal as="h1" delay={120} className="font-display mt-3 text-[clamp(36px,4.6vw,57px)] leading-[1.15]">
        Designing with craft, care, and curiosity
      </Reveal>
    </section>
  );
}
