import type { ReactNode } from "react";

// Line-art illustrations for the project cards. Everything is drawn in currentColor with
// one accent (--art-accent, set per card colour) so each piece fits all three card themes.

const delay = (seconds: number) => ({ animationDelay: `${seconds}s` });

function Packet({ path, duration, begin = 0 }: { path: string; duration: number; begin?: number }) {
  return (
    <circle className="a-fill-accent a-packet" r="2.6">
      <animateMotion dur={`${duration}s`} begin={`${-begin}s`} repeatCount="indefinite" path={path} />
    </circle>
  );
}

/** Noise-aware quantum ML: a 4-qubit variational circuit with a noise glitch and readout. */
function QuantumCircuit() {
  const wires = [22, 50, 78, 106];
  const cnots: [number, number, number][] = [
    [104, 22, 50],
    [132, 50, 78],
    [160, 78, 106],
    [188, 106, 22],
  ];
  return (
    <>
      {wires.map((y, i) => (
        <g key={y}>
          <text className="a-text" x="4" y={y + 3}>q{i}</text>
          <line className="a-line" x1="22" y1={y} x2="276" y2={y} />
          <rect className="a-box" x="44" y={y - 8} width="24" height="16" />
          <text className="a-text a-mid" x="56" y={y + 2.6}>RY</text>
          <rect className="a-box" x="250" y={y - 8} width="24" height="16" />
          <path className="a-line" d={`M255 ${y + 4} A7 7 0 0 1 269 ${y + 4}`} />
          <line className="a-accent a-blink" style={delay(i * 0.35)} x1="262" y1={y + 4} x2="267" y2={y - 4} />
        </g>
      ))}
      {cnots.map(([x, control, target]) => (
        <g key={x}>
          <line className="a-strong" x1={x} y1={control} x2={x} y2={target} />
          <circle className="a-fill" cx={x} cy={control} r="3" />
          <circle className="a-box" cx={x} cy={target} r="6" />
          <line className="a-strong" x1={x - 6} y1={target} x2={x + 6} y2={target} />
          <line className="a-strong" x1={x} y1={target - 6} x2={x} y2={target + 6} />
        </g>
      ))}
      <polyline
        className="a-accent a-blink"
        points="206,78 210,71 214,85 218,68 222,88 226,72 230,82 234,76 238,78"
      />
      <text className="a-text-accent" x="210" y="62">ε noise</text>
      <Packet path="M22 50 H250" duration={3.4} />
    </>
  );
}

/** Braille Bridge: raised Braille cells spelling READ, decoded into a speech waveform. */
function BrailleBridge() {
  // Dots 1-3 are the left column top to bottom, 4-6 the right column.
  const cells: [string, number[]][] = [
    ["R", [1, 2, 3, 5]],
    ["E", [1, 5]],
    ["A", [1]],
    ["D", [1, 4, 5]],
  ];
  const bars = [10, 22, 34, 18, 44, 28, 52, 30, 40, 16, 26, 12, 20, 8];
  return (
    <>
      <text className="a-text" x="20" y="16">tactile in</text>
      {cells.map(([letter, raised], c) => {
        const x0 = 26 + c * 30;
        return (
          <g key={letter}>
            {[1, 2, 3, 4, 5, 6].map(dot => {
              const cx = x0 + (dot > 3 ? 11 : 0);
              const cy = 44 + ((dot - 1) % 3) * 12;
              return raised.includes(dot) ? (
                <circle key={dot} className="a-fill a-blink" style={delay(c * 0.3)} cx={cx} cy={cy} r="3.6" />
              ) : (
                <circle key={dot} className="a-faint" cx={cx} cy={cy} r="3.2" />
              );
            })}
            <text className="a-text a-mid" x={x0 + 5.5} y="98">{letter}</text>
          </g>
        );
      })}
      <path className="a-strong" d="M150 56 H176 M170 50 L176 56 L170 62" />
      <text className="a-text a-mid" x="163" y="76">CTC</text>
      <text className="a-text" x="188" y="16">speech out</text>
      {bars.map((h, i) => (
        <rect
          key={i}
          className="a-fill-accent a-bar"
          style={delay(i * 0.12)}
          x={190 + i * 6.4}
          y={56 - h / 2}
          width="2.6"
          height={h}
          rx="1.3"
        />
      ))}
      <line className="a-faint" x1="186" y1="98" x2="282" y2="98" />
      <text className="a-text" x="186" y="112">“read”</text>
    </>
  );
}

/** Data analysis agent: a 3-state Hidden Markov Model routing claims toward a fraud score. */
function MarkovStates() {
  const states: [number, number, string][] = [
    [62, 70, "legit"],
    [150, 40, "review"],
    [238, 70, "fraud"],
  ];
  return (
    <>
      <defs>
        <marker id="art-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L8 4 L0 8 Z" fill="currentColor" opacity=".7" />
        </marker>
      </defs>
      <path className="a-line" markerEnd="url(#art-arrow)" d="M80 62 Q100 34 130 38" />
      <path className="a-line" markerEnd="url(#art-arrow)" d="M170 38 Q200 34 220 62" />
      <path className="a-line" markerEnd="url(#art-arrow)" d="M226 86 Q150 128 76 88" />
      <path className="a-faint" markerEnd="url(#art-arrow)" d="M52 54 C40 26 76 24 68 51" />
      <path className="a-faint" markerEnd="url(#art-arrow)" d="M140 24 C130 0 170 0 160 24" />
      <text className="a-text" x="104" y="34">.31</text>
      <text className="a-text" x="186" y="34">.18</text>
      <text className="a-text a-mid" x="150" y="118">.62</text>
      {states.map(([cx, cy, label], i) => (
        <g key={label}>
          {i === 2 && <circle className="a-accent a-ring" cx={cx} cy={cy} r="18" />}
          <circle className={i === 2 ? "a-accent" : "a-strong"} cx={cx} cy={cy} r="18" />
          <text className={`${i === 2 ? "a-text-accent" : "a-text"} a-mid`} x={cx} y={cy + 2.6}>{label}</text>
        </g>
      ))}
      <text className="a-text-accent" x="226" y="106">risk .87</text>
      <Packet path="M80 62 Q100 34 130 38 M170 38 Q200 34 220 62" duration={2.8} />
    </>
  );
}

/** Mergefire: a feature branch reviewed, scored and merged back into main. */
function MergeGraph() {
  return (
    <>
      <line className="a-strong" x1="18" y1="98" x2="282" y2="98" />
      <path className="a-strong" d="M58 98 C78 98 76 52 100 52 H150 C174 52 172 98 192 98" />
      {[38, 58, 250].map(x => (
        <circle key={x} className="a-dot" cx={x} cy="98" r="4.5" />
      ))}
      {[112, 140].map(x => (
        <circle key={x} className="a-dot" cx={x} cy="52" r="4.5" />
      ))}
      <circle className="a-accent a-ring" cx="192" cy="98" r="6" />
      <circle className="a-fill-accent" cx="192" cy="98" r="5" />
      <text className="a-text" x="18" y="116">main</text>
      <text className="a-text" x="100" y="70">feat/review</text>
      <path className="a-line" d="M100 14 H160 V30 H146 L140 37 L136 30 H100 Z" />
      <text className="a-text" x="105" y="25">2 comments</text>
      <rect className="a-box" x="206" y="12" width="76" height="52" />
      <line className="a-faint" x1="206" y1="24" x2="282" y2="24" />
      <text className="a-text" x="211" y="21">diff · risk</text>
      <rect className="a-fill-accent" x="268" y="16" width="10" height="4" rx="2" />
      <text className="a-text-accent" x="211" y="35">+</text>
      <rect className="a-fill-accent a-blink" x="219" y="31" width="48" height="3" />
      <text className="a-text" x="211" y="45">−</text>
      <rect className="a-fill a-dim" x="219" y="41" width="34" height="3" />
      <text className="a-text-accent" x="211" y="55">+</text>
      <rect className="a-fill-accent a-blink" style={delay(0.6)} x="219" y="51" width="56" height="3" />
      <Packet path="M58 98 C78 98 76 52 100 52 H150 C174 52 172 98 192 98" duration={3.6} />
    </>
  );
}

/** SQL-driven analysis: raw purchase rows, a CTE, and customer value tiers. */
function SqlTiers() {
  const tiers: [number, string][] = [
    [74, "T1"],
    [52, "T2"],
    [34, "T3"],
    [18, "T4"],
  ];
  return (
    <>
      <rect className="a-box" x="16" y="16" width="92" height="96" />
      <rect className="a-fill a-dim" x="16" y="16" width="92" height="14" />
      <line className="a-faint" x1="46" y1="16" x2="46" y2="112" />
      <line className="a-faint" x1="78" y1="16" x2="78" y2="112" />
      {[46, 62, 78, 94].map(y => (
        <line key={y} className="a-faint" x1="16" y1={y} x2="108" y2={y} />
      ))}
      <rect className="a-fill-accent a-scan" x="16" y="30" width="92" height="16" opacity=".28" />
      <text className="a-text" x="20" y="26">id</text>
      <text className="a-text" x="50" y="26">qty</text>
      <text className="a-text" x="82" y="26">amt</text>
      <text className="a-text" x="122" y="44">WITH</text>
      <text className="a-text-accent" x="122" y="58">tiers AS (</text>
      <text className="a-text" x="128" y="72">NTILE(4)</text>
      <text className="a-text" x="122" y="86">)</text>
      <line className="a-faint" x1="108" y1="64" x2="118" y2="64" />
      <line className="a-faint" x1="176" y1="64" x2="186" y2="64" />
      <line className="a-strong" x1="190" y1="106" x2="284" y2="106" />
      {tiers.map(([h, label], i) => (
        <g key={label}>
          <rect
            className={`${i === 0 ? "a-fill-accent" : "a-fill a-dim"} a-grow`}
            style={delay(i * 0.18)}
            x={196 + i * 22}
            y={106 - h}
            width="14"
            height={h}
          />
          <text className="a-text a-mid" x={203 + i * 22} y="118">{label}</text>
        </g>
      ))}
    </>
  );
}

/** Quantum circuit DBMS: five normalized tables joined around the circuits table. */
function SchemaGraph() {
  const table = (x: number, y: number, name: string, accent = false): ReactNode => (
    <g key={name}>
      <rect className={accent ? "a-accent" : "a-box"} x={x} y={y} width="66" height="38" />
      <rect className={accent ? "a-fill-accent" : "a-fill a-dim"} x={x} y={y} width="66" height="11" />
      <text className={`a-text ${accent ? "a-on-accent" : ""}`} x={x + 4} y={y + 8}>{name}</text>
      <circle className="a-fill-accent" cx={x + 6} cy={y + 19} r="1.8" />
      <line className="a-line" x1={x + 12} y1={y + 19} x2={x + 44} y2={y + 19} />
      <line className="a-faint" x1={x + 6} y1={y + 27} x2={x + 52} y2={y + 27} />
      <line className="a-faint" x1={x + 6} y1={y + 33} x2={x + 36} y2={y + 33} />
    </g>
  );
  const links = [
    "M83 31 H100 V58 H117",
    "M83 99 H100 V72 H117",
    "M183 58 H200 V31 H217",
    "M183 72 H200 V99 H217",
  ];
  return (
    <>
      {links.map(d => (
        <path key={d} className="a-line" d={d} />
      ))}
      {table(17, 12, "backends")}
      {table(17, 80, "runs")}
      {table(117, 46, "circuits", true)}
      {table(217, 12, "gates")}
      {table(217, 80, "results")}
      <text className="a-text a-mid" x="150" y="30">5 tables · 15k rows</text>
      <text className="a-text a-mid" x="150" y="112">JOIN ON circuit_id</text>
      <Packet path="M83 31 H100 V58 H117" duration={2.4} />
      <Packet path="M183 72 H200 V99 H217" duration={2.4} begin={1.2} />
    </>
  );
}

const artwork: Record<string, () => ReactNode> = {
  "01": QuantumCircuit,
  "02": BrailleBridge,
  "03": MarkovStates,
  "04": MergeGraph,
  "05": SqlTiers,
  "06": SchemaGraph,
};

export default function ProjectArt({ number }: { number: string }) {
  const Art = artwork[number];
  if (!Art) return null;
  return (
    <svg viewBox="0 0 300 130" preserveAspectRatio="xMidYMid meet" role="presentation">
      <Art />
    </svg>
  );
}
