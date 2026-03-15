"use client";

import * as React from "react";
import { useAnimate } from "framer-motion";
import { Mail, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HighlighterItem, HighlightGroup, Particles } from "@/components/ui/highlighter";

export function ConnectSection() {
  const [scope, animate] = useAnimate();

  React.useEffect(() => {
    animate(
      [
        ["#pointer", { left: 200, top: 60 }, { duration: 0 }],
        ["#branding", { opacity: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: 50, top: 102 },
          { at: "+0.5", duration: 0.5, ease: "easeInOut" },
        ],
        ["#branding", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
        ["#graphic-design", { opacity: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: 224, top: 170 },
          { at: "+0.5", duration: 0.5, ease: "easeInOut" },
        ],
        ["#graphic-design", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
        ["#web-app", { opacity: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: 88, top: 198 },
          { at: "+0.5", duration: 0.5, ease: "easeInOut" },
        ],
        ["#web-app", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
        ["#ui-ux", { opacity: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: 200, top: 60 },
          { at: "+0.5", duration: 0.5, ease: "easeInOut" },
        ],
        ["#ui-ux", { opacity: 0.5 }, { at: "-0.3", duration: 0.1 }],
      ],
      {
        repeat: Number.POSITIVE_INFINITY,
      },
    );
  }, [animate]);

  return (
    <section className="relative mx-auto mb-24 mt-12 max-w-5xl px-6">
      <HighlightGroup className="group h-full">
        <div className="group/item h-full w-full">
          <HighlighterItem className="rounded-3xl p-px bg-white/5 border border-white/10">
            <div className="relative z-20 h-full overflow-hidden rounded-3xl bg-black/40 backdrop-blur-xl border border-white/5">
              <Particles
                className="absolute inset-0 -z-10 opacity-20 transition-opacity duration-1000 ease-in-out group-hover/item:opacity-100"
                quantity={150}
                color={"#8A2BE2"}
                vy={-0.2}
              />
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-12 p-8 md:p-12 min-h-[400px]">
                {/* Visual Animation Area */}
                <div
                  className="relative h-[280px] w-[300px] flex-shrink-0"
                  ref={scope}
                >
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary opacity-80">
                    <Sparkles className="h-10 w-10 animate-pulse" />
                  </div>
                  
                  <div
                    id="ui-ux"
                    className="absolute bottom-12 left-14 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-2 text-xs font-medium text-white/90 opacity-50"
                  >
                    UI-UX
                  </div>
                  <div
                    id="graphic-design"
                    className="absolute left-2 top-20 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-2 text-xs font-medium text-white/90 opacity-50"
                  >
                    Graphic Design
                  </div>
                  <div
                    id="web-app"
                    className="absolute bottom-20 right-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-2 text-xs font-medium text-white/90 opacity-50"
                  >
                    Web Application
                  </div>
                  <div
                    id="branding"
                    className="absolute right-12 top-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-2 text-xs font-medium text-white/90 opacity-50"
                  >
                    Branding
                  </div>

                  <div id="pointer" className="absolute z-30">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 12 13"
                      className="fill-primary drop-shadow-[0_0_8px_rgba(138,43,226,0.6)]"
                      stroke="white"
                      strokeWidth="1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 5.50676L0 0L2.83818 13L6.30623 7.86537L12 5.50676V5.50676Z"
                      />
                    </svg>
                    <span className="relative -top-2 left-4 rounded-full px-3 py-1 text-xs font-bold text-white bg-primary shadow-lg border border-white/20">
                      Dominance
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex flex-col flex-1 text-center md:text-left">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight leading-tight">
                    Any questions about <br />
                    <span className="text-primary italic">Strategy & Design?</span>
                  </h3>
                  <p className="text-muted-foreground text-lg mb-8 max-w-md">
                    We're here to help you scale your digital presence with precision and speed.
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                    <Button variant="superior" size="lg" className="rounded-full">
                      Book a strategy call
                    </Button>
                    
                    <div className="flex gap-2">
                       <Button variant="glass" size="icon" className="rounded-full h-12 w-12 border border-white/10">
                          <Mail className="h-5 w-5" />
                       </Button>
                       <Button variant="glass" size="icon" className="rounded-full h-12 w-12 border border-white/10">
                          <MessageCircle className="h-5 w-5" />
                       </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </HighlighterItem>
        </div>
      </HighlightGroup>
    </section>
  );
}
