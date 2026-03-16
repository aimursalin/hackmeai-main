import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, LayoutDashboard, Users, Activity, Settings, LogOut, Shield, User, Settings as SettingsIcon, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import AdminManagement from "@/components/portal/AdminManagement";
import AdminTaskBoard from "@/components/portal/AdminTaskBoard";
import AdminPortfolioManagement from "@/components/portal/AdminPortfolioManagement";
import AdminTeamManagement from "@/components/portal/AdminTeamManagement";
import AdminTestimonialManagement from "@/components/portal/AdminTestimonialManagement";
import AdminFAQManagement from "@/components/portal/AdminFAQManagement";
import { FolderHeart, Users2, MessageSquareText, HelpCircle } from "lucide-react";
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
import AssigneeUser, { users as userList, User as AssigneeType } from "@/components/ui/assignee-user";
import { AlertCircle } from "lucide-react";

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

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "users", label: "User Control", icon: Users },
    { id: "tasks", label: "Live Work", icon: Activity },
    { id: "divider1", label: "Site Management", isDivider: true },
    { id: "portfolios", label: "Portfolios", icon: FolderHeart },
    { id: "team", label: "Our Team", icon: Users2 },
    { id: "testimonials", label: "Testimonials", icon: MessageSquareText },
    { id: "faqs", label: "FAQs", icon: HelpCircle },
    { id: "settings", label: "System", icon: Settings },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-white animate-spin" />
      </div>
    );
  }

  const viewComponents: Record<AdminView, React.ReactNode> = {
    overview: (
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Central Command</h1>
            <p className="text-white/40 font-medium tracking-wide">Welcome back, {profile?.full_name?.split(' ')[0] || 'Administrator'}. System status: <span className="text-emerald-500">Nominal</span></p>
          </div>
          <div className="flex gap-4">
            <div className="glass-surface p-4 px-6 rounded-2xl border border-white/5">
              <p className="text-[10px] uppercase tracking-widest font-bold text-white/30 mb-1">Total Users</p>
              <p className="text-2xl font-bold text-white">{metrics.users}</p>
            </div>
            <div className="glass-surface p-4 px-6 rounded-2xl border border-white/5">
              <p className="text-[10px] uppercase tracking-widest font-bold text-white/30 mb-1">Active Tasks</p>
              <p className="text-2xl font-bold text-white">{metrics.tasks}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <div className="glass-surface p-8 rounded-[2.5rem] border border-white/10 hover:border-white/20 transition-all relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <AlertCircle className="w-5 h-5 text-rose-500 animate-pulse" />
                </div>
                <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center mb-6">
                    <Shield className="w-6 h-6 text-rose-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 italic tracking-tighter uppercase">Urgent Assigned</h3>
                <p className="text-white/40 text-sm mb-6">Emergency task routing for high-priority items.</p>
                <div className="flex items-center gap-4">
                    <p className="text-[10px] font-black text-rose-500/50 uppercase tracking-[0.2em]">Route to:</p>
                    <AssigneeUser 
                        value={null} 
                        onChange={() => {}} 
                        userList={userList.filter(u => u.role === 'Admin')} 
                    />
                </div>
            </div>
        </div>

        <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white uppercase tracking-tighter italic">Operational Leads</h2>
                <div className="flex gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
                    <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Real-time Sync</span>
                    <span className="text-white/10">•</span>
                    <span>9 Active Pipelines</span>
                </div>
            </div>
            <div className="glass-surface p-1 rounded-3xl border border-white/5 overflow-hidden">
                <LeadsTable className="!max-w-none border-none shadow-none" />
            </div>
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
              item.isDivider ? (
                <div key={item.id} className="pt-6 pb-2 px-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/20">{item.label}</span>
                </div>
              ) : (
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
              )
            ))}
          </nav>

          <button onClick={() => navigate("/")} className="mt-auto flex items-center gap-3 px-4 py-3.5 rounded-xl text-white/40 hover:text-rose-400 hover:bg-rose-500/5 transition-all font-medium text-sm text-left">
            <LogOut className="w-4 h-4" />
            Exit System
          </button>
        </div>
      </div>

      <main className="flex-1 min-h-screen p-8 lg:p-16 relative">
        <div className="absolute top-0 right-0 p-8 lg:p-16 z-10">
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
