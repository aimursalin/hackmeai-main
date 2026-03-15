"use client"

import * as React from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface TabProps {
  text: string
  selected: boolean
  setSelected: (text: string) => void
  discount?: boolean
}

export function Tab({
  text,
  selected,
  setSelected,
  discount = false,
}: TabProps) {
  return (
    <button
      onClick={() => setSelected(text)}
      className={cn(
        "relative w-fit px-6 py-2.5 text-sm font-bold capitalize transition-all duration-300",
        selected ? "text-background" : "text-muted-foreground hover:text-foreground",
        discount && "flex items-center justify-center gap-2.5"
      )}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="tab"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          className="absolute inset-0 z-0 rounded-full bg-foreground shadow-lg"
        />
      )}
      {discount && (
        <Badge
          variant="secondary"
          className={cn(
            "relative z-10 whitespace-nowrap shadow-none scale-90 -mr-2",
            selected ? "bg-background/20 text-background border-transparent" : "bg-accent/10 text-accent border-accent/20"
          )}
        >
          Save 35%
        </Badge>
      )}
    </button>
  )
}
