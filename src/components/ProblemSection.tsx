import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    iconColor: "#f43f5e",
    glowColor: "rgba(244,63,94,0.2)",
    borderColor: "rgba(244,63,94,0.22)",
    title: "Hiring takes months",
    description:
      "Sifting through portfolios, interviewing, and onboarding slows your growth to a halt.",
    stat: "3–6",
    statLabel: "months lost",
    // Visual: a horizontal loading bar that never fills
    visual: "bar",
  },
  {
    iconColor: "#f59e0b",
    glowColor: "rgba(245,158,11,0.2)",
    borderColor: "rgba(245,158,11,0.22)",
    title: "Freelancers disappear",
    description:
      "Unreliable communication, missed deadlines, and sudden mid-project ghosting.",
    stat: "47%",
    statLabel: "ghost mid-project",
    visual: "ghost",
  },
  {
    iconColor: "#10b981",
    glowColor: "rgba(16,185,129,0.2)",
    borderColor: "rgba(16,185,129,0.22)",
    title: "Agencies cost $10k+",
    description:
      "Bloated retainers, long minimum contracts, and paying for account managers you don't need.",
    stat: "$10k",
    statLabel: "avg. retainer",
    visual: "cost",
  },
  {
    iconColor: "#a78bfa",
    glowColor: "rgba(167,139,250,0.2)",
    borderColor: "rgba(167,139,250,0.22)",
    title: "Management chaos",
    description:
      "Juggling multiple freelancers, tools, and Slack channels becomes a full-time job.",
    stat: "5+",
    statLabel: "tools to manage",
    visual: "chaos",
  },
];

// Tiny visual "mini-illustrations" per card
const CardVisual = ({
  type,
  color,
  hovered,
}: {
  type: string;
  color: string;
  hovered: boolean;
}) => {
  const base = { color, transition: "all 0.4s ease" };

  if (type === "bar") {
    // A progress bar stuck at 30%
    return (
      <div className="flex flex-col gap-2">
        {[30, 55, 20].map((w, i) => (
          <div
            key={i}
            className="h-1.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.07)", width: "100%" }}
          >
            <motion.div
              className="h-full rounded-full"
              animate={{ width: hovered ? `${w}%` : `${w * 0.6}%` }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              style={{ background: i === 0 ? color : "rgba(255,255,255,0.15)" }}
            />
          </div>
        ))}
      </div>
    );
  }

  if (type === "ghost") {
    // Avatars with one "gone"
    return (
      <div className="flex items-center gap-2">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: hovered ? (i === 3 ? 0 : 1) : 0.6 }}
            transition={{ duration: 0.5, delay: i === 3 ? 0.3 : 0 }}
            className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold"
            style={{
              borderColor: i === 3 ? "rgba(255,255,255,0.1)" : color,
              color: i === 3 ? "rgba(255,255,255,0.15)" : color,
              background: `${color}15`,
            }}
          >
            {i === 3 ? "?" : ["A", "B"][i - 1]}
          </motion.div>
        ))}
        <motion.span
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
          transition={{ duration: 0.3 }}
          className="text-xs font-medium"
          style={{ color }}
        >
          gone
        </motion.span>
      </div>
    );
  }

  if (type === "cost") {
    // Rising cost bars
    return (
      <div className="flex items-end gap-1.5 h-10">
        {[40, 60, 75, 100].map((h, i) => (
          <motion.div
            key={i}
            animate={{ height: hovered ? `${h}%` : `${h * 0.5}%` }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="flex-1 rounded-t-sm"
            style={{ background: i === 3 ? color : `${color}40` }}
          />
        ))}
      </div>
    );
  }

  // chaos — scattered dots
  return (
    <div className="relative h-10 w-full">
      {[
        { x: "5%", y: "10%" },
        { x: "35%", y: "60%" },
        { x: "65%", y: "20%" },
        { x: "80%", y: "70%" },
        { x: "50%", y: "40%" },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{ left: pos.x, top: pos.y, background: color, opacity: 0.5 }}
          animate={
            hovered
              ? { scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }
              : { scale: 1, opacity: 0.3 }
          }
          transition={{ duration: 1.2, delay: i * 0.15, repeat: hovered ? Infinity : 0 }}
        />
      ))}
    </div>
  );
};

// ── Interactive tilt card ────────────────────────────────────────────────────
const ProblemCard = ({
  problem,
  index,
}: {
  problem: (typeof problems)[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -10, y: dx * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="problem-card relative cursor-default"
      style={{ opacity: 0, transform: "translateY(80px)" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D tilt wrapper */}
      <div
        style={{
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: hovered
            ? "transform 0.08s linear"
            : "transform 0.55s cubic-bezier(0.22,1,0.36,1)",
          willChange: "transform",
          height: "100%",
        }}
      >
        {/* Card body */}
        <div
          className="relative h-full rounded-3xl overflow-hidden flex flex-col"
          style={{
            background: hovered
              ? "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)"
              : "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
            border: `1px solid ${hovered ? problem.borderColor : "rgba(255,255,255,0.07)"}`,
            backdropFilter: "blur(20px)",
            boxShadow: hovered
              ? `0 0 50px ${problem.glowColor}, 0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.09)`
              : `0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)`,
            transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {/* Tilt-following spotlight */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s",
              background: `radial-gradient(circle at ${50 + tilt.y * 3}% ${
                50 + tilt.x * 3
              }%, ${problem.glowColor} 0%, transparent 65%)`,
            }}
          />

          {/* ── Card content ── */}
          <div className="flex flex-col p-7 gap-6 flex-1">

            {/* Big stat — the hero element */}
            <div className="flex flex-col gap-1">
              <span
                className="font-black tracking-tighter leading-none"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "clamp(2.8rem, 6vw, 3.5rem)",
                  color: hovered ? problem.iconColor : "rgba(255,255,255,0.85)",
                  transition: "color 0.4s",
                  lineHeight: 1,
                }}
              >
                {problem.stat}
              </span>
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{
                  color: hovered ? problem.iconColor : "rgba(255,255,255,0.25)",
                  transition: "color 0.4s",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {problem.statLabel}
              </span>
            </div>

            {/* Mini visual */}
            <div className="flex-1">
              <CardVisual
                type={problem.visual}
                color={problem.iconColor}
                hovered={hovered}
              />
            </div>

            {/* Divider */}
            <div
              className="h-px w-full"
              style={{
                background: hovered
                  ? `linear-gradient(90deg, ${problem.iconColor}60, transparent)`
                  : "rgba(255,255,255,0.06)",
                transition: "background 0.4s",
              }}
            />

            {/* Text block */}
            <div className="flex flex-col gap-2">
              <h3
                className="text-base font-bold text-white leading-snug tracking-tight"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {problem.title}
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{
                  color: hovered
                    ? "rgba(255,255,255,0.6)"
                    : "rgba(255,255,255,0.32)",
                  fontFamily: "Inter, sans-serif",
                  transition: "color 0.4s",
                }}
              >
                {problem.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Per-character GSAP scroll color heading (left-to-right sweep) ─────────────
const HEADING_LINES = [
  "Growing",
  "companies",
  "need design",
  "every week.",
];

const ScrollColorHeading = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const chars = Array.from(
      sectionRef.current.querySelectorAll<HTMLElement>(".scroll-char")
    );

    // Single ScrollTrigger driving a staggered timeline so chars sweep
    // strictly left-to-right as you scroll through the section
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",    // delay: fires only when section is halfway up the screen
          end: "bottom 20%",
          scrub: 1.5,
        },
      });

      tl.fromTo(
        chars,
        { color: "#ffffff" },
        {
          color: "#fa2a65",
          duration: 0.4,
          stagger: {
            each: 0.04,
            from: "start",        // strictly left-to-right
          },
          ease: "none",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="mt-32 px-6 text-center">
      <p
        className="font-extrabold tracking-tighter leading-none select-none"
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "clamp(5rem, 18vw, 22rem)",
          lineHeight: 0.9,
        }}
      >
        {HEADING_LINES.map((line, li) => (
          <span key={li} className="block">
            {line.split(" ").map((word, wi, arr) => (
              <span
                key={wi}
                className="inline-block"
                style={{
                  whiteSpace: "nowrap",
                  marginRight: wi < arr.length - 1 ? "0.25em" : 0,
                }}
              >
                {word.split("").map((char, ci) => (
                  <span
                    key={ci}
                    className="scroll-char inline-block"
                    style={{ color: "#ffffff" }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </span>
        ))}
      </p>
    </div>
  );
};

// ── Section ──────────────────────────────────────────────────────────────────
const ProblemSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".problem-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".problem-header",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".problem-card",
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.13,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cards-grid",
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#03000a] relative border-t border-white/5 overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-500/20 to-transparent" />

      <div className="max-w-5xl mx-auto px-6">
        <div className="problem-header text-center mb-16">
          <div
            className="inline-block border border-rose-500/30 text-rose-400 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider mb-6 bg-rose-500/5 backdrop-blur-sm shadow-[0_0_15px_rgba(244,63,94,0.15)] uppercase"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            The Reality
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Design shouldn't slow{" "}
            <br className="hidden md:block" />
            <span className="italic font-light text-white/80">
              your company down.
            </span>
          </h2>
        </div>

        <div className="cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {problems.map((problem, i) => (
            <ProblemCard key={i} problem={problem} index={i} />
          ))}
        </div>
      </div>

      <ScrollColorHeading />
    </section>
  );
};

export default ProblemSection;
