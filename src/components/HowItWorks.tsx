"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconClipboard = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
    <rect x="5.5" y="3" width="11" height="2.5" rx="1.25" stroke={color} strokeWidth="1.5" />
    <rect x="3" y="4.5" width="16" height="14.5" rx="2.5" stroke={color} strokeWidth="1.5" />
    <path d="M7 11h8M7 14.5h5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const IconTarget = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="8" stroke={color} strokeWidth="1.5" />
    <circle cx="11" cy="11" r="4.5" stroke={color} strokeWidth="1.5" />
    <circle cx="11" cy="11" r="1.5" fill={color} />
  </svg>
);
const IconProgress = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
    <rect x="3" y="6" width="16" height="3" rx="1.5" fill={color} />
    <rect x="3" y="12" width="16" height="3" rx="1.5" fill={`${color}30`} />
    <rect x="3" y="12" width="10" height="3" rx="1.5" fill={color} />
    <rect x="3" y="18" width="16" height="3" rx="1.5" fill={`${color}30`} />
    <rect x="3" y="18" width="5" height="3" rx="1.5" fill={`${color}70`} />
  </svg>
);
const IconDownload = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
    <rect x="4" y="16" width="14" height="4" rx="1.5" stroke={color} strokeWidth="1.5" />
    <path d="M11 3v10.5M6.5 9.5l4.5 5 4.5-5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Interactive Visuals ───────────────────────────────────────────────────────
const Visual1 = ({ color }: { color: string }) => (
  <div className="flex flex-col gap-3 w-full">
    <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${color}25`, background: "rgba(255,255,255,0.03)" }}>
      <div className="px-4 py-2.5 flex items-center gap-2 border-b" style={{ borderColor: `${color}15`, background: "rgba(255,255,255,0.02)" }}>
        <div className="flex gap-1.5">
          {[0,1,2].map(i => <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: i===2 ? color+"40" : "rgba(255,255,255,0.1)" }} />)}
        </div>
        <div className="flex-1 mx-3 h-5 rounded-lg bg-white/5 flex items-center px-2">
          <span className="text-[10px] text-white/25">dashboard.dominancedigital.com</span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-[11px] font-medium text-white/35 mb-2 uppercase tracking-wider">New Design Request</p>
        <motion.div className="text-sm text-white/70 font-mono" animate={{ opacity:[1,1,0.7,1] }} transition={{ duration:3, repeat:Infinity }}>
          "I need a landing page for my SaaS…"
          <motion.span animate={{ opacity:[1,0,1] }} transition={{ duration:0.8, repeat:Infinity }} className="ml-0.5 font-bold" style={{ color }}>|</motion.span>
        </motion.div>
      </div>
    </div>
    <motion.button className="w-full py-3 rounded-xl text-white font-bold text-sm border-0 cursor-pointer flex items-center justify-center gap-2"
      style={{ background:`linear-gradient(135deg,${color}CC,${color})`, boxShadow:`0 4px 20px ${color}40` }}
      animate={{ scale:[1,1.01,1] }} transition={{ duration:2.5, repeat:Infinity }}>
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 7.5h11M9 4l3.5 3.5L9 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      Submit Request
    </motion.button>
    <motion.div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background:`${color}10`, border:`1px solid ${color}25` }} animate={{ y:[2,0,2] }} transition={{ duration:3, repeat:Infinity }}>
      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: color }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6l3 3 4-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <span className="text-sm font-semibold text-white/80">Request received! Designer being matched…</span>
    </motion.div>
  </div>
);

const Visual2 = ({ color }: { color: string }) => (
  <div className="flex flex-col gap-3 w-full">
    <p className="text-[11px] font-bold uppercase tracking-widest text-white/30 mb-1">Matching designers…</p>
    {[{name:"Lena K.",role:"SaaS & Landing Pages",score:97,sel:true},{name:"Tom R.",role:"Brand & Marketing",score:84,sel:false},{name:"Mia S.",role:"Mobile UI",score:71,sel:false}].map(({name,role,score,sel},i)=>(
      <motion.div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl"
        style={{ background:sel?`${color}12`:"rgba(255,255,255,0.025)", border:`1.5px solid ${sel?color+"40":"rgba(255,255,255,0.06)"}` }}
        animate={sel?{scale:[1,1.015,1]}:{}} transition={{duration:2.5,repeat:Infinity}}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
          style={{ background:sel?color:"rgba(255,255,255,0.07)", color:sel?"#fff":"rgba(255,255,255,0.28)", boxShadow:sel?`0 0 18px ${color}60`:"none" }}>{name[0]}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold" style={{ color:sel?"white":"rgba(255,255,255,0.4)" }}>{name}</p>
          <p className="text-[11px] text-white/30">{role}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-sm font-black" style={{ color:sel?color:"rgba(255,255,255,0.2)" }}>{score}%</span>
          {sel&&<span className="text-[9px] font-black px-2 py-0.5 rounded-full" style={{ background:`${color}20`,color }}>BEST MATCH</span>}
        </div>
      </motion.div>
    ))}
    <motion.p className="text-[11px] text-center font-semibold" style={{ color:`${color}70` }} animate={{ opacity:[0.5,1,0.5] }} transition={{ duration:2.5,repeat:Infinity }}>
      Analysed 847 portfolios · Match found in 0.4s
    </motion.p>
  </div>
);

const Visual3 = ({ color }: { color: string }) => (
  <div className="flex flex-col gap-1 w-full">
    {[{label:"Brief received",done:true,active:false,pct:100},{label:"Wireframing",done:true,active:false,pct:100},{label:"Visual design",done:false,active:true,pct:65},{label:"Final polish",done:false,active:false,pct:0}].map(({label,done,active,pct},i)=>(
      <div key={i}>
        <div className="flex items-center gap-3 py-2.5">
          <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background:done?color:active?`${color}20`:"rgba(255,255,255,0.04)", border:`1.5px solid ${done?color:active?`${color}50`:"rgba(255,255,255,0.08)"}` }}>
            {done?(<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>)
            :active?(<motion.div className="w-2.5 h-2.5 rounded-full" style={{ background:color }} animate={{ scale:[1,1.4,1],opacity:[1,0.5,1] }} transition={{ duration:1.2,repeat:Infinity }}/>)
            :(<div className="w-2 h-2 rounded-full bg-white/10"/>)}
          </div>
          <span className="text-sm font-semibold flex-1" style={{ color:done?"rgba(255,255,255,0.85)":active?"white":"rgba(255,255,255,0.25)" }}>{label}</span>
          {(done||active)&&<span className="text-[10px] font-bold" style={{ color }}>{pct}%</span>}
        </div>
        {active&&<div className="ml-10 mb-1"><div className="h-1.5 rounded-full bg-white/5"><motion.div className="h-full rounded-full" initial={{width:0}} animate={{width:`${pct}%`}} transition={{duration:1.2,ease:"easeOut"}} style={{ background:color }}/></div></div>}
        {i<3&&<div className="ml-3.5 w-px h-3" style={{ background:`${color}${done?"40":"15"}` }}/>}
      </div>
    ))}
  </div>
);

const Visual4 = ({ color }: { color: string }) => (
  <div className="flex flex-col gap-3 w-full">
    <motion.div initial={{scale:0.96,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:0.5}} className="p-4 rounded-2xl flex items-center gap-3" style={{ background:`${color}0D`, border:`1px solid ${color}30` }}>
      <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background:`${color}18` }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="2" width="16" height="20" rx="2" stroke={color} strokeWidth="1.5"/><path d="M8 8h8M8 12h8M8 16h5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-white">landing-page-v1.fig</p>
        <p className="text-xs text-white/40 mt-0.5">Figma · 4.2 MB · Just delivered</p>
      </div>
      <motion.div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ background:`${color}20`, border:`1.5px solid ${color}40` }} animate={{ scale:[1,1.08,1] }} transition={{ duration:2,repeat:Infinity }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </motion.div>
    </motion.div>
    <div className="flex gap-2">
      <button className="flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 border-0 cursor-pointer" style={{ background:color, color:"#000" }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v9M3 7l4 4 4-4" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 12h12" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/></svg>
        Download Files
      </button>
      <button className="flex-1 py-3 rounded-xl text-sm font-bold border-0 cursor-pointer" style={{ background:"rgba(255,255,255,0.04)", color:"rgba(255,255,255,0.45)", border:"1px solid rgba(255,255,255,0.08)" }}>
        Request Revision
      </button>
    </div>
    <div className="flex items-center gap-2 px-3 py-2">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1L1 3.5v4C1 10.5 3.9 13 7 13.5 10.1 13 13 10.5 13 7.5v-4L7 1z" stroke={color} strokeWidth="1.2" strokeLinejoin="round"/></svg>
      <span className="text-xs text-white/35 font-semibold">Unlimited revisions included — no extra charge</span>
    </div>
  </div>
);

const STEPS = [
  { number:"01", color:"#a265df", Icon:IconClipboard, title:"You submit a request", body:"Open your dashboard and type what you need — a landing page, a pitch deck, an ad banner. No intake forms. No discovery calls. No waiting rooms." },
  { number:"02", color:"#fa2a65", Icon:IconTarget, title:"We find your perfect designer", body:"Our system reads your brief and scores it against 800+ specialist portfolios — pairing you with someone who has already solved your exact problem." },
  { number:"03", color:"#f59e0b", Icon:IconProgress, title:"Design happens overnight", body:"Your designer starts within the hour. A live progress tracker shows every stage — Brief → Wireframe → Visuals → Polish. No more 'still working on it'." },
  { number:"04", color:"#10b981", Icon:IconDownload, title:"Files delivered. Revise freely.", body:"Production-ready Figma files land in your inbox in 24–48 hours. Unlimited revisions included — no extra charge, ever." },
];
const VISUALS = [Visual1, Visual2, Visual3, Visual4];

export default function HowItWorksSteps() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(".hiw-header", { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".hiw-header", start: "top 85%" },
      });

      // Each step row
      gsap.utils.toArray<HTMLElement>(".hiw-step").forEach((el, i) => {
        const even = i % 2 === 0;

        // Text column
        const textEl = el.querySelector<HTMLElement>(".hiw-text");
        if (textEl) {
          gsap.fromTo(textEl, { opacity: 0, x: even ? -60 : 60 }, {
            opacity: 1, x: 0, duration: 0.85, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 72%" },
          });
        }

        // Visual column
        const visEl = el.querySelector<HTMLElement>(".hiw-vis");
        if (visEl) {
          gsap.fromTo(visEl, { opacity: 0, x: even ? 60 : -60, y: 16 }, {
            opacity: 1, x: 0, y: 0, duration: 0.85, delay: 0.12, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 72%" },
          });
        }

        // Background number
        const numEl = el.querySelector<HTMLElement>(".hiw-bg-num");
        if (numEl) {
          gsap.fromTo(numEl, { opacity: 0, y: 40, scale: 0.9 }, {
            opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          });
        }

        // Connector dot
        const dotEl = el.querySelector<HTMLElement>(".hiw-dot");
        if (dotEl) {
          gsap.fromTo(dotEl, { scale: 0, opacity: 0 }, {
            scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)",
            scrollTrigger: { trigger: el, start: "top 75%" },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#03000a] border-t border-white/5 relative"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50vw] h-[20vh] pointer-events-none"
        style={{ background: "radial-gradient(ellipse,rgba(162,101,223,0.07) 0%,transparent 70%)" }} />

      <div className="mx-auto max-w-6xl px-6 relative z-10">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="hiw-header text-center pt-24 pb-20">
          <span className="inline-block border border-[#a265df]/30 text-[#a265df] rounded-full px-4 py-1.5 text-xs font-bold tracking-widest mb-6 bg-[#a265df]/5 uppercase">
            How It Works
          </span>
          <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.05] mb-4">
            Four steps to<br />
            <span className="font-light italic text-white/50">your first design.</span>
          </h2>
          <p className="text-lg text-white/38 max-w-sm mx-auto leading-relaxed">
            No meetings. No contracts. No risk.
          </p>
        </div>

        {/* ── Steps ───────────────────────────────────────────────────────── */}
        <div className="flex flex-col">
          {STEPS.map((step, i) => {
            const even = i % 2 === 0;
            const Vis = VISUALS[i];

            return (
              <div
                key={i}
                className="hiw-step relative overflow-hidden"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.055)",
                  paddingTop: "5rem",
                  paddingBottom: "5rem",
                }}
              >
                {/* Giant faded background number */}
                <div
                  className="hiw-bg-num absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                  style={{ zIndex: 0 }}
                >
                  <span
                    style={{
                      fontSize: "clamp(120px, 22vw, 320px)",
                      fontWeight: 900,
                      lineHeight: 1,
                      letterSpacing: "-0.06em",
                      color: `${step.color}06`,
                      userSelect: "none",
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Content row */}
                <div
                  className={`relative z-10 flex flex-col lg:flex-row items-center gap-14 ${even ? "" : "lg:flex-row-reverse"}`}
                >
                  {/* Text side */}
                  <div className="hiw-text flex-1 flex flex-col gap-6">
                    {/* Step badge */}
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${step.color}18`, border: `1.5px solid ${step.color}35` }}
                      >
                        <step.Icon color={step.color} />
                      </div>
                      <span
                        className="text-xs font-black tracking-widest uppercase px-3 py-1.5 rounded-full"
                        style={{ color: step.color, background: `${step.color}10`, border: `1px solid ${step.color}28` }}
                      >
                        Step {step.number}
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
                      {step.title}
                    </h3>

                    <p className="text-lg text-white/42 leading-relaxed max-w-md">
                      {step.body}
                    </p>

                    {/* Decorative bottom accent */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="hiw-dot w-2.5 h-2.5 rounded-full" style={{ background: step.color, boxShadow: `0 0 10px ${step.color}80` }} />
                      <div className="h-px flex-1 max-w-[120px] rounded-full" style={{ background: `linear-gradient(90deg,${step.color}60,transparent)` }} />
                    </div>
                  </div>

                  {/* Visual side */}
                  <div className="hiw-vis w-full lg:w-[430px] flex-shrink-0">
                    <div
                      className="rounded-2xl p-7 relative overflow-hidden"
                      style={{
                        background: "linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.012))",
                        border: `1px solid ${step.color}20`,
                        backdropFilter: "blur(24px)",
                        boxShadow: `0 24px 64px rgba(0,0,0,0.44), 0 0 64px ${step.color}0C`,
                      }}
                    >
                      {/* Top color line */}
                      <div
                        className="absolute top-0 left-0 right-0 h-px"
                        style={{ background: `linear-gradient(90deg,transparent,${step.color}50,transparent)` }}
                      />
                      {/* Step label inside card */}
                      <div className="flex items-center gap-2 mb-5">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: step.color }} />
                        <span className="text-[11px] font-black tracking-widest uppercase" style={{ color: `${step.color}90` }}>
                          Step {step.number} — {step.title}
                        </span>
                      </div>
                      <Vis color={step.color} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom spacer */}
        <div className="pb-20" />
      </div>
    </section>
  );
}
