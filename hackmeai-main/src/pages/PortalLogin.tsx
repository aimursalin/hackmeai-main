import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const PortalLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast({
        title: "Missing fields",
        description: "Please enter both your email and password.",
        variant: "destructive",
      });
      return;
    }

    // Mock login — go straight to portal
    navigate("/portal/dashboard");
  };

  const handleForgotPassword = () => {
    toast({
      title: "Reset link sent",
      description: "If an account exists with that email, you'll receive a reset link shortly.",
    });
  };

  const handleRequestInvite = () => {
    toast({
      title: "Request received",
      description: "We'll review your request and get back to you within 24 hours.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            DOMINANCE<span className="text-accent">.</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-2">Client Portal</p>
        </div>

        {/* Login Card */}
        <div className="glass-surface rounded-3xl p-8">
          <h2 className="text-xl font-semibold text-foreground mb-1">Welcome back</h2>
          <p className="text-sm text-muted-foreground mb-8">Sign in to your workspace</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="login-email" className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
              />
            </div>

            <div>
              <label htmlFor="login-password" className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 pr-12 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="remember-me" className="flex items-center gap-2 cursor-pointer">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border border-white/[0.15] bg-white/[0.04] accent-accent cursor-pointer"
                />
                <span className="text-xs text-muted-foreground">Remember me</span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs text-accent hover:text-accent/80 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <Button id="login-submit" type="submit" variant="superior" className="w-full group">
              Sign In
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground/60 mt-6">
          Don't have access?{" "}
          <button
            onClick={handleRequestInvite}
            className="text-accent hover:text-accent/80 transition-colors"
          >
            Request an invite
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default PortalLogin;
