import { useState, type ReactNode } from "react";
import replyIcon from "../assets/icons/reply.svg";
import heatingIcon from "../assets/icons/heating-square.svg";
import tvIcon from "../assets/icons/tv.svg";
import musicIcon from "../assets/icons/music-double-note.svg";
import cutleryIcon from "../assets/icons/cutlery.svg";
import airplaneIcon from "../assets/icons/airplane.svg";
import sunriseIcon from "../assets/icons/sea-and-sun.svg";
import sunIcon from "../assets/icons/sun-light.svg";
import moonIcon from "../assets/icons/half-moon.svg";
import useNow from "../hooks/useNow.ts";

type ChipTone = "purple" | "green" | "yellow";

const chipTones: Record<ChipTone, string> = {
  purple: "bg-[rgba(207,162,235,0.12)] text-[#bd85e0]",
  green: "bg-[rgba(130,182,128,0.12)] text-[#82b680]",
  yellow: "bg-[#fcf5e9] text-[#dea750]",
};

function Chip({ tone, children }: { tone: ChipTone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex rounded-[50px] px-2 py-1 align-[1px] text-[11px] leading-none font-medium ${chipTones[tone]}`}
    >
      <span className="trim-caps">{children}</span>
    </span>
  );
}

// Greeting and clock follow the visitor's own time zone (from their browser, no location permission needed).
function greetingFor(date: Date) {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return { text: "Good morning", icon: sunriseIcon };
  if (hour >= 12 && hour < 17) return { text: "Good afternoon", icon: sunIcon };
  return { text: "Good evening", icon: moonIcon };
}

const timeFormat = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" });

// "Suggest something else" cycles through these sets.
const suggestionSets = [
  [
    { icon: replyIcon, width: 16, height: 16, label: "Reply to your 2303 texts (you need to)" },
    { icon: heatingIcon, width: 13, height: 13, label: "Cook a warm meal" },
    { icon: tvIcon, width: 14.3333, height: 14, label: "Watch that one romcom for the 7th time" },
  ],
  [
    { icon: musicIcon, width: 16, height: 16, label: "Make a new incredibly specific Spotify playlist" },
    { icon: cutleryIcon, width: 16, height: 16, label: "Host a dinner party" },
    { icon: airplaneIcon, width: 16, height: 16, label: "Catch a flight back home to Baltimore" },
  ],
];

export default function DigestCard() {
  const [suggestCount, setSuggestCount] = useState(0);
  const actions = suggestionSets[suggestCount % suggestionSets.length];
  const now = useNow();
  const greeting = greetingFor(now);

  return (
    <div
      aria-label="A playful notification card"
      className="relative w-[397px] max-w-full overflow-hidden rounded-[30px] bg-surface-warm text-xs shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
    >
      <div className="flex h-[57px] items-center justify-between px-4 min-[401px]:pr-[21px] min-[401px]:pl-[23px]">
        <p className="flex items-center gap-1.5 font-semibold text-[#544d3e]">
          <img src={greeting.icon} alt="" width={14} height={14} className="size-3.5 shrink-0" />
          <span className="trim-caps">{greeting.text}, Zahra</span>
        </p>
        <time dateTime={now.toISOString()} className="trim-caps font-medium text-muted-2">
          {timeFormat.format(now).toLowerCase()}
        </time>
      </div>

      <div className="rounded-t-[20px] bg-surface-light px-4 pt-[22px] pb-[29px] min-[401px]:pr-5 min-[401px]:pl-[23px]">
        <p className="mb-[13px] font-semibold text-muted-2">Let’s digest</p>
        <p className="text-sm leading-[1.8] text-ink">
          A couple things need your attention. While you were away,{" "}
          <Chip tone="purple">a bird flew into your room</Chip>{" "}
          <Chip tone="yellow">nothing auto-saved</Chip>
          <br className="hidden md:inline" /> and <Chip tone="green">your dog ate your homework</Chip>. I know,
          bummer.
        </p>
        <p className="mt-[25.2px] text-sm leading-[1.8] text-ink">Here’s what you can do:</p>

        <ul key={suggestCount} aria-live="polite" className="mt-3 grid gap-2.5">
          {actions.map(({ icon, width, height, label }, i) => (
            <li
              key={label}
              // Only animate after a click, not on first page load. Rows fade in one after another.
              style={suggestCount > 0 ? { animationDelay: `${i * 60}ms` } : undefined}
              className={`${suggestCount > 0 ? "motion-safe:animate-suggestion-in" : ""} flex min-h-[41px] items-center gap-2.5 rounded-[10px] border border-surface px-3 py-2 text-sm leading-[1.8] text-ink-soft min-[401px]:px-4`}
            >
              <span className="grid size-4 shrink-0 place-items-center">
                <img src={icon} alt="" width={width} height={height} />
              </span>
              <span className="trim-caps">{label}</span>
            </li>
          ))}
        </ul>

        <p className="mt-[26px] font-medium text-muted-2">
          Not feeling any of these?{" "}
          <button
            type="button"
            onClick={() => setSuggestCount((n) => n + 1)}
            className="cursor-pointer font-medium text-muted-2 opacity-70 transition-[color,opacity] hover:text-[#9aac63] hover:opacity-100"
          >
            Suggest something else
          </button>
        </p>
      </div>
    </div>
  );
}
