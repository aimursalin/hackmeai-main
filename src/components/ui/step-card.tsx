"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"

type Step = 1 | 2 | 3

interface StepCardProps {
  onComplete?: (data: { email: string; password: string; otp: string }) => void
}

export default function StepCard({ onComplete }: StepCardProps) {
  const [step, setStep] = React.useState<Step>(1)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [otp, setOtp] = React.useState("")

  const nextStep = () => setStep((prev) => (prev < 3 ? (prev + 1) as Step : prev))
  const prevStep = () => setStep((prev) => (prev > 1 ? (prev - 1) as Step : prev))

  const handleSubmit = () => {
    if (onComplete) {
      onComplete({ email, password, otp })
    }
    // We'll handle navigation in the parent
  }

  const stepVariants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  }

  return (
    <div className="w-full">
      <div className="glass-surface p-8 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="flex justify-between items-center mb-8 px-1">
          {[1, 2, 3].map((s) => (
             <div key={s} className="flex flex-col items-center gap-2">
                <div className={`w-8 h-1 rounded-full transition-all duration-300 ${step >= s ? "bg-accent" : "bg-white/5"}`} />
                <span className={`text-[10px] font-bold uppercase tracking-widest ${step === s ? "text-white" : "text-white/20"}`}>Step 0{s}</span>
             </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Work Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 bg-white/[0.03] border-white/10 rounded-2xl focus:border-accent/50"
                />
              </div>
              <Button variant="superior" onClick={nextStep} className="w-full">
                Continue Access
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              <div className="space-y-2">
                <Label htmlFor="password" title="Keyphrase" className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Keyphrase</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 bg-white/[0.03] border-white/10 rounded-2xl focus:border-accent/50 font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <Button variant="outline" onClick={prevStep} className="rounded-2xl border-white/5 hover:bg-white/5 text-white/40">
                  Back
                </Button>
                <Button variant="superior" onClick={nextStep}>
                  Next
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] ml-1">2FA Secure Token</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="1 2 3 4 5 6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="h-14 bg-white/[0.03] border-white/10 rounded-2xl focus:border-accent/50 text-center text-xl font-bold tracking-[0.5em]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <Button variant="outline" onClick={prevStep} className="rounded-2xl border-white/5 hover:bg-white/5 text-white/40">
                  Back
                </Button>
                <Button variant="superior" onClick={handleSubmit}>
                  Authorize
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
