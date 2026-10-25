import arrowDark from "../assets/icons/arrow-right.svg";
import arrowLight from "../assets/icons/arrow-right-light.svg";

type ArrowButtonProps = {
  href: string;
  label: string;
  /** "primary" is the solid dark pill; "secondary" is outlined and fills in dark on hover. */
  variant?: "primary" | "secondary";
};

const variants = {
  primary: "gap-1.5 bg-ink border-ink px-[20.5px] py-[13.667px] text-[13.667px] text-bg hover:bg-[#3b3430]",
  secondary:
    "gap-[3.34px] border-line px-[20.038px] py-[13.358px] text-[13.358px] text-btn-text hover:border-ink hover:bg-ink hover:text-bg",
};

/** A pill link with a trailing arrow that nudges right on hover. */
export default function ArrowButton({ href, label, variant = "primary" }: ArrowButtonProps) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center rounded-[34px] border-[0.835px] whitespace-nowrap transition-colors duration-200 ${variants[variant]}`}
    >
      <span className="trim-caps">{label}</span>
      <span className="relative size-[13.5px] shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-[3px]">
        {variant === "primary" ? (
          <img src={arrowLight} alt="" width={13.6667} height={13.6667} className="size-full" />
        ) : (
          <>
            {/* Swap to the light arrow when the button fills in dark. */}
            <img
              src={arrowDark}
              alt=""
              width={13.3583}
              height={13.3583}
              className="size-full transition-opacity duration-200 group-hover:opacity-0"
            />
            <img
              src={arrowLight}
              alt=""
              width={13.6667}
              height={13.6667}
              className="absolute inset-0 size-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
          </>
        )}
      </span>
    </a>
  );
}
