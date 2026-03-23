import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreVertical, Plus, Play, Pause, AlertTriangle, CheckCircle, Clock, Layers, FolderOpen, Globe, Megaphone, Tag } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

interface Project {
  id: string; name: string; designer: string;
  progress: number; status: "active" | "paused" | "on-hold" | "completed";
  dueDate: string; type: string;
}

const DEMO_PROJECTS: Project[] = [
  { id: "p1", name: "Brand Identity Redesign",    designer: "Aria Voss",   progress: 78,  status: "active",    dueDate: "Mar 28", type: "Branding"   },
  { id: "p2", name: "Dashboard UI Kit",           designer: "Mira Chen",   progress: 100, status: "completed", dueDate: "Mar 15", type: "UI/UX"      },
  { id: "p3", name: "Landing Page v2",            designer: "Soren Blake", progress: 45,  status: "active",    dueDate: "Apr 3",  type: "Web Design" },
  { id: "p4", name: "Meta Ad Creatives Batch 3",  designer: "Jade Kim",    progress: 20,  status: "paused",    dueDate: "Apr 10", type: "Marketing"  },
];

const STATUS_CONFIG = {
  active:    { icon: Play,          label: "In Progress", color: "#34d399", bg: "rgba(52,211,153,0.12)",  border: "rgba(52,211,153,0.2)"  },
  paused:    { icon: Pause,         label: "Paused",      color: "#fbbf24", bg: "rgba(251,191,36,0.12)",  border: "rgba(251,191,36,0.2)"  },
  "on-hold": { icon: AlertTriangle, label: "On Hold",     color: "#f97316", bg: "rgba(249,115,22,0.12)",  border: "rgba(249,115,22,0.2)"  },
  completed: { icon: CheckCircle,   label: "Completed",   color: "#fa2a65", bg: "rgba(250,42,101,0.12)",  border: "rgba(250,42,101,0.2)"  },
};

const TYPE_CONFIG: Record<string, { icon: React.ElementType; color: string }> = {
  Branding:    { icon: Tag,      color: "#c084fc" },
  "UI/UX":    { icon: Layers,   color: "#60a5fa" },
  "Web Design":{ icon: Globe,   color: "#34d399" },
  Marketing:   { icon: Megaphone,color: "#fbbf24" },
};

const MENU_OPTIONS: { status: Project["status"]; icon: React.ElementType; label: string }[] = [
  { status: "active",    icon: Play,          label: "Mark as In Progress" },
  { status: "paused",    icon: Pause,         label: "Pause Project" },
  { status: "on-hold",   icon: AlertTriangle, label: "Put on Hold" },
  { status: "completed", icon: CheckCircle,   label: "Mark as Completed" },
];

const PortalProjects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  useEffect(() => {
    const demo = sessionStorage.getItem('demo_auth');
    if (demo) { setProjects(DEMO_PROJECTS); setLoading(false); return; }
    const load = async () => {
      if (!user) return;
      try {
        const { data } = await supabase.from('projects').select('*').eq('client_id', user.id);
        if (data && data.length > 0) {
          setProjects(data.map((p: any) => ({
            id: p.id, name: p.name || 'Untitled', designer: p.designer_name || 'Unassigned',
            progress: p.progress || 0, status: p.status || 'active',
            dueDate: p.due_date ? new Date(p.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'TBD',
            type: p.type || 'Design',
          })));
        } else { setProjects(DEMO_PROJECTS); }
      } catch { setProjects(DEMO_PROJECTS); }
      finally { setLoading(false); }
    };
    load();
  }, [user]);

  const updateStatus = (id: string, status: Project["status"]) => {
    setProjects(p => p.map(proj => proj.id === id ? { ...proj, status } : proj));
    if (!sessionStorage.getItem('demo_auth') && user)
      supabase.from('projects').update({ status }).eq('id', id);
    setMenuOpen(null);
  };

  if (loading) return (
    <div className="space-y-4">
      {[1,2,3].map(i => <div key={i} className="h-36 rounded-3xl animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }} />)}
    </div>
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(250,42,101,0.12)" }}>
              <FolderOpen className="w-4 h-4 text-accent" strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Projects</h1>
          </div>
          <p className="text-white/35 text-sm">Everything your team is building for you</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg, #fa2a65, #d41e55)", boxShadow: "0 0 20px rgba(250,42,101,0.3)" }}
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          <span className="hidden sm:inline">New Request</span>
        </motion.button>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-4 gap-2">
        {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
          const count = projects.filter(p => p.status === key).length;
          return (
            <div key={key} className="rounded-xl px-3 py-2 text-center" style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
              <p className="text-lg font-black" style={{ color: cfg.color }}>{count}</p>
              <p className="text-[9px] font-bold text-white/30 uppercase tracking-wider">{cfg.label}</p>
            </div>
          );
        })}
      </div>

      {/* Project Cards */}
      {projects.map((project, i) => {
        const cfg = STATUS_CONFIG[project.status] || STATUS_CONFIG.active;
        const typeCfg = TYPE_CONFIG[project.type] || { icon: Layers, color: "#ffffff40" };
        const StatusIcon = cfg.icon;
        const TypeIcon = typeCfg.icon;

        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="relative rounded-3xl overflow-hidden group"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {/* Colored top strip */}
            <div className="h-1 w-full"
              style={{ background: `linear-gradient(90deg, ${cfg.color}, ${cfg.color}40)`, boxShadow: `0 0 12px ${cfg.color}40` }} />

            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: `radial-gradient(circle at 0% 50%, ${cfg.color}08 0%, transparent 60%)` }} />

            <div className="p-5">
              <div className="flex items-start gap-3 mb-4">
                {/* Type icon */}
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${typeCfg.color}15`, border: `1px solid ${typeCfg.color}25` }}>
                  <TypeIcon className="w-4 h-4" style={{ color: typeCfg.color }} strokeWidth={1.5} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-white leading-tight">{project.name}</h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xs text-white/35">{project.designer}</span>
                        <span className="w-1 h-1 rounded-full bg-white/15" />
                        <Clock className="w-3 h-3 text-white/25" strokeWidth={1.5} />
                        <span className="text-xs text-white/30">Due {project.dueDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {/* Status badge */}
                      <motion.div
                        animate={project.status === "active" ? { scale: [1, 1.05, 1] } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold"
                        style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
                      >
                        <StatusIcon className="w-3 h-3" strokeWidth={2} />
                        {cfg.label}
                      </motion.div>

                      {/* Menu */}
                      <div className="relative">
                        <button onClick={() => setMenuOpen(menuOpen === project.id ? null : project.id)}
                          className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors hover:bg-white/[0.07]">
                          <MoreVertical className="w-4 h-4 text-white/25" />
                        </button>
                        <AnimatePresence>
                          {menuOpen === project.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.92, y: -4 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: -4 }}
                              className="absolute right-0 top-10 w-52 rounded-2xl py-2 z-50 shadow-2xl"
                              style={{ background: "#14141c", border: "1px solid rgba(255,255,255,0.08)" }}
                            >
                              <p className="text-[9px] font-black text-white/20 uppercase tracking-widest px-4 py-1.5">Change Status</p>
                              {MENU_OPTIONS.filter(o => o.status !== project.status).map(opt => (
                                <button key={opt.status} onClick={() => updateStatus(project.id, opt.status)}
                                  className="w-full px-4 py-2.5 text-left text-sm text-white/50 hover:text-white hover:bg-white/[0.04] transition-colors flex items-center gap-2.5">
                                  <opt.icon className="w-3.5 h-3.5" strokeWidth={1.5} style={{ color: STATUS_CONFIG[opt.status].color }} />
                                  {opt.label}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-white/35">Progress</span>
                  <span className="text-sm font-black tabular-nums" style={{ color: cfg.color }}>{project.progress}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ delay: i * 0.06 + 0.3, duration: 0.9, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: project.status === "completed" ? "linear-gradient(90deg,#fa2a65,#ff6b9d)" : `linear-gradient(90deg,${cfg.color},${cfg.color}80)`, boxShadow: `0 0 8px ${cfg.color}50` }}
                  />
                </div>
                {project.status === "completed" && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <CheckCircle className="w-3.5 h-3.5 text-accent" strokeWidth={2} />
                    <p className="text-xs text-accent font-bold">Project delivered — rate the work in Feedback!</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}

      {projects.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(255,255,255,0.04)" }}>
            <FolderOpen className="w-7 h-7 text-white/15" strokeWidth={1.5} />
          </div>
          <p className="text-white/30 font-bold">No projects yet</p>
          <p className="text-sm text-white/15 mt-1 mb-5">Tap "New Request" to get started</p>
        </div>
      )}
    </div>
  );
};

export default PortalProjects;
