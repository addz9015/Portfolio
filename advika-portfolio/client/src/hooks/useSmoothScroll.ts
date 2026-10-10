import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

/**
 * Site-wide inertial smooth scrolling (Lenis). Also smooths in-page anchor links, and pauses
 * while a dialog has locked the page. Skipped entirely for reduced-motion users.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      anchors: true,
      stopInertiaOnNavigate: true,
    });

    // Radix dialogs mark <body> with data-scroll-locked while open
    const syncLock = () => {
      if (document.body.hasAttribute("data-scroll-locked")) lenis.stop();
      else lenis.start();
    };
    const observer = new MutationObserver(syncLock);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-scroll-locked"],
    });

    return () => {
      observer.disconnect();
      lenis.destroy();
    };
  }, []);
}
