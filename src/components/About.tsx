import avatar from "../assets/images/profile.png";
import gradCap from "../assets/icons/graduation-cap.svg";
import mapIcon from "../assets/icons/map.svg";
import fishIcon from "../assets/icons/fish.svg";
import dotPink from "../assets/icons/dot-1.svg";
import dotGreen from "../assets/icons/dot-2.svg";
import dotYellow from "../assets/icons/dot-3.svg";
import dotBlue from "../assets/icons/dot-4.svg";
import Panel from "./Panel.tsx";
import Reveal from "./Reveal.tsx";

type Fact = {
  icon: string;
  width: number;
  height: number;
  text: string;
  /** Photo shown above the fact. Leave empty to show a blank placeholder until you add one. */
  image?: string;
  imageAlt?: string;
};

const facts: Fact[] = [
  {
    icon: gradCap,
    width: 18.132,
    height: 14.763,
    text: "I’m a senior at Northeastern University studying Computer Science and Interaction Design",
  },
  {
    icon: mapIcon,
    width: 20,
    height: 20,
    text: "Outside of work, I enjoy traveling, cooking/baking, making short films, and thrifting",
  },
  {
    icon: fishIcon,
    width: 20,
    height: 20,
    text: "I grew up in Baltimore, Maryland – which kind of makes me the queen of Old Bay seasoning",
  },
];

// Decorative dots: positions follow the Figma frame on wide screens and shift so they never cover
// text or photos. The panel clips them, so the blue one peeks in from the right edge.
const dots = [
  { src: dotPink, className: "right-[10%] top-[110px] md:right-auto md:left-[55%] md:top-[180px] xl:left-[6.4%] xl:top-[455px]" },
  { src: dotGreen, className: "left-[48%] top-[60px] md:left-[47%] md:top-[60px] xl:top-[51px]" },
  { src: dotYellow, className: "right-[24%] top-6 md:right-auto md:left-[77%] md:top-[130px] xl:left-[72.6%] xl:top-[159px]" },
  { src: dotBlue, className: "right-[-9px] top-[100px] md:right-[-12px] md:top-[98px] xl:right-[-4px]" },
];

export default function About() {
  return (
    <Panel id="about" className="px-5 pt-10 pb-10 md:px-[39px] md:pt-[clamp(56px,6.8vw,98px)] md:pb-16 lg:pr-11">
      {dots.map(({ src, className }) => (
        <img
          key={src}
          src={src}
          alt=""
          width={35}
          height={35}
          className={`pointer-events-none absolute size-[26px] md:size-[35px] ${className}`}
        />
      ))}

      {/* On wide screens the facts sit to the right, with their photos lined up with the heading. */}
      <div className="relative xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,845px)] xl:gap-x-10">
        <Reveal className="xl:col-start-1 xl:row-start-1">
          <img src={avatar} alt="Portrait of Zahra" width={96} height={96} className="size-24 rounded-full" />
        </Reveal>
        <Reveal
          as="h2"
          delay={100}
          className="font-display mt-6 text-[clamp(30px,2.6vw,36px)] xl:col-start-1 xl:row-start-2 xl:self-start"
        >
          A little bit about me
        </Reveal>

        <ul className="mt-10 grid w-[min(845px,100%)] grid-cols-1 gap-10 md:mt-12 md:ml-auto md:grid-cols-3 md:gap-8 lg:gap-11 xl:col-start-2 xl:row-start-2 xl:mt-6">
          {/* Facts appear one after another. */}
          {facts.map(({ icon, width, height, text, image, imageAlt }, i) => (
            <Reveal as="li" key={text} delay={i * 150} className="flex flex-col gap-3 text-base leading-[1.4]">
              {image ? (
                <img
                  src={image}
                  alt={imageAlt ?? ""}
                  className="mb-[22px] aspect-[252/169] w-full rounded-[16.698px] object-cover"
                />
              ) : (
                <div aria-hidden="true" className="mb-[22px] aspect-[252/169] w-full rounded-[16.698px] bg-bg" />
              )}
              <span className="grid size-5 place-items-center">
                <img src={icon} alt="" width={width} height={height} />
              </span>
              <p>{text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </Panel>
  );
}
