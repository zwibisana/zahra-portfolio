import type { ReactNode } from "react";

type PanelProps = {
  as?: "section" | "footer";
  id?: string;
  className?: string;
  children: ReactNode;
};

/** A rounded, light content container. Page sections sit inside these instead of being split by lines. */
export default function Panel({ as: Tag = "section", id, className = "", children }: PanelProps) {
  return (
    <Tag
      id={id}
      className={`container-page relative overflow-clip rounded-[clamp(28px,3.5vw,50px)] bg-surface-light ${className}`}
    >
      {children}
    </Tag>
  );
}
