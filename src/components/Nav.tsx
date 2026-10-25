import { useEffect, useState } from "react";

const links = [
  { label: "Home", href: "#", active: true },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
];

/**
 * Fixed to the top of the screen. At the top of the page it sits over the hero image as in the design;
 * once you scroll it moves up and switches to a light frosted style so it stays readable over anything.
 * It slides away while you scroll down and comes back as soon as you scroll up.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      // Ignore tiny jitters (e.g. trackpad bounce) so it doesn't flicker.
      if (Math.abs(y - lastY) < 6) return;
      setHidden(y > lastY && y > 120);
      lastY = y;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <nav
      aria-label="Primary"
      className={`fixed left-1/2 z-40 flex h-[46px] w-[min(358px,calc(100vw-56px))] -translate-x-1/2 items-center justify-center gap-11 rounded-[30px] border transition-[top,translate,background-color,border-color,box-shadow] duration-300 ease-out focus-within:translate-y-0 md:h-[51px] md:gap-[66px] ${
        hidden ? "-translate-y-[calc(100%+24px)]" : "translate-y-0"
      } ${
        scrolled
          ? "top-4 border-[#efe9df] bg-[rgba(255,252,248,0.75)] shadow-[0_2px_12px_rgba(39,34,31,0.06)] backdrop-blur-md"
          : "top-[calc(clamp(16px,2.5vw,36px)+20px)] border-[rgba(247,244,239,0.35)] bg-[rgba(241,238,232,0.2)] backdrop-blur-[6px] md:top-[calc(clamp(16px,2.5vw,36px)+36px)]"
      }`}
    >
      {links.map(({ label, href, active }) => (
        <a
          key={label}
          href={href}
          aria-current={active ? "page" : undefined}
          className={`flex text-base transition-colors duration-300 md:text-[18px] ${
            !scrolled
              ? active
                ? "font-medium text-bg"
                : "text-[rgba(247,244,239,0.52)] hover:text-bg"
              : active
                ? "font-medium text-ink"
                : "text-ink/45 hover:text-ink"
          }`}
        >
          <span className="trim-caps">{label}</span>
        </a>
      ))}
    </nav>
  );
}
