import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const realFaqs = [
  {
    q: "Is unlimited actually unlimited?",
    a: "Yes and no. You can submit as many requests as you want, and they will go into your queue. However, we work on one active task at a time (or two, if you're on the Pro plan). This ensures we maintain high quality instead of rushing through a dozen tasks at once."
  },
  {
    q: "How fast are revisions?",
    a: "If you need a revision, simply request it directly inside your task dashboard. Most minor revisions are returned within 24 hours. We offer unlimited revisions until you are 100% satisfied with the result."
  },
  {
    q: "Can I switch designers?",
    a: "On the Pro and Scale plans, absolutely. If you feel a specific specialist isn't perfectly aligned with your market, you can request to switch to another vetted designer in our marketplace."
  },
  {
    q: "How big can projects be?",
    a: "You can request anything from a single banner ad to a full 15-page SaaS UI overhaul. For large projects, we break them down into smaller deliverables (e.g., \"Login Flow\", \"Settings Dashboard\") to ensure you get consistent 24-48 hour updates instead of waiting weeks in silence."
  },
  {
    q: "What if I don't like the design?",
    a: "We pause the cycle. You tell us what's wrong, we listen, and we revise. Because our designers are industry specialists, huge misses are rare. But if it happens, we offer a 3-day money-back guarantee, no questions asked."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-16 text-center"
        >
          <div className="inline-block border border-white/10 text-white/70 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider mb-6 bg-white/5 backdrop-blur-sm uppercase">
            Honest Answers
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">No Fluff. <br className="hidden md:block" />Just the Real Details.</h2>
          <p className="text-muted-foreground font-medium">Have a specific question? Let's clear it up.</p>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-4">
          {realFaqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <AccordionItem
                value={`faq-${i}`}
                className="glass-surface rounded-2xl px-6 py-2 border border-white/5 hover:border-white/10 transition-colors bg-white/[0.02]"
              >
                <AccordionTrigger className="text-foreground text-left text-base font-bold hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-[15px] leading-relaxed pb-6 font-medium">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
