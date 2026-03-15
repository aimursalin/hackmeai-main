import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

type FeedbackType = "rating" | "complaint";

interface PastFeedback {
  type: FeedbackType;
  project: string;
  message: string;
  rating?: number;
  date: string;
  status: "reviewed" | "pending";
}

const pastFeedback: PastFeedback[] = [
  { type: "rating", project: "Dashboard UI Kit", message: "Exceptional work. The dark mode variants are clean.", rating: 5, date: "Mar 15", status: "reviewed" },
  { type: "complaint", project: "Meta Ad Creatives (Batch 2)", message: "Colors were inconsistent with the brand guide.", date: "Mar 10", status: "reviewed" },
];

const projects = [
  "Brand Identity Redesign",
  "Dashboard UI Kit",
  "Landing Page v2",
  "Meta Ad Creatives (Batch 3)",
  "Social Media Kit",
];

const PortalFeedback = () => {
  const [type, setType] = useState<FeedbackType>("rating");
  const [selectedProject, setSelectedProject] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setMessage("");
      setRating(0);
      setSelectedProject("");
    }, 2500);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Feedback</h1>
        <p className="text-muted-foreground mt-1">Rate your designer's work or report any issues.</p>
      </div>

      <div className="grid md:grid-cols-5 gap-6">
        {/* Form */}
        <div className="md:col-span-3">
          <div className="glass-surface rounded-2xl p-6">
            {/* Type toggle */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setType("rating")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  type === "rating" ? "bg-accent/10 text-accent" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Star className="w-4 h-4" strokeWidth={1.5} />
                Rate Work
              </button>
              <button
                onClick={() => setType("complaint")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  type === "complaint" ? "bg-destructive/10 text-destructive" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <AlertTriangle className="w-4 h-4" strokeWidth={1.5} />
                Report Issue
              </button>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-12 h-12 text-accent mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground">Thank you for your feedback!</p>
                <p className="text-sm text-muted-foreground mt-1">We'll review it shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Project select */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                    Select Project
                  </label>
                  <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    required
                    className="w-full h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 text-sm text-foreground focus:outline-none focus:border-accent/50 transition-all appearance-none"
                  >
                    <option value="" className="bg-card">Choose a project</option>
                    {projects.map((p) => (
                      <option key={p} value={p} className="bg-card">{p}</option>
                    ))}
                  </select>
                </div>

                {/* Star rating (only for rating type) */}
                {type === "rating" && (
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">
                      Rating
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              star <= (hoverRating || rating)
                                ? "text-amber-400 fill-amber-400"
                                : "text-white/10"
                            } transition-colors`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                    {type === "rating" ? "Comments (optional)" : "Describe the issue"}
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required={type === "complaint"}
                    rows={4}
                    placeholder={type === "rating" ? "What did you like about the work?" : "Please describe the issue in detail..."}
                    className="w-full rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/50 transition-all resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="superior"
                  className="w-full group"
                >
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  Submit Feedback
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Past feedback */}
        <div className="md:col-span-2">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Previous Feedback</h2>
          <div className="space-y-3">
            {pastFeedback.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass-surface rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {item.type === "rating" ? (
                      <Star className="w-3.5 h-3.5 text-amber-400" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
                    )}
                    <p className="text-sm font-medium text-foreground">{item.project}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    item.status === "reviewed" ? "bg-accent/10 text-accent" : "bg-amber-400/10 text-amber-400"
                  }`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{item.message}</p>
                {item.rating && (
                  <div className="flex gap-0.5 mt-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3 h-3 ${s <= item.rating! ? "text-amber-400 fill-amber-400" : "text-white/10"}`}
                      />
                    ))}
                  </div>
                )}
                <p className="text-[10px] text-muted-foreground/60 mt-2">{item.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalFeedback;
