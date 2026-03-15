"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface WeatherIconProps {
  size?: number;
  className?: string;
}

/* ─── SUN ─── */
export function SunIcon({ size = 48, className }: WeatherIconProps) {
  return (
    <motion.svg viewBox="0 0 48 48" fill="none" className={cn("", className)} style={{ width: size, height: size }}>
      <motion.circle cx="24" cy="24" r="10" fill="currentColor" initial={{ scale: 0.8 }} animate={{ scale: [0.8, 1, 0.8] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} />
    </motion.svg>
  );
}

/* ─── MOON ─── */
export function MoonIcon({ size = 48, className }: WeatherIconProps) {
  return (
    <motion.svg viewBox="0 0 48 48" fill="none" className={cn("", className)} style={{ width: size, height: size }}>
      <motion.path d="M36 24c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12c2 0 3.86.488 5.5 1.34-2.5 1.5-4.5 4.5-4.5 7.66s2 6.16 4.5 7.66c-1.64.852-3.5 1.34-5.5 1.34" fill="currentColor" initial={{ rotate: -10 }} animate={{ rotate: [10, -10, 10] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} />
    </motion.svg>
  );
}

/* ─── CLOUD ─── */
export function CloudIcon({ size = 48, className }: WeatherIconProps) {
  return (
    <motion.svg viewBox="0 0 48 48" fill="none" className={cn("", className)} style={{ width: size, height: size }}>
      <motion.path d="M37 32c3.314 0 6-2.686 6-6s-2.686-6-6-6c-.34 0-.67.03-1 .09C34.5 16.2 30.6 13 26 13c-5.523 0-10 4.477-10 10 0 .34.02.67.06 1-3.35.6-5.86 3.53-5.86 7 0 3.866 3.134 7 7 7h20z" fill="currentColor" animate={{ x: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} />
    </motion.svg>
  );
}

/* ─── THUNDER ─── */
export function ThunderIcon({ size = 48, className }: WeatherIconProps) {
  return (
    <motion.svg viewBox="0 0 48 48" fill="none" className={cn("", className)} style={{ width: size, height: size }}>
      <motion.path d="M26 10L14 26h8l-2 12 12-16h-8l2-10z" fill="currentColor" initial={{ opacity: 0.5 }} animate={{ opacity: [1, 0.2, 1], scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} />
    </motion.svg>
  );
}

/* ─── PARTLY CLOUDY ─── */
export function PartlyCloudyIcon({ size = 48, className }: WeatherIconProps) {
  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      <SunIcon size={size * 0.7} className="absolute top-0 right-0 text-amber-500" />
      <CloudIcon size={size * 0.8} className="absolute bottom-0 left-0 text-slate-400" />
    </div>
  );
}

/* ─── SUNRISE ─── */
export function SunriseIcon({ size = 48, className }: WeatherIconProps) {
  return (
    <motion.svg viewBox="0 0 48 48" fill="none" className={cn("", className)} style={{ width: size, height: size }}>
      <motion.path d="M12 32h24M24 10v6M14 14l4 4M34 14l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <motion.circle cx="24" cy="32" r="8" fill="currentColor" initial={{ y: 5 }} animate={{ y: [-2, 5, -2] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} />
    </motion.svg>
  );
}
