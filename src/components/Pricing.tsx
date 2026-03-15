import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tab } from "@/components/ui/pricing-tab";

const FREQUENCIES = ["monthly", "yearly"];

const plans = [
  {
    name: "Dominance Pass",
    tagline: "The Token Entry",
    price: { monthly: 460, yearly: 460 },
    period: "one-time",
    icon: Zap,
    features: [
      "10 design credits",
      "All design services",
      "48h turnaround",
      "2 revision rounds",
      "Source files included",
    ],
    cta: "Buy Tokens",
    highlighted: false,
  },
  {
    name: "Dominance Pass Pro",
    tagline: "The Standard",
    price: { monthly: 799, yearly: 519 },
    period: "mo",
    icon: Crown,
    features: [
      "Unlimited design requests",
      "All design services",
      "24h turnaround",
      "Unlimited revisions",
      "Source files included",
      "Priority queue",
      "Cancel anytime",
    ],
    cta: "Secure Your Pass",
    highlighted: true,
  },
  {
    name: "Dominance Superior",
    tagline: "The Lifetime",
    price: { monthly: 2999, yearly: 2999 },
    originalPrice: 3999,
    period: "one-time",
    icon: Sparkles,
    features: [
      "Everything in Pro",
      "Lifetime access",
      "25% discount applied",
      "Dedicated design lead",
      "Same-day turnaround",
      "Lifetime revision access",
      "Any previous design revision or change after delivery",
    ],
    cta: "Go Superior",
    highlighted: false,
    superior: true,
  },
];

const Pricing = () => {
  const [frequency, setFrequency] = useState(FREQUENCIES[0]);

  const handlePurchaseClick = (planName: string) => {
    toast.success(`Welcome to the ${planName} tier`, {
      description: "Our concierge will contact you shortly to finalize your setup.",
      position: "top-center",
    });
  };

  return (
    <section id="pricing" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Invest in dominance</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">Subscribe once, cancel anytime. No contracts, no friction.</p>

          <div className="flex justify-center">
            <div className="flex w-fit rounded-full bg-muted/50 p-1 border border-white/5 backdrop-blur-sm">
              {FREQUENCIES.map((f) => (
                <Tab
                  key={f}
                  text={f}
                  selected={frequency === f}
                  setSelected={setFrequency}
                  discount={f === "yearly"}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => {
            const currentPrice = frequency === "yearly" ? plan.price.yearly : plan.price.monthly;
            
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-3xl p-8 flex flex-col ${
                  plan.superior
                    ? "gradient-border"
                    : plan.highlighted
                    ? "glass-surface ring-1 ring-accent/20"
                    : "glass-surface"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-medium px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                {plan.superior && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs font-medium px-4 py-1 rounded-full">
                    25% OFF
                  </div>
                )}

                <div className="mb-6">
                  <plan.icon className="w-6 h-6 text-foreground/60 mb-4" strokeWidth={1.5} />
                  <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.tagline}</p>
                </div>

                <div className="mb-8 h-[72px]">
                  <div className="flex items-baseline gap-1">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`${plan.name}-${frequency}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="text-5xl font-bold text-foreground tabular-nums"
                      >
                        ${currentPrice}
                      </motion.span>
                    </AnimatePresence>
                    {plan.period === "mo" && <span className="text-muted-foreground text-sm">/{plan.period}</span>}
                  </div>
                  {plan.originalPrice && frequency === "monthly" && (
                    <p className="text-sm text-muted-foreground mt-1 line-through tabular-nums">${plan.originalPrice}</p>
                  )}
                  {plan.period === "mo" && frequency === "yearly" && (
                     <p className="text-xs text-accent mt-1 font-medium tracking-wide uppercase">Billed Yearly</p>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-foreground/80">
                      <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" strokeWidth={2} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.highlighted ? "accent" : plan.superior ? "superior" : "glass"}
                  size="lg"
                  className="w-full"
                  onClick={() => handlePurchaseClick(plan.name)}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
