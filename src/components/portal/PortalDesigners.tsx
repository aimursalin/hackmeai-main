import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Clock, CheckCircle, Palette, Layout, PenTool, Monitor, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

interface Designer {
  name: string;
  avatar: string;
  role: string;
  rating: number;
  completedProjects: number;
  avgTurnaround: string;
  skills: string[];
  status: "available" | "busy" | "offline";
  currentTask: string;
}

const statusColors: Record<string, string> = {
  available: "bg-green-500",
  busy: "bg-amber-500",
  offline: "bg-muted-foreground",
};

const skillIcons: Record<string, React.ElementType> = {
  "Brand Identity": Palette,
  "Logo Design": PenTool,
  "Dashboard UI": Layout,
  "Web Design": Monitor,
};

const PortalDesigners = () => {
  const { user } = useAuth();
  const [designersList, setDesignersList] = useState<Designer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDesigners = async () => {
      if (!user) return;

      try {
        setLoading(true);
        // Get designers assigned to client's projects
        const { data: projectDesigners, error } = await supabase
          .from('projects')
          .select(`
            designers (
              id,
              stars,
              profiles (
                full_name,
                avatar_url,
                role
              )
            )
          `)
          .eq('client_id', user.id);

        if (error) throw error;

        if (projectDesigners) {
          // Extract unique designers
          const uniqueDesigners = Array.from(new Set(
            projectDesigners
              .map(p => p.designers)
              .filter(Boolean)
              .map(d => JSON.stringify(d))
          )).map(s => JSON.parse(s));

          const mappedDesigners: Designer[] = uniqueDesigners.map((d: any) => ({
            name: d.profiles.full_name,
            avatar: d.profiles.full_name.split(' ').map((n: string) => n[0]).join(''),
            role: d.profiles.role,
            rating: d.stars,
            completedProjects: 45, // Placeholder
            avgTurnaround: "2.1 days", // Placeholder
            skills: ["UI/UX", "Brand Identity"], // Placeholder
            status: "available",
            currentTask: "Active Project"
          }));
          setDesignersList(mappedDesigners);
        }
      } catch (err) {
        console.error('Error fetching designers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDesigners();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader2 className="w-10 h-10 text-accent animate-spin" />
      </div>
    );
  }
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">My Designers</h1>
        <p className="text-muted-foreground mt-1">Your assigned creative team and their insights.</p>
      </div>

      <div className="space-y-5">
        {designersList.map((designer, i) => (
          <motion.div
            key={designer.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-surface rounded-2xl p-6"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-5">
              {/* Avatar & Status */}
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-lg font-bold text-accent">
                  {designer.avatar}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${statusColors[designer.status]}`} />
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{designer.name}</h3>
                    <p className="text-sm text-muted-foreground">{designer.role}</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium text-foreground">{designer.rating}</span>
                  </div>
                </div>

                {/* Stats row */}
                <div className="flex gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
                    <span className="text-xs text-muted-foreground">
                      <span className="text-foreground font-medium">{designer.completedProjects}</span> completed
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
                    <span className="text-xs text-muted-foreground">
                      <span className="text-foreground font-medium">{designer.avgTurnaround}</span> avg
                    </span>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {designer.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Current task */}
                <div className="mt-4 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Currently working on</p>
                  <p className="text-sm font-medium text-foreground">{designer.currentTask}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PortalDesigners;
