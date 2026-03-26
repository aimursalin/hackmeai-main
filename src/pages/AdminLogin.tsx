import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Eye, EyeOff, Lock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isLoading } = useAuth();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const checkRole = async () => {
      if (!user) return;
      
      const demoAuth = sessionStorage.getItem('demo_auth');
      if (demoAuth) {
        setUserRole(JSON.parse(demoAuth).role);
        return;
      }

      const { data } = await supabase.from('profiles').select('role').eq('id', user.id).single();
      setUserRole(data?.role || null);
    };
    checkRole();
  }, [user]);

  if (!isLoading && user && userRole) {
    if (userRole === 'admin') return <Navigate to="/portal/admin/dashboard" replace />;
    if (userRole === 'leader') return <Navigate to="/portal/leader/dashboard" replace />;
    if (userRole === 'client') return <Navigate to="/portal/dashboard" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast({
        title: "Security prompt",
        description: "Credentials are required to access central command.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsAuthorizing(true);
      
      // Demo Mode Bypass
      if (email === "admin@hackmeai.com" && password === "password") {
        sessionStorage.setItem('demo_auth', JSON.stringify({ 
          id: 'demo-admin-id', 
          email: email, 
          role: 'admin',
          full_name: 'System Admin' 
        }));
        toast({ title: "Welcome back, Admin", description: "System access granted via bypass." });
        window.location.href = "/portal/admin/dashboard";
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      // Check if user is admin
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profileError || profile?.role !== 'admin') {
        await supabase.auth.signOut();
        throw new Error("Unauthorized: Administrator privileges required.");
      }

      toast({ title: "Welcome, Administrator", description: "System access granted." });
      navigate("/portal/admin/dashboard");
    } catch (error: any) {
      toast({
        title: "Access Denied",
        description: error.message || "Failed to authorize.",
        variant: "destructive"
      });
    } finally {
      setIsAuthorizing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 overflow-hidden relative selection:bg-white selection:text-black">
      {/* Intense dark glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0%,_transparent_60%)] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Shield className="w-10 h-10 text-white relative z-10" />
          </motion.div>
          <h1 className="text-4xl font-extrabold text-white tracking-tighter uppercase mb-2 italic">Admin <span className="not-italic text-white/40">Authority</span></h1>
          <p className="text-white/20 text-[10px] tracking-[0.5em] font-bold uppercase">Central Command Terminal</p>
        </div>

        <div className="glass-surface border border-white/5 rounded-[2.5rem] p-10 shadow-2xl relative group overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6 relative">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] ml-1">Administrator Email</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@hackmeai.com"
                  className="w-full h-14 bg-white/[0.03] border border-white/10 rounded-2xl px-12 text-white placeholder:text-white/10 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/10 transition-all font-mono text-sm tracking-widest"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] ml-1">Secure Keyphrase</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-14 bg-white/[0.03] border border-white/10 rounded-2xl px-5 text-white placeholder:text-white/10 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/10 transition-all font-mono text-sm tracking-widest"
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

            <Button type="submit" variant="default" className="w-full h-14 bg-white text-black hover:bg-white/90 rounded-2xl font-bold tracking-widest uppercase text-xs transition-all flex items-center justify-center gap-2 group">
              Authorize Entrance
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
        </div>
        
        <div className="mt-12 flex justify-between items-center px-4">
           <p className="text-[9px] text-white/10 uppercase tracking-[0.3em] font-bold">Node: 771-alpha</p>
           <p className="text-[9px] text-white/10 uppercase tracking-[0.3em] font-bold">Encrypted L-4</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
