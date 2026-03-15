import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Eye, EyeOff, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminId.trim() || !password.trim()) {
      toast({
        title: "Security prompt",
        description: "Credentials are required to access central command.",
        variant: "destructive",
      });
      return;
    }
    toast({ title: "Welcome, Administrator", description: "System access granted." });
    navigate("/portal/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 overflow-hidden relative">
      {/* Intense dark glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0%,_transparent_50%)]" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-widest uppercase">Admin Authority</h1>
          <p className="text-white/40 text-xs mt-2 tracking-widest font-medium">CENTRAL CONTROL CENTER</p>
        </div>

        <div className="bg-[#111] border border-white/5 rounded-[2rem] p-10 shadow-2xl relative group">
          <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          
          <form onSubmit={handleLogin} className="space-y-6 relative">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Admin ID</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type="text"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  placeholder="ADM-XXXX"
                  className="w-full h-14 bg-white/[0.03] border border-white/10 rounded-xl px-12 text-white placeholder:text-white/10 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/10 transition-all font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Keyphrase</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-14 bg-white/[0.03] border border-white/10 rounded-xl px-12 text-white placeholder:text-white/10 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/10 transition-all font-mono"
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

            <Button type="submit" className="w-full h-14 bg-white text-black hover:bg-white/90 rounded-xl font-bold tracking-widest uppercase text-xs transition-all active:scale-[0.98]">
              Authorize Access
            </Button>
          </form>
        </div>
        
        <p className="text-center text-[10px] text-white/20 mt-8 uppercase tracking-[0.3em] font-medium font-mono">
          Secure Encrypted Connection
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
