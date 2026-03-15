"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FAQItem = {
  question: string;
  answer: string;
};

interface FAQSectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  faqsLeft: FAQItem[];
  faqsRight: FAQItem[];
  className?: string;
}

export function FAQSection({
  id,
  title = "FAQ",
  subtitle = "Questions Answered",
  description = "Find answers to commonly asked questions about our services and process.",
  buttonLabel = "Contact Us",
  onButtonClick,
  faqsLeft,
  faqsRight,
  className,
}: FAQSectionProps) {
  return (
    <section id={id} className={cn("py-32 px-6", className)}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr,2fr] gap-16">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-bold">{title}</p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">{subtitle}</h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-sm">
              {description}
            </p>
            <Button variant="superior" onClick={onButtonClick} className="mt-4">
              {buttonLabel}
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqsLeft.map((faq, i) => (
                  <AccordionItem key={i} value={`left-${i}`} className="glass-surface rounded-2xl border-none px-6">
                    <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="space-y-4">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqsRight.map((faq, i) => (
                  <AccordionItem key={i} value={`right-${i}`} className="glass-surface rounded-2xl border-none px-6">
                    <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
