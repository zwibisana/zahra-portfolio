import { useEffect, useRef, useState } from "react";

const SIZE = 10;
// How far the dot closes the gap to the cursor each frame (lower = more lag, 1 = no lag).
const EASE = 0.15;
// How much bigger the dot gets over links, buttons and other clickable things.
const HOVER_SCALE = 1.8;
const CLICKABLE = "a, button, [role='button'], input, select, textarea, label, summary";

/**
 * A small orange dot that trails slightly behind the mouse cursor and grows over clickable things.
 * Mouse only; hidden on touch screens.
 */
export default function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [overClickable, setOverClickable] = useState(false);

  useEffect(() => {
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let frame = 0;
    let started = false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const place = () => {
      dotRef.current?.style.setProperty(
        "transform",
        `translate3d(${pos.x - SIZE / 2}px, ${pos.y - SIZE / 2}px, 0)`,
      );
    };

    const tick = () => {
      const ease = reduceMotion.matches ? 1 : EASE;
      pos.x += (target.x - pos.x) * ease;
      pos.y += (target.y - pos.y) * ease;
      place();
      frame = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.1 ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.x = e.clientX;
      target.y = e.clientY;
      if (!started) {
        // Start on the cursor instead of flying in from the corner.
        started = true;
        pos.x = target.x;
        pos.y = target.y;
        place();
      }
      setVisible(true);
      setOverClickable(e.target instanceof Element && e.target.closest(CLICKABLE) !== null);
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      style={{ width: SIZE, height: SIZE }}
      className={`pointer-events-none fixed top-0 left-0 z-[60] transition-opacity duration-300 will-change-transform ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Scaled separately so growing doesn't fight the position transform above. */}
      <div
        style={{ scale: overClickable ? HOVER_SCALE : 1 }}
        className="size-full rounded-full bg-[#e67240] transition-[scale] duration-300 ease-out motion-reduce:transition-none"
      />
    </div>
  );
}
