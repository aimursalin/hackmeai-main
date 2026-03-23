import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ─── Type ─────────────────────────────────────────────────────────────────────

type AdminView =
  | "overview"
  | "users"
  | "tasks"
  | "portfolios"
  | "team"
  | "testimonials"
  | "faqs"
  | "settings";

// ─── Custom SVG Icons  (thin-line, 20×20, landing-page style) ─────────────────

const IcoCommand = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="2" width="6.5" height="6.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <rect x="11.5" y="2" width="6.5" height="6.5" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.12" />
    <rect x="2" y="11.5" width="6.5" height="6.5" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.06" />
    <rect x="11.5" y="11.5" width="6.5" height="6.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const IcoIdentity = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="6.5" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 17.5c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14.5 8l1.5 1.5L19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IcoWorkflow = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M2 14l3.5-6 3 3.5L12 5l3.5 4.5L18 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="18" cy="4" r="1.5" fill="currentColor" />
    <path d="M2 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.3" />
  </svg>
);

const IcoShowcase = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="3" width="16" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="7" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 13l4-3 3 2 4-4 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 18h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IcoCrew = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="14" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M1 17c0-3.314 2.686-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 17c0-3 1.8-5.5 4-5.85M14 11.15c2.2.35 4 2.85 4 5.85" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IcoProof = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M17 3H3a1.5 1.5 0 00-1.5 1.5v8A1.5 1.5 0 003 14h4l3 3 3-3h4a1.5 1.5 0 001.5-1.5v-8A1.5 1.5 0 0017 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M6 8.5h8M6 11h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IcoSupport = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7.5 7.5a2.5 2.5 0 014.9 1c0 1.65-2.4 2.3-2.4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="10" cy="15" r="0.8" fill="currentColor" />
  </svg>
);

const IcoConfig = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 2v2.5M10 15.5V18M2 10h2.5M15.5 10H18M4.22 4.22l1.77 1.77M13.96 13.96l1.77 1.77M15.78 4.22l-1.77 1.77M6.04 13.96l-1.77 1.77" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ─── Nav Config (aligned with landing page) ──────────────────────────────────

interface NavItem {
  id: AdminView;
  label: string;
  sublabel: string;
  Icon: React.ComponentType;
  color: string;
  glow: string;
}

interface DividerItem { isDivider: true; id: string; label: string; }
type MenuItem = NavItem | DividerItem;

const NAV: MenuItem[] = [
  { id: "overview",      label: "Command",   sublabel: "Dashboard",    Icon: IcoCommand,   color: "#ffffff",  glow: "rgba(255,255,255,0.20)" },
  { id: "users",         label: "Identity",  sublabel: "Users",        Icon: IcoIdentity,  color: "#fa2a65",  glow: "rgba(250,42,101,0.30)" },
  { id: "tasks",         label: "Workflow",  sublabel: "Live Work",    Icon: IcoWorkflow,  color: "#f59e0b",  glow: "rgba(245,158,11,0.30)" },
  { isDivider: true, id: "d1", label: "Content" },
  { id: "portfolios",    label: "Showcase",  sublabel: "Portfolios",   Icon: IcoShowcase,  color: "#a265df",  glow: "rgba(162,101,223,0.30)" },
  { id: "team",          label: "Crew",      sublabel: "Team",         Icon: IcoCrew,      color: "#a265df",  glow: "rgba(162,101,223,0.30)" },
  { id: "testimonials",  label: "Proof",     sublabel: "Testimonials", Icon: IcoProof,     color: "#10b981",  glow: "rgba(16,185,129,0.30)" },
  { id: "faqs",          label: "Support",   sublabel: "FAQ",          Icon: IcoSupport,   color: "#38bdf8",  glow: "rgba(56,189,248,0.30)" },
  { id: "settings",      label: "Config",    sublabel: "System",       Icon: IcoConfig,    color: "rgba(255,255,255,0.6)", glow: "rgba(255,255,255,0.12)" },
];

// ─── Live Clock ───────────────────────────────────────────────────────────────

const LiveClock = () => {
  const [t, setT] = useState(() => new Date());
  useEffect(() => { const id = setInterval(() => setT(new Date()), 1000); return () => clearInterval(id); }, []);
  return (
    <span className="font-mono text-[10px] font-bold tabular-nums text-white/40 tracking-widest">
      {t.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })}
    </span>
  );
};

// ─── Floating Tooltip (desktop) ───────────────────────────────────────────────

const Tooltip = ({ item, y }: { item: NavItem; y: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -8, scale: 0.95 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    exit={{ opacity: 0, x: -4, scale: 0.97 }}
    transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
    className="fixed z-[200] pointer-events-none"
    style={{ left: 82, top: y - 22 }}
  >
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-2xl"
      style={{
        background: "linear-gradient(135deg, rgba(12,8,20,0.96), rgba(6,4,12,0.98))",
        border: `1px solid ${item.glow.replace("0.30", "0.5")}`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 20px ${item.glow}`,
        backdropFilter: "blur(24px)",
      }}
    >
      <div className="w-[3px] h-8 rounded-full flex-shrink-0" style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }} />
      <div>
        <p className="text-[13px] font-extrabold text-white tracking-tight leading-none">{item.label}</p>
        <p className="text-[10px] font-semibold mt-0.5 tracking-wider" style={{ color: item.color, opacity: 0.7 }}>{item.sublabel}</p>
      </div>
      {/* Left-pointing arrow */}
      <div className="absolute -left-[6px] top-1/2 -translate-y-1/2 w-3 h-3 rotate-45"
        style={{ background: "rgba(12,8,20,0.97)", borderLeft: `1px solid ${item.glow.replace("0.30","0.5")}`, borderBottom: `1px solid ${item.glow.replace("0.30","0.5")}` }} />
    </div>
  </motion.div>
);

// ─── Props ────────────────────────────────────────────────────────────────────

interface AdminSidebarProps {
  activeView: AdminView;
  setActiveView: (v: AdminView) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  profileName?: string;
  profileEmail?: string;
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export default function AdminSidebar({
  activeView, setActiveView, sidebarOpen, setSidebarOpen, profileName,
}: AdminSidebarProps) {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tooltipY, setTooltipY] = useState(0);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleEnter = (id: string) => {
    const el = btnRefs.current[id];
    if (el) { const r = el.getBoundingClientRect(); setTooltipY(r.top + r.height / 2); }
    setHoveredId(id);
  };

  const hoveredItem = NAV.find((n): n is NavItem => !("isDivider" in n) && n.id === hoveredId) ?? null;
  const activeItem = NAV.find((n): n is NavItem => !("isDivider" in n) && n.id === activeView) ?? null;
  const initials = (profileName ?? "AD").slice(0, 2).toUpperCase();

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden" style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
            onClick={() => setSidebarOpen(false)} />
        )}
      </AnimatePresence>

      {/* Desktop tooltip */}
      <AnimatePresence>
        {hoveredItem && <div className="hidden lg:block"><Tooltip key={hoveredId} item={hoveredItem} y={tooltipY} /></div>}
      </AnimatePresence>

      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 h-screen flex flex-col
          transition-transform duration-500
          ${sidebarOpen ? "translate-x-0 w-[260px]" : "-translate-x-full lg:translate-x-0 lg:w-[72px]"}
        `}
        style={{
          background: "linear-gradient(180deg, #07040d 0%, #050308 50%, #06040c 100%)",
          borderRight: "1px solid rgba(255,255,255,0.04)",
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* Ambient glows — match landing page radial gradients */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-12 w-48 h-48 rounded-full"
            style={{ background: `radial-gradient(circle, ${activeItem?.glow ?? "rgba(250,42,101,0.06)"} 0%, transparent 70%)`, transition: "background 0.6s ease" }} />
          <div className="absolute -bottom-20 -left-8 w-48 h-48 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(162,101,223,0.05) 0%, transparent 70%)" }} />
          {/* Subtle scanlines */}
          <div className="absolute inset-0 opacity-[0.012]"
            style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 3px)", backgroundSize: "100% 4px" }} />
          {/* Right-edge accent that follows active color */}
          <div className="absolute right-0 top-0 bottom-0 w-[1px]"
            style={{ background: `linear-gradient(to bottom, transparent 0%, ${activeItem?.color ?? "#fa2a65"} 50%, transparent 100%)`, opacity: 0.2, transition: "all 0.6s" }} />
        </div>

        {/* ── Logo ── */}
        <div className="relative z-10 flex items-center justify-center py-6 flex-shrink-0">
          <button onClick={() => { navigate("/portal/admin/dashboard"); setSidebarOpen(false); }} className="group relative">
            <motion.div whileHover={{ scale: 1.08, rotate: 4 }} whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-[12px] flex items-center justify-center relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #fa2a65 0%, #a265df 100%)",
                boxShadow: "0 0 20px rgba(250,42,101,0.3), 0 0 40px rgba(162,101,223,0.12), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              {/* Shimmer sweep */}
              <motion.div animate={{ x: ["-120%", "120%"] }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
                className="absolute inset-0 opacity-40"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)" }} />
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 1.5L2.5 4.5v4c0 3.98 2.74 7.7 6.5 8.6 3.76-.9 6.5-4.62 6.5-8.6v-4L9 1.5z" fill="white" fillOpacity="0.9" />
                <path d="M6 9l2 2 4-4" stroke="#fa2a65" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
            {/* Pulsing ring */}
            <motion.div animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.15, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-[12px] pointer-events-none"
              style={{ boxShadow: "0 0 0 5px rgba(250,42,101,0.08)" }} />
          </button>

          {/* Expanded: wordmark */}
          {sidebarOpen && (
            <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="ml-3 flex flex-col text-left">
              <span className="font-extrabold text-[16px] text-white tracking-tight leading-none">Dominance</span>
              <span className="text-[9px] font-semibold text-white/25 tracking-[0.3em] mt-0.5">ADMIN</span>
            </motion.div>
          )}
        </div>

        {/* Active section indicator (collapsed) */}
        <div className="hidden lg:flex justify-center mb-1.5 px-3">
          <AnimatePresence mode="wait">
            <motion.div key={activeView} initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} exit={{ opacity: 0, scaleX: 0 }}
              className="w-8 h-[3px] rounded-full" style={{ background: activeItem?.color ?? "#fff", boxShadow: `0 0 10px ${activeItem?.color ?? "#fff"}` }} />
          </AnimatePresence>
        </div>

        {/* ── Nav Items ── */}
        <nav className="relative z-10 flex-1 flex flex-col items-center gap-0.5 px-2.5 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          {NAV.map((item) => {
            if ("isDivider" in item) {
              return (
                <div key={item.id} className="w-full flex items-center justify-center py-3">
                  {sidebarOpen
                    ? (
                      <div className="w-full flex items-center gap-2.5 px-2">
                        <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/15 whitespace-nowrap">{item.label}</span>
                        <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(255,255,255,0.06), transparent)" }} />
                      </div>
                    )
                    : <div className="w-6 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                  }
                </div>
              );
            }

            const isActive = activeView === item.id;
            const isHovered = hoveredId === item.id;

            return (
              <button
                key={item.id}
                ref={(el) => { btnRefs.current[item.id] = el; }}
                onClick={() => { setActiveView(item.id); setSidebarOpen(false); }}
                onMouseEnter={() => handleEnter(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative flex items-center outline-none transition-all duration-200 group
                  ${sidebarOpen ? "w-full px-3.5 py-3 gap-3.5 rounded-2xl" : "w-[52px] h-[52px] justify-center rounded-2xl"}`}
              >
                {/* ── Active bg: landing-page card style ── */}
                {isActive && (
                  <motion.div layoutId="sidebar-active-bg"
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `radial-gradient(ellipse at 30% 50%, ${item.glow} 0%, rgba(0,0,0,0) 80%)`,
                      border: `1px solid ${item.glow.replace("0.30", "0.45")}`,
                      boxShadow: `0 0 24px ${item.glow}, inset 0 1px 0 rgba(255,255,255,0.04)`,
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}

                {/* Hover bg (non-active) — glass-surface-like */}
                {!isActive && isHovered && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 rounded-2xl"
                    style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }} />
                )}

                {/* ── Icon ── */}
                <motion.span
                  animate={{
                    scale: isActive ? 1.1 : isHovered ? 1.08 : 1,
                    color: isActive ? item.color : isHovered ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.3)",
                  }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10 flex-shrink-0"
                  style={{ filter: isActive ? `drop-shadow(0 0 8px ${item.color})` : isHovered ? `drop-shadow(0 0 4px ${item.glow})` : "none" }}
                >
                  <item.Icon />
                </motion.span>

                {/* Active glow ring (collapsed desktop) */}
                {isActive && !sidebarOpen && (
                  <motion.div layoutId="sidebar-ring"
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ boxShadow: `inset 0 0 0 1.5px ${item.color}40, 0 0 20px ${item.glow}` }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}

                {/* ── Expanded labels ── */}
                {sidebarOpen && (
                  <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col text-left min-w-0">
                    <span className="text-[12px] font-extrabold tracking-tight leading-none"
                      style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.5)" }}>{item.label}</span>
                    <span className="text-[9px] font-semibold tracking-wider mt-0.5"
                      style={{ color: isActive ? item.color : "rgba(255,255,255,0.2)" }}>{item.sublabel}</span>
                  </motion.div>
                )}

                {/* Expanded: active dot */}
                {sidebarOpen && isActive && (
                  <motion.div layoutId="sidebar-dot" className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* ── Footer ── */}
        <div className="relative z-10 flex flex-col items-center gap-2.5 px-2.5 py-5 flex-shrink-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>

          {/* Status + clock */}
          <div className={`flex items-center gap-2 w-full ${sidebarOpen ? "px-2 justify-between" : "justify-center"}`}>
            {sidebarOpen ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="relative w-2 h-2">
                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-50" />
                    <span className="relative block w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
                  </div>
                  <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-[0.3em]">Online</span>
                </div>
                <LiveClock />
              </>
            ) : (
              <div className="relative w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-50" />
                <span className="relative block w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
              </div>
            )}
          </div>

          {/* Profile + logout */}
          <div className={`flex items-center w-full ${sidebarOpen ? "gap-3 px-2" : "justify-center"}`}>
            <motion.div whileHover={{ scale: 1.06 }}
              className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center text-[11px] font-extrabold text-white select-none cursor-pointer"
              style={{ background: "linear-gradient(135deg, #fa2a65, #a265df)", boxShadow: "0 0 14px rgba(250,42,101,0.25)" }}>
              {initials}
            </motion.div>

            {sidebarOpen && (
              <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="flex-1 min-w-0">
                <p className="text-[11px] font-extrabold text-white tracking-tight truncate">{profileName ?? "Administrator"}</p>
                <p className="text-[9px] text-white/25 font-semibold tracking-wider">Admin</p>
              </motion.div>
            )}

            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }} onClick={() => navigate("/")}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ef4444"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.2)"; }}
              className="flex-shrink-0 transition-colors" style={{ color: "rgba(255,255,255,0.2)" }} title="Terminate Session">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10.5 11L14 8l-3.5-3M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          </div>
        </div>
      </aside>
    </>
  );
}
