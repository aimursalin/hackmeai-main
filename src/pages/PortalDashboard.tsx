import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Users, FolderKanban, MessageCircle, Star, X, Menu, Zap } from "lucide-react";
import PortalSidebar from "@/components/portal/PortalSidebar";
import PortalDesigners from "@/components/portal/PortalDesigners";
import PortalProjects from "@/components/portal/PortalProjects";
import PortalChat from "@/components/portal/PortalChat";
import PortalFeedback from "@/components/portal/PortalFeedback";
import PortalOverview from "@/components/portal/PortalOverview";

export type PortalView = "overview" | "designers" | "projects" | "chat" | "feedback";

const mobileNavItems: { id: PortalView; label: string; icon: React.ElementType }[] = [
  { id: "overview",   label: "Home",      icon: LayoutDashboard },
  { id: "projects",   label: "Projects",  icon: FolderKanban },
  { id: "chat",       label: "Messages",  icon: MessageCircle },
  { id: "designers",  label: "Team",      icon: Users },
  { id: "feedback",   label: "Rate",      icon: Star },
];

const viewTitles: Record<PortalView, { icon: React.ElementType; title: string; sub: string }> = {
  overview:  { icon: LayoutDashboard, title: "Home",         sub: "What's happening today" },
  projects:  { icon: FolderKanban,    title: "Projects",     sub: "Track your design work" },
  chat:      { icon: MessageCircle,   title: "Messages",     sub: "Talk to your designers" },
  designers: { icon: Users,           title: "My Team",      sub: "Your creative designers" },
  feedback:  { icon: Star,            title: "Give Feedback", sub: "Rate or flag an issue" },
};

const PortalDashboard = () => {
  const [activeView, setActiveView] = useState<PortalView>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigate = (view: PortalView) => {
    setActiveView(view);
    setSidebarOpen(false);
  };

  const current = viewTitles[activeView];

  const viewComponents: Record<PortalView, React.ReactNode> = {
    overview:  <PortalOverview  onNavigate={handleNavigate} />,
    designers: <PortalDesigners onNavigate={handleNavigate} />,
    projects:  <PortalProjects />,
    chat:      <PortalChat />,
    feedback:  <PortalFeedback />,
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#06060a" }}>

      {/* ─── MOBILE SIDEBAR OVERLAY ─── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-40 backdrop-blur-sm"
              style={{ background: "rgba(0,0,0,0.75)" }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="md:hidden fixed top-0 left-0 h-full z-50"
            >
              <PortalSidebar activeView={activeView} onNavigate={handleNavigate} />
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-[-48px] w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── DESKTOP SIDEBAR ─── */}
      <div className="hidden md:block sticky top-0 h-screen flex-shrink-0">
        <PortalSidebar activeView={activeView} onNavigate={handleNavigate} />
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">

        {/* Mobile Top Bar */}
        <div
          className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 flex-shrink-0"
          style={{ background: "rgba(6,6,10,0.95)", borderBottom: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(20px)" }}
        >
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-accent" fill="currentColor" />
              <span className="text-xs font-black text-white tracking-tight">DOMINANCE<span className="text-accent">.</span></span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <current.icon className="w-4 h-4 text-accent" strokeWidth={1.5} />
            <div>
              <p className="text-xs font-bold text-white leading-none">{current.title}</p>
              <p className="text-[10px] text-white/30 leading-none mt-0.5">{current.sub}</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <Menu className="w-4 h-4 text-white/60" />
          </button>
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto relative pb-24 md:pb-0">
          {/* Ambient glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none" style={{ background: "rgba(250,42,101,0.05)" }} />
          <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ background: "rgba(99,102,241,0.04)" }} />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
              className="relative z-10 p-4 md:p-10 max-w-5xl mx-auto"
            >
              {viewComponents[activeView]}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* ─── MOBILE BOTTOM NAV ─── */}
        <div
          className="md:hidden fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around px-2 py-2"
          style={{ background: "rgba(8,8,14,0.97)", borderTop: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(24px)" }}
        >
          {mobileNavItems.map(item => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 relative min-w-[56px]"
                style={isActive ? { background: "rgba(250,42,101,0.10)" } : {}}
              >
                {item.id === "chat" && (
                  <span className="absolute top-1 right-2 w-4 h-4 rounded-full bg-accent text-white text-[9px] flex items-center justify-center font-black z-10"
                    style={{ boxShadow: "0 0 8px rgba(250,42,101,0.6)" }}>3</span>
                )}
                <motion.div
                  animate={isActive ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <item.icon
                    className={`w-5 h-5 transition-colors ${isActive ? "text-accent" : "text-white/30"}`}
                    strokeWidth={isActive ? 2 : 1.5}
                  />
                </motion.div>
                <span className={`text-[10px] font-bold transition-colors ${isActive ? "text-accent" : "text-white/30"}`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div layoutId="bottomNavDot"
                    className="absolute -bottom-0.5 w-5 h-0.5 rounded-full bg-accent"
                    style={{ boxShadow: "0 0 6px rgba(250,42,101,0.8)" }} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PortalDashboard;
