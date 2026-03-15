import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  { name: "James K.", role: "CEO, Nexgen", text: "The level of craft is unmatched. Every pixel feels intentional." },
  { name: "Sarah L.", role: "CMO, Drift", text: "They don't just design—they solve. Our conversion rate doubled." },
  { name: "Marcus W.", role: "Founder, Altitude", text: "Working with Dominance feels like having an in-house elite team." },
  { name: "Elena R.", role: "VP Design, Craft", text: "The calmest, most professional design agency I've ever worked with." },
  { name: "David T.", role: "CTO, StackLayer", text: "Precision. Speed. Zero friction. Exactly what we needed." },
  { name: "Priya M.", role: "Founder, Luminos", text: "From branding to product—they delivered perfection across the board." },
];

const Trustpilot = () => {
  return (
    <section className="py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-foreground text-foreground" strokeWidth={1.5} />
            ))}
          </div>
          <p className="text-sm text-muted-foreground tracking-wide">
            Rated <span className="text-foreground font-medium tabular-nums">4.9/5</span> by 200+ global founders on Trustpilot
          </p>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex w-fit animate-marquee">
          {[...reviews, ...reviews].map((review, i) => (
            <div
              key={i}
              className="glass-surface rounded-2xl p-6 mx-3 min-w-[320px] max-w-[320px] flex-shrink-0"
            >
              <p className="text-sm text-foreground/80 mb-4 leading-relaxed">"{review.text}"</p>
              <div>
                <p className="text-sm font-medium text-foreground">{review.name}</p>
                <p className="text-xs text-muted-foreground">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trustpilot;
