"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * Starts every newly visited route at the very top.
 * Skips the first load (browser handles refresh / direct URLs), Back/Forward
 * (browser restores the previous position) and `/page#section` links (Next
 * scrolls to the target). Rendered after <main> in the root layout so it runs
 * after Next's own route scroll handler for the same commit.
 */
export default function RouteScrollReset() {
  const pathname = usePathname();
  const firstRender = useRef(true);
  const fromHistory = useRef(false);

  useEffect(() => {
    const onPopState = () => {
      fromHistory.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (fromHistory.current) {
      fromHistory.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
