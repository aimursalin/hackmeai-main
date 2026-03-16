"use client";

import { motion } from "framer-motion";
import { Atom, Plus, MessageSquare, Check, DollarSign } from "lucide-react";

interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  bottomLabel: string;
  logos: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
}

function StepCard({
  stepNumber,
  title,
  description,
  bottomLabel,
  logos,
  children,
  delay = 0,
}: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="flex flex-col"
    >
      <div className="relative">
        <div className="relative h-52 overflow-hidden rounded-3xl bg-[#0c0516] border border-white/5">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: delay + 0.3, ease: "backOut" }}
            className="absolute top-4 left-4 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white text-[10px] font-black text-black uppercase"
          >
            {stepNumber}
          </motion.div>
          {children}
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/40">
          {description}
        </p>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">{bottomLabel}</span>
        <div className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">{logos}</div>
      </div>
    </motion.div>
  );
}

function SubscribeCard() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-orange-500/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full animate-pulse" />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="relative z-10 rounded-2xl bg-white px-8 py-3 text-xs font-black text-black uppercase tracking-widest shadow-[0_20px_40px_rgba(255,255,255,0.1)] transition-all hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)]"
      >
        Start scaling
      </motion.button>
    </div>
  );
}

function RequestCard() {
  const tags = [
    { label: "Design", position: "top-8 left-12" },
    { label: "Webdesign", position: "top-12 left-32" },
    { label: "SaaS", position: "top-8 right-20" },
    { label: "Emails", position: "top-16 right-8" },
    { label: "Landing pages", position: "bottom-16 left-12" },
    { label: "Branding", position: "bottom-20 right-16" },
  ];

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.05)_0%,_transparent_70%)]" />
      <div className="absolute inset-0">
        {tags.map((tag, index) => (
          <motion.span
            key={tag.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.4, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            className={`absolute ${tag.position} rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] text-white/60 backdrop-blur-md`}
          >
            {tag.label}
          </motion.span>
        ))}
      </div>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative z-10 flex h-20 w-20 items-center justify-center rounded-[2.5rem] bg-white/[0.03] border border-white/10 shadow-2xl backdrop-blur-xl"
      >
        <Atom className="h-10 w-10 text-white/80" strokeWidth={1} />
      </motion.div>
    </div>
  );
}

function ReceiveCard() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0c0516]">
       <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent" />
       <div className="w-4/5 h-3/4 rounded-t-2xl border-x border-t border-white/10 bg-white/[0.02] mt-12 overflow-hidden shadow-2xl">
          <div className="h-6 border-b border-white/5 flex items-center px-3 gap-1.5">
             <div className="w-1.5 h-1.5 rounded-full bg-rose-500/40" />
             <div className="w-1.5 h-1.5 rounded-full bg-amber-500/40" />
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
          </div>
          <div className="p-4 flex flex-col gap-3">
             <div className="h-3 w-1/2 bg-white/5 rounded-full" />
             <div className="h-24 w-full bg-white/[0.03] rounded-xl border border-white/5" />
          </div>
       </div>
    </div>
  );
}

function StripeLogo() {
  return (
    <span className="text-white/40 font-bold text-xs">STRIPE</span>
  );
}

function NotionLogo() {
  return (
    <span className="text-white/40 font-bold text-xs">NOTION</span>
  );
}

function SlackLogo() {
  return (
    <span className="text-white/40 font-bold text-xs">SLACK</span>
  );
}

function FigmaLogo() {
  return (
    <span className="text-white/40 font-bold text-xs">FIGMA</span>
  );
}

function AdobeLogo() {
  return (
    <span className="text-white/40 font-bold text-xs">ADOBE</span>
  );
}

export interface HowItWorksStepsProps {
  title?: React.ReactNode;
  subtitle?: string;
  steps?: {
    stepNumber: number;
    title: string;
    description: string;
    bottomLabel: string;
    type: "subscribe" | "request" | "receive";
  }[];
}

export default function HowItWorksSteps({
  title = (
    <>
      <span className="font-instrument italic font-normal text-white">Simple</span>{" "}
      <span className="font-bold text-white uppercase tracking-tighter">as 1,2,3</span>
    </>
  ),
  subtitle = "Get retainer-level support, predictable pricing, and a seamless workflow - so you can focus on growing, not managing creatives.",
  steps = [
    {
      stepNumber: 1,
      title: "Subscribe",
      description:
        "Subscribe to a plan (as simple as pushing a button).",
      bottomLabel: "Secure Payments via:",
      type: "subscribe" as const,
    },
    {
      stepNumber: 2,
      title: "Request",
      description:
        "From logos to landing pages: drop your request and we'll handle the rest, fast!",
      bottomLabel: "Comms via:",
      type: "request" as const,
    },
    {
      stepNumber: 3,
      title: "Receive",
      description:
        "Receive drafts or final assets in just 48 hours on average.",
      bottomLabel: "Designs via:",
      type: "receive" as const,
    },
  ],
}: HowItWorksStepsProps) {
  const renderLogos = (type: string) => {
    switch (type) {
      case "subscribe":
        return <StripeLogo />;
      case "request":
        return (
          <>
            <NotionLogo />
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <SlackLogo />
          </>
        );
      case "receive":
        return (
          <>
            <FigmaLogo />
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <AdobeLogo />
          </>
        );
      default:
        return null;
    }
  };

  const renderCardContent = (type: string) => {
    switch (type) {
      case "subscribe":
        return <SubscribeCard />;
      case "request":
        return <RequestCard />;
      case "receive":
        return <ReceiveCard />;
      default:
        return null;
    }
  };

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
          className="mb-20"
        >
           <p className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 mb-6">Execution Flow</p>
          <h2 className="text-5xl md:text-6xl tracking-tight text-white mb-6">
            {title}
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-white/40">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((step, index) => (
            <StepCard
              key={step.stepNumber}
              stepNumber={step.stepNumber}
              title={step.title}
              description={step.description}
              bottomLabel={step.bottomLabel}
              logos={renderLogos(step.type)}
              delay={index * 0.15}
            >
              {renderCardContent(step.type)}
            </StepCard>
          ))}
        </div>
      </div>
    </section>
  );
}
