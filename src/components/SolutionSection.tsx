import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Step SVG icons ────────────────────────────────────────────────────────────
const IconClipboard = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="7" y="4" width="14" height="3" rx="1.5" stroke={color} strokeWidth="1.5" />
    <rect x="4" y="6" width="20" height="18" rx="3" stroke={color} strokeWidth="1.5" />
    <path d="M9 13h10M9 17h6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const IconTarget = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="10" stroke={color} strokeWidth="1.5" />
    <circle cx="14" cy="14" r="6" stroke={color} strokeWidth="1.5" />
    <circle cx="14" cy="14" r="2" fill={color} />
    <path d="M20 8l3-3M23 5h-3M23 5v3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const IconZap = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M16 3L6 16h8l-2 9 12-15h-8l2-7z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);
const IconCheck = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="10" stroke={color} strokeWidth="1.5" />
    <path d="M9 14l4 4 6-7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconRepeat = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M5 14a9 9 0 0 1 15.4-6.4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M23 14a9 9 0 0 1-15.4 6.4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M19 7.5l1.5-2 2 1.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 20.5l-1.5 2-2-1.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconFileDoc = ({ color }: { color: string }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="3" y="2" width="16" height="18" rx="2" stroke={color} strokeWidth="1.5" />
    <path d="M7 7h8M7 11h8M7 15h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// SVG trust icons
const IconLock = ({ color }: { color: string }) => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <rect x="2" y="7" width="11" height="7" rx="1.5" stroke={color} strokeWidth="1.4" />
    <path d="M5 7V5a2.5 2.5 0 0 1 5 0v2" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);
const IconClock = ({ color }: { color: string }) => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <circle cx="7.5" cy="7.5" r="5.5" stroke={color} strokeWidth="1.4" />
    <path d="M7.5 4.5v3l2 2" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);
const IconArrowBack = ({ color }: { color: string }) => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M12 8a4.5 4.5 0 1 1-4.5-4.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    <path d="M7 3.5l1 4.5-4.5-1" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Steps ────────────────────────────────────────────────────────────────────
const STEPS = [
  {
    number: "01",
    Icon: IconClipboard,
    color: "#a265df",
    glow: "rgba(162,101,223,0.25)",
    border: "rgba(162,101,223,0.3)",
    bg: "rgba(162,101,223,0.06)",
    headline: "Tell us what you need",
    sub: "Post any design request from your dashboard — a landing page, a pitch deck, a social banner. Done in 60 seconds.",
    before: "Endless intake calls & briefs",
    after: "Just type it & submit",
    tag: "Request",
    visual: (color: string) => (
      <div className="flex flex-col gap-3 w-full max-w-[340px]">
        {["Landing page redesign", "Pitch deck — Series A", "Instagram ad set (3 sizes)"].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
            <span className="text-sm text-white/70 font-medium">{item}</span>
            <motion.span
              className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: `${color}20`, color }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            >
              PENDING
            </motion.span>
          </motion.div>
        ))}
        <motion.div
          className="flex items-center gap-2 mt-1 px-4 py-3 rounded-xl border-dashed cursor-pointer"
          style={{ border: `1.5px dashed ${color}40`, background: `${color}08` }}
          whileHover={{ borderColor: color }}
        >
          <span className="text-xl opacity-50">＋</span>
          <span className="text-sm text-white/30 font-medium">New request...</span>
        </motion.div>
      </div>
    ),
  },
  {
    number: "02",
    Icon: IconTarget,
    color: "#fa2a65",
    glow: "rgba(250,42,101,0.25)",
    border: "rgba(250,42,101,0.3)",
    bg: "rgba(250,42,101,0.06)",
    headline: "We match you instantly",
    sub: "Our AI routes your request to the designer whose portfolio best matches your industry and visual style.",
    before: "Weeks browsing Upwork",
    after: "Matched in minutes",
    tag: "Matching",
    visual: (color: string) => (
      <div className="flex flex-col items-center gap-4 w-full max-w-[340px]">
        <div className="flex items-center gap-4">
          {["Sara K.", "Liam R.", "Mia T."].map((name, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <motion.div
                className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-base"
                style={{
                  background: i === 1 ? color : "rgba(255,255,255,0.06)",
                  border: `2px solid ${i === 1 ? color : "rgba(255,255,255,0.1)"}`,
                  color: i === 1 ? "#fff" : "rgba(255,255,255,0.4)",
                  boxShadow: i === 1 ? `0 0 24px ${color}60` : "none",
                }}
                animate={i === 1 ? { scale: [1, 1.06, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {name.split(" ")[0][0]}{name.split(" ")[1][0]}
              </motion.div>
              <span className="text-xs text-white/40 font-medium">{name}</span>
              {i === 1 && (
                <span
                  className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: `${color}25`, color }}
                >
                  BEST MATCH
                </span>
              )}
            </motion.div>
          ))}
        </div>
        <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
        <motion.div
          className="text-xs font-medium text-center"
          style={{ color: `${color}` }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ✦ Analyzing 847 portfolios... match found in 0.4s
        </motion.div>
      </div>
    ),
  },
  {
    number: "03",
    Icon: IconZap,
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.25)",
    border: "rgba(245,158,11,0.3)",
    bg: "rgba(245,158,11,0.06)",
    headline: "Design happens overnight",
    sub: "Your designer starts immediately. Track every stage in real time — no chasing, no vague updates.",
    before: '"Still working on it..."',
    after: "Live progress dashboard",
    tag: "In Progress",
    visual: (color: string) => {
      const stages = ["Brief received", "Wireframing", "Visual design", "Final polish"];
      const progress = [100, 100, 65, 0];
      return (
        <div className="flex flex-col gap-3 w-full max-w-[340px]">
          {stages.map((stage, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold" style={{ color: progress[i] > 0 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.25)" }}>
                  {stage}
                </span>
                <span className="text-[10px] font-bold" style={{ color: progress[i] > 0 ? color : "rgba(255,255,255,0.2)" }}>
                  {progress[i]}%
                </span>
              </div>
              <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress[i]}%` }}
                  transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
                  style={{ background: progress[i] > 0 ? color : "transparent" }}
                />
              </div>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    number: "04",
    Icon: IconCheck,
    color: "#10b981",
    glow: "rgba(16,185,129,0.25)",
    border: "rgba(16,185,129,0.3)",
    bg: "rgba(16,185,129,0.06)",
    headline: "Deliver. Revise. Done.",
    sub: "Receive production-ready files in 24–48 hours. Unlimited revisions until it's exactly right.",
    before: "Extra fees for every tweak",
    after: "Unlimited revisions included",
    tag: "Delivered",
    visual: (color: string) => (
      <div className="flex flex-col gap-3 w-full max-w-[340px]">
        <motion.div
          className="p-4 rounded-2xl flex items-center gap-4"
          style={{ background: `${color}10`, border: `1px solid ${color}30` }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${color}20` }}
          >
            <IconFileDoc color={color} />
          </div>
          <div>
            <p className="text-sm font-bold text-white">landing-page-v1.fig</p>
            <p className="text-xs text-white/40 mt-0.5">Figma · 4.2 MB · Just now</p>
          </div>
          <motion.span
            className="ml-auto text-[10px] font-bold px-2 py-1 rounded-full flex-shrink-0"
            style={{ background: `${color}20`, color }}
          >
            ✓ READY
          </motion.span>
        </motion.div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.04 }}
            className="flex-1 py-2.5 rounded-xl text-xs font-bold"
            style={{ background: color, color: "#000" }}
          >
            ↓ Download Files
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            className="flex-1 py-2.5 rounded-xl text-xs font-bold"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            ✏ Request Revision
          </motion.button>
        </div>
      </div>
    ),
  },
  {
    number: "05",
    Icon: IconRepeat,
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.25)",
    border: "rgba(56,189,248,0.3)",
    bg: "rgba(56,189,248,0.06)",
    headline: "Repeat every week",
    sub: "One flat monthly subscription. Pause or cancel any time. No contracts, no surprises.",
    before: "$10k+ agency retainers",
    after: "One predictable price",
    tag: "Subscription",
    visual: (color: string) => (
      <div className="flex flex-col gap-3 w-full max-w-[340px]">
        <div className="flex gap-3">
          {["Week 1", "Week 2", "Week 3", "Week 4"].map((week, i) => (
            <div key={i} className="flex-1 flex flex-col gap-2 items-center">
              <div className="flex flex-col gap-1 w-full">
                {[...Array(i + 1)].map((_, j) => (
                  <motion.div
                    key={j}
                    initial={{ height: 0 }}
                    animate={{ height: 8 + j * 4 }}
                    transition={{ delay: i * 0.15 + j * 0.05, duration: 0.5 }}
                    className="rounded-sm w-full"
                    style={{ background: i === 3 ? color : `${color}50` }}
                  />
                ))}
              </div>
              <span className="text-[9px] font-bold" style={{ color: i === 3 ? color : "rgba(255,255,255,0.25)" }}>
                {week}
              </span>
            </div>
          ))}
        </div>
        <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/40">Monthly plan · Billed monthly</span>
          <motion.span
            className="text-sm font-extrabold"
            style={{ color }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Active ✓
          </motion.span>
        </div>
      </div>
    ),
  },
];

// ── Before/After bar ──────────────────────────────────────────────────────────
const BeforeAfter = ({ before, after, color }: { before: string; after: string; color: string }) => (
  <div className="flex items-center gap-3 flex-wrap">
    <span
      className="text-xs font-semibold px-3 py-1.5 rounded-full line-through"
      style={{ background: "rgba(255,80,80,0.08)", color: "rgba(255,100,100,0.5)", textDecorationColor: "rgba(255,80,80,0.4)" }}
    >
      ✗ {before}
    </span>
    <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: `${color}18`, color, border: `1px solid ${color}35` }}>
      ✓ {after}
    </span>
  </div>
);

// ── Carousel arrows ───────────────────────────────────────────────────────────
const Arrow = ({ direction, onClick, disabled, color }: { direction: "prev" | "next"; onClick: () => void; disabled: boolean; color: string }) => (
  <motion.button
    onClick={onClick}
    disabled={disabled}
    whileHover={!disabled ? { scale: 1.08 } : {}}
    whileTap={!disabled ? { scale: 0.94 } : {}}
    className="w-14 h-14 flex items-center justify-center rounded-full transition-all duration-300 flex-shrink-0"
    style={{
      background: disabled ? "rgba(255,255,255,0.03)" : `${color}15`,
      border: `1px solid ${disabled ? "rgba(255,255,255,0.06)" : color + "40"}`,
      color: disabled ? "rgba(255,255,255,0.2)" : color,
      cursor: disabled ? "not-allowed" : "pointer",
      boxShadow: disabled ? "none" : `0 0 20px ${color}20`,
    }}
    aria-label={direction === "prev" ? "Previous step" : "Next step"}
  >
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      {direction === "prev" ? (
        <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  </motion.button>
);

// ── Main Section ──────────────────────────────────────────────────────────────
const SolutionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const [progress, setProgress] = useState(0); // 0-100 for the countdown ring

  const step = STEPS[current];

  // Manual nav — just change slide, timer resets via useEffect dep on current
  const go = (dir: 1 | -1, _manual = false) => {
    const next = current + dir;
    if (next < 0 || next >= STEPS.length) return;
    setDirection(dir);
    setCurrent(next);
    setProgress(0);
  };

  const jumpTo = (i: number) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
    setProgress(0);
  };

  // Auto-scroll every 10s — always runs, resets when current changes
  useEffect(() => {
    setProgress(0);
    const DURATION = 10000;
    const TICK = 50;
    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed += TICK;
      setProgress(Math.min((elapsed / DURATION) * 100, 100));
      if (elapsed >= DURATION) {
        elapsed = 0;
        setProgress(0);
        setCurrent((c) => {
          const next = (c + 1) % STEPS.length;
          setDirection(1);
          return next;
        });
      }
    }, TICK);
    return () => clearInterval(interval);
  }, [current]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".sol-header", { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".sol-header", start: "top 85%" },
      });
      gsap.fromTo(".sol-carousel", { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".sol-carousel", start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 80 : -80, scale: 0.97 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -80 : 80, scale: 0.97 }),
  };

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-[#03000a] relative border-t border-white/5 overflow-hidden"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Ambient glow that follows active step color */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ background: `radial-gradient(ellipse 70% 50% at 50% 40%, ${step.glow} 0%, transparent 70%)` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <div className="max-w-5xl mx-auto px-6">
        {/* ── Header ── */}
        <div className="sol-header text-center mb-20">
          <div
            className="inline-block border rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider mb-6 uppercase"
            style={{ borderColor: `${step.color}40`, color: step.color, background: step.bg }}
          >
            The Solution
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-5 tracking-tight leading-[1.05]">
            Design on tap.
            <br />
            <span className="font-light italic text-white/60">Like Netflix, but for design.</span>
          </h2>
          <p className="text-lg text-white/45 max-w-xl mx-auto leading-relaxed">
            Five simple steps. Zero hiring headaches. Delivered before Monday.
          </p>
        </div>


        {/* ── Carousel ── */}
        <div className="sol-carousel">
          <div className="flex items-center gap-6">
            {/* Prev arrow */}
            <Arrow direction="prev" onClick={() => go(-1, true)} disabled={current === 0} color={step.color} />

            {/* Card */}
            <div className="flex-1 relative" style={{ minHeight: 440 }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <div
                    className="relative h-full rounded-3xl overflow-hidden flex flex-col md:flex-row gap-0"
                    style={{
                      background: `linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`,
                      border: `1px solid ${step.border}`,
                      backdropFilter: "blur(24px)",
                      boxShadow: `0 0 80px ${step.glow}, 0 30px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)`,
                    }}
                  >
                    {/* Left: text content */}
                    <div className="flex-1 flex flex-col justify-between p-10 md:p-12">
                      {/* Top row */}
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <span
                            className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                            style={{ background: step.bg, color: step.color, border: `1px solid ${step.border}` }}
                          >
                            {step.tag}
                          </span>
                        </div>
                        <span
                          className="font-black font-mono text-6xl leading-none tabular-nums select-none"
                          style={{ color: `${step.color}18`, fontFamily: "Inter, sans-serif" }}
                        >
                          {step.number}
                        </span>
                      </div>

                      {/* Headline */}
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div
                              key={current}
                              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{ background: `${step.color}18`, border: `1px solid ${step.color}30` }}
                            >
                              <step.Icon color={step.color} />
                            </div>
                          <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                            {step.headline}
                          </h3>
                        </div>
                        <p className="text-base leading-relaxed text-white/50 max-w-md">
                          {step.sub}
                        </p>
                      </div>

                      {/* Before / After */}
                      <div className="mt-8">
                        <BeforeAfter before={step.before} after={step.after} color={step.color} />
                      </div>
                    </div>

                    {/* Vertical divider */}
                    <div className="hidden md:block w-px self-stretch my-8" style={{ background: `${step.color}15` }} />

                    {/* Right: interactive visual */}
                    <div className="flex-1 flex items-center justify-center p-8 md:p-12">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={current}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -16 }}
                          transition={{ duration: 0.45, ease: "easeOut" }}
                          className="w-full flex justify-center"
                        >
                          {step.visual(step.color)}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next arrow */}
            <Arrow direction="next" onClick={() => go(1, true)} disabled={current === STEPS.length - 1} color={step.color} />
          </div>

          {/* Step counter with countdown ring */}
          <div className="flex items-center justify-center mt-8 gap-2">
            {/* Ring wrapping the current number */}
            <div className="relative flex items-center justify-center" style={{ width: 36, height: 36 }}>
              {(() => {
                const R = 14;
                const C = 2 * Math.PI * R;
                return (
                  <svg width="36" height="36" viewBox="0 0 36 36" className="absolute inset-0">
                    <circle cx="18" cy="18" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                    <motion.circle
                      cx="18" cy="18" r={R}
                      fill="none"
                      stroke={step.color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray={C}
                      strokeDashoffset={C - (progress / 100) * C}
                      transform="rotate(-90 18 18)"
                    />
                  </svg>
                );
              })()}
              <span className="relative text-sm font-bold" style={{ color: step.color }}>
                {String(current + 1).padStart(2, "0")}
              </span>
            </div>
            <span className="text-sm text-white/20 font-medium">/ {String(STEPS.length).padStart(2, "0")}</span>
          </div>
        </div>

        {/* ── Bottom CTA — interactive micro-journey card ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.2 }}
          className="mt-24"
        >
          <div
            className="relative rounded-3xl overflow-hidden p-10 md:p-14"
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Animated top edge gradient line */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-px"
              animate={{
                background: [
                  "linear-gradient(90deg, transparent 0%, #a265df 40%, #fa2a65 60%, transparent 100%)",
                  "linear-gradient(90deg, transparent 0%, #fa2a65 40%, #a265df 60%, transparent 100%)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
            />

            {/* Subtle corner glows */}
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(162,101,223,0.12) 0%, transparent 70%)", transform: "translate(-30%, -30%)" }} />
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(250,42,101,0.1) 0%, transparent 70%)", transform: "translate(30%, 30%)" }} />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">

              {/* Left: headline + trust */}
              <div className="flex-1 text-center lg:text-left">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/30 mb-3">Ready to try it?</p>
                <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
                  Your first design<br />
                  <span
                    className="px-3 py-1 rounded-xl inline-block"
                    style={{ background: "linear-gradient(90deg, #a265df, #fa2a65)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                  >
                    in 24 hours.
                  </span>
                </h3>
                <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-6">
                  Start your 1-day free trial. No credit card. No meetings. Cancel any time.
                </p>

                {/* Trust row */}
                <div className="flex items-center gap-4 justify-center lg:justify-start flex-wrap">
                  {[
                    { Icon: IconLock,      label: "No credit card" },
                    { Icon: IconClock,     label: "24h delivery" },
                    { Icon: IconArrowBack, label: "Cancel anytime" },
                  ].map(({ Icon, label }) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <Icon color="rgba(255,255,255,0.4)" />
                      <span className="text-xs font-semibold text-white/40">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: 3-step micro-journey + CTA */}
              <div className="flex-1 flex flex-col gap-4 w-full max-w-sm">
                {/* 3-step guide */}
                {[
                  { n: "1", label: "Click the button below", color: "#a265df" },
                  { n: "2", label: "Enter your email — 10 seconds", color: "#fa2a65" },
                  { n: "3", label: "Submit your first design request", color: "#10b981" },
                ].map(({ n, label, color }, i) => (
                  <motion.div
                    key={n}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
                    className="flex items-center gap-4 px-5 py-4 rounded-2xl"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: `1px solid rgba(255,255,255,0.06)`,
                    }}
                  >
                    {/* Pulsing number badge */}
                    <div className="relative flex-shrink-0">
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6 }}
                        style={{ background: color }}
                      />
                      <div
                        className="relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-black"
                        style={{ background: `${color}22`, border: `1.5px solid ${color}50`, color }}
                      >
                        {n}
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-white/70">{label}</span>
                    <span className="ml-auto text-white/15 text-sm">→</span>
                  </motion.div>
                ))}

                {/* CTA button — hero-style */}
                <div className="mt-2 relative group">
                  {/* Pulsing glow behind button — same as hero */}
                  <motion.div
                    animate={{ opacity: [0.4, 0.75, 0.4], scale: [1, 1.12, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-full bg-[#fa2a65]/35 blur-xl pointer-events-none"
                  />
                  <button
                    className="relative w-full h-12 px-8 rounded-full bg-[#fa2a65] hover:bg-[#e0235a] text-white font-bold text-sm transition-colors duration-200 cursor-pointer border-0 shadow-[0_0_30px_rgba(250,42,101,0.4)] hover:shadow-[0_0_45px_rgba(250,42,101,0.55)]"
                    onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Get your 1-day free trial →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;
