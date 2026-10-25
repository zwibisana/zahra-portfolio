import heroWide from "../assets/images/hero.jpg";
import heroPortrait from "../assets/images/hero-portrait.jpg";
import DigestCard from "./DigestCard.tsx";

// Figma's noise lookup table: 100 steps, on for steps 3–46 and off elsewhere.
const GRAIN_TABLE = Array.from({ length: 100 }, (_, i) => (i >= 3 && i <= 46 ? 1 : 0)).join(" ");

export default function Hero() {
  return (
    <header
      id="hero"
      className="container-page relative mt-[clamp(16px,2.5vw,36px)] flex flex-col items-center gap-7 px-3 pt-5 pb-7 md:gap-[42px] md:px-4 md:pt-9 md:pb-[41px]"
    >
      {/* Figma's effects on the painting, in order:
          1. "Texture": noise displaces the pixels for a chalky, smudged look.
          2. "Noise": a fine sprinkle of light grey grain (25% opacity) on top. */}
      <svg aria-hidden="true" className="absolute size-0">
        <filter id="hero-texture" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.588" numOctaves={3} seed={7869} />
          <feDisplacementMap in="SourceGraphic" scale={26.2} xChannelSelector="R" yChannelSelector="G" result="textured" />

          <feTurbulence type="fractalNoise" baseFrequency="1" stitchTiles="stitch" numOctaves={3} seed={1966} result="noise" />
          <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
          {/* Keep only a band of noise values so the grain is sparse specks rather than an even haze. */}
          <feComponentTransfer in="alphaNoise" result="specks">
            <feFuncA type="discrete" tableValues={GRAIN_TABLE} />
          </feComponentTransfer>
          <feComposite operator="in" in="specks" in2="textured" result="specksClipped" />
          <feFlood floodColor="rgba(194, 194, 194, 0.25)" result="grey" />
          <feComposite operator="in" in="grey" in2="specksClipped" result="grain" />
          <feMerge>
            <feMergeNode in="textured" />
            <feMergeNode in="grain" />
          </feMerge>
        </filter>
      </svg>
      {/* The textured painting overhangs by 16px and gets clipped, so the edges stay clean and rounded. */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[clamp(28px,3.5vw,50px)] bg-surface">
        <picture className="absolute -inset-4 block [filter:url(#hero-texture)]">
          <source media="(max-width: 767px)" srcSet={heroPortrait} />
          <img src={heroWide} alt="" className="size-full object-cover object-bottom" />
        </picture>
      </div>
      {/* Room for the fixed <Nav />, which sits here at the top of the page. */}
      <div aria-hidden="true" className="h-[46px] shrink-0 md:h-[51px]" />
      <DigestCard />
    </header>
  );
}
