import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, LayoutDashboard, Users, MessageSquare, ListTodo, LogOut, TrendingUp, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

type LeaderView = "overview" | "team" | "projects" | "chat";

interface TeamMember {
  id: string;
  full_name: string;
  avatar_url: string;
  role: string;
  status: string;
}

interface Task {
  id: string;
  name: string;
  status: string;
  priority: string;
  assigned_to: string;
  assignee_name?: string;
}

const LeaderDashboard = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState<LeaderView>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [myTeam, setMyTeam] = useState<TeamMember[]>([]);
  const [myTasks, setMyTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderData = async () => {
      if (!user) return;

      try {
        setIsLoading(true);

        // Fetch leader profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        setProfile(profileData);

        // Fetch team members (employees/designers)
        const { data: teamData } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url, role, status')
          .in('role', ['employee', 'designer']);

        if (teamData) {
          setMyTeam(teamData.map(m => ({
            id: m.id,
            full_name: m.full_name || 'Unknown',
            avatar_url: m.avatar_url || '',
            role: m.role || 'employee',
            status: m.status || 'active',
          })));
        }

        // Fetch projects/tasks
        const { data: projectData } = await supabase
          .from('projects')
          .select('id, name, status, priority, assigned_to');

        if (projectData) {
          // Map assigned_to IDs to names from teamData
          const teamMap = new Map((teamData || []).map(t => [t.id, t.full_name]));
          setMyTasks(projectData.map(p => ({
            id: p.id,
            name: p.name || 'Untitled Project',
            status: p.status || 'todo',
            priority: p.priority || 'medium',
            assigned_to: p.assigned_to || '',
            assignee_name: teamMap.get(p.assigned_to) || 'Unassigned',
          })));
        }

      } catch (err) {
        console.error('Error fetching leader data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderData();
  }, [user]);

  const menuItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "team", label: "My Team", icon: Users },
    { id: "projects", label: "Section Tasks", icon: ListTodo },
    { id: "chat", label: "Team Chat", icon: MessageSquare },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/portal/leader");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#080a0f] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-400 animate-spin" />
      </div>
    );
  }

  const viewComponents: Record<LeaderView, React.ReactNode> = {
    overview: (
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Section Dashboard</h1>
            <p className="text-blue-400/60 font-medium">Welcome back, {profile?.full_name?.split(' ')[0] || 'Leader'} • Performance: Excellent</p>
          </div>
          <div className="flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">+12% this week</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-surface p-6 rounded-3xl border border-white/5">
                <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">Pending Review</p>
                <p className="text-3xl font-bold text-white">{myTasks.filter(t => t.status === 'review').length.toString().padStart(2, '0')}</p>
            </div>
            <div className="glass-surface p-6 rounded-3xl border border-white/5">
                <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">Team Members</p>
                <p className="text-3xl font-bold text-white">{myTeam.length}</p>
            </div>
            <div className="glass-surface p-6 rounded-3xl border border-white/5">
                <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">Active Tasks</p>
                <p className="text-3xl font-bold text-white text-emerald-400">{myTasks.filter(t => t.status === 'in-progress' || t.status === 'active').length}</p>
            </div>
        </div>

        <div className="glass-surface p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
            <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
            <div className="space-y-6">
                {myTasks.slice(0, 3).map((task, i) => (
                    <div key={task.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-bold text-white/20">
                                {i+1}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">{task.name}</p>
                                <p className="text-xs text-white/30">{task.assignee_name} • Status: {task.status}</p>
                            </div>
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${
                          task.priority === 'high' ? 'text-rose-400' : 
                          task.priority === 'medium' ? 'text-blue-400' : 'text-white/30'
                        }`}>{task.priority}</span>
                    </div>
                ))}
                {myTasks.length === 0 && (
                  <p className="text-white/20 text-sm text-center py-4">No tasks found</p>
                )}
            </div>
        </div>
      </div>
    ),
    team: (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">My Team</h2>
            <div className="grid gap-4">
                {myTeam.map(member => (
                    <div key={member.id} className="glass-surface p-6 rounded-2xl flex items-center justify-between border border-white/5">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-white/5 flex items-center justify-center overflow-hidden">
                              {member.avatar_url ? (
                                <img src={member.avatar_url} alt={member.full_name} className="w-10 h-10 rounded-full object-cover" />
                              ) : (
                                <span className="text-xs font-bold text-blue-400">{member.full_name.split(' ').map(n => n[0]).join('')}</span>
                              )}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">{member.full_name}</p>
                                <p className="text-xs text-white/30 uppercase tracking-widest font-bold">{member.status}</p>
                            </div>
                        </div>
                        <Button size="sm" variant="ghost" className="text-blue-400 hover:bg-blue-500/10">View Log</Button>
                    </div>
                ))}
                {myTeam.length === 0 && (
                  <p className="text-white/20 text-sm text-center py-8">No team members found</p>
                )}
            </div>
        </div>
    ),
    projects: (
         <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Active Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myTasks.map(task => (
                    <div key={task.id} className="glass-surface p-6 rounded-2xl border border-white/5">
                        <h4 className="font-bold text-white mb-2">{task.name}</h4>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase">{task.status}</span>
                            <span className="text-[10px] text-white/20 uppercase font-bold">{task.priority} Priority</span>
                        </div>
                        <p className="text-xs text-white/40">Responsible: <span className="text-white/60">{task.assignee_name}</span></p>
                    </div>
                ))}
                {myTasks.length === 0 && (
                  <p className="text-white/20 text-sm text-center py-8 col-span-2">No projects found</p>
                )}
            </div>
         </div>
    ),
    chat: (
        <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20">
                <MessageSquare className="w-8 h-8 text-blue-400" />
            </div>
            <p className="text-blue-400/40 text-xs font-bold uppercase tracking-[0.3em]">Encrypted Section Channel</p>
        </div>
    ),
  };

  return (
    <div className="min-h-screen bg-[#080a0f] flex text-white">
      <div className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-[#0a0c12] border-r border-white/5 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-10 pl-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold tracking-tight text-lg text-white">Leader Portal</span>
          </div>

          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveView(item.id as LeaderView); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm ${
                  activeView === item.id 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                    : "text-white/30 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>

          <button onClick={handleSignOut} className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl text-white/20 hover:text-white transition-all font-semibold text-sm">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      <main className="flex-1 p-6 lg:p-12">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed top-6 left-6 z-40 w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center"
        >
          <Menu className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="max-w-4xl mx-auto pt-12 lg:pt-0"
          >
            {viewComponents[activeView]}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default LeaderDashboard;
