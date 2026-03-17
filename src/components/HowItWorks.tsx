"use client";

import { motion } from "framer-motion";
import { UserPlus, Layers, Activity, Zap } from "lucide-react";

interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  delay?: number;
  highlight: string;
  icon: React.ReactNode;
}

function StepCard({
  stepNumber,
  title,
  description,
  delay = 0,
  highlight,
  icon
}: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="flex flex-col h-full"
    >
      <div className="glass-surface p-8 rounded-[2.5rem] border border-white/5 h-full relative overflow-hidden group hover:border-white/10 transition-colors shadow-2xl">
         {/* Number Badge */}
         <div className="absolute top-6 left-6 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-black text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            {stepNumber}
         </div>

         {/* Icon Header */}
         <div className="flex justify-end mb-8 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-white/40 group-hover:text-white transition-colors">
               {icon}
            </div>
         </div>

         <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white tracking-tight mb-4">{title}</h3>
            <p className="text-sm leading-relaxed text-white/50 mb-6 font-medium">
              {description}
            </p>
            <div className="text-[11px] uppercase tracking-widest font-black text-indigo-400">
               {highlight}
            </div>
         </div>
         
         {/* Background gradient on hover */}
         <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/5 group-hover:to-purple-500/5 transition-colors pointer-events-none" />
      </div>
    </motion.div>
  );
}

export default function HowItWorksSteps() {
  const steps = [
    {
      stepNumber: 1,
      title: "Choose Your Designers",
      description: "Browse vetted designers across SaaS, fintech, healthcare, eCommerce, and marketing. See portfolios, ratings, and industry expertise.",
      highlight: "Industry Specialized",
      icon: <UserPlus className="w-5 h-5" />
    },
    {
      stepNumber: 2,
      title: "Submit Unlimited Requests",
      description: "From landing pages and product UI to marketing graphics and ad creatives. Submit as many tasks as your queue allows.",
      highlight: "No Scope Creep",
      icon: <Layers className="w-5 h-5" />
    },
    {
      stepNumber: 3,
      title: "Track Progress in Real Time",
      description: "Every task moves through clear stages: Queued → Designing → Review → Revision → Completed. No guessing.",
      highlight: "Total Transparency",
      icon: <Activity className="w-5 h-5" />
    },
    {
      stepNumber: 4,
      title: "Get Results Fast",
      description: "Starter plan: 48-hour delivery on average. Pro plan: 24-hour delivery. Larger projects get daily progress updates.",
      highlight: "Speed as a Feature",
      icon: <Zap className="w-5 h-5" />
    },
  ];

  return (
    <section className="w-full bg-[#050505] px-6 py-32 font-sans relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.03)_0%,_transparent_70%)] pointer-events-none" />
      
      <div className="mx-auto max-w-6xl relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="mb-20 text-center"
        >
           <p className="text-[10px] uppercase tracking-[0.4em] font-black text-white/30 mb-6">Workflow</p>
           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
             How It Actually <span className="italic font-light opacity-80">Works</span>
           </h2>
           <p className="max-w-2xl mx-auto text-lg leading-relaxed text-white/50 font-medium">
             Remove uncertainty. Our structured queue system ensures you always know what's happening and when it's done.
           </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <StepCard
              key={step.stepNumber}
              {...step}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
