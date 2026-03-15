"use client"

import { useState } from "react"

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image: string;
}

interface TestimonialsMinimalProps {
  testimonials: Testimonial[];
}

export function TestimonialsMinimal({ testimonials }: TestimonialsMinimalProps) {
  const [active, setActive] = useState(0)

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-16">
      {/* Quote */}
      <div className="relative min-h-[140px] md:min-h-[120px] mb-12 flex items-center justify-center text-center">
        {testimonials.map((t, i) => (
          <p
            key={i}
            className={`
              absolute inset-0 text-xl md:text-2xl font-light leading-relaxed text-foreground
              transition-all duration-500 ease-out flex items-center justify-center
              ${
                active === i
                  ? "opacity-100 translate-y-0 blur-0"
                  : "opacity-0 translate-y-4 blur-sm pointer-events-none"
              }
            `}
          >
            "{t.quote}"
          </p>
        ))}
      </div>

      {/* Author Row */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        {/* Avatars */}
        <div className="flex flex-wrap justify-center gap-2 max-w-md">
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`
                relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-background
                transition-all duration-300 ease-out border border-white/10
                ${active === i ? "z-10 scale-125 ring-primary ring-offset-2 ring-offset-background" : "grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary"}
              `}
              title={t.name}
            >
              <img src={t.image || "/placeholder.svg"} alt={t.name} className="object-cover w-full h-full" />
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="hidden md:block h-8 w-px bg-border/40" />

        {/* Active Author Info */}
        <div className="relative min-h-[44px] w-48 text-center md:text-left h-fit">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`
                absolute inset-0 flex flex-col justify-center
                transition-all duration-400 ease-out
                ${active === i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"}
              `}
            >
              <span className="text-sm font-semibold text-foreground tracking-tight">{t.name}</span>
              <span className="text-xs text-muted-foreground font-medium">{t.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
