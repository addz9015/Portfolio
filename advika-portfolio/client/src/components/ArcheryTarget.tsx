import { useEffect, useRef } from "react";

const ARROW_LENGTH = 132;

/**
 * An archery target on a stand that lives at the floor of its parent element. The first time
 * the parent scrolls into view the target drops in and bounces to the floor, then an arrow
 * flies in from the left edge and sticks in the bull's-eye. Clicking the target replays it.
 */
export default function ArcheryTarget() {
  const sceneRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const shaftRef = useRef<SVGSVGElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const body = bodyRef.current;
    const arrow = arrowRef.current;
    const shaft = shaftRef.current;
    const ring = ringRef.current;
    const layer = scene?.parentElement;
    if (!scene || !body || !arrow || !shaft || !ring || !layer) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let running: Animation[] = [];
    const track = (animation: Animation) => {
      running.push(animation);
      return animation;
    };
    const stopAll = () => {
      running.forEach(animation => animation.cancel());
      running = [];
    };

    const showFinalState = () => {
      scene.classList.remove("is-waiting");
      arrow.style.opacity = "1";
      arrow.style.transform = "rotate(5deg)";
    };

    const hit = () => {
      // the target rocks on its stand, the arrow quivers, and a ring pops off the bull's-eye
      track(
        body.animate(
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(3.5deg)" },
            { transform: "rotate(-2deg)" },
            { transform: "rotate(1deg)" },
            { transform: "rotate(0deg)" },
          ],
          { duration: 520, easing: "ease-out" }
        )
      );
      track(
        shaft.animate(
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(-3deg)" },
            { transform: "rotate(2.4deg)" },
            { transform: "rotate(-1.4deg)" },
            { transform: "rotate(.6deg)" },
            { transform: "rotate(0deg)" },
          ],
          { duration: 480, easing: "ease-out" }
        )
      );
      track(
        ring.animate(
          [
            { opacity: 0.9, transform: "scale(.3)" },
            { opacity: 0, transform: "scale(1.9)" },
          ],
          { duration: 520, easing: "ease-out" }
        )
      );
    };

    const shoot = (delay: number) => {
      // fly from just outside the left edge of the layer to the bull's-eye, in a shallow arc
      arrow.style.opacity = "0";
      arrow.style.transform = "rotate(5deg)";
      const layerRect = layer.getBoundingClientRect();
      const arrowRect = arrow.getBoundingClientRect();
      const distance = arrowRect.right - layerRect.left + 24;
      const flight = track(
        arrow.animate(
          [
            { opacity: 1, transform: `translate(${-distance}px, 28px) rotate(-9deg)` },
            {
              opacity: 1,
              transform: `translate(${-distance * 0.5}px, -34px) rotate(0deg)`,
              offset: 0.5,
            },
            { opacity: 1, transform: "translate(0, 0) rotate(5deg)" },
          ],
          {
            duration: 640,
            delay,
            easing: "cubic-bezier(.3, .1, .6, 1)",
            fill: "both",
          }
        )
      );
      flight.finished.then(hit).catch(() => {});
    };

    const play = () => {
      stopAll();
      scene.classList.remove("is-waiting");
      if (reducedMotion) {
        showFinalState();
        return;
      }
      const fall = Math.max(layer.clientHeight, 200);
      const easeIn = "cubic-bezier(.55, 0, 1, .45)";
      const easeOut = "cubic-bezier(0, .55, .45, 1)";
      const drop = track(
        body.animate(
          [
            { transform: `translateY(${-fall}px)`, easing: easeIn },
            { transform: "translateY(0) scale(1.06, .92)", offset: 0.5, easing: easeOut },
            { transform: "translateY(-48px) scale(1)", offset: 0.7, easing: easeIn },
            { transform: "translateY(0) scale(1.03, .96)", offset: 0.85, easing: easeOut },
            { transform: "translateY(-12px) scale(1)", offset: 0.93, easing: easeIn },
            { transform: "translateY(0)" },
          ],
          { duration: 1200, fill: "both" }
        )
      );
      drop.finished.then(() => shoot(220)).catch(() => {});
    };

    // first play when the message area scrolls into view
    const viewer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          play();
          viewer.disconnect();
        }
      },
      { threshold: 0.45 }
    );
    viewer.observe(layer);

    // clicking the target fires another arrow
    const replay = () => {
      if (reducedMotion) return;
      stopAll();
      shoot(0);
    };
    scene.addEventListener("click", replay);

    return () => {
      viewer.disconnect();
      stopAll();
      scene.removeEventListener("click", replay);
    };
  }, []);

  return (
    <button
      ref={sceneRef}
      type="button"
      className="archery-scene is-waiting"
      aria-label="Shoot another arrow at the target"
      title="Click to shoot again"
    >
      <div ref={bodyRef} className="archery-scene-body">
        <svg viewBox="0 0 100 130" aria-hidden="true">
          {/* A-frame stand behind the target */}
          <g stroke="#8a6a4a" strokeWidth="4" strokeLinecap="round">
            <line x1="36" y1="78" x2="20" y2="127" />
            <line x1="64" y1="78" x2="80" y2="127" />
            <line x1="50" y1="80" x2="50" y2="124" opacity=".6" />
          </g>
          <circle cx="50" cy="50" r="47" fill="#f6f4ef" stroke="#c9c5bc" />
          <circle cx="50" cy="50" r="38" fill="#1f1f1d" />
          <circle cx="50" cy="50" r="29" fill="#2855c7" />
          <circle cx="50" cy="50" r="20" fill="#e2483a" />
          <circle cx="50" cy="50" r="11" fill="#f4c531" />
          <circle cx="50" cy="50" r="4.5" fill="none" stroke="#1f1f1d" strokeWidth=".8" opacity=".55" />
        </svg>
      </div>
      <span ref={ringRef} className="archery-scene-ring" aria-hidden="true" />
      <div ref={arrowRef} className="archery-scene-arrow" aria-hidden="true">
        <svg ref={shaftRef} viewBox={`0 0 ${ARROW_LENGTH} 16`}>
          <path d="M3 1.5 L22 8 L10 8 Z" fill="#2855c7" />
          <path d="M3 14.5 L22 8 L10 8 Z" fill="#2855c7" />
          {/* light outline keeps the arrow visible over the dark bubble */}
          <line x1="4" y1="8" x2="118" y2="8" stroke="#f6f4ef" strokeWidth="5" strokeLinecap="round" />
          <path d="M116 3 L132 8 L116 13 Z" fill="#f6f4ef" stroke="#f6f4ef" strokeWidth="2.5" strokeLinejoin="round" />
          <line x1="4" y1="8" x2="118" y2="8" stroke="#1f1f1d" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M116 3 L132 8 L116 13 Z" fill="#1f1f1d" />
        </svg>
      </div>
    </button>
  );
}
