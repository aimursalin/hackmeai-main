"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface AccordionItem {
  id: string
  number: string
  title: string
  content: string
}

const defaultItems: AccordionItem[] = [
  {
    id: "design",
    number: "01",
    title: "Design",
    content:
      "We craft pixel-perfect interfaces that blend aesthetics with functionality, creating memorable digital experiences.",
  },
  {
    id: "development",
    number: "02",
    title: "Development",
    content: "Building robust, scalable solutions with modern technologies that stand the test of time and traffic.",
  },
  {
    id: "strategy",
    number: "03",
    title: "Strategy",
    content: "Data-driven insights and creative thinking combine to position your brand for lasting success.",
  },
  {
    id: "growth",
    number: "04",
    title: "Growth",
    content: "Sustainable scaling strategies that transform startups into industry leaders through measurable results.",
  },
]

interface UniqueAccordionProps {
  items?: AccordionItem[]
  className?: string
}

export function UniqueAccordion({ items = defaultItems, className }: UniqueAccordionProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id || null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <div className="space-y-0">
        {items.map((item, index) => {
          const isActive = activeId === item.id
          const isHovered = hoveredId === item.id

          return (
            <div key={item.id} className="border-b border-white/5 last:border-0">
              <motion.button
                onClick={() => setActiveId(isActive ? null : item.id)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="w-full group relative"
                initial={false}
              >
                <div className="flex items-center gap-6 py-6 px-1 text-left">
                  {/* Number with animated circle */}
                  <div className="relative flex items-center justify-center w-10 h-10 flex-shrink-0">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-accent"
                      initial={false}
                      animate={{
                        scale: isActive ? 1 : isHovered ? 0.85 : 0,
                        opacity: isActive ? 1 : isHovered ? 0.1 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    />
                    <motion.span
                      className="relative z-10 text-xs font-bold tracking-widest transition-colors duration-200"
                      animate={{
                        color: isActive ? "#000" : "#94a3b8", // fallback for muted
                      }}
                    >
                      {item.number}
                    </motion.span>
                  </div>

                  {/* Title */}
                  <motion.h3
                    className="text-2xl font-semibold tracking-tight transition-colors duration-200"
                    animate={{
                      x: isActive || isHovered ? 8 : 0,
                      color: isActive || isHovered ? "#fff" : "#64748b",
                    }}
                  >
                    {item.title}
                  </motion.h3>

                  {/* Animated indicator */}
                  <div className="ml-auto flex items-center gap-3">
                    <motion.div
                      className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10"
                      animate={{ 
                        rotate: isActive ? 45 : 0,
                        backgroundColor: isActive ? "rgba(255,255,255,0.05)" : "transparent"
                      }}
                    >
                      <motion.svg
                        width="12"
                        height="12"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="text-white"
                        animate={{
                          opacity: isActive || isHovered ? 1 : 0.4,
                        }}
                      >
                        <path
                          d="M8 1V15M1 8H15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </motion.svg>
                    </motion.div>
                  </div>
                </div>

                {/* Animated underline */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-accent origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: isActive ? 1 : isHovered ? 0.2 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              </motion.button>

              {/* Content */}
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                      transition: {
                        height: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2, delay: 0.1 },
                      },
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.1 },
                      },
                    }}
                    className="overflow-hidden"
                  >
                    <motion.p
                      className="pl-16 pr-12 pb-8 pt-2 text-slate-400 leading-relaxed text-sm md:text-base"
                      initial={{ y: -10 }}
                      animate={{ y: 0 }}
                      exit={{ y: -10 }}
                    >
                      {item.content}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}
