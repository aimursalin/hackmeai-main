import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import PortalSidebar from "@/components/portal/PortalSidebar";
import PortalDesigners from "@/components/portal/PortalDesigners";
import PortalProjects from "@/components/portal/PortalProjects";
import PortalChat from "@/components/portal/PortalChat";
import PortalFeedback from "@/components/portal/PortalFeedback";
import PortalOverview from "@/components/portal/PortalOverview";

export type PortalView = "overview" | "designers" | "projects" | "chat" | "feedback";

const PortalDashboard = () => {
  const [activeView, setActiveView] = useState<PortalView>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigate = (view: PortalView) => {
    setActiveView(view);
    setSidebarOpen(false);
  };

  const viewComponents: Record<PortalView, React.ReactNode> = {
    overview: <PortalOverview onNavigate={handleNavigate} />,
    designers: <PortalDesigners />,
    projects: <PortalProjects />,
    chat: <PortalChat />,
    feedback: <PortalFeedback />,
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-foreground hover:bg-white/[0.06] transition-colors"
        aria-label="Open sidebar menu"
      >
        <Menu className="w-5 h-5" strokeWidth={1.5} />
      </button>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar — always visible on md+, slide-in on mobile */}
      <div
        className={`fixed md:sticky top-0 left-0 z-50 md:z-auto h-screen transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <PortalSidebar activeView={activeView} onNavigate={handleNavigate} />
      </div>

      <main className="flex-1 min-h-screen overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="p-6 md:p-10 max-w-6xl pt-16 md:pt-10"
          >
            {viewComponents[activeView]}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default PortalDashboard;
