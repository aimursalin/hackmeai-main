import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Users, FolderKanban, MessageCircle, Clock, ArrowRight, TrendingUp, Sparkles, CheckCircle, PackageCheck, RefreshCw, Rocket, Star } from "lucide-react";
import type { PortalView } from "@/pages/PortalDashboard";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

interface Props { onNavigate: (view: PortalView) => void; }

// Animated icon wrapper component
const AnimIcon = ({ icon: Icon, color, size = "w-5 h-5", animate = false }: { icon: React.ElementType; color: string; size?: string; animate?: boolean }) => (
  <motion.div
    animate={animate ? { rotate: 360 } : {}}
    transition={animate ? { duration: 8, repeat: Infinity, ease: "linear" } : {}}
  >
    <Icon className={`${size} ${color}`} strokeWidth={1.5} />
  </motion.div>
);

const DEMO_STATS = [
  { label: "Designers Working",  value: 3,  isText: false, textVal: "",     icon: Users,          color: "#fa2a65", bg: "rgba(250,42,101,0.12)",  glow: "rgba(250,42,101,0.25)",  desc: "on your projects",  animRotate: false },
  { label: "Active Projects",    value: 4,  isText: false, textVal: "",     icon: FolderKanban,   color: "#a78bfa", bg: "rgba(167,139,250,0.12)", glow: "rgba(167,139,250,0.25)", desc: "in progress now",   animRotate: false },
  { label: "New Messages",       value: 5,  isText: false, textVal: "",     icon: MessageCircle,  color: "#60a5fa", bg: "rgba(96,165,250,0.12)",  glow: "rgba(96,165,250,0.25)",  desc: "waiting for you",   animRotate: false },
  { label: "Avg. Delivery Speed",value: 0,  isText: true,  textVal: "2.1d", icon: Clock,          color: "#34d399", bg: "rgba(52,211,153,0.12)",  glow: "rgba(52,211,153,0.25)",  desc: "days per project",  animRotate: true  },
];

const DEMO_ACTIVITY = [
  { text: "Aria Voss delivered Brand Identity Redesign files", time: "2 hours ago", icon: PackageCheck,  color: "#34d399" },
  { text: "New message from Mira Chen about your logo",        time: "4 hours ago", icon: MessageCircle, color: "#60a5fa" },
  { text: "Landing Page v2 moved to review",                   time: "6 hours ago", icon: RefreshCw,     color: "#fbbf24" },
  { text: "Jade Kim started your Ad Creatives project",        time: "Yesterday",   icon: Rocket,        color: "#fa2a65" },
  { text: "Your feedback on Social Kit was reviewed",          time: "2 days ago",  icon: Star,          color: "#a78bfa" },
];

const QUICK_ACTIONS = [
  { label: "View Projects",      desc: "Track progress & status",  view: "projects"  as PortalView, icon: FolderKanban,  color: "#a78bfa" },
  { label: "Open Messages",      desc: "Chat with your designers", view: "chat"      as PortalView, icon: MessageCircle, color: "#60a5fa" },
  { label: "Leave a Review",     desc: "Rate the delivered work",  view: "feedback"  as PortalView, icon: Star,          color: "#fbbf24" },
];

function useCountUp(target: number, duration = 1000) {
  const [curr, setCurr] = useState(0);
  const raf = useRef<number>();
  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setCurr(Math.floor(p * target));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current!);
  }, [target, duration]);
  return curr;
}

const StatCard = ({ stat, i }: { stat: typeof DEMO_STATS[0]; i: number }) => {
  const count = useCountUp(stat.value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.07 + 0.3 }}
      className="rounded-2xl p-4 flex items-center gap-3 group cursor-default relative overflow-hidden"
      style={{ background: stat.bg, border: `1px solid ${stat.color}20` }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ background: `radial-gradient(circle at 20% 50%, ${stat.glow} 0%, transparent 70%)` }} />

      <motion.div
        whileHover={{ scale: 1.1 }}
        animate={stat.animRotate ? { rotate: 360 } : {}}
        transition={stat.animRotate ? { duration: 8, repeat: Infinity, ease: "linear" } : { type: "spring" }}
        className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 relative z-10"
        style={{ background: `${stat.color}20` }}
      >
        <stat.icon className={`w-5 h-5`} style={{ color: stat.color }} strokeWidth={1.5} />
      </motion.div>

      <div className="min-w-0 relative z-10">
        <p className="text-2xl font-black text-white leading-none">{stat.isText ? stat.textVal : count}</p>
        <p className="text-xs font-bold mt-0.5" style={{ color: stat.color }}>{stat.label}</p>
        <p className="text-[10px] text-white/30 mt-0.5">{stat.desc}</p>
      </div>
    </motion.div>
  );
};

const PortalOverview = ({ onNavigate }: Props) => {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState("there");

  useEffect(() => {
    const demo = sessionStorage.getItem('demo_auth');
    if (demo) { setFirstName(JSON.parse(demo).full_name?.split(' ')[0] || 'Client'); return; }
    if (!user) return;
    supabase.from('profiles').select('full_name').eq('id', user.id).single()
      .then(({ data }) => { if (data?.full_name) setFirstName(data.full_name.split(' ')[0]); });
  }, [user]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-6">
      {/* ─── HERO WELCOME CARD ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl p-6 md:p-8 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(250,42,101,0.18) 0%, rgba(167,139,250,0.10) 50%, rgba(6,6,10,0.8) 100%)",
          border: "1px solid rgba(250,42,101,0.20)",
        }}
      >
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(250,42,101,0.12)" }} />
        <div className="absolute -bottom-10 -left-10 w-52 h-52 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(167,139,250,0.08)" }} />

        <div className="relative z-10 flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
                <Sparkles className="w-4 h-4 text-accent" />
              </motion.div>
              <span className="text-xs font-black text-accent uppercase tracking-widest">{greeting}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Welcome back, <span style={{ color: "#fa2a65" }}>{firstName}</span>
            </h1>
            <p className="text-white/40 mt-2 text-sm md:text-base max-w-sm leading-relaxed">
              Your design team is actively working. Here's a full overview of everything happening right now.
            </p>
          </div>

          {/* Completion ring — desktop only */}
          <div className="relative hidden sm:flex flex-col items-center gap-1.5 flex-shrink-0">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                <motion.circle
                  cx="40" cy="40" r="30" fill="none" stroke="#fa2a65" strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 30}`}
                  initial={{ strokeDashoffset: `${2 * Math.PI * 30}` }}
                  animate={{ strokeDashoffset: `${2 * Math.PI * 30 * 0.27}` }}
                  transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
                  style={{ filter: "drop-shadow(0 0 8px rgba(250,42,101,0.7))" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-black text-white">73%</span>
              </div>
            </div>
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider text-center">On Track</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative z-10 mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-white/35 font-medium">Overall completion across all projects</span>
            <div className="flex items-center gap-1.5">
              <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              </motion.div>
              <span className="text-xs text-emerald-400 font-bold">+12% this month</span>
            </div>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "73%" }}
              transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #fa2a65, #ff6b9d)", boxShadow: "0 0 12px rgba(250,42,101,0.5)" }}
            />
          </div>
        </div>
      </motion.div>

      {/* ─── STATS ─── */}
      <div className="grid grid-cols-2 gap-3">
        {DEMO_STATS.map((stat, i) => <StatCard key={stat.label} stat={stat} i={i} />)}
      </div>

      {/* ─── QUICK ACTIONS ─── */}
      <div>
        <p className="text-[10px] font-black text-white/25 uppercase tracking-[0.25em] mb-3">Quick Actions</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {QUICK_ACTIONS.map((a, i) => (
            <motion.button
              key={a.view}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + i * 0.07 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate(a.view)}
              className="flex items-center gap-3 p-4 rounded-2xl text-left group transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                style={{ background: `${a.color}18`, border: `1px solid ${a.color}25` }}>
                <a.icon className="w-4 h-4" style={{ color: a.color }} strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white">{a.label}</p>
                <p className="text-xs text-white/30">{a.desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-white/15 group-hover:text-accent group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* ─── ACTIVITY FEED ─── */}
      <div>
        <p className="text-[10px] font-black text-white/25 uppercase tracking-[0.25em] mb-3">Recent Activity</p>
        <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          {DEMO_ACTIVITY.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.65 + i * 0.06 }}
              className="flex items-center gap-3.5 px-4 py-3.5 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors group"
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105"
                style={{ background: `${item.color}15` }}>
                <item.icon className="w-3.5 h-3.5" style={{ color: item.color }} strokeWidth={1.5} />
              </div>
              <p className="flex-1 text-sm text-white/60 leading-snug min-w-0 group-hover:text-white/80 transition-colors">{item.text}</p>
              <span className="text-[10px] text-white/20 whitespace-nowrap flex-shrink-0 tabular-nums">{item.time}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── BOTTOM CTA ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="flex items-center justify-between p-4 rounded-2xl"
        style={{ background: "rgba(250,42,101,0.06)", border: "1px solid rgba(250,42,101,0.12)" }}
      >
        <div className="flex items-center gap-3">
          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
            <CheckCircle className="w-5 h-5 text-accent" strokeWidth={1.5} />
          </motion.div>
          <div>
            <p className="text-sm font-bold text-white">All systems are running smoothly.</p>
            <p className="text-xs text-white/30">Your projects are progressing on schedule.</p>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => onNavigate("projects")}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white flex-shrink-0"
          style={{ background: "rgba(250,42,101,0.2)", border: "1px solid rgba(250,42,101,0.25)" }}
        >
          View all <ArrowRight className="w-3 h-3" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PortalOverview;
