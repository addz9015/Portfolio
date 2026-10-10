import { useEffect, useRef } from "react";

type AsciiWavesProps = {
  characters?: string;
  fontSize?: number;
  speed?: number;
  frequency?: number;
  amplitude?: number;
  color?: string;
  secondaryColor?: string;
  opacity?: number;
  className?: string;
};

/**
 * A grid of ASCII characters that ripple with layered sine waves. Denser glyphs mark the
 * wave crests; the whole field fades out toward its edges. Fills its parent element.
 */
export default function AsciiWaves({
  characters = " .·:*+=%#@",
  fontSize = 13,
  speed = 0.8,
  frequency = 0.035,
  amplitude = 22,
  color = "#f6f4ef",
  secondaryColor = "#9fb4ff",
  opacity = 1,
  className = "",
}: AsciiWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const parent = canvas?.parentElement;
    if (!canvas || !context || !parent) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const glyphs = characters.split("");
    let width = 0;
    let height = 0;
    let time = 0;
    let frame = 0;
    let visible = true;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const cellWidth = fontSize * 0.72;
      const cellHeight = fontSize * 1.35;
      const columns = Math.floor(width / cellWidth);
      const rows = Math.floor(height / cellHeight);
      context.font = `${fontSize}px "IBM Plex Mono", monospace`;
      context.textAlign = "center";
      context.textBaseline = "middle";

      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          const wave =
            Math.sin(column * frequency + time) * amplitude +
            0.6 * amplitude * Math.cos(row * frequency * 1.4 - 0.8 * time) +
            0.4 * amplitude * Math.sin((column + row) * frequency * 0.7 + 1.2 * time);
          const level = Math.min(Math.max((wave + 2 * amplitude) / (4 * amplitude), 0), 1);
          const glyph = glyphs[Math.floor(level * (glyphs.length - 1))];
          if (!glyph || glyph === " ") continue;

          const edgeFade =
            Math.sin((column / columns) * Math.PI) * Math.sin((row / rows) * Math.PI);
          context.globalAlpha = (0.2 + 0.7 * level) * Math.max(0, edgeFade) * opacity;
          context.fillStyle = level > 0.55 ? color : secondaryColor;
          context.fillText(
            glyph,
            column * cellWidth + cellWidth / 2,
            row * cellHeight + cellHeight / 2 + 0.35 * wave
          );
        }
      }
      context.globalAlpha = 1;
    };

    const tick = () => {
      if (visible) {
        time += 0.02 * speed;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };

    resize();
    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reducedMotion) draw();
    });
    resizeObserver.observe(parent);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(canvas);

    if (reducedMotion) draw();
    else frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [characters, fontSize, speed, frequency, amplitude, color, secondaryColor, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`ascii-waves ${className}`.trim()}
      aria-hidden="true"
    />
  );
}
