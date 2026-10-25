import { useEffect, useState } from "react";

/** The current time, updated at the start of every minute. */
export default function useNow() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let timer: number;
    const schedule = () => {
      const msToNextMinute = 60_000 - (Date.now() % 60_000);
      timer = window.setTimeout(() => {
        setNow(new Date());
        schedule();
      }, msToNextMinute);
    };
    schedule();
    return () => clearTimeout(timer);
  }, []);

  return now;
}
