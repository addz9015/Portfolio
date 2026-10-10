import {
  FormEvent,
  PointerEvent as ReactPointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Circle,
  Download,
  FileText,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  Terminal,
  RotateCcw,
  X,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import AsciiWaves from "@/components/AsciiWaves";
import ProjectArt from "@/components/ProjectArt";

type Experience = {
  year: string;
  dates: string;
  index: string;
  org: string;
  company: string;
  role: string;
  bullets: string[];
  stack: string[];
};

const experiences: Experience[] = [
  {
    year: "2026",
    dates: "Mar 2026 – Aug 2026",
    index: "01",
    org: "R&D",
    company: "Marketing Makhni",
    role: "Research & Development Intern",
    bullets: [
      "Conducted competitive analysis for 10+ companies, gathering and structuring market, competitor, and pricing data through web research, scraping, and client-side data acquisition to support business and strategic decision-making.",
      "Led client-side research projects from requirement gathering to final delivery, coordinating with stakeholders, managing data acquisition workflows, and ensuring timely delivery of analysis-ready datasets and project outputs.",
    ],
    stack: ["Competitive analysis", "Web scraping", "Market research"],
  },
  {
    year: "2025",
    dates: "Dec 2025 – Mar 2026",
    index: "02",
    org: "AI",
    company: "Adihuman AI",
    role: "AI Research Intern · Research & Development",
    bullets: [
      "Developed structured evaluation rubrics for GAIA Level 3 tasks, covering multiple failure modes and enabling consistent assessment of complex AI agent outputs.",
      "Evaluated multi-step LangGraph conversational workflows across 50+ edge cases, using prompt frameworks with explicit constraints to improve consistency in voice, tone, and emotional register.",
    ],
    stack: ["GAIA", "LangGraph", "AI evaluation"],
  },
  {
    year: "2025",
    dates: "Summer 2025",
    index: "03",
    org: "DESIGN",
    company: "Bhavyata Foundation",
    role: "Graphic Design Intern",
    bullets: [
      "Created educational visual materials and learning aids for early childhood programs, including worksheets, flashcards, posters, and classroom displays.",
      "Supported lesson planning, bilingual content preparation, and activity-based teaching resources.",
      "Contributed to environmental awareness initiatives through event design and documentation support.",
    ],
    stack: ["Graphic design", "Education", "Bilingual content"],
  },
];

const projects = [
  {
    number: "01",
    title: "Noise-aware\nquantum ML",
    description:
      "A hybrid quantum-classical image classifier, ResNet18 features into a 4-qubit variational circuit, studying how quantum noise breaks it and which mitigations recover accuracy.",
    tags: ["PennyLane", "PyTorch", "Quantum ML"],
    kind: "QUANTUM ML / 2026",
    accent: "blue",
    repo: "https://github.com/addz9015/QML",
  },
  {
    number: "02",
    title: "Braille\nBridge",
    description:
      "End-to-end tactile Braille recognition: a denoising autoencoder and CNN-LSTM with CTC decoding, served through FastAPI and an accessible React interface with speech output.",
    tags: ["PyTorch", "FastAPI", "React"],
    kind: "ACCESSIBILITY / 2025",
    accent: "paper",
    repo: "https://github.com/addz9015/BrailleBridge",
  },
  {
    number: "03",
    title: "Data analysis\nagent",
    description:
      "StochClaim, a five-layer insurance fraud pipeline combining Hidden Markov Models, gradient boosting, and LLM explanations to score, route, and explain every claim.",
    tags: ["HMM", "Groq LLM", "Streamlit"],
    kind: "AI AGENT / 2026",
    accent: "ink",
    repo: "https://github.com/addz9015/DataAnalysisAgent",
  },
  {
    number: "04",
    title: "Mergefire\nPR copilot",
    description:
      "A GitHub webhook service that reviews pull requests with Llama 3.3, posts inline comments, scores merge risk, and enforces approval gates with Slack and Discord alerts.",
    tags: ["Python", "Groq", "GitHub API"],
    kind: "DEV TOOLS / 2026",
    accent: "blue",
    repo: "https://github.com/addz9015/Mergefire",
  },
  {
    number: "05",
    title: "SQL-driven\nanalysis",
    description:
      "Customer analytics on retail purchase data: pandas cleaning and feature engineering, CTE-based SQL segmentation of customer value tiers, and a Power BI dashboard.",
    tags: ["SQL", "Pandas", "Power BI"],
    kind: "ANALYTICS / 2026",
    accent: "paper",
    repo: "https://github.com/addz9015/SQL-Driven-Analysis",
  },
  {
    number: "06",
    title: "Quantum\ncircuit DBMS",
    description:
      "A full-stack DBMS over 15,000 IBM Quantum circuit experiments: five normalized SQLite tables, 18+ FastAPI endpoints, and a Streamlit dashboard for search, comparison, and SQL practice.",
    tags: ["SQLite", "FastAPI", "Streamlit"],
    kind: "DATABASE / 2026",
    accent: "ink",
    repo: "https://github.com/horserider2146/quantum-circuit-dbms",
  },
];

// Back-of-card details, taken from each repository's README and code.
const projectDetails: Record<
  string,
  { summary: string; points: string[]; stack: string[]; team?: string }
> = {
  "01": {
    summary:
      "How does quantum noise break a hybrid classifier, and what is the cheapest way to fix it?",
    points: [
      "ResNet18 features feed a 4-qubit, 3-layer variational circuit and a linear readout, trained end to end",
      "Stays within ~0.015 of noise-free accuracy up to noise p ≈ 0.1, then collapses past p ≈ 0.15",
      "ROC-AUC holds near 0.98 under heavy noise: the decision boundary shifts, the signal survives",
      "Re-fitting only the classical readout restores 0.94–0.955 accuracy, outperforming ZNE",
    ],
    stack: ["PennyLane", "PyTorch", "ResNet18", "ZNE"],
  },
  "02": {
    summary:
      "Reading Braille from raw tactile sensor signals, all the way from robot fingertip data to spoken words.",
    points: [
      "Built on the iCub robot's 12-taxel tactile Braille recordings for a–z and space",
      "A 1D convolutional denoising autoencoder cleans the signal before a CNN-LSTM with CTC decoding",
      "Ablation studies isolate how much the denoising stage contributes",
      "React front end with dot-tap input, speech output, and a letter-by-letter spell mode",
    ],
    stack: ["PyTorch", "FastAPI", "React", "Vite"],
    team: "With Thejovati Narayanan & Lakshita Mukti",
  },
  "03": {
    summary:
      "StochClaim: an insurance fraud platform that scores, routes, and explains every claim across five layers.",
    points: [
      "Hidden Markov Models combined with gradient boosting for fraud risk scoring",
      "Markov-chain routing through four review states into Approved, Denied, or Fraud Detected",
      "Llama 3.3 70B via Groq writes a plain-language explanation for each decision",
      "On 1,000 claims, 660 were flagged for human review; scoring runs in ~4–6 s without LLM explanations",
    ],
    stack: ["scikit-learn", "Groq", "FastAPI", "Streamlit"],
  },
  "04": {
    summary:
      "An AI reviewer that listens to a repository's webhooks and reviews every pull request as it opens or updates.",
    points: [
      "Review Copilot sends the diff to Llama 3.3 70B and posts inline security and code-quality comments",
      "Risk Radar scores each PR low, medium, or high from sensitive paths, test coverage, and timing",
      "High-risk PRs get a risk label, a two-approval gate, and Slack or Discord alerts",
      "Flags risky merges after 3 pm on a Friday; every webhook is signature-verified",
    ],
    stack: ["Python", "Groq", "GitHub API", "Webhooks"],
  },
  "05": {
    summary:
      "Turning 3,900 retail purchases into customer segments a marketing team could act on.",
    points: [
      "Cleaned and standardised the data in pandas, imputing missing ratings with the median",
      "Engineered a CLV proxy, value and behaviour loyalty scores, and a three-tier value segmentation",
      "Five CTE-based SQL queries: value tiers, promo dependence, geographic demand, category affinity, ideal customer",
      "Six segments, from High-Value Organic to Low-Value Promo-Dependent, visualised in Power BI",
    ],
    stack: ["SQLite", "Pandas", "Power BI", "Excel"],
  },
  "06": {
    summary:
      "A full database system over 15,000 IBM Quantum circuit experiments, from schema to dashboard.",
    points: [
      "Five normalized tables (circuits, qubits, gates, results, noise models) linked by circuit_id",
      "FastAPI backend with CRUD, soft delete and restore, bulk upserts, audit logs, and data-quality checks",
      "Quantum extensions for noise-aware scoring, mitigation analytics, and backend recommendations",
      "Streamlit dashboard with search, side-by-side circuit comparison, and a live SQL playground",
    ],
    stack: ["SQLite", "FastAPI", "Pydantic", "Streamlit"],
    team: "Team project with horserider2146",
  },
};

const interests = [
  { label: "AI / ML", width: "90%" },
  { label: "RESEARCH", width: "86%" },
  { label: "AGENTIC AI", width: "84%" },
  { label: "DATA", width: "78%" },
  { label: "QUANTUM", width: "68%" },
];

const achievements: {
  eyebrow: string;
  title: string;
  detail: string;
  tone: string;
  certificate?: Certificate;
}[] = [
  {
    eyebrow: "PROGRAM / 2026",
    title: "Qiskit Global\nSummer School 2026",
    detail:
      "Selected for the Excellence Batch and completed a deeper exploration of quantum computing, building stronger fundamentals through hands-on problem-solving, experimentation, and practical work with IBM Quantum systems.",
    tone: "dark",
    certificate: {
      src: `${import.meta.env.BASE_URL}certificates/qiskit-gss-2026-badge.png`,
      title: "Qiskit Global Summer School 2026 – Quantum Excellence",
      note: "IBM digital badge, Advanced level, earned through the Qiskit Global Summer School 2026 Excellence Batch.",
      badge: true,
    },
  },
  {
    eyebrow: "RESEARCH / ACCEPTED",
    title: "Paper accepted\nat COMSYS 2026",
    detail:
      "A hybrid LLM framework for emission-constrained supply chains with renewable-aware reinforcement learning, combining lifecycle emission constraints with intelligent optimization.",
    tone: "blue",
    certificate: {
      src: `${import.meta.env.BASE_URL}certificates/comsys-2026.jpg`,
      title: "COMSYS 2026 Paper Presenter Certificate",
      note: 'Presenter of "A Hybrid LLM Framework for Emission-Constrained Supply Chains with Renewable-Aware RL" at the 7th International Conference on Frontiers in Computing and Systems, June 24–26, 2026, Mladá Boleslav, Czech Republic. Organised by Škoda Auto University and COMSYS Educational Trust, Kolkata.',
    },
  },
  {
    eyebrow: "PAPER PRESENTATION / 2025",
    title: "Runner-up at\nPolarizer 2025",
    detail:
      "Secured second place for research on Quantum Key Distribution, exploring secure key exchange through quantum mechanics, the SCWZ protocol, and simulation of the complete communication process.",
    tone: "light",
    certificate: {
      src: `${import.meta.env.BASE_URL}certificates/polarizer-2025.jpg`,
      title: "Polarizer 2025 Certificate of Appreciation",
      note: "2nd place for an innovative research paper at Polarizer 2025, organised by the Basic Science & Humanities Department of NMIMS MPSTME, Mumbai, on 1 March 2025.",
    },
  },
  {
    eyebrow: "PAPER PRESENTATION / 2025",
    title: "Runner-up at\nTechSkript 2025",
    detail:
      "Secured second place for a comparative study of LLMs and SLMs for text summarization, evaluating quality, inference efficiency, and real-time performance while exploring a hybrid approach.",
    tone: "dark",
    certificate: {
      src: `${import.meta.env.BASE_URL}certificates/techskript-2025.jpg`,
      title: "TechSkript '25 Certificate of Merit",
      note: "1st Runner Up (team Stranger Things) at TechSkript '25, the poster and paper presentation competition organised by IEEE NMIMS MPSTME as part of Tech Safar 2025, NMIMS MPSTME's hardware techfest, on 12 April 2025.",
    },
  },
  {
    eyebrow: "SPORT / NATIONAL LEVEL",
    title: "Gold medalist &\nnational athlete",
    detail:
      "National gold medalist in archery and national-level player in rifle shooting.",
    tone: "blue",
    certificate: {
      src: `${import.meta.env.BASE_URL}certificates/cisce-nationals.jpg`,
      title: "CISCE National Sports & Games 2019 Certificate of Merit",
      note: "First position in Archery (Recurve), Under-14 Girls, at the Council's National Sports & Games 2019 (CISCE, affiliated to SGFI), held at La Martiniere College, Lucknow on 20 August 2019.",
    },
  },
  {
    eyebrow: "OPEN SOURCE / 2026",
    title: "SWOC 2026\nopen source",
    detail:
      "Received a Certificate of Appreciation from Social Winter of Code (SWOC) 2026 for participating in the program and contributing to open-source projects, the start of my open-source journey.",
    tone: "light",
    certificate: {
      src: `${import.meta.env.BASE_URL}certificates/swoc-2026.jpg`,
      title: "SWOC 2026 Certificate of Appreciation",
      note: "Signed by Abhishek Mankuskar (Creator & Leader, SWOC) and Jay Saadana (Creator, SWOC)",
      id: "d376053c7c6bc51761fcac1376bd23efadd",
    },
  },
];

type Certificate = {
  src: string;
  title: string;
  note: string;
  id?: string;
  // square digital badges get a compact preview and a smaller viewer
  badge?: boolean;
};

const navItems = [
  ["01", "About", "about"],
  ["02", "Experience", "experience"],
  ["03", "Projects", "projects"],
  ["04", "Achievements", "achievements"],
  ["05", "Contact", "contact"],
];

const phrases = [
  "Researching",
  "Experimenting",
  "Building",
  "Exploring",
  "Learning",
  "Prototyping",
  "Investigating",
  "Iterating",
];

function SplitFlap({
  value,
  revealed,
  round,
  offset = 0,
}: {
  value: string;
  revealed: boolean;
  round: number;
  offset?: number;
}) {
  const characters = useMemo(() => value.split(""), [value]);
  return (
    <div className="flap-board" aria-hidden={!revealed}>
      {characters.map((character, index) => (
        <span
          className={`flap-tile ${revealed ? "is-revealed" : ""}`}
          key={`${round}-${index}`}
          style={{ animationDelay: `${(offset + index) * 140}ms` }}
        >
          <span
            className="flap-letter"
            style={{ animationDelay: `${(offset + index) * 140}ms` }}
          >
            {character}
          </span>
        </span>
      ))}
    </div>
  );
}

// Horizontal card rail: tracks the current card, steps one card at a time, and adds
// click-and-drag for mouse users (touch and trackpads keep native scrolling).
function useCardRail(count: number) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; scroll: number; moved: boolean } | null>(
    null
  );
  const [index, setIndex] = useState(0);
  const [edge, setEdge] = useState({ start: true, end: false });

  const cardStep = (rail: HTMLDivElement) => {
    const card = rail.firstElementChild as HTMLElement | null;
    return card
      ? card.offsetWidth + parseFloat(getComputedStyle(rail).columnGap || "0")
      : rail.clientWidth;
  };

  const update = () => {
    const rail = ref.current;
    if (!rail) return;
    const atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
    setIndex(atEnd ? count - 1 : Math.round(rail.scrollLeft / cardStep(rail)));
    setEdge({ start: rail.scrollLeft <= 4, end: atEnd });
  };

  // the end state depends on layout, so measure once mounted and on resize
  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const step = (direction: 1 | -1) => {
    const rail = ref.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * cardStep(rail), behavior: "smooth" });
  };

  const endDrag = () => {
    drag.current = null;
    ref.current?.classList.remove("is-dragging");
  };

  const railProps = {
    ref,
    onScroll: update,
    onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse" || !ref.current) return;
      drag.current = {
        x: event.clientX,
        scroll: ref.current.scrollLeft,
        moved: false,
      };
    },
    onPointerMove: (event: ReactPointerEvent<HTMLDivElement>) => {
      const rail = ref.current;
      if (!drag.current || !rail) return;
      const dx = event.clientX - drag.current.x;
      if (!drag.current.moved && Math.abs(dx) > 4) {
        drag.current.moved = true;
        rail.classList.add("is-dragging");
        rail.setPointerCapture(event.pointerId);
      }
      if (drag.current.moved) rail.scrollLeft = drag.current.scroll - dx;
    },
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
    onPointerLeave: endDrag,
  };

  return { index, edge, step, railProps };
}

function RailControls({
  label,
  count,
  rail,
}: {
  label: string;
  count: number;
  rail: ReturnType<typeof useCardRail>;
}) {
  return (
    <div className="rail-controls">
      <span className="rail-hint-label mono">
        <ArrowRight size={14} /> Drag / swipe to browse
      </span>
      <span className="rail-count mono">
        {String(rail.index + 1).padStart(2, "0")} /{" "}
        {String(count).padStart(2, "0")}
      </span>
      <div className="rail-buttons">
        <button
          type="button"
          className="rail-button"
          onClick={() => rail.step(-1)}
          disabled={rail.edge.start}
          aria-label={`Previous ${label}`}
        >
          <ArrowLeft size={18} />
        </button>
        <button
          type="button"
          className="rail-button"
          onClick={() => rail.step(1)}
          disabled={rail.edge.end}
          aria-label={`Next ${label}`}
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeExperience, setActiveExperience] = useState(0);
  const [activePhrase, setActivePhrase] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [revealRound, setRevealRound] = useState(0);
  const [photoFailed, setPhotoFailed] = useState(false);
  const [flippedProjects, setFlippedProjects] = useState<
    Record<string, boolean>
  >({});
  const [exploreVisible, setExploreVisible] = useState(false);
  const exploreRef = useRef<HTMLElement>(null);
  const projectRail = useCardRail(projects.length);
  const [openCertificate, setOpenCertificate] = useState<Certificate | null>(
    null
  );
  const achievementRail = useCardRail(achievements.length);

  useEffect(() => {
    const section = exploreRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setExploreVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActivePhrase(current => (current + 1) % phrases.length),
      2400
    );
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="site-shell">
      <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
        <a
          href="#top"
          className="brand-lockup"
          onClick={() => setMenuOpen(false)}
        >
          <span className="brand-mark">AN</span>
          <span className="brand-name">Advika Nagool</span>
        </a>
        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen(open => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={`site-links ${menuOpen ? "is-open" : ""}`}>
          {navItems.map(([number, label, id]) => (
            <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>
              <span>{number}</span>
              {label}
            </a>
          ))}
        </nav>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              type="button"
              className="nav-resume"
              onClick={() => setMenuOpen(false)}
            >
              Resume <Download size={15} />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="resume-dialog">
            <AlertDialogHeader>
              <p className="resume-dialog-kicker mono">
                <FileText size={14} /> Advika_Nagool_Resume.pdf
              </p>
              <AlertDialogTitle className="resume-dialog-title">
                Download my resume?
              </AlertDialogTitle>
              <AlertDialogDescription className="resume-dialog-copy">
                A two-page PDF covering my education, experience, projects, and
                research.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="resume-dialog-actions">
              <AlertDialogCancel className="resume-dialog-cancel">
                Not now
              </AlertDialogCancel>
              <AlertDialogAction asChild className="resume-dialog-confirm">
                <a
                  href={`${import.meta.env.BASE_URL}Advika_Nagool_Resume.pdf`}
                  download="Advika_Nagool_Resume.pdf"
                >
                  Yes, download <Download size={15} />
                </a>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-gridline" aria-hidden="true" />
          <div className="hero-topline eyebrow-row">
            <span>
              <Circle size={9} fill="currentColor" /> Open to thoughtful work
            </span>
            <span className="mono">DATA SCIENCE / AI & ML / RESEARCH</span>
          </div>
          <div className="hero-layout">
            <div className="hero-copy">
              <h1>
                Building systems
                <br />
                <em>with a point of view.</em>
              </h1>
              <p className="hero-intro">
                I&apos;m Advika a data science student, researcher, and builder
                exploring AI, machine learning, and intelligent systems. I care
                about understanding how things work, experimenting with ideas,
                and building technology that is genuinely useful.
              </p>
              <div className="hero-actions">
                <a className="button button-dark" href="#projects">
                  View projects <ArrowUpRight size={16} />
                </a>
                <a className="text-link" href="#contact">
                  Get in touch <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
            <div className="hero-terminal-wrap">
              <div className="hero-terminal-head mono">
                <span>
                  <i className="window-dot red" />
                  <i className="window-dot yellow" />
                  <i className="window-dot green" />
                </span>
                <span>advika@portfolio:~</span>
              </div>
              <div className="hero-terminal-body">
                <div className="terminal-line">
                  <span className="prompt">&gt;</span>
                  <button
                    type="button"
                    className={`whoami-button ${revealRound > 0 ? "is-used" : ""}`}
                    onClick={() => setRevealRound(round => round + 1)}
                    aria-label="Run whoami to reveal name"
                  >
                    whoami
                  </button>
                </div>
                <div
                  className="flap-stack"
                  aria-label={revealRound > 0 ? "Advika Nagool" : undefined}
                >
                  <SplitFlap
                    value="ADVIKA"
                    revealed={revealRound > 0}
                    round={revealRound}
                  />
                  <SplitFlap
                    value="NAGOOL"
                    revealed={revealRound > 0}
                    round={revealRound}
                    offset={6}
                  />
                </div>
                <div className="terminal-line dim">
                  <span className="prompt">&gt;</span> currently{" "}
                  <span className="blue-text">{phrases[activePhrase]}</span>
                  <span className="cursor" />
                </div>
              </div>
              <div className="terminal-foot mono">
                <span>
                  <Terminal size={13} /> research_mode: on
                </span>
                <button
                  type="button"
                  className="terminal-foot-action"
                  onClick={() => setRevealRound(round => round + 1)}
                >
                  click whoami <ArrowUpRight size={12} />
                </button>
              </div>
            </div>
          </div>
          <div className="hero-bottomline">
            <span className="scroll-cue">
              <ArrowDownRight size={17} /> Scroll to explore
            </span>
            <div className="hero-stat">
              <strong>03</strong>
              <span>areas of interest</span>
            </div>
            <div className="hero-stat">
              <strong>∞</strong>
              <span>questions to explore</span>
            </div>
            <div className="hero-stat">
              <strong>01</strong>
              <span>curiosity-driven mindset</span>
            </div>
          </div>
        </section>

        <section className="manifesto-section section-shell" id="about">
          <div className="section-kicker">
            <span>01 / ABOUT</span>
            <span className="rule" />
          </div>
          <div className="manifesto-grid">
            <div className="manifesto-main">
              <p className="display-statement">
                Not just a list of things I&apos;ve done.
                <br />
                <span>I like the messy middle.</span>
              </p>
              <div className="manifesto-copy">
                <p className="manifesto-lead">
                  That is where I like to spend my time{" "}
                  <mark>understanding problems from the inside</mark>,
                  questioning what I know, and experimenting until an idea
                  starts to work. I enjoy taking complex ideas apart and
                  figuring out what makes them tick, whether I&apos;m working
                  with data, building an AI system, reading research, or
                  following an unexpected rabbit hole. I&apos;m usually driven
                  by the same question: <mark>why does this work?</mark>
                </p>
                <p>
                  My interests span{" "}
                  <strong>
                    data science, machine learning, AI, and quantum computing
                  </strong>
                  , but curiosity rarely stays within one field. I like learning
                  by trying, refining, and sometimes getting things wrong
                  because the failed approach, unexpected result, or small
                  correction can teach you more than the final solution.
                </p>
                <blockquote>
                  That instinct follows me outside technology too. From hitting
                  the{" "}
                  <strong>bull&apos;s-eye in archery and rifle shooting</strong>{" "}
                  to getting a guitar chord just right, I&apos;ve learned to
                  appreciate{" "}
                  <em>precision, patience, and the tiny adjustments</em> that
                  make a difference. Different interests, same habit: keep
                  experimenting, keep refining, and follow the question wherever
                  it leads.
                </blockquote>
              </div>
            </div>
            <aside className="about-photo-column">
              <figure className="about-photo">
                <span className="about-photo-dots" aria-hidden="true" />
                <div className="about-photo-frame">
                  {photoFailed ? (
                    <div className="about-photo-fallback" aria-hidden="true">
                      <span>AN</span>
                      <small>add /advika-photo.jpg</small>
                    </div>
                  ) : (
                    <img
                      src={`${import.meta.env.BASE_URL}advika-photo.jpg`}
                      alt="Advika Nagool smiling in a teal blazer"
                      onError={() => setPhotoFailed(true)}
                    />
                  )}
                </div>
              </figure>
            </aside>
          </div>
        </section>

        <section className="experience-section section-shell" id="experience">
          <div className="section-kicker">
            <span>02 / EXPERIENCE</span>
            <span className="rule" />
          </div>
          <div className="section-heading-row">
            <h2>
              Following the
              <br />
              <em>interesting thread.</em>
            </h2>
            <p>
              From research and AI to data, strategy, and design each experience
              has taught me something different about how I like to work.
            </p>
          </div>
          <div className="timeline-layout">
            <div
              className="timeline-nav"
              role="tablist"
              aria-label="Experience timeline"
            >
              {experiences.map((experience, index) => (
                <button
                  key={experience.index}
                  className={`timeline-node ${activeExperience === index ? "is-active" : ""}`}
                  onClick={() => setActiveExperience(index)}
                  role="tab"
                  aria-selected={activeExperience === index}
                >
                  <span className="timeline-dot" />
                  <span className="timeline-year">{experience.year}</span>
                  <span className="timeline-role">{experience.org}</span>
                </button>
              ))}
            </div>
            <div
              className="experience-panel"
              key={experiences[activeExperience].index}
            >
              <div className="panel-topline">
                <span className="mono">
                  {experiences[activeExperience].index} /{" "}
                  {experiences[activeExperience].org}
                </span>
                <span className="mono">
                  {experiences[activeExperience].dates}
                </span>
              </div>
              <h3>{experiences[activeExperience].company}</h3>
              <p className="panel-copy">{experiences[activeExperience].role}</p>
              <div className="panel-details">
                <ul>
                  {experiences[activeExperience].bullets.map(bullet => (
                    <li key={bullet}>
                      <Check size={15} />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className="tag-list">
                  {experiences[activeExperience].stack.map(tag => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="projects-section section-shell" id="projects">
          <div className="section-kicker">
            <span>03 / PROJECTS</span>
            <span className="rule" />
          </div>
          <div className="section-heading-row project-heading">
            <h2>
              A small archive of
              <br />
              <em>things I&apos;ve made.</em>
            </h2>
            <p>
              Projects are where ideas get specific. Browse a few experiments
              across quantum ML, accessibility, AI agents, and data.
            </p>
          </div>
          <div className="project-rail" {...projectRail.railProps}>
            {projects.map(project => {
              const details = projectDetails[project.number];
              const name = project.title.replace("\n", " ");
              const flipped = !!flippedProjects[project.number];
              const toggleFlip = () =>
                setFlippedProjects(current => ({
                  ...current,
                  [project.number]: !current[project.number],
                }));
              return (
                <article
                  className={`project-card ${project.accent} ${flipped ? "is-flipped" : ""}`}
                  key={project.number}
                >
                  <div className="project-flip">
                    <div className="project-face project-front" inert={flipped}>
                      <div className="project-card-top">
                        <span className="mono">{project.kind}</span>
                        <span className="project-number">{project.number}</span>
                      </div>
                      <div className="project-art" aria-hidden="true">
                        <ProjectArt number={project.number} />
                      </div>
                      <h3>
                        {project.title.split("\n").map(line => (
                          <span key={line}>{line}</span>
                        ))}
                      </h3>
                      <p>{project.description}</p>
                      <div className="project-card-bottom">
                        <div className="tag-list tag-pairs">
                          {project.tags
                            .filter((_, i) => i % 2 === 0)
                            .map((tag, row) => (
                              <div className="tag-row" key={tag}>
                                {project.tags
                                  .slice(row * 2, row * 2 + 2)
                                  .map(pairTag => (
                                    <span className="tag" key={pairTag}>
                                      {pairTag}
                                    </span>
                                  ))}
                              </div>
                            ))}
                        </div>
                        <div className="project-actions">
                          <a
                            className="project-icon-button"
                            href={project.repo}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`View ${name} on GitHub`}
                          >
                            <Github size={17} />
                          </a>
                          <button
                            type="button"
                            className="project-icon-button"
                            onClick={toggleFlip}
                            aria-label={`Show details for ${name}`}
                          >
                            <ArrowUpRight size={17} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div
                      className="project-face project-back"
                      inert={!flipped}
                      data-lenis-prevent
                    >
                      <div className="project-card-top">
                        <span className="mono">
                          {project.number} / Project details
                        </span>
                        <button
                          type="button"
                          className="project-back-close"
                          onClick={toggleFlip}
                          aria-label={`Back to ${name} overview`}
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <h4>{name}</h4>
                      <p className="project-back-summary">{details.summary}</p>
                      <ul className="project-points">
                        {details.points.map(point => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                      <div className="project-back-foot">
                        <div className="tag-list">
                          {details.stack.map(tag => (
                            <span className="tag" key={tag}>
                              {tag}
                            </span>
                          ))}
                        </div>
                        {details.team && (
                          <p className="project-team mono">{details.team}</p>
                        )}
                        <div className="project-back-links">
                          <a
                            href={project.repo}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Github size={15} /> View code{" "}
                            <ExternalLink size={12} />
                          </a>
                          <button type="button" onClick={toggleFlip}>
                            <RotateCcw size={14} /> Flip back
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <RailControls
            label="projects"
            count={projects.length}
            rail={projectRail}
          />
        </section>

        <section
          id="exploring"
          className={`explore-section section-shell ${exploreVisible ? "is-visible" : ""}`}
          ref={exploreRef}
        >
          <div className="explore-waves" aria-hidden="true">
            <AsciiWaves opacity={0.62} />
          </div>
          <div className="section-kicker">
            <span>CURRENTLY EXPLORING</span>
            <span className="rule" />
          </div>
          <div className="explore-grid">
            <div>
              <h2>
                Curiosity has
                <br />
                <em>many addresses.</em>
              </h2>
              <p className="explore-intro">
                The subjects change. The habit stays: learn enough to ask a
                sharper question, then build something to test it.
              </p>
            </div>
            <div className="interest-bars">
              {interests.map((interest, index) => (
                <div className="interest-row" key={interest.label}>
                  <div className="interest-meta mono">
                    <span>{interest.label}</span>
                  </div>
                  <div className="interest-track">
                    <span
                      style={{
                        width: interest.width,
                        transitionDelay: `${index * 140}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="achievements-section section-shell"
          id="achievements"
        >
          <div className="section-kicker">
            <span>04 / ACHIEVEMENTS</span>
            <span className="rule" />
          </div>
          <div className="section-heading-row">
            <h2>
              Keep the receipts.
              <br />
              <em>Keep the wonder too.</em>
            </h2>
            <p>
              A few milestones that shaped how I learn, research, compete, and
              build.
            </p>
          </div>
          <div className="achievement-grid" {...achievementRail.railProps}>
            {achievements.map((achievement, index) => (
              <article
                className={`achievement-card ${achievement.tone}`}
                key={achievement.title}
              >
                <div className="achievement-index">0{index + 1}</div>
                <p className="mono">{achievement.eyebrow}</p>
                <h3>
                  {achievement.title.split("\n").map(line => (
                    <span key={line}>{line}</span>
                  ))}
                </h3>
                <div className="achievement-foot">
                  <p className="achievement-detail">{achievement.detail}</p>
                  {achievement.certificate ? (
                    <button
                      type="button"
                      className="achievement-arrow"
                      onClick={() =>
                        setOpenCertificate(achievement.certificate ?? null)
                      }
                      aria-label={`View ${achievement.certificate.title}`}
                    >
                      <ArrowUpRight size={19} />
                    </button>
                  ) : (
                    <span className="achievement-arrow">
                      <ArrowUpRight size={19} />
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
          <RailControls
            label="achievements"
            count={achievements.length}
            rail={achievementRail}
          />
          <Dialog
            open={openCertificate !== null}
            onOpenChange={open => !open && setOpenCertificate(null)}
          >
            <DialogContent
              className={`certificate-dialog max-h-[92svh] gap-0 overflow-y-auto p-0 ${openCertificate?.badge ? "sm:max-w-[440px]" : "sm:max-w-[min(960px,calc(100%-2rem))]"}`}
            >
              {openCertificate && (
                <>
                  <img
                    className="certificate-full"
                    src={openCertificate.src}
                    alt={openCertificate.title}
                  />
                  <div className="certificate-caption">
                    <DialogTitle className="certificate-title">
                      {openCertificate.title}
                    </DialogTitle>
                    <DialogDescription className="certificate-note">
                      {openCertificate.note}
                    </DialogDescription>
                    {openCertificate.id && (
                      <p className="mono certificate-id">
                        Certificate ID: {openCertificate.id}
                      </p>
                    )}
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </section>

        <section className="contact-section section-shell" id="contact">
          <div className="section-kicker">
            <span>05 / CONTACT</span>
            <span className="rule" />
          </div>
          <div className="contact-grid">
            <div className="contact-copy">
              <h2>
                Have a good
                <br />
                <em>question?</em>
              </h2>
              <p>
                I&apos;m always interested in thoughtful problems, generous
                collaborators, and the space between a research question and a
                useful thing.
              </p>
              <div className="contact-links">
                <a href="mailto:advika.nagool87@nmims.in">
                  <Mail size={17} /> advika.nagool87@nmims.in
                </a>
                <a
                  href="https://www.linkedin.com/in/advika-nagool-9b04a5317/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={17} /> LinkedIn <ExternalLink size={13} />
                </a>
                <a
                  href="https://github.com/addz9015"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={17} /> GitHub <ExternalLink size={13} />
                </a>
              </div>
            </div>
            <form className="terminal-form" onSubmit={handleSubmit}>
              <div className="terminal-form-head">
                <span>
                  <i className="window-dot red" />
                  <i className="window-dot yellow" />
                  <i className="window-dot green" />
                </span>
                <span className="mono">ADVIKA@PORTFOLIO:~$</span>
                <span className="mono">CONTACT</span>
              </div>
              {!sent ? (
                <div className="terminal-form-body">
                  <label>
                    <span>
                      <b>&gt;</b> enter_name
                    </span>
                    <input name="name" placeholder="Your name" required />
                  </label>
                  <label>
                    <span>
                      <b>&gt;</b> enter_email
                    </span>
                    <input
                      name="email"
                      type="email"
                      placeholder="you@email.com"
                      required
                    />
                  </label>
                  <label>
                    <span>
                      <b>&gt;</b> write_message
                    </span>
                    <textarea
                      name="message"
                      placeholder="Let’s build something interesting..."
                      rows={3}
                      required
                    />
                  </label>
                  <button type="submit" className="execute-button">
                    [ EXECUTE ] <ArrowRight size={15} />
                  </button>
                </div>
              ) : (
                <div className="sent-state">
                  <div className="sent-icon">
                    <Check size={22} />
                  </div>
                  <p className="mono">&gt; sending_message...</p>
                  <p className="mono">&gt; connection_established</p>
                  <p className="mono blue-text">&gt; message_sent ✓</p>
                  <button
                    type="button"
                    className="text-link light-link"
                    onClick={() => setSent(false)}
                  >
                    Send another <ArrowRight size={15} />
                  </button>
                </div>
              )}
              <div className="terminal-form-foot mono">
                <span>
                  <Circle size={9} fill="currentColor" /> encrypted enough
                </span>
                <span>ctrl + enter</span>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <a href="#top" className="brand-lockup">
            <span className="brand-mark">AN</span>
            <span className="brand-name">Advika Nagool</span>
          </a>
          <p>
            Built with curiosity.
            <br />
            &copy; 2026 Advika Nagool
          </p>
          <a className="back-top" href="#top">
            Back to top <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="footer-bottom">
          <span className="mono">DATA / AI / RESEARCH / BUILD</span>
          <span className="mono">Made for the next question.</span>
        </div>
      </footer>
    </div>
  );
}
