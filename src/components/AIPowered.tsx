import { motion } from "framer-motion";
import { Sparkles, Bot, Eye, Layout, Zap, Image as ImageIcon, CheckCircle2, Play, Globe, Smartphone, LayoutTemplate, Monitor } from "lucide-react";

const CardContainer = ({ children, delay = 0, className = "" }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 40, filter: "blur(10px)", scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={`bg-[#0c0516] border border-purple-500/20 rounded-[2rem] p-8 flex flex-col relative overflow-hidden group hover:border-purple-500/40 transition-colors ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/0 via-purple-600/5 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    {children}
  </motion.div>
);

const ConnectionLines = ({ isTop }: { isTop?: boolean }) => (
  <div className="hidden md:grid grid-cols-3 w-full h-16 md:h-20 lg:h-24 overflow-hidden relative opacity-60">
    <div className="relative w-full h-full">
       <div className={`absolute left-1/2 w-px bg-purple-500/30 ${isTop ? 'top-0 bottom-1/2' : 'top-1/2 bottom-0'}`} />
       <div className="absolute left-1/2 right-0 top-1/2 h-px bg-purple-500/30" />
       
       <motion.div 
         animate={{ top: isTop ? ["0%", "50%"] : ["50%", "100%"], opacity: [0, 1, 0] }}
         transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
         className={`absolute left-1/2 w-[2px] h-8 bg-purple-400 shadow-[0_0_10_#a855f7] -translate-x-1/2 -translate-y-full`}
       />
       <motion.div 
         animate={{ left: isTop ? ["50%", "100%"] : ["100%", "50%"], opacity: [0, 1, 0] }}
         transition={{ duration: 2, delay: 1, repeat: Infinity, ease: "linear" }}
         className={`absolute top-1/2 h-[2px] w-8 bg-purple-400 shadow-[0_0_10_#a855f7] -translate-y-1/2 -translate-x-full`}
       />

       <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_10_#a855f7] z-10" />
    </div>
    
    <div className="relative w-full h-full">
       {isTop && <div className="absolute left-0 right-0 top-1/2 h-px bg-purple-500/30" />}
       {!isTop && <div className="absolute left-0 right-0 top-1/2 h-px bg-purple-500/30" />}
       <div className="absolute left-1/2 top-0 bottom-0 w-px bg-purple-500/30" />
       
       <motion.div 
         animate={{ top: isTop ? ["0%", "100%"] : ["100%", "0%"], opacity: [0, 1, 0] }}
         transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.5 }}
         className="absolute left-1/2 w-[2px] h-12 bg-purple-400 shadow-[0_0_10_#a855f7] -translate-x-1/2 -translate-y-full"
       />

       <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_10_#a855f7] z-10" />
    </div>
    
    <div className="relative w-full h-full">
       <div className={`absolute left-1/2 w-px bg-purple-500/30 ${isTop ? 'top-0 bottom-1/2' : 'top-1/2 bottom-0'}`} />
       <div className="absolute left-0 right-1/2 top-1/2 h-px bg-purple-500/30" />
       
       <motion.div 
         animate={{ top: isTop ? ["0%", "50%"] : ["50%", "100%"], opacity: [0, 1, 0] }}
         transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1.5 }}
         className={`absolute left-1/2 w-[2px] h-8 bg-purple-400 shadow-[0_0_10_#a855f7] -translate-x-1/2 -translate-y-full`}
       />
       <motion.div 
         animate={{ left: isTop ? ["50%", "0%"] : ["0%", "50%"], opacity: [0, 1, 0] }}
         transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "linear" }}
         className={`absolute top-1/2 h-[2px] w-8 bg-purple-400 shadow-[0_0_10_#a855f7] -translate-y-1/2 -translate-x-full`}
       />

       <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_10_#a855f7] z-10" />
    </div>
  </div>
);

const AIPowered = () => {
  return (
    <section className="py-24 px-6 bg-[#03000a] relative overflow-hidden" id="what-we-do">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-purple-900/10 blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block border border-green-500/30 text-green-400 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider mb-6 bg-green-500/5 backdrop-blur-sm shadow-[0_0_15px_rgba(34,197,94,0.2)]">
            AI Powered Algorithm Strategic Design
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
            Smarter Design, <span className="italic font-light opacity-90">Supercharged By AI</span>
          </h2>
          <p className="text-purple-200/60 max-w-2xl mx-auto text-lg">
            From wireframes to launch, we blend AI tools with strategy to deliver faster, sharper, and data-led design results.
          </p>
        </motion.div>

        {/* The Graphic Ecosystem */}
        <div className="flex flex-col items-center w-full mt-20 max-w-6xl mx-auto pb-10">
          
          {/* Top Row Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full relative z-10">
            <CardContainer delay={0.1}>
              <h3 className="text-xl font-bold text-white mb-3">UX Copy <span className="italic font-light opacity-90">That Clicks</span></h3>
              <p className="text-sm text-purple-200/50 mb-auto leading-relaxed">
                We use AI to create effective copies like CTAs and microcopy that speaks.
              </p>
              <div className="mt-8 bg-[#160a2c] border border-purple-500/20 rounded-2xl p-5 flex flex-col gap-5">
                <div className="flex gap-3 justify-center">
                   <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center border border-white/5"><Bot className="w-5 h-5 text-purple-300" /></div>
                   <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center border border-white/5"><Sparkles className="w-5 h-5 text-purple-300" /></div>
                   <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center border border-white/5"><LayoutTemplate className="w-5 h-5 text-purple-300" /></div>
                </div>
                <div className="bg-black/50 border border-white/5 rounded-xl px-4 py-3 text-sm text-purple-200/40 font-mono">Smarter UX Writing..</div>
                <div 
                   className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl px-4 py-3.5 text-center text-sm text-white font-semibold flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:brightness-110 cursor-pointer transition-all"
                   onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Sparkles className="w-4 h-4" /> Generate
                </div>
              </div>
            </CardContainer>

            <CardContainer delay={0.2} className="mt-8 md:mt-0">
              <h3 className="text-xl font-bold text-white mb-3">Visuals, <span className="italic font-light opacity-90">Instantly On Point</span></h3>
              <p className="text-sm text-purple-200/50 mb-auto leading-relaxed">
                We generate custom visuals using AI for faster concept directions, brand-ready.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                {[
                  { icon: <ImageIcon className="w-4 h-4 text-purple-200" />, name: "Midjourney" },
                  { icon: <Zap className="w-4 h-4 text-purple-200" />, name: "RunwayML" },
                  { icon: <Bot className="w-4 h-4 text-purple-200" />, name: "Ideogram" },
                ].map((tool, i) => (
                  <div key={i} className="bg-[#160a2c] border border-purple-500/20 rounded-xl p-3 flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center border border-white/5 shadow-inner">{tool.icon}</div>
                     <div className="flex flex-col gap-2 flex-1">
                        <span className="text-sm font-medium text-purple-100">{tool.name}</span>
                        <div className="flex flex-col gap-1.5">
                           <div className="h-1 w-full bg-white/5 rounded-full" />
                           <div className="h-1 w-2/3 bg-white/5 rounded-full" />
                        </div>
                     </div>
                  </div>
                ))}
              </div>
            </CardContainer>

            <CardContainer delay={0.3} className="mt-8 md:mt-0">
              <h3 className="text-xl font-bold text-white mb-3">Data-Led <span className="italic font-light opacity-90">Design Decisions</span></h3>
              <p className="text-sm text-purple-200/50 mb-auto leading-relaxed">
                We predict user behavior before launch with AI-powered heatmaps that help us.
              </p>
              <div className="mt-8 bg-[#160a2c] border border-purple-500/20 rounded-2xl p-6 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <Eye className="w-6 h-6 text-purple-300" />
                  <span className="text-sm font-medium text-purple-100">Attention Insight</span>
                </div>
                <div className="flex items-end gap-2.5 h-28 mt-2 justify-between px-1">
                  {[30, 45, 25, 60, 100, 50, 40].map((h, i) => (
                    <div 
                      key={i} 
                      className={`w-full rounded-t-md ${h === 100 ? 'bg-gradient-to-t from-purple-500 to-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.5)]' : 'bg-white/5'}`} 
                      style={{ height: `${h}%` }} 
                    />
                  ))}
                </div>
              </div>
            </CardContainer>
          </div>

          {/* Central Connecting Hub */}
          <ConnectionLines isTop />

          {/* Center Glowing Node with the "Radius to Medium Radius" expanding pulse effect */}
          <motion.div 
            initial={{ scale: 0.2, filter: "blur(20px)", opacity: 0 }}
            whileInView={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative z-30 my-6 flex justify-center items-center"
          >
             {/* Dynamic Expanding Rings to simulate AI Processing wave (lower to medium radius) */}
             <motion.div
                initial={{ scale: 0.5, opacity: 1 }}
                animate={{ scale: 3.5, opacity: 0 }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                className="absolute w-28 h-28 rounded-full border-2 border-purple-500/50 z-0"
             />
             <motion.div
                initial={{ scale: 0.5, opacity: 1 }}
                animate={{ scale: 3.5, opacity: 0 }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1.5 }}
                className="absolute w-28 h-28 rounded-full border border-purple-400/30 z-0"
             />

             {/* Expanding pulsating aura */}
             <motion.div 
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4], borderRadius: ["100%", "50%", "100%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-purple-600/50 blur-[50px] w-40 h-40 -mx-10 -my-10 z-0"
             />
             
             <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#d4aaff] to-[#8040ff] flex items-center justify-center shadow-[0_0_80px_rgba(168,85,247,0.8)] relative z-10 border-4 border-white/20">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-inner">
                   <div className="w-7 h-3.5 bg-purple-600 rounded-b-full mt-2" />
                </div>
             </div>
          </motion.div>

          <ConnectionLines />

          {/* Bottom Row Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full relative z-10">
            <CardContainer delay={0.4}>
              <h3 className="text-xl font-bold text-white mb-3">Smarter & <span className="italic font-light opacity-90">Faster Wireframes</span></h3>
              <p className="text-sm text-purple-200/50 mb-auto leading-relaxed">
                We rapidly turn ideas into functional wireframes using AI tools, with less time spent drafting.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                {[
                  { icon: <Monitor className="w-5 h-5 text-white" />, name: "Visily", sub: "Design wireframes with ease" },
                  { icon: <Layout className="w-5 h-5 text-white" />, name: "Uizard", sub: "Ideas into wireframes instantly" },
                ].map((tool, i) => (
                  <div key={i} className="bg-[#160a2c] border border-purple-500/20 rounded-2xl p-4 flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center border border-white/5">{tool.icon}</div>
                     <div className="flex flex-col flex-1">
                        <span className="text-sm font-semibold text-purple-100">{tool.name}</span>
                        <span className="text-[11px] text-purple-200/50 mt-0.5">{tool.sub}</span>
                     </div>
                  </div>
                ))}
              </div>
            </CardContainer>

            <CardContainer delay={0.5} className="mt-8 md:mt-0 pb-0 justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Launch Quicker, <span className="italic font-light opacity-90">Spend Less</span></h3>
                <p className="text-sm text-purple-200/50 leading-relaxed">
                  AI reduces revisions and guesswork and makes your website ready to launch faster.
                </p>
              </div>
              <div className="mt-8 bg-[#160a2c] border border-purple-500/20 border-b-0 rounded-t-3xl pt-8 flex flex-col items-center h-[200px] relative overflow-hidden -mx-4">
                <div className="flex gap-4 relative z-10 mb-8 px-4 w-full justify-center">
                   <div className="relative">
                     <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center"><Play className="w-5 h-5 text-purple-300" /></div>
                     <CheckCircle2 className="w-4 h-4 text-purple-400 absolute -top-1.5 -right-1.5 bg-[#160a2c] rounded-full" />
                   </div>
                   <div className="relative">
                     <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center"><Smartphone className="w-5 h-5 text-purple-300" /></div>
                     <CheckCircle2 className="w-4 h-4 text-purple-400 absolute -top-1.5 -right-1.5 bg-[#160a2c] rounded-full" />
                   </div>
                   <div className="relative">
                     <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center"><Globe className="w-5 h-5 text-purple-300" /></div>
                     <CheckCircle2 className="w-4 h-4 text-purple-400 absolute -top-1.5 -right-1.5 bg-[#160a2c] rounded-full" />
                   </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 h-28 flex justify-center">
                   <div className="w-[85%] h-full border-t-2 border-x-2 border-purple-500/20 rounded-t-2xl relative bg-black/20">
                      <div className="absolute left-[16%] top-[-30px] w-0.5 h-[30px] bg-purple-500/30" />
                      <div className="absolute left-[50%] top-[-30px] w-0.5 h-[30px] bg-purple-500/30" />
                      <div className="absolute left-[84%] top-[-30px] w-0.5 h-[30px] bg-purple-500/30" />
                      <div className="absolute left-[10%] right-[10%] top-6 h-1 bg-white/5 rounded-full" />
                      <div className="absolute left-[10%] right-[30%] top-10 h-1 bg-white/5 rounded-full" />
                      <CheckCircle2 className="absolute right-4 bottom-4 w-5 h-5 text-purple-400 opacity-60" />
                   </div>
                </div>
              </div>
            </CardContainer>

            <CardContainer delay={0.6} className="mt-8 md:mt-0">
              <h3 className="text-xl font-bold text-white mb-3">No <span className="italic font-light opacity-90">Blank Canvas</span> Struggles</h3>
              <p className="text-sm text-purple-200/50 mb-auto leading-relaxed">
                AI generates editable mockups from prompts so we can skip the slow start.
              </p>
              <div className="mt-8 bg-[#160a2c] border border-purple-500/20 rounded-2xl flex flex-col items-center justify-end overflow-hidden">
                <div className="w-20 h-20 bg-black/40 rounded-[2rem] mb-4 mt-8 border border-white/10 overflow-hidden relative shadow-[0_0_30px_rgba(168,85,247,0.3)] p-1">
                    <img src="https://images.unsplash.com/photo-1614729939124-03290b05f4cc?w=150&q=80" alt="Astronaut kid" className="object-cover w-full h-full rounded-[1.75rem] opacity-90" />
                </div>
                <div className="w-full px-5 pb-5">
                   <div className="bg-black/50 border border-white/5 rounded-xl px-4 py-3.5 text-xs text-purple-200/50 mb-3 truncate font-mono">Create a kid wearing space helmet!</div>
                   <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl px-4 py-3.5 text-center text-sm text-white font-semibold flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:brightness-110 cursor-pointer transition-all">
                    <Sparkles className="w-4 h-4" /> Generate
                  </div>
                </div>
              </div>
            </CardContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIPowered;
