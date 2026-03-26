import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Eye, EyeOff, UserCircle, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

const LeaderLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [section, setSection] = useState("A");
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
        title: "Access denied",
        description: "Please provide valid leader credentials.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsAuthorizing(true);

      // Demo Mode Bypass
      if (email === "leader@hackmeai.com" && password === "password") {
        sessionStorage.setItem('demo_auth', JSON.stringify({ 
          id: 'demo-leader-id', 
          email: email, 
          role: 'leader',
          full_name: 'Lead Designer',
          section: section
        }));
        toast({ title: "Welcome back, Leader", description: "Bypass access granted." });
        window.location.href = "/portal/leader/dashboard";
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      // Check if user has leader role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profileError || (profile?.role !== 'leader' && profile?.role !== 'admin')) {
        await supabase.auth.signOut();
        throw new Error("Unauthorized: Section Leader privileges required.");
      }

      toast({ title: "Welcome back, Leader", description: "You are now managing your section." });
      navigate("/portal/leader/dashboard");
    } catch (error: any) {
      toast({
        title: "Access Denied",
        description: error.message || "Failed to authorize.",
        variant: "destructive",
      });
    } finally {
      setIsAuthorizing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080a0f] flex items-center justify-center px-6 relative overflow-hidden selection:bg-blue-500/30 selection:text-white">
      {/* Blue circuit-like glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.12)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.08)_0%,_transparent_50%)]" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md z-10"
      >
        <div className="mb-12 text-center">
          <motion.div 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/20 mx-auto shadow-[0_0_40px_rgba(59,130,246,0.1)]"
          >
            <Users className="w-7 h-7 text-blue-400" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-3">Section <span className="text-blue-500">Leader</span></h1>
          <p className="text-blue-400/40 text-sm font-medium tracking-wide uppercase">Workspace Authorization</p>
        </div>

        <div className="glass-surface rounded-[2.5rem] p-10 border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          
          <form onSubmit={handleLogin} className="space-y-6 relative">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] ml-1">Assigned Section</label>
              <div className="relative">
                <LayoutGrid className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400/30" />
                <select 
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  className="w-full h-14 bg-white/[0.03] border border-white/10 rounded-2xl px-12 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer text-sm font-medium"
                >
                  <option value="A" className="bg-[#080a0f]">Section Alpha (Design)</option>
                  <option value="B" className="bg-[#080a0f]">Section Beta (Motion)</option>
                  <option value="C" className="bg-[#080a0f]">Section Gamma (Ads)</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] ml-1">Leader Email</label>
              <div className="relative">
                <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="leader@hackmeai.com"
                  className="w-full h-14 bg-white/[0.03] border border-white/10 rounded-2xl px-12 text-white placeholder:text-white/10 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm tracking-widest"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] ml-1">Authentication Key</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-14 bg-white/[0.03] border border-white/10 rounded-2xl px-5 text-white placeholder:text-white/10 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all font-mono text-sm tracking-widest"
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

            <Button 
              type="submit" 
              disabled={isAuthorizing}
              variant="superior" 
              className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold tracking-widest uppercase text-xs transition-all active:scale-[0.98] shadow-[0_15px_30px_rgba(59,130,246,0.3)] border-none disabled:opacity-50"
            >
              {isAuthorizing ? "Authorizing..." : "Initialize Command"}
            </Button>
          </form>
        </div>
        
        <div className="mt-12 flex items-center justify-between px-4">
          <span className="text-[9px] text-white/10 uppercase tracking-[0.4em] font-bold">Network: Blue-Secure</span>
          <button className="text-[9px] text-blue-400/40 uppercase tracking-[0.4em] font-bold hover:text-blue-400 transition-colors">Help Terminal</button>
        </div>
      </motion.div>
    </div>
  );
};

export default LeaderLogin;
