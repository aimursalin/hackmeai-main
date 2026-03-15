import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Briefcase, Award, Activity, Terminal, ChevronRight, Star, Building2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BentoGrid, BentoItem } from "@/components/ui/bento-grid";

import { teamMembers } from "@/data/siteData";

const Team = () => {
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedMember]);

  return (
    <section id="team" className="py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">Our Elite Team</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">The Dominance Squad</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Every pixel matters. Meet the minds that shape our dominance.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-surface rounded-3xl p-6 text-center group relative overflow-hidden flex flex-col items-center"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-white/[0.08] mb-6 flex items-center justify-center text-3xl font-light text-foreground group-hover:bg-accent/[0.08] group-hover:text-accent transition-all duration-500 shadow-inner border border-white/5 overflow-hidden relative">
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  member.name.charAt(0)
                )}
                <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{member.role}</p>

              {/* Golden Stroke Name/Skill Tag with Stars */}
              <div className="inline-flex items-center gap-2 border border-amber-500/50 bg-amber-500/5 rounded-full px-3 py-1.5 mb-6 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                <div className="flex items-center gap-0.5">
                  {[...Array(member.stars)].map((_, starIdx) => (
                    <Star key={starIdx} className="w-3 h-3 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-amber-500/90 border-l border-amber-500/30 pl-2">
                  {member.tag}
                </span>
              </div>
              
              <Button 
                variant="glass" 
                size="sm" 
                className="w-full mt-auto text-xs font-semibold tracking-wide border-white/10 hover:bg-white/10 hover:text-white"
                onClick={() => setSelectedMember(member)}
              >
                <Activity className="w-3.5 h-3.5 mr-2 opacity-70" />
                Track Record
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(0,119,255,0.15)] overflow-hidden flex flex-col"
            >
              {/* Futuristic Background Accents */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
              
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-bold text-xl shadow-[0_0_15px_rgba(0,119,255,0.3)] overflow-hidden">
                    {selectedMember.image ? (
                      <img 
                        src={selectedMember.image} 
                        alt={selectedMember.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      selectedMember.name.charAt(0)
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-wide">{selectedMember.name}</h3>
                    <p className="text-sm text-muted-foreground font-mono bg-white/5 inline-block px-2 py-0.5 rounded uppercase mt-1">{selectedMember.role} // {selectedMember.tag}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedMember(null)}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-colors border border-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Dashboard Content */}
              <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
                
                {/* Left Column: Stats */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                  <div className="bg-[#111] border border-white/5 rounded-2xl p-5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-accent/10 rounded-full blur-xl group-hover:bg-accent/20 transition-colors" />
                    <Award className="w-5 h-5 text-accent mb-4" />
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Success Rate</p>
                    <p className="text-4xl font-light text-white font-mono">{selectedMember.successRate}</p>
                    <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }} 
                         animate={{ width: selectedMember.successRate }} 
                         transition={{ duration: 1, delay: 0.2 }}
                         className="h-full bg-accent shadow-[0_0_10px_rgba(0,119,255,0.5)]" 
                       />
                    </div>
                  </div>

                  <div className="bg-[#111] border border-white/5 rounded-2xl p-5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-colors" />
                    <Terminal className="w-5 h-5 text-emerald-400 mb-4" />
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{selectedMember.statLabel}</p>
                    <p className="text-4xl font-light text-white font-mono">{selectedMember.statValue}</p>
                  </div>

                  <div className="bg-[#111] border border-white/5 rounded-2xl p-5">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4 border-b border-white/5 pb-2">Technical Arsenal</p>
                    <div className="flex flex-wrap gap-2">
                       {selectedMember.skills.map((skill, idx) => (
                         <span key={idx} className="bg-white/5 border border-white/10 text-xs text-purple-100 px-2.5 py-1 rounded-md">
                           {skill}
                         </span>
                       ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Work Experience Matrix */}
                <div className="lg:col-span-2 bg-[#111] border border-white/5 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                    <Briefcase className="w-5 h-5 text-muted-foreground" />
                    <h4 className="text-sm font-semibold uppercase tracking-widest text-white">Work Experience Matrix</h4>
                  </div>
                  
                  <BentoGrid 
                    items={selectedMember.experience.map((exp, idx) => ({
                      title: exp.role,
                      description: `${exp.company} - Driving excellence and delivering high-quality results in design and engineering.`,
                      icon: <Building2 className="w-4 h-4 text-accent" />,
                      meta: exp.duration,
                      tags: [exp.company],
                      status: idx === 0 ? "Latest" : undefined,
                      colSpan: 3, 
                      hasPersistentHover: idx === 0
                    }))} 
                  />
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Team;
