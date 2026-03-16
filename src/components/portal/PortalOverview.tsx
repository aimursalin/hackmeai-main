import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, FolderKanban, MessageCircle, Clock, ArrowRight, Loader2 } from "lucide-react";
import type { PortalView } from "@/pages/PortalDashboard";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  onNavigate: (view: PortalView) => void;
}

const PortalOverview = ({ onNavigate }: Props) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([
    { label: "Active Designers", value: "0", icon: Users, color: "text-accent" },
    { label: "Active Projects", value: "0", icon: FolderKanban, color: "text-accent" },
    { label: "Unread Messages", value: "0", icon: MessageCircle, color: "text-accent" },
    { label: "Avg. Turnaround", value: "2.4d", icon: Clock, color: "text-accent" },
  ]);

  const [recentActivity] = useState([
    { text: "Aria Voss delivered Brand Identity Redesign files", time: "2h ago", type: "delivery" },
    { text: "New message from Mira Chen", time: "4h ago", type: "message" },
    { text: "Landing Page v2 moved to review", time: "6h ago", type: "update" },
    { text: "Jade Kim started Meta Ad Creatives", time: "1d ago", type: "start" },
  ]);

  useEffect(() => {
    const fetchPortalData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        // Fetch profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        setProfile(profileData);

        // Fetch projects count
        const { count: projectCount } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true })
          .eq('client_id', user.id);

        // Update stats (mocking designers and messages for now since we don't have explicit counts yet)
        setStats(prev => [
          { ...prev[0], value: "2" }, // Placeholder
          { ...prev[1], value: (projectCount || 0).toString() },
          { ...prev[2], value: "0" }, // Placeholder
          { ...prev[3], value: "2.4d" },
        ]);

      } catch (err) {
        console.error('Error fetching portal data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortalData();
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
        <h1 className="text-3xl font-bold text-foreground">Welcome back, {profile?.full_name?.split(' ')[0] || 'Member'}</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening with your projects.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-surface rounded-2xl p-5"
          >
            <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} strokeWidth={1.5} />
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {[
          { label: "View Designers", view: "designers" as PortalView, desc: "See your assigned team" },
          { label: "Manage Projects", view: "projects" as PortalView, desc: "Control project status" },
          { label: "Send Feedback", view: "feedback" as PortalView, desc: "Rate work or report issues" },
        ].map((action, i) => (
          <motion.button
            key={action.view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.05 }}
            onClick={() => onNavigate(action.view)}
            className="glass-surface-hover rounded-2xl p-5 text-left group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{action.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{action.desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {recentActivity.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="flex items-center justify-between py-3 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <p className="text-sm text-foreground">{item.text}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{item.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortalOverview;
