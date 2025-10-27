"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const SPONSOR_CTA = {
  label: "Become a Sponsor",
  url: "https://github.com/sponsors/usememos",
};

const CARBON_SCRIPT_SRC = "https://cdn.carbonads.com/carbon.js?serve=CWBD4K7E&placement=usememoscom&format=cover";
const CARBON_SCRIPT_ID = "_carbonads_js";

export function DocsCarbonAdCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "loaded" | "failed">("loading");
  const [isVisible, setIsVisible] = useState(false);

  // Use IntersectionObserver for lazy loading
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Start loading 200px before visible
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Load ad script only when visible
  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    let isMounted = true;
    let observer: MutationObserver | null = null;

    const markLoaded = () => {
      if (!isMounted) {
        return;
      }
      setStatus("loaded");
    };

    const markFailed = () => {
      if (!isMounted) {
        return;
      }
      setStatus((prev) => (prev === "loaded" ? prev : "failed"));
    };

    // Check if ad already exists and move it to our container
    const existingAd = document.getElementById("carbonads");
    if (existingAd) {
      container.appendChild(existingAd);
      markLoaded();
      return;
    }

    // Set up observer to watch for ad creation - only watch container, not entire body
    observer = new MutationObserver(() => {
      const carbonAd = document.getElementById("carbonads");
      if (carbonAd) {
        if (!container.contains(carbonAd)) {
          container.appendChild(carbonAd);
        }
        markLoaded();
        observer?.disconnect();
      }
    });

    // Watch only the container and document.body directly (not subtree)
    observer.observe(document.body, { childList: true, subtree: false });
    observer.observe(container, { childList: true, subtree: false });

    // Load script if not already present
    const existingScript = document.getElementById(CARBON_SCRIPT_ID) as HTMLScriptElement | null;
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = CARBON_SCRIPT_SRC;
      script.async = true;
      script.id = CARBON_SCRIPT_ID;
      script.type = "text/javascript";

      // Append to body (not container) so Carbon can find it
      document.body.appendChild(script);

      script.addEventListener("error", () => {
        if (isMounted) {
          markFailed();
        }
      });
    }

    // Reduce timeout to 3 seconds for faster fallback
    const timeoutId = window.setTimeout(() => {
      if (!container.querySelector("#carbonads")) {
        markFailed();
      }
    }, 3000);

    return () => {
      isMounted = false;
      observer?.disconnect();
      window.clearTimeout(timeoutId);
    };
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className={cn("w-full max-h-80 rounded-xl border border-border bg-muted/30 p-3 transition overflow-auto", "dark:bg-muted/10")}
      aria-label="Sponsored by Carbon"
    >
      <span className="sr-only">Carbon Ads</span>
      {status === "loading" ? (
        <div className="flex w-full items-center justify-center px-3 py-1 text-sm text-muted-foreground" aria-hidden="true">
          Loading…
        </div>
      ) : null}
      {status === "failed" ? (
        <a
          href={SPONSOR_CTA.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center px-3 py-1 text-sm font-semibold text-muted-foreground transition hover:opacity-80"
        >
          {SPONSOR_CTA.label}
        </a>
      ) : null}
    </div>
  );
}
