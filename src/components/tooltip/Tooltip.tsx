import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";

type TooltipProps = {
  /** What shows inside the tooltip, e.g. a <TooltipPill />. */
  content: ReactNode;
  /** The element(s) that trigger the tooltip on hover. */
  children: ReactNode;
};

// Offset of the tooltip's bottom-left corner from the cursor (it sits above the cursor).
const OFFSET = { x: 12, y: 12 };
// How far the tooltip closes the gap to the cursor each frame (1 = no easing).
const EASE = 0.18;

/**
 * Shows `content` above the mouse cursor while hovering `children`, gliding after the cursor as it moves.
 * Mouse only: touch and pen taps go straight through to the wrapped element.
 */
export default function Tooltip({ content, children }: TooltipProps) {
  const tipRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const frame = useRef(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const place = () => {
    tipRef.current?.style.setProperty("transform", `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`);
  };

  const setTarget = (e: PointerEvent) => {
    const width = tipRef.current?.offsetWidth ?? 0;
    const height = tipRef.current?.offsetHeight ?? 0;
    target.current = {
      x: Math.min(e.clientX + OFFSET.x, window.innerWidth - width - 8),
      y: e.clientY - height - OFFSET.y,
    };
  };

  const tick = () => {
    const ease = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : EASE;
    const p = pos.current;
    const t = target.current;
    p.x += (t.x - p.x) * ease;
    p.y += (t.y - p.y) * ease;
    place();
    frame.current = Math.abs(t.x - p.x) + Math.abs(t.y - p.y) > 0.1 ? requestAnimationFrame(tick) : 0;
  };

  const handleEnter = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    setTarget(e);
    pos.current = { ...target.current };
    place();
    setVisible(true);
  };

  const handleMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    setTarget(e);
    if (!frame.current) frame.current = requestAnimationFrame(tick);
  };

  return (
    <>
      <span
        className="contents"
        onPointerEnter={handleEnter}
        onPointerMove={handleMove}
        onPointerLeave={() => setVisible(false)}
      >
        {children}
      </span>
      {createPortal(
        <div ref={tipRef} aria-hidden="true" className="pointer-events-none fixed top-0 left-0 z-50 will-change-transform">
          <div
            className={`origin-bottom-left transition-[opacity,scale] duration-200 ease-out ${
              visible ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          >
            {content}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
