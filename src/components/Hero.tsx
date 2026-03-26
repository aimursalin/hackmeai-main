import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

// ─── Fictional startup-style logos (no famous brands) ─────────────────────
const LOGOS = [
  { name: "Vaultiq" },
  { name: "Stacklore" },
  { name: "Nexovate" },
  { name: "Prismly" },
  { name: "Orbify" },
  { name: "Brandlux" },
  { name: "Luminos" },
  { name: "Driftly" },
  { name: "Craftvex" },
];

// Simple geometric icon per logo — all fictional
const BRAND_ICONS: Record<string, React.ReactNode> = {
  Vaultiq: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="2" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="10" cy="10" r="3" fill="currentColor" />
    </svg>
  ),
  Stacklore: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="13" width="16" height="3" rx="1.5" fill="currentColor" />
      <rect x="2" y="8.5" width="16" height="3" rx="1.5" fill="currentColor" opacity=".65" />
      <rect x="2" y="4" width="16" height="3" rx="1.5" fill="currentColor" opacity=".35" />
    </svg>
  ),
  Nexovate: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <polygon points="10,2 18,18 2,18" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="10" cy="13" r="2" fill="currentColor" />
    </svg>
  ),
  Prismly: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L18 10L10 18L2 10Z" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M10 6L14 10L10 14L6 10Z" fill="currentColor" opacity=".5" />
    </svg>
  ),
  Orbify: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="10" cy="10" r="3" fill="currentColor" />
      <line x1="10" y1="2" x2="10" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Brandlux: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 3h6v6H3zM11 3h6v6h-6zM3 11h6v6H3zM11 11h6v6h-6z" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
  Luminos: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2v4M10 14v4M2 10h4M14 10h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="10" cy="10" r="3" fill="currentColor" />
    </svg>
  ),
  Driftly: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M2 14 Q6 4 10 10 Q14 16 18 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  ),
  Craftvex: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L13 8H19L14 12L16 18L10 14L4 18L6 12L1 8H7Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  ),
};

const LogoItem = ({ name }: { name: string }) => (
  <div className="flex items-center gap-2.5 grayscale brightness-200 opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300 cursor-default select-none">
    <span className="text-white flex-shrink-0">{BRAND_ICONS[name]}</span>
    <span className="text-white font-bold text-base tracking-tight whitespace-nowrap">{name}</span>
  </div>
);


// Words that cycle in the highlighted badge
const CYCLE_WORDS = ["Design", "Develop", "Deploy"];

const CyclingWord = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % CYCLE_WORDS.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={CYCLE_WORDS[index]}
        initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 inline-block"
      >
        {CYCLE_WORDS[index]}
      </motion.span>
    </AnimatePresence>
  );
};

const Hero = () => {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const logoStripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroContentRef.current) return;

    // ── GSAP stagger fade-in from bottom for hero elements ──
    const ctx = gsap.context(() => {
      // Set initial hidden state
      gsap.set(".gsap-hero-item", { opacity: 0, y: 60 });

      // Stagger reveal
      gsap.to(".gsap-hero-item", {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.13,
        ease: "power3.out",
        delay: 0.2,
      });

      // Logo strip fade-in slightly later
      gsap.set(".gsap-logo-strip", { opacity: 0, y: 30 });
      gsap.to(".gsap-logo-strip", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.85,
        ease: "power2.out",
      });
    }, heroContentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroContentRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20 bg-[#03000a]"
    >
      {/* Ambient Blur Gradient Animation — bottom-left to upper viewport */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Primary gradient blob — anchored bottom-left */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.55, 0.72, 0.55],
            x: [0, 15, 0],
            y: [0, -18, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          className="absolute -bottom-[10%] -left-[10%] w-[55vw] h-[60vh]"
          style={{
            background: "radial-gradient(ellipse at 20% 80%, #fa2a65 0%, #c2185b 30%, #4a0011 60%, transparent 85%)",
            filter: "blur(100px)",
            borderRadius: "50%",
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
        />

        {/* Secondary bloom */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.35, 0.52, 0.35],
            x: [0, 22, 0],
            y: [0, -28, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[5%] -left-[5%] w-[50vw] h-[50vh]"
          style={{
            background: "radial-gradient(ellipse at 30% 70%, #e91e63 0%, #880e4f 35%, #1a0008 65%, transparent 90%)",
            filter: "blur(120px)",
            borderRadius: "50%",
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
        />

        {/* Tertiary haze */}
        <motion.div
          animate={{
            scale: [1, 1.06, 1],
            opacity: [0.2, 0.36, 0.2],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[0%] left-[0%] w-[65vw] h-[55vh]"
          style={{
            background: "radial-gradient(ellipse at 25% 75%, #ff4081 0%, #ad1457 25%, #2c0014 55%, transparent 80%)",
            filter: "blur(140px)",
            borderRadius: "50%",
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
        />

        {/* Faint warm edge */}
        <motion.div
          animate={{ opacity: [0.12, 0.24, 0.12] }}
          transition={{ duration: 16, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-[15%] left-[10%] w-[45vw] h-[30vh]"
          style={{
            background: "radial-gradient(ellipse at 40% 90%, #d32f2f 0%, #6a0020 40%, transparent 75%)",
            filter: "blur(110px)",
            borderRadius: "50%",
            willChange: "opacity",
            transform: "translateZ(0)",
          }}
        />

        {/* TOP-RIGHT ACCENT GRADIENT (purple) */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.45, 0.62, 0.45],
            x: [0, -16, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 16, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 1 }}
          className="absolute -top-[12%] -right-[10%] w-[50vw] h-[55vh]"
          style={{
            background: "radial-gradient(ellipse at 80% 20%, #a265df 0%, #7b3aaf 28%, #2d0050 55%, transparent 82%)",
            filter: "blur(110px)",
            borderRadius: "50%",
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.25, 0.42, 0.25],
          }}
          transition={{ duration: 22, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 3 }}
          className="absolute -top-[5%] -right-[5%] w-[55vw] h-[50vh]"
          style={{
            background: "radial-gradient(ellipse at 75% 25%, #b87ae0 0%, #6a1b9a 30%, #1a0033 60%, transparent 88%)",
            filter: "blur(130px)",
            borderRadius: "50%",
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
        />
        <motion.div
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 5 }}
          className="absolute -top-[10%] right-[5%] w-[40vw] h-[35vh]"
          style={{
            background: "radial-gradient(ellipse at 70% 30%, #ce93d8 0%, #7b1fa2 35%, transparent 75%)",
            filter: "blur(120px)",
            borderRadius: "50%",
            willChange: "opacity",
            transform: "translateZ(0)",
          }}
        />
      </div>

      {/* ── Hero content (GSAP targets) ── */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center w-full">
        {/* H1 — each line is an independent stagger target */}
        <h1 className="text-5xl md:text-7xl lg:text-[6rem] leading-[1.05] tracking-tight text-white mb-6 w-full mx-auto">
          {/* Line 1 */}
          <span className="gsap-hero-item inline-block">
            <span className="font-light">We</span>{" "}
            <motion.span
              className="font-bold text-white px-6 py-1 rounded-3xl inline-block relative overflow-hidden"
              style={{ rotate: "-2deg", background: "#a265df" }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(162,101,223,0.4), 0 0 60px rgba(162,101,223,0.15)",
                  "0 0 35px rgba(162,101,223,0.7), 0 0 80px rgba(162,101,223,0.3)",
                  "0 0 20px rgba(162,101,223,0.4), 0 0 60px rgba(162,101,223,0.15)",
                ],
                scale: [1, 1.03, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Shimmer sweep overlay */}
              <motion.span
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)",
                  backgroundSize: "200% 100%",
                }}
                animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
              />
              <CyclingWord />
            </motion.span>
          </span>
          <br />
          {/* Line 2 */}
          <span className="gsap-hero-item inline-block">
            <span className="font-bold">Products</span>{" "}
            <span className="font-light">That</span>
          </span>
          <br />
          {/* Line 3 */}
          <span className="gsap-hero-item inline-block mt-1">
            <span className="font-bold">Drive</span>{" "}
            <motion.span
              className="font-bold text-white px-6 py-1 rounded-3xl inline-block relative"
              style={{ rotate: "2deg", background: "#fa2a65" }}
            >
              Results
            </motion.span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="gsap-hero-item text-base md:text-lg font-normal text-white/60 tracking-wide mb-10 max-w-2xl mx-auto leading-relaxed">
          We help ambitious businesses tell their story, strengthen their
          presence, and connect with their audience through strategic media and
          cutting-edge design.
        </p>

        {/* CTAs */}
        <div className="gsap-hero-item flex flex-col sm:flex-row items-center justify-center gap-5 w-full relative z-20">
          {/* Primary CTA */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="relative group">
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-[#fa2a65]/40 blur-xl pointer-events-none group-hover:bg-[#fa2a65]/60 transition-colors"
            />
            <Button
              className="relative w-full sm:w-auto h-14 px-12 text-base md:text-lg font-bold transition-all ease-out duration-300 rounded-full bg-[#fa2a65] hover:bg-[#e0235a] text-white shadow-[0_0_30px_rgba(250,42,101,0.4)] hover:shadow-[0_0_45px_rgba(250,42,101,0.6)]"
              onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get your 1-day free trial
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Secondary CTA */}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="outline"
              className="w-full sm:w-auto h-14 px-12 text-base md:text-lg font-semibold transition-all ease-out duration-300 rounded-full bg-transparent text-white border border-white/20 hover:border-[#fa2a65]/50 hover:bg-[#fa2a65]/10 hover:text-white backdrop-blur-sm"
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Play className="w-5 h-5 mr-2 fill-current" />
              Show your work
            </Button>
          </motion.div>
        </div>

        {/* Micro reassurance text */}
        <p className="gsap-hero-item mt-5 text-sm text-white/35 tracking-wide" style={{ fontFamily: "Inter, sans-serif" }}>
          No credit card required&nbsp;&nbsp;·&nbsp;&nbsp;No strings attached
        </p>
      </div>

      {/* ── Full-width logo strip (centered) ── */}
      <div
        ref={logoStripRef}
        className="gsap-logo-strip relative z-10 mt-24 flex flex-col items-center"
        style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
      >
        <p className="text-white/60 text-sm font-medium mb-8 tracking-wide text-center">
          Trusted by scrappy startups &amp; breakout brands alike
        </p>

        {/* Infinite marquee — no edge fades */}
         <div className="relative w-full overflow-hidden">
          <div
            className="flex items-center"
            style={{
              animation: "marquee 28s linear infinite",
              width: "max-content",
            }}
          >
            {LOGOS.map((logo) => (
              <div key={`a-${logo.name}`} className="mx-10">
                <LogoItem name={logo.name} />
              </div>
            ))}
            {LOGOS.map((logo) => (
              <div key={`b-${logo.name}`} className="mx-10" aria-hidden="true">
                <LogoItem name={logo.name} />
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#03000a] to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default Hero;
