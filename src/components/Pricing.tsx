import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: 499,
    period: "mo",
    features: [
      "48 hour turnaround",
      "1 active task",
      "Unlimited revisions",
      "Slack + dashboard communication",
      "Source files included",
    ],
    cta: "Start 3-Day Trial",
    highlighted: false,
  },
  {
    name: "Pro",
    price: 899,
    period: "mo",
    features: [
      "24 hour turnaround",
      "2 active tasks",
      "Priority queue",
      "Choose specific designers",
      "Unlimited revisions",
      "Slack + dashboard communication",
      "Source files included",
    ],
    cta: "Start 3-Day Trial",
    highlighted: true,
  },
  {
    name: "Scale",
    price: 2999,
    period: "mo",
    features: [
      "Unlimited active tasks",
      "Dedicated design team",
      "Developer support (React/Tailwind)",
      "Priority delivery",
      "Strategy calls",
      "Unlimited revisions",
      "Slack + dashboard communication",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-16"
        >
           <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
             Simple, <span className="italic font-light opacity-80">Predictable Pricing</span>
           </h2>
           <p className="text-lg text-muted-foreground max-w-xl mx-auto font-medium">
             Replace your entire design department for the cost of one junior hire. No hidden fees. No surprises.
           </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-[2rem] p-8 flex flex-col ${
                  plan.highlighted
                    ? "glass-surface ring-2 ring-indigo-500 shadow-[0_0_40px_rgba(99,102,241,0.15)] transform md:-translate-y-4"
                    : "glass-surface border border-white/5"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <div className="h-10">
                     <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-black text-foreground tabular-nums tracking-tighter">
                           ${plan.price}
                        </span>
                        <span className="text-muted-foreground text-sm font-bold uppercase tracking-widest">/{plan.period}</span>
                     </div>
                  </div>
                </div>

                <div className="w-full h-px bg-white/10 mb-8" />

                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-foreground/80 font-medium leading-relaxed">
                      <Check className="w-5 h-5 text-indigo-400 flex-shrink-0 drop-shadow-[0_0_5px_rgba(129,140,248,0.5)]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.highlighted ? "default" : "outline"}
                  size="lg"
                  className={`w-full h-14 rounded-xl text-base font-bold shadow-xl ${
                     plan.highlighted 
                     ? 'bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                     : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                  }`}
                >
                  {plan.cta}
                  {plan.highlighted && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
