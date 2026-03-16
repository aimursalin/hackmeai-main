import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, AlertCircle, CheckCircle, Clock, MoreVertical, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

interface Project {
  id: string;
  name: string;
  designer: string;
  progress: number;
  status: "active" | "paused" | "on-hold" | "completed";
  dueDate: string;
}

const statusConfig: Record<string, { color: string; bg: string; icon: React.ElementType; label: string }> = {
  active: { color: "text-green-400", bg: "bg-green-400/10", icon: Play, label: "Active" },
  paused: { color: "text-amber-400", bg: "bg-amber-400/10", icon: Pause, label: "Paused" },
  "on-hold": { color: "text-orange-400", bg: "bg-orange-400/10", icon: AlertCircle, label: "On Hold" },
  completed: { color: "text-accent", bg: "bg-accent/10", icon: CheckCircle, label: "Completed" },
};

const PortalProjects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('client_id', user.id);

        if (error) throw error;

        if (data) {
          setProjects(data.map((p: any) => ({
            id: p.id,
            name: p.name || 'Untitled Project',
            designer: p.designer_name || 'Unassigned',
            progress: p.progress || 0,
            status: p.status || 'active',
            dueDate: p.due_date ? new Date(p.due_date).toLocaleDateString() : 'TBD',
          })));
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  const updateStatus = async (id: string, status: Project["status"]) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status } : p))
      );
    } catch (err) {
      console.error('Error updating project status:', err);
    }
    setMenuOpen(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader2 className="w-10 h-10 text-accent animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Projects</h1>
        <p className="text-muted-foreground mt-1">Manage, pause, or hold your active projects.</p>
      </div>

      <div className="space-y-3">
        {projects.map((project, i) => {
          const config = statusConfig[project.status] || statusConfig.active;
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-surface rounded-2xl p-5"
            >
              <div className="flex items-center gap-4">
                {/* Status indicator */}
                <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center`}>
                  <config.icon className={`w-4 h-4 ${config.color}`} strokeWidth={1.5} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground truncate">{project.name}</p>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${config.bg} ${config.color}`}>
                      {config.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{project.designer} · Due {project.dueDate}</p>
                </div>

                {/* Progress */}
                <div className="hidden md:flex items-center gap-3 w-40">
                  <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        project.status === "completed" ? "bg-accent" : "bg-foreground/30"
                      }`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground tabular-nums w-8 text-right">{project.progress}%</span>
                </div>

                {/* Actions menu */}
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(menuOpen === project.id ? null : project.id)}
                    className="w-8 h-8 rounded-lg hover:bg-white/[0.06] flex items-center justify-center transition-colors"
                  >
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </button>

                  {menuOpen === project.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-0 top-10 w-44 glass-surface rounded-xl py-2 z-50"
                    >
                      {project.status !== "active" && (
                        <button
                          onClick={() => updateStatus(project.id, "active")}
                          className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-white/[0.04] flex items-center gap-2"
                        >
                          <Play className="w-3.5 h-3.5 text-green-400" /> Resume
                        </button>
                      )}
                      {project.status !== "paused" && project.status !== "completed" && (
                        <button
                          onClick={() => updateStatus(project.id, "paused")}
                          className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-white/[0.04] flex items-center gap-2"
                        >
                          <Pause className="w-3.5 h-3.5 text-amber-400" /> Pause
                        </button>
                      )}
                      {project.status !== "on-hold" && project.status !== "completed" && (
                        <button
                          onClick={() => updateStatus(project.id, "on-hold")}
                          className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-white/[0.04] flex items-center gap-2"
                        >
                          <AlertCircle className="w-3.5 h-3.5 text-orange-400" /> Put on Hold
                        </button>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
        {projects.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">No projects found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortalProjects;
