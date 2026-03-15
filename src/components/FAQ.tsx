import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How fast will I receive my designs?",
    a: "Most requests are delivered within 24–48 hours depending on your plan. Superior plan members receive same-day turnaround on priority requests.",
  },
  {
    q: "What if I'm not satisfied with the design?",
    a: "We offer revision rounds based on your plan. Dominance Superior members get unlimited revisions and lifetime access to request changes on any delivered design.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Absolutely. There are no contracts or cancellation fees. Cancel anytime from your dashboard—your access remains active until the end of your billing period.",
  },
  {
    q: "How do design credits work?",
    a: "Each design credit covers one design request. Credits don't expire and can be used across any design service we offer—graphic, UI/UX, web, or ads.",
  },
  {
    q: "Can I choose my designer?",
    a: "Yes. Browse our designer profiles in each service category and select 2–4 designers you'd like to work with. We match you based on availability and expertise.",
  },
  {
    q: "What's included in lifetime access?",
    a: "Dominance Superior members can request revisions or changes to any previously delivered design—forever. No additional cost, no expiration.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Questions answered</h2>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="glass-surface rounded-2xl px-6 border-none"
            >
              <AccordionTrigger className="text-foreground text-left text-sm font-medium hover:no-underline py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
