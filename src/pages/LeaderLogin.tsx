import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Eye, EyeOff, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const LeaderLogin = () => {
  const [leaderId, setLeaderId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaderId.trim() || !password.trim()) {
      toast({
        title: "Access denied",
        description: "Please provide valid leader credentials.",
        variant: "destructive",
      });
      return;
    }
    toast({ title: "Welcome back, Leader", description: "You are now managing your section." });
    navigate("/portal/leader/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#080a0f] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Blue circuit-like glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.1)_0%,_transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.05)_0%,_transparent_40%)]" />
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="mb-10 text-left">
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 border border-blue-500/20">
            <Users className="w-6 h-6 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Section Leader</h1>
          <p className="text-blue-400/60 text-sm mt-1">Manage your team and track projects</p>
        </div>

        <div className="glass-surface rounded-[2rem] p-8 border border-white/5 backdrop-blur-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/40 uppercase tracking-widest ml-1">Assigned Section</label>
              <select className="w-full h-14 bg-white/[0.03] border border-white/10 rounded-2xl px-4 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer">
                <option value="A" className="bg-[#080a0f]">Section A (UI/UX)</option>
                <option value="B" className="bg-[#080a0f]">Section B (Motion Ads)</option>
                <option value="C" className="bg-[#080a0f]">Section C (Branding)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/40 uppercase tracking-widest ml-1">Work ID</label>
              <div className="relative">
                <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400/40" />
                <input
                  type="text"
                  value={leaderId}
                  onChange={(e) => setLeaderId(e.target.value)}
                  placeholder="SL-8801"
                  className="w-full h-14 bg-white/[0.03] border border-white/10 rounded-2xl px-12 text-white placeholder:text-white/10 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/40 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-14 bg-white/[0.03] border border-white/10 rounded-2xl px-4 text-white placeholder:text-white/10 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold tracking-tight text-base transition-all active:scale-[0.98] shadow-[0_10px_30px_rgba(59,130,246,0.3)]">
              Enter Workspace
            </Button>
          </form>
        </div>
        
        <div className="mt-10 flex items-center justify-between px-2">
          <span className="text-[10px] text-white/20 uppercase tracking-widest">Team Management v2.4</span>
          <button className="text-[10px] text-blue-400/60 uppercase tracking-widest hover:text-blue-400 transition-colors">Help Center</button>
        </div>
      </motion.div>
    </div>
  );
};

export default LeaderLogin;
