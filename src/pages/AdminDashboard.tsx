import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, LayoutDashboard, Users, Activity, Settings, LogOut, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminManagement from "@/components/portal/AdminManagement";
import AdminTaskBoard from "@/components/portal/AdminTaskBoard";

type AdminView = "overview" | "users" | "tasks" | "settings";

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState<AdminView>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "users", label: "User Control", icon: Users },
    { id: "tasks", label: "Live Work", icon: Activity },
    { id: "settings", label: "System", icon: Settings },
  ];

  const viewComponents: Record<AdminView, React.ReactNode> = {
    overview: (
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Central Command</h1>
            <p className="text-white/40 font-medium tracking-wide">Welcome back, Administrator. System status: <span className="text-emerald-500">Nominal</span></p>
          </div>
          <div className="flex gap-4">
            <div className="glass-surface p-4 px-6 rounded-2xl border border-white/5">
              <p className="text-[10px] uppercase tracking-widest font-bold text-white/30 mb-1">Total Users</p>
              <p className="text-2xl font-bold text-white">42</p>
            </div>
            <div className="glass-surface p-4 px-6 rounded-2xl border border-white/5">
              <p className="text-[10px] uppercase tracking-widest font-bold text-white/30 mb-1">Active Tasks</p>
              <p className="text-2xl font-bold text-white">128</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-surface p-8 rounded-[2.5rem] border border-white/10 hover:border-white/20 transition-all cursor-pointer" onClick={() => setActiveView("users")}>
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                    <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Manage Access</h3>
                <p className="text-white/40 text-sm">Review team leader statuses and toggle workspace access.</p>
            </div>
            <div className="glass-surface p-8 rounded-[2.5rem] border border-white/10 hover:border-white/20 transition-all cursor-pointer" onClick={() => setActiveView("tasks")}>
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                    <Activity className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Live Workforce</h3>
                <p className="text-white/40 text-sm">Monitor who is doing what in real-time across all sections.</p>
            </div>
        </div>
      </div>
    ),
    users: <AdminManagement />,
    tasks: <AdminTaskBoard />,
    settings: (
      <div className="flex items-center justify-center h-[60vh] text-white/20 uppercase tracking-[0.5em] font-bold">
        Secure Settings
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-[#050505] flex text-white font-sans selection:bg-white selection:text-black">
      {/* Sidebar */}
      <div className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-[#0a0a0a] border-r border-white/5 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-8 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-black" />
            </div>
            <span className="font-bold tracking-tighter text-xl text-white uppercase italic">Dominance</span>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveView(item.id as AdminView); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium text-sm ${
                  activeView === item.id 
                    ? "bg-white text-black shadow-[0_10px_20px_rgba(255,255,255,0.1)]" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className={`w-4 h-4 ${activeView === item.id ? "text-black" : "text-white/40"}`} />
                {item.label}
              </button>
            ))}
          </nav>

          <button onClick={() => navigate("/")} className="mt-auto flex items-center gap-3 px-4 py-3.5 rounded-xl text-white/40 hover:text-rose-400 hover:bg-rose-500/5 transition-all font-medium text-sm text-left">
            <LogOut className="w-4 h-4" />
            Exit System
          </button>
        </div>
      </div>

      <main className="flex-1 min-h-screen p-8 lg:p-16 relative">
        <div className="absolute top-0 right-0 p-8 lg:p-16">
            <div className="flex items-center gap-4">
                <div className="text-right hidden md:block">
                    <p className="text-xs font-bold text-white/30 uppercase tracking-widest">Administrator</p>
                    <p className="text-sm font-semibold text-white/80">Central Command</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center font-bold text-xs uppercase">
                    AD
                </div>
            </div>
        </div>

        <button 
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed top-6 left-6 z-40 w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center"
        >
          <Menu className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-5xl mx-auto pt-16 lg:pt-0"
          >
            {viewComponents[activeView]}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;
