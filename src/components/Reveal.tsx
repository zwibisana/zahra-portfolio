import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  /** Element to render, e.g. "li" inside a list. */
  as?: ElementType;
  /** Wait this long (ms) after scrolling into view; use it to stagger siblings. */
  delay?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Fades and lifts its content into place the first time it scrolls into view.
 * Shows instantly for people who prefer reduced motion.
 */
export default function Reveal({ as: Tag = "div", delay = 0, className = "", children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      // Trigger a little before the element is fully on screen.
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
