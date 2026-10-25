import type { ReactNode } from "react";

type TooltipPillProps = {
  label: string;
  /**
   * Optional 24px round icon shown before the label. Pass an image URL (e.g. a company logo),
   * or any element for a custom icon.
   */
  icon?: string | ReactNode;
};

/** The rounded "icon + label" pill from the Figma design. Use it as a <Tooltip>'s content. */
export default function TooltipPill({ label, icon }: TooltipPillProps) {
  return (
    <div
      className={`flex items-center gap-2 rounded-[30px] bg-surface-light py-[3px] pr-3 whitespace-nowrap shadow-[0_1px_2px_rgba(0,0,0,0.06)] ${
        icon ? "pl-[3px]" : "pl-3"
      }`}
    >
      {typeof icon === "string" ? (
        <img src={icon} alt="" width={24} height={24} className="size-6 rounded-full" />
      ) : (
        icon
      )}
      <span className="trim-caps text-[15px] text-[#5f544d]">{label}</span>
    </div>
  );
}
