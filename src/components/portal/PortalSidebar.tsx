import { useState, useEffect } from "react";
import { LayoutDashboard, Users, FolderKanban, MessageCircle, Star, LogOut, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { PortalView } from "@/pages/PortalDashboard";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  activeView: PortalView;
  onNavigate: (view: PortalView) => void;
}

const navItems: { id: PortalView; label: string; sub: string; emoji: string; icon: React.ElementType }[] = [
  { id: "overview",  label: "Home",        sub: "Dashboard & updates",   emoji: "🏠", icon: LayoutDashboard },
  { id: "designers", label: "My Team",     sub: "Your designers",         emoji: "🎨", icon: Users },
  { id: "projects",  label: "Projects",    sub: "Track your work",        emoji: "📁", icon: FolderKanban },
  { id: "chat",      label: "Messages",    sub: "Talk to designers",      emoji: "💬", icon: MessageCircle },
  { id: "feedback",  label: "Rate Work",   sub: "Give a review",          emoji: "⭐", icon: Star },
];

const PortalSidebar = ({ activeView, onNavigate }: Props) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const demoAuth = sessionStorage.getItem('demo_auth');
    if (demoAuth) { setProfile({ full_name: JSON.parse(demoAuth).full_name || 'Demo Client' }); return; }
    if (!user) return;
    supabase.from('profiles').select('full_name').eq('id', user.id).single()
      .then(({ data }) => setProfile(data));
  }, [user]);

  const handleSignOut = async () => {
    sessionStorage.removeItem('demo_auth');
    await supabase.auth.signOut();
    navigate("/portal");
  };

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'Member';
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <aside className="w-64 min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a0a10 0%, #060609 100%)", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
      
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-40 bg-accent/8 rounded-full blur-3xl pointer-events-none" />

      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/[0.05] relative z-10">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-accent" fill="currentColor" />
          <span className="text-sm font-black text-white tracking-tight">DOMINANCE<span className="text-accent">.</span></span>
        </div>
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <p className="text-[9px] uppercase tracking-[0.3em] text-white/25 font-black">Client Portal</p>
        </div>
      </div>

      {/* User profile */}
      <div className="px-4 py-4 border-b border-white/[0.05] relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-black text-white"
              style={{ background: "linear-gradient(135deg, #fa2a65, #ff6b9d)", boxShadow: "0 0 16px rgba(250,42,101,0.35)" }}>
              {initials}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0a0a10]" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-white truncate">{displayName}</p>
            <p className="text-[10px] text-white/25 font-medium">Dominance Pro ✨</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5 relative z-10">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              whileTap={{ scale: 0.97 }}
              className="relative w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-left transition-all duration-200 group"
              style={isActive ? {
                background: "linear-gradient(90deg, rgba(250,42,101,0.15), rgba(250,42,101,0.04))",
              } : {}}
            >
              {/* Active left bar */}
              {isActive && (
                <motion.div layoutId="sidebarBar"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-accent rounded-full"
                  style={{ boxShadow: "0 0 8px rgba(250,42,101,0.8)" }} />
              )}
              {/* Emoji + Icon */}
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                isActive ? "scale-100" : "scale-90 opacity-60 group-hover:scale-100 group-hover:opacity-80"
              }`}
                style={{ background: isActive ? "rgba(250,42,101,0.15)" : "rgba(255,255,255,0.04)" }}>
                <span className="text-lg leading-none">{item.emoji}</span>
              </div>
              
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-bold transition-colors ${isActive ? "text-white" : "text-white/45 group-hover:text-white/70"}`}>
                  {item.label}
                </p>
                <p className={`text-[10px] font-medium transition-colors ${isActive ? "text-white/40" : "text-white/20 group-hover:text-white/35"}`}>
                  {item.sub}
                </p>
              </div>

              {/* Unread badge for messages */}
              {item.id === "chat" && (
                <span className="w-5 h-5 rounded-full bg-accent text-white text-[10px] flex items-center justify-center font-black flex-shrink-0"
                  style={{ boxShadow: "0 0 8px rgba(250,42,101,0.5)" }}>3</span>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-white/[0.05] relative z-10 space-y-2">
        {/* Plan badge */}
        <div className="px-3 py-2.5 rounded-2xl"
          style={{ background: "linear-gradient(90deg,rgba(250,42,101,0.08),transparent)", border: "1px solid rgba(250,42,101,0.12)" }}>
          <p className="text-[9px] text-white/25 uppercase tracking-widest font-black">Your Plan</p>
          <p className="text-xs text-accent font-bold mt-0.5">Dominance Pro ✨</p>
          <p className="text-[10px] text-white/20">Unlimited revisions included</p>
        </div>

        {/* Sign out */}
        <button onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm text-white/25 hover:text-red-400 hover:bg-red-400/5 transition-all duration-200 group">
          <LogOut className="w-4 h-4 group-hover:text-red-400 transition-colors" strokeWidth={1.5} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default PortalSidebar;
