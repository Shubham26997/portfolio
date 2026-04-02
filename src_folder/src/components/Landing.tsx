import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MdArrowOutward } from "react-icons/md";
import "./styles/Landing.css";

// ── Typewriter roles ─────────────────────────────────────────────────────────
const ROLES = [
  "Senior Backend Engineer",
  "Python & Django Architect",
  "AI Systems Builder",
  "API Design Expert",
];

// ── Terminal sequence ─────────────────────────────────────────────────────────
type LineKind = "cmd" | "out" | "ok" | "warn" | "accent" | "blank" | "cursor";
interface TermLine { kind: LineKind; text?: string; delay?: number }

const TERMINAL_LINES: TermLine[] = [
  { kind: "cmd",    text: "whoami" },
  { kind: "out",    text: "shubham_goel  ·  sde-ii @ masters_india" },
  { kind: "blank" },
  { kind: "cmd",    text: "python run_stack.py" },
  { kind: "ok",     text: "[✓] Django / FastAPI     →  REST & async APIs" },
  { kind: "ok",     text: "[✓] PostgreSQL / Redis   →  500K+ events / day" },
  { kind: "ok",     text: "[✓] Kafka pipelines      →  <100ms latency" },
  { kind: "ok",     text: "[✓] RAG (LangChain)      →  production-grade AI" },
  { kind: "ok",     text: "[✓] Docker / AWS / Azure →  99.9% uptime" },
  { kind: "blank" },
  { kind: "cmd",    text: 'echo $AVAILABILITY' },
  { kind: "accent", text: "Open to new roles — let's build something great." },
  { kind: "blank" },
  { kind: "cursor" },
];

// ── Terminal component ────────────────────────────────────────────────────────
const TerminalWindow = () => {
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState("");

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const runLine = (idx: number) => {
      if (idx >= TERMINAL_LINES.length) return;
      const line = TERMINAL_LINES[idx];

      if (line.kind === "blank" || line.kind === "cursor") {
        timer = setTimeout(() => {
          setShown((n) => n + 1);
          timer = setTimeout(() => runLine(idx + 1), 60);
        }, 180);
        return;
      }

      if (line.kind === "cmd") {
        let ci = 0;
        const typeChar = () => {
          setTyping(line.text!.slice(0, ci));
          ci++;
          if (ci <= line.text!.length) {
            timer = setTimeout(typeChar, 45 + Math.random() * 25);
          } else {
            timer = setTimeout(() => {
              setShown((n) => n + 1);
              setTyping("");
              timer = setTimeout(() => runLine(idx + 1), 140);
            }, 320);
          }
        };
        typeChar();
      } else {
        timer = setTimeout(() => {
          setShown((n) => n + 1);
          timer = setTimeout(() => runLine(idx + 1), 90);
        }, 110);
      }
    };

    timer = setTimeout(() => runLine(0), 1400);
    return () => clearTimeout(timer);
  }, []);

  const lineClass: Record<LineKind, string> = {
    cmd:    "tl-cmd",
    out:    "tl-out",
    ok:     "tl-ok",
    warn:   "tl-warn",
    accent: "tl-accent",
    blank:  "tl-blank",
    cursor: "tl-cursor",
  };

  return (
    <div className="terminal-window">
      <div className="terminal-bar">
        <div className="terminal-dots">
          <span className="tdot tdot-r" />
          <span className="tdot tdot-y" />
          <span className="tdot tdot-g" />
        </div>
        <span className="terminal-title-text">shubham@portfolio: ~/projects</span>
      </div>

      <div className="terminal-body">
        {TERMINAL_LINES.slice(0, shown).map((line, i) => {
          if (line.kind === "blank")
            return <div key={i} className="tl-blank" />;
          if (line.kind === "cursor")
            return (
              <div key={i} className="tl-line tl-cmd">
                <span className="tl-prompt">$&nbsp;</span>
                <span className="tl-cursor-blink">█</span>
              </div>
            );
          return (
            <div key={i} className={`tl-line ${lineClass[line.kind]}`}>
              {line.kind === "cmd" && <span className="tl-prompt">$&nbsp;</span>}
              {line.text}
            </div>
          );
        })}

        {typing !== "" && (
          <div className="tl-line tl-cmd">
            <span className="tl-prompt">$&nbsp;</span>
            {typing}
            <span className="tl-cursor-blink">█</span>
          </div>
        )}
      </div>
    </div>
  );
};

type TypePhase = "typing" | "hold" | "deleting";

// ── Landing ───────────────────────────────────────────────────────────────────
const Landing = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [roleIdx,   setRoleIdx]   = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase,     setPhase]     = useState<TypePhase>("typing");

  // Real char-by-char typewriter
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const target = ROLES[roleIdx];

    if (phase === "typing") {
      if (displayed.length < target.length) {
        timer = setTimeout(
          () => setDisplayed(target.slice(0, displayed.length + 1)),
          55 + Math.random() * 35
        );
      } else {
        timer = setTimeout(() => setPhase("hold"), 2200);
      }
    } else if (phase === "hold") {
      setPhase("deleting");
    } else {
      if (displayed.length > 0) {
        timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 32);
      } else {
        setRoleIdx((prev) => (prev + 1) % ROLES.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timer);
  }, [displayed, phase, roleIdx]);

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Nav & utilities
      gsap.fromTo(
        ".header, .icons-section, .nav-fade",
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.out", delay: 0.1 }
      );

      const tl = gsap.timeline({ delay: 0.25 });

      tl.fromTo(".hero-badge",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }
      )
      .fromTo(".hero-greeting",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.25"
      )
      .fromTo(".hero-name-line",
        { opacity: 0, y: 60, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "expo.out", stagger: 0.12 },
        "-=0.3"
      )
      .fromTo(".hero-role-wrap",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(".hero-stat",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.08 },
        "-=0.15"
      )
      .fromTo(".hero-cta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
        "-=0.1"
      )
      .fromTo(".terminal-window",
        { opacity: 0, x: 50, filter: "blur(8px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 1.1, ease: "expo.out" },
        "-=0.7"
      )
      .fromTo(".hero-scroll-hint",
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        "-=0.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section" ref={sectionRef} id="hero">
      {/* Grid overlay */}
      <div className="hero-grid-bg" aria-hidden />

      <div className="hero-inner">
        {/* ── Left: text ── */}
        <div className="hero-left">
          <div className="hero-badge">
            <span className="hero-badge-dot" aria-hidden />
            Available for new opportunities
          </div>

          <p className="hero-greeting">Hello, I'm</p>

          <h1 className="hero-name">
            <span className="hero-name-line">SHUBHAM</span>
            <span className="hero-name-line hero-name-outline">GOEL.</span>
          </h1>

          <div className="hero-role-wrap">
            <span className="hero-role-text">{displayed}</span>
            <span className="hero-role-cursor" aria-hidden />
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-val">5.5+</span>
              <span className="hero-stat-lbl">Years Exp.</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat">
              <span className="hero-stat-val">500K+</span>
              <span className="hero-stat-lbl">Daily Events</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat">
              <span className="hero-stat-val">4</span>
              <span className="hero-stat-lbl">Products Built</span>
            </div>
          </div>

          <div className="hero-cta">
            <a href="#work" className="hero-btn-primary">
              View Work <MdArrowOutward />
            </a>
            <a
              href={import.meta.env.BASE_URL + "Shubham_Goel_Resume.pdf"}
              target="_blank"
              rel="noreferrer"
              className="hero-btn-ghost"
            >
              Resume ↓
            </a>
          </div>
        </div>

        {/* ── Right: terminal ── */}
        <div className="hero-right">
          <TerminalWindow />
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden>
        <span>scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
};

export default Landing;
