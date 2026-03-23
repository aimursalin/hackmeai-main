import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, User, Settings as SettingsIcon, Loader2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import AdminManagement from "@/components/portal/AdminManagement";
import AdminTaskBoard from "@/components/portal/AdminTaskBoard";
import AdminPortfolioManagement from "@/components/portal/AdminPortfolioManagement";
import AdminTeamManagement from "@/components/portal/AdminTeamManagement";
import AdminTestimonialManagement from "@/components/portal/AdminTestimonialManagement";
import AdminFAQManagement from "@/components/portal/AdminFAQManagement";
import AdminSidebar from "@/components/portal/AdminSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
    PopoverFooter,
} from "@/components/ui/popover";
import { LeadsTable } from "@/components/ui/leads-data-table";


type AdminView = "overview" | "users" | "tasks" | "portfolios" | "team" | "testimonials" | "faqs" | "settings";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [metrics, setMetrics] = useState({ users: 0, tasks: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<AdminView>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        // Fetch admin profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        setProfile(profileData);

        // Fetch metrics
        const { count: userCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        const { count: projectCount } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true });

        setMetrics({
          users: userCount || 0,
          tasks: projectCount || 0
        });

      } catch (err) {
        console.error('Error fetching admin data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminData();
  }, [user]);



  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-white animate-spin" />
      </div>
    );
  }

  const viewComponents: Record<AdminView, React.ReactNode> = {
    overview: (
      <div className="space-y-10 pb-20">
        {/* ═══ HEADER ═══ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="relative">
            {/* Ambient glow behind title */}
            <div className="absolute -top-16 -left-16 w-56 h-56 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(250,42,101,0.12) 0%, transparent 70%)" }} />
            <div className="absolute -top-8 left-40 w-40 h-40 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(162,101,223,0.08) 0%, transparent 70%)" }} />
            <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tighter mb-3 uppercase italic relative">
              Central{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #fa2a65, #a265df)" }}>Command</span>
            </h1>
            <p className="text-white/40 font-bold tracking-[0.2em] uppercase text-xs flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              </span>
              {profile?.full_name || 'System Administrator'} • Platform{" "}
              <span className="text-emerald-400 font-extrabold">Active</span>
            </p>
          </motion.div>
        </div>

        {/* ═══ STAT CARDS ROW ═══ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Network Nodes", value: metrics.users, color: "#fa2a65", glow: "rgba(250,42,101,0.25)",
              icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="5" r="3" stroke="#fa2a65" strokeWidth="1.5"/><path d="M2.5 16c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5" stroke="#fa2a65" strokeWidth="1.5" strokeLinecap="round"/></svg> },
            { label: "Live Pipelines", value: metrics.tasks, color: "#f59e0b", glow: "rgba(245,158,11,0.25)",
              icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 13l3-5 3 3 4-6 4 5" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 16h14" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.3"/></svg> },
            { label: "Active Sections", value: 8, color: "#a265df", glow: "rgba(162,101,223,0.25)",
              icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="5.5" height="5.5" rx="1.5" stroke="#a265df" strokeWidth="1.5"/><rect x="10.5" y="2" width="5.5" height="5.5" rx="1.5" stroke="#a265df" strokeWidth="1.5" fill="#a265df" fillOpacity="0.15"/><rect x="2" y="10.5" width="5.5" height="5.5" rx="1.5" stroke="#a265df" strokeWidth="1.5"/><rect x="10.5" y="10.5" width="5.5" height="5.5" rx="1.5" stroke="#a265df" strokeWidth="1.5"/></svg> },
            { label: "Uptime", value: "99.9%", color: "#10b981", glow: "rgba(16,185,129,0.25)",
              icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="#10b981" strokeWidth="1.5"/><path d="M6 9l2.5 2.5L12.5 7" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="relative rounded-2xl p-5 overflow-hidden cursor-default group"
              style={{ background: "rgba(255,255,255,0.025)", border: `1px solid rgba(255,255,255,0.06)`, backdropFilter: "blur(12px)" }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 30% 50%, ${stat.glow} 0%, transparent 70%)` }} />
              <div className="relative z-10 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}25` }}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] font-bold mb-0.5" style={{ color: `${stat.color}90` }}>{stat.label}</p>
                  <p className="text-2xl font-black text-white tabular-nums leading-none">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ═══ PRIMARY ACTION CARDS ═══ */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20">Quick Access</span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(255,255,255,0.06), transparent)" }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { id: "users" as AdminView, label: "Identity", sub: "Manage users, leads, and access privileges", color: "#fa2a65", glow: "rgba(250,42,101,0.2)",
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M4 21c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M17 10l1.5 1.5L22 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
              { id: "tasks" as AdminView, label: "Workflow", sub: "Live task board, progress tracking, and pipelines", color: "#f59e0b", glow: "rgba(245,158,11,0.2)",
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 17l4.5-7.5 3.5 4L15 6l4.5 5.5L22 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="22" cy="5" r="1.5" fill="currentColor"/><path d="M3 21h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.3"/></svg> },
              { id: "portfolios" as AdminView, label: "Showcase", sub: "Portfolio management, project gallery, and case studies", color: "#a265df", glow: "rgba(162,101,223,0.2)",
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.5"/><circle cx="8.5" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M3 16l5-4 3.5 2.5L16 10l5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 21h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> },
            ].map((card, i) => (
              <motion.div key={card.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.08 }}
                whileHover={{ y: -6 }}
                onClick={() => setActiveView(card.id)}
                className="relative rounded-2xl p-7 cursor-pointer group overflow-hidden"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(16px)", transition: "border-color 0.3s, box-shadow 0.3s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${card.color}50`; e.currentTarget.style.boxShadow = `0 0 30px ${card.glow}, 0 16px 40px rgba(0,0,0,0.3)`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {/* Ambient corner glow */}
                <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle, ${card.glow} 0%, transparent 70%)` }} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${card.color}12`, border: `1px solid ${card.color}25`, color: card.color,
                      filter: "drop-shadow(0 0 0px transparent)", transition: "all 0.3s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.filter = `drop-shadow(0 0 10px ${card.color})`; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.filter = "drop-shadow(0 0 0px transparent)"; }}
                  >
                    {card.icon}
                  </div>

                  {/* Text */}
                  <h3 className="text-xl font-extrabold text-white mb-2 tracking-tight">{card.label}</h3>
                  <p className="text-white/35 text-sm leading-relaxed font-medium mb-5">{card.sub}</p>

                  {/* Open badge */}
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full transition-colors duration-300"
                    style={{ background: `${card.color}10`, color: `${card.color}90`, border: `1px solid ${card.color}20` }}>
                    Open →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ═══ SECONDARY ACTION CARDS ═══ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { id: "team" as AdminView, label: "Crew", sub: "Team", color: "#a265df",
              icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/><circle cx="14" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M1 17c0-3.314 2.686-6 6-6M10 17c0-3 1.8-5.5 4-5.85M14 11.15c2.2.35 4 2.85 4 5.85" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> },
            { id: "testimonials" as AdminView, label: "Proof", sub: "Testimonials", color: "#10b981",
              icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M17 3H3a1.5 1.5 0 00-1.5 1.5v8A1.5 1.5 0 003 14h4l3 3 3-3h4a1.5 1.5 0 001.5-1.5v-8A1.5 1.5 0 0017 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M6 8.5h8M6 11h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> },
            { id: "faqs" as AdminView, label: "Support", sub: "FAQ", color: "#38bdf8",
              icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M7.5 7.5a2.5 2.5 0 014.9 1c0 1.65-2.4 2.3-2.4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="15" r="0.8" fill="currentColor"/></svg> },
          ].map((card, i) => (
            <motion.div key={card.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.06 }}
              whileHover={{ y: -4 }}
              onClick={() => setActiveView(card.id)}
              className="relative rounded-2xl px-5 py-4 cursor-pointer group flex items-center gap-4 overflow-hidden"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", transition: "border-color 0.3s, box-shadow 0.3s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${card.color}40`; e.currentTarget.style.boxShadow = `0 0 20px ${card.color}15`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${card.color}12`, border: `1px solid ${card.color}25`, color: card.color }}>
                {card.icon}
              </div>
              <div>
                <p className="text-sm font-extrabold text-white tracking-tight leading-none">{card.label}</p>
                <p className="text-[10px] font-semibold mt-0.5 tracking-wider" style={{ color: `${card.color}70` }}>{card.sub}</p>
              </div>
              <span className="ml-auto text-white/15 text-sm group-hover:text-white/40 transition-colors">→</span>
            </motion.div>
          ))}
        </div>

        {/* ═══ INTELLIGENCE FEED ═══ */}
        <div className="mt-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-extrabold text-white tracking-tight leading-none">Intelligence Feed</h2>
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mt-1.5">Active Data Pipelines</p>
                </div>
                <div className="flex gap-3 text-[10px] font-bold uppercase tracking-widest text-white/40">
                    <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-full" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", color: "#10b981" }}>
                      <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" /></span>
                      Live
                    </span>
                    <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>9 Active</span>
                </div>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="relative rounded-2xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
            >
                {/* Animated top-edge gradient line — matching Solution section */}
                <motion.div className="absolute top-0 left-0 right-0 h-px z-10"
                  animate={{ background: [
                    "linear-gradient(90deg, transparent 0%, #fa2a65 30%, #a265df 50%, #38bdf8 70%, transparent 100%)",
                    "linear-gradient(90deg, transparent 0%, #a265df 30%, #fa2a65 50%, #f59e0b 70%, transparent 100%)",
                  ] }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                />
                <div className="p-2">
                  <LeadsTable className="!max-w-none border-none shadow-none" />
                </div>
            </motion.div>
        </div>
      </div>
    ),
    users: <AdminManagement />,
    tasks: <AdminTaskBoard />,
    portfolios: <AdminPortfolioManagement />,
    team: <AdminTeamManagement />,
    testimonials: <AdminTestimonialManagement />,
    faqs: <AdminFAQManagement />,
    settings: (
      <div className="flex items-center justify-center h-[60vh] text-white/20 uppercase tracking-[0.5em] font-bold">
        Secure Settings
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-[#050505] flex text-white font-sans selection:bg-white selection:text-black">
      {/* ── Icon-Only Sidebar ── */}
      <AdminSidebar
        activeView={activeView}
        setActiveView={setActiveView}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        profileName={profile?.full_name}
        profileEmail={profile?.email ?? user?.email}
      />

      <main className="flex-1 min-h-screen p-6 lg:p-12 relative overflow-x-hidden">
        {/* Top-right user popover */}
        <div className="absolute top-0 right-0 p-6 lg:p-12 z-10">
            <Popover>
                <PopoverTrigger asChild>
                    <button className="hover:opacity-80 transition-opacity outline-none">
                        <Avatar className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center font-bold text-xs uppercase shadow-lg shadow-black/20">
                            <AvatarImage src="https://avatar.vercel.sh/admin" />
                            <AvatarFallback className="bg-transparent">AD</AvatarFallback>
                        </Avatar>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-64 glass-surface border-white/10 text-white p-0 overflow-hidden" align="end" sideOffset={12}>
                    <PopoverHeader className="p-4 border-b border-white/5 bg-white/5">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 rounded-lg border border-white/10">
                                <AvatarImage src="https://avatar.vercel.sh/admin" />
                                <AvatarFallback>AD</AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                                <PopoverTitle className="text-sm font-bold text-white truncate italic uppercase tracking-tight">{profile?.full_name || 'Administrator'}</PopoverTitle>
                                <PopoverDescription className="text-[10px] text-white/30 font-medium truncate tracking-widest uppercase">{profile?.email || user?.email || 'system.root@dominance.cmd'}</PopoverDescription>
                            </div>
                        </div>
                    </PopoverHeader>
                    <PopoverBody className="p-2 space-y-1">
                        <Button variant="ghost" className="w-full justify-start text-xs font-medium text-white/60 hover:text-white hover:bg-white/5 gap-3" size="sm">
                            <User className="w-4 h-4" />
                            Security Profile
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-xs font-medium text-white/60 hover:text-white hover:bg-white/5 gap-3" size="sm">
                            <SettingsIcon className="w-4 h-4" />
                            System Config
                        </Button>
                    </PopoverBody>
                    <PopoverFooter className="p-2 border-t border-white/5 bg-white/[0.02]">
                        <Button variant="ghost" onClick={() => navigate("/")} className="w-full text-xs font-bold uppercase tracking-widest text-rose-500/60 hover:text-rose-500 hover:bg-rose-500/10 gap-2 h-9" size="sm">
                            <LogOut className="w-3.5 h-3.5" />
                            Terminate Session
                        </Button>
                    </PopoverFooter>
                </PopoverContent>
            </Popover>
        </div>

        {/* Mobile hamburger */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed top-5 left-5 z-40 w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #fa2a65, #a265df)", boxShadow: "0 0 20px rgba(250,42,101,0.4)" }}
        >
          <Menu className="w-5 h-5 text-white" />
        </motion.button>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mx-auto pt-16 lg:pt-6"
          >
            {viewComponents[activeView]}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;
