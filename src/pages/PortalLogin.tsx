import { useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import StepCard from "@/components/ui/step-card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const PortalLogin = () => {
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

  const triggerDemo = () => {
    sessionStorage.setItem('demo_auth', JSON.stringify({ id: 'demo-client-id', email: 'client@hackmeai.com', role: 'client', full_name: 'Demo Client' }));
    window.location.href = "/portal/dashboard";
  };

  const handleComplete = async (data: { email: string; password: string; otp: string }) => {
    // Demo Mode Bypass
    if (data.email === "client@hackmeai.com" && data.password === "password") {
       sessionStorage.setItem('demo_auth', JSON.stringify({ 
         id: 'demo-client-id', 
         email: data.email, 
         role: 'client',
         full_name: 'Demo Client' 
       }));
       toast({
         title: "Demo Access Authorized",
         description: "Welcome back. Running in system bypass mode.",
       });
       // Need a small timeout to let AuthContext pick up the change if not using reactive listener
       window.location.href = "/portal/dashboard";
       return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      toast({
        title: "Access Authorized",
        description: "Welcome back. System nominal.",
      });
      navigate("/portal/dashboard");
    } catch (error: any) {
      toast({
        title: "Access Denied",
        description: error.message || "Invalid credentials. Use demo: client@hackmeai.com / password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 overflow-hidden relative selection:bg-accent selection:text-white">
      {/* Ambient Premium Glows - Matching Hero */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(250,42,101,0.10)_0%,_transparent_60%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] opacity-40 pointer-events-none" />
      
      <div className="w-full max-w-lg relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-12"
        >
          {/* Logo / Badge */}
          <div className="inline-flex items-center gap-2 glass-surface rounded-full px-4 py-1.5 mb-8 border border-white/10">
            <Shield className="w-3.5 h-3.5 text-accent" />
            <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">Secure Gateway</span>
          </div>

          {/* Huge Hero-style Header */}
          <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tighter text-white mb-4">
            DOMINANCE<span className="text-accent">.</span>
          </h1>
          <p className="text-lg font-medium text-white/30 tracking-wide uppercase italic">
             Client <span className="text-white/60">Portal</span>
          </p>
        </motion.div>

        {/* The Multi-Step Flow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <StepCard onComplete={handleComplete} />
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-[11px] text-white/20 mt-12 uppercase tracking-[0.4em] font-bold"
        >
          Encrypted Biometric Verification Required
        </motion.p>

        {/* Demo shortcut */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="text-center mt-4"
        >
          <button
            onClick={triggerDemo}
            className="text-xs text-white/20 hover:text-accent transition-colors underline underline-offset-2"
          >
            Skip login — Demo access
          </button>
        </motion.div>
      </div>

      {/* Corporate Branding / Location Info - Matching Hero Vibes */}
      <div className="absolute bottom-10 left-12 hidden lg:flex items-center gap-3 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
         <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
         Dublin / London / New York Central Gate
      </div>
    </div>
  );
};

export default PortalLogin;
