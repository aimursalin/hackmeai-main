import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle, Clock, MessageCircle, UserX, Palette, Layout, PenTool, Monitor, Zap, Award, BarChart3 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import type { PortalView } from "@/pages/PortalDashboard";

interface Designer {
  name: string; initials: string; role: string; tagline: string;
  rating: number; completedProjects: number; avgTurnaround: string;
  skills: { label: string; icon: React.ElementType }[];
  status: "available" | "busy" | "offline"; currentTask: string;
  gradientFrom: string; gradientTo: string;
}
interface Props { onNavigate?: (view: PortalView) => void; }

const DEMO_DESIGNERS: Designer[] = [
  {
    name: "Aria Voss", initials: "AV", role: "Brand Identity", tagline: "Making brands unforgettable",
    rating: 4.9, completedProjects: 52, avgTurnaround: "1.8d",
    skills: [{ label: "Brand Identity", icon: Palette }, { label: "Logo Design", icon: PenTool }, { label: "Typography", icon: Layout }, { label: "Illustration", icon: Zap }],
    status: "busy", currentTask: "Brand Identity Redesign", gradientFrom: "#fa2a65", gradientTo: "#ff6b9d",
  },
  {
    name: "Mira Chen", initials: "MC", role: "UI/UX Design", tagline: "Building beautiful interfaces",
    rating: 4.8, completedProjects: 38, avgTurnaround: "2.1d",
    skills: [{ label: "Dashboard UI", icon: Monitor }, { label: "Figma", icon: Layout }, { label: "Design Systems", icon: BarChart3 }, { label: "Prototyping", icon: Zap }],
    status: "available", currentTask: "Dashboard UI Kit — Delivered", gradientFrom: "#6366f1", gradientTo: "#a78bfa",
  },
  {
    name: "Soren Blake", initials: "SB", role: "Web & Landing Pages", tagline: "Pages that convert visitors",
    rating: 4.7, completedProjects: 29, avgTurnaround: "2.4d",
    skills: [{ label: "Web Design", icon: Monitor }, { label: "Landing Pages", icon: Layout }, { label: "Animations", icon: Zap }, { label: "Mobile UI", icon: PenTool }],
    status: "busy", currentTask: "Landing Page v2", gradientFrom: "#0ea5e9", gradientTo: "#38bdf8",
  },
];

const STATUS_MAP = {
  available: { label: "Available",    color: "#34d399", bg: "rgba(52,211,153,0.1)",  pulse: true  },
  busy:      { label: "On Project",   color: "#fbbf24", bg: "rgba(251,191,36,0.1)",  pulse: false },
  offline:   { label: "Offline",      color: "#ffffff30", bg: "rgba(255,255,255,0.05)", pulse: false },
};

const PortalDesigners = ({ onNavigate }: Props) => {
  const { user } = useAuth();
  const [designers, setDesigners] = useState<Designer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const demo = sessionStorage.getItem('demo_auth');
    if (demo) { setDesigners(DEMO_DESIGNERS); setLoading(false); return; }
    const load = async () => {
      if (!user) return;
      try { setDesigners(DEMO_DESIGNERS); } catch { setDesigners(DEMO_DESIGNERS); }
      finally { setLoading(false); }
    };
    load();
  }, [user]);

  if (loading) return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1,2,3].map(i => <div key={i} className="h-96 rounded-3xl animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }} />)}
    </div>
  );

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(250,42,101,0.12)" }}>
            <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}>
              <Award className="w-4 h-4 text-accent" strokeWidth={1.5} />
            </motion.div>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">My Creative Team</h1>
        </div>
        <p className="text-white/35 text-sm">Your assigned designers and their live status</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {designers.map((d, i) => {
          const statusCfg = STATUS_MAP[d.status];
          return (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.09 }}
              className="rounded-3xl overflow-hidden flex flex-col group"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {/* Gradient header */}
              <div className="relative h-28 flex items-center justify-center overflow-hidden"
                style={{ background: `linear-gradient(145deg, ${d.gradientFrom}25, ${d.gradientTo}10)` }}>
                {/* Ambient blob */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 80%, ${d.gradientFrom}20 0%, transparent 70%)` }} />
                {/* Avatar */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black text-white relative z-10"
                  style={{ background: `linear-gradient(135deg, ${d.gradientFrom}, ${d.gradientTo})`, boxShadow: `0 8px 40px ${d.gradientFrom}50` }}
                >
                  {d.initials}
                </motion.div>
                {/* Status dot */}
                <div className="absolute bottom-3 right-1/2 translate-x-[18px] flex items-center gap-1">
                  {statusCfg.pulse ? (
                    <motion.div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: statusCfg.color }}
                      animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                  ) : (
                    <div className="w-3 h-3 rounded-full border-2 border-[#0a0a10]" style={{ background: statusCfg.color }} />
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col gap-3">
                {/* Name + role */}
                <div className="text-center">
                  <h3 className="text-base font-black text-white">{d.name}</h3>
                  <p className="text-xs text-white/35 mt-0.5">{d.role}</p>
                  <p className="text-[11px] italic text-white/20 mt-1 line-clamp-1">"{d.tagline}"</p>
                </div>

                {/* Rating */}
                <div className="flex justify-center items-center gap-1">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className={`w-4 h-4 ${s <= Math.floor(d.rating) ? "text-amber-400 fill-amber-400" : "text-white/10"}`} />
                  ))}
                  <span className="text-xs text-amber-400 font-bold ml-1">{d.rating}</span>
                </div>

                {/* Status */}
                <div className="flex justify-center">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                    style={{ background: statusCfg.bg, color: statusCfg.color }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: statusCfg.color }} />
                    {statusCfg.label}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex justify-center gap-5 py-1">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <CheckCircle className="w-3 h-3 text-accent" strokeWidth={2} />
                      <p className="text-base font-black text-white">{d.completedProjects}</p>
                    </div>
                    <p className="text-[9px] text-white/25 uppercase tracking-wider">Projects done</p>
                  </div>
                  <div className="w-px bg-white/[0.07]" />
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3 text-accent" strokeWidth={2} />
                      <p className="text-base font-black text-white">{d.avgTurnaround}</p>
                    </div>
                    <p className="text-[9px] text-white/25 uppercase tracking-wider">Avg. speed</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {d.skills.map(sk => (
                    <span key={sk.label} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] text-white/40 font-medium"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <sk.icon className="w-2.5 h-2.5" strokeWidth={1.5} />
                      {sk.label}
                    </span>
                  ))}
                </div>

                {/* Current task */}
                <div className="px-3 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-0.5">Currently working on</p>
                  <p className="text-xs font-semibold text-white/55 line-clamp-1">{d.currentTask}</p>
                </div>

                {/* Message button */}
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onNavigate?.("chat")}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold text-white transition-all group-hover:opacity-100"
                  style={{ background: `linear-gradient(135deg, ${d.gradientFrom}25, ${d.gradientTo}10)`, border: `1px solid ${d.gradientFrom}30` }}
                >
                  <MessageCircle className="w-4 h-4" style={{ color: d.gradientFrom }} strokeWidth={2} />
                  Message {d.name.split(' ')[0]}
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {designers.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(255,255,255,0.04)" }}>
            <UserX className="w-7 h-7 text-white/15" strokeWidth={1.5} />
          </div>
          <p className="text-white/30 font-bold">No designers assigned yet</p>
          <p className="text-sm text-white/15 mt-1">Your team will appear here once a project starts</p>
        </div>
      )}
    </div>
  );
};

export default PortalDesigners;
