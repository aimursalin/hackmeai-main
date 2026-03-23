import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronRight, ChevronLeft, CheckCircle, AlertTriangle, PartyPopper } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

type FeedbackType = "rating" | "complaint";

const PROJECTS = [
  { name: "Brand Identity Redesign", emoji: "🏷️" },
  { name: "Dashboard UI Kit",        emoji: "💻" },
  { name: "Landing Page v2",         emoji: "🌐" },
  { name: "Meta Ad Creatives",       emoji: "📢" },
  { name: "Social Media Kit",        emoji: "📱" },
];

const STEP_LABELS = ["Pick a Project", "Your Rating", "Tell Us More"];

const PortalFeedback = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [type, setType] = useState<FeedbackType>("rating");
  const [selectedProject, setSelectedProject] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [projects, setProjects] = useState(PROJECTS);

  useEffect(() => {
    const demo = sessionStorage.getItem('demo_auth');
    if (demo) return;
    if (!user) return;
    supabase.from('projects').select('name').eq('client_id', user.id).then(({ data }) => {
      if (data && data.length > 0) setProjects(data.map((p: any) => ({ name: p.name, emoji: "📁" })));
    });
  }, [user]);

  const handleSubmit = async () => {
    if (user && !sessionStorage.getItem('demo_auth')) {
      try {
        await supabase.from('feedback').insert({ user_id: user.id, type, project_name: selectedProject, message, rating: type === 'rating' ? rating : null, status: 'pending' });
      } catch {}
    }
    setSubmitted(true);
  };

  const reset = () => { setStep(0); setType("rating"); setSelectedProject(""); setRating(0); setMessage(""); setSubmitted(false); };
  const canNext = step === 0 ? !!selectedProject : step === 1 ? (type === "rating" ? rating > 0 : true) : true;
  const starLabel = ["", "😕 Poor", "😐 Fair", "🙂 Good", "😊 Great", "🤩 Excellent!"][hoverRating || rating];

  if (submitted) return (
    <div className="text-center py-16 px-4">
      <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", damping: 14 }}>
        <div className="w-24 h-24 rounded-full mx-auto mb-5 flex items-center justify-center"
          style={{ background: "rgba(250,42,101,0.1)", boxShadow: "0 0 60px rgba(250,42,101,0.2)" }}>
          <PartyPopper className="w-12 h-12 text-accent" />
        </div>
        <h2 className="text-3xl font-black text-white mb-2">Thank you! 🎉</h2>
        <p className="text-white/40 text-base mb-8">Your feedback has been sent. We'll review it soon.</p>
        <button onClick={reset}
          className="px-8 py-3 rounded-2xl text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg,#fa2a65,#d41e55)", boxShadow: "0 0 20px rgba(250,42,101,0.3)" }}>
          Submit More Feedback
        </button>
      </motion.div>
    </div>
  );

  return (
    <div className="space-y-5 max-w-xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">⭐ Give Feedback</h1>
        <p className="text-white/35 text-sm mt-1">Help us improve by rating or flagging an issue</p>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          {STEP_LABELS.map((label, i) => (
            <span key={label} className={`text-xs font-bold transition-colors ${i <= step ? "text-accent" : "text-white/20"}`}>
              {i < step ? "✅" : i === step ? "👉" : "⬜"} {label}
            </span>
          ))}
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <motion.div className="h-full rounded-full" animate={{ width: `${((step + 1) / 3) * 100}%` }} transition={{ duration: 0.4 }}
            style={{ background: "linear-gradient(90deg,#fa2a65,#ff6b9d)", boxShadow: "0 0 10px rgba(250,42,101,0.4)" }} />
        </div>
      </div>

      {/* Card */}
      <div className="rounded-3xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <AnimatePresence mode="wait">
          {/* Step 0: Pick project */}
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-lg font-black text-white mb-1">Which project is this about? 📁</h2>
              <p className="text-sm text-white/35 mb-5">Choose the project you want to review</p>
              <div className="space-y-2">
                {projects.map(p => (
                  <button key={p.name} onClick={() => setSelectedProject(p.name)}
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left transition-all"
                    style={{
                      background: selectedProject === p.name ? "rgba(250,42,101,0.12)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${selectedProject === p.name ? "rgba(250,42,101,0.3)" : "rgba(255,255,255,0.07)"}`,
                    }}>
                    <span className="text-xl">{p.emoji}</span>
                    <span className={`text-sm font-semibold ${selectedProject === p.name ? "text-white" : "text-white/60"}`}>{p.name}</span>
                    {selectedProject === p.name && <CheckCircle className="w-4 h-4 text-accent ml-auto" />}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 1: Type + rating */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-lg font-black text-white mb-1">What would you like to do? 🤔</h2>
              <p className="text-sm text-white/35 mb-5">Rate the work, or tell us about a problem</p>

              {/* Toggle */}
              <div className="flex gap-2 mb-6 p-1 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)" }}>
                {[
                  { id: "rating" as FeedbackType,    emoji: "⭐", label: "Rate the Work" },
                  { id: "complaint" as FeedbackType, emoji: "🚨", label: "Report a Problem" },
                ].map(opt => (
                  <button key={opt.id} onClick={() => setType(opt.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${type === opt.id ? "text-white" : "text-white/30"}`}
                    style={type === opt.id ? { background: opt.id === "rating" ? "rgba(250,42,101,0.2)" : "rgba(239,68,68,0.2)", border: `1px solid ${opt.id === "rating" ? "rgba(250,42,101,0.3)" : "rgba(239,68,68,0.3)"}` } : {}}>
                    {opt.emoji} {opt.label}
                  </button>
                ))}
              </div>

              {/* Stars */}
              {type === "rating" && (
                <div className="text-center">
                  <p className="text-sm text-white/40 mb-4">How would you rate the work?</p>
                  <div className="flex justify-center gap-3 mb-3">
                    {[1,2,3,4,5].map(s => (
                      <motion.button key={s} whileTap={{ scale: 0.85 }}
                        onMouseEnter={() => setHoverRating(s)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(s)}
                        className="transition-transform hover:scale-110">
                        <Star className={`w-12 h-12 transition-all duration-150 ${s <= (hoverRating || rating) ? "text-amber-400 fill-amber-400" : "text-white/10"}`} />
                      </motion.button>
                    ))}
                  </div>
                  {starLabel && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg font-black text-amber-400">{starLabel}</motion.p>
                  )}
                </div>
              )}

              {type === "complaint" && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-300/80">You'll describe the issue in the next step. We take all reports seriously!</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 2: Message */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-lg font-black text-white mb-1">
                {type === "rating" ? "Anything else to add? 💬" : "Tell us what went wrong 🔍"}
              </h2>
              <p className="text-sm text-white/35 mb-5">
                {type === "rating" ? "Optional — but your thoughts help us improve!" : "Be as detailed as you can"}
              </p>
              <div className="px-3 py-2 rounded-xl mb-4 text-sm text-white/50 flex items-center gap-2"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <span>📁</span> <span className="font-semibold">{selectedProject}</span>
                {type === "rating" && rating > 0 && <><span>·</span><span className="flex gap-0.5">{[...Array(rating)].map((_,i)=><Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400"/>)}</span></>}
              </div>
              <textarea
                value={message} onChange={e => setMessage(e.target.value)}
                required={type === "complaint"} rows={5}
                placeholder={type === "rating" ? "What did you love? What could be better? 😊" : "Describe what went wrong. Be specific so we can help you fast! 🙏"}
                className="w-full rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none transition-all resize-none"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                onFocus={e => e.target.style.borderColor = "rgba(250,42,101,0.4)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-3">
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white/50 hover:text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
        )}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => step < 2 ? setStep(s => s + 1) : handleSubmit()}
          disabled={!canNext}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold text-white transition-all disabled:opacity-30"
          style={{ background: "linear-gradient(135deg,#fa2a65,#d41e55)", boxShadow: canNext ? "0 0 20px rgba(250,42,101,0.35)" : "none" }}
        >
          {step < 2 ? (<>Next Step <ChevronRight className="w-4 h-4" /></>) : (<>Submit Feedback 🚀</>)}
        </motion.button>
      </div>
    </div>
  );
};

export default PortalFeedback;
