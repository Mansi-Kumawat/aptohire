import React from 'react';
import { getFaqItems } from '@/content/faq';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const Faq: React.FC = () => {
  const faqItems = getFaqItems();

  return (
    <section className="py-16 md:py-28 bg-canvas border-b border-hairline">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-left mb-10">
            <span className="text-[12px] font-mono uppercase tracking-wider text-moss font-semibold px-2.5 py-1 rounded bg-mist border border-hairline inline-block mb-3">
              FAQ
            </span>
            <h2 className="text-display-l font-display font-bold text-ink">
              Frequently asked questions
            </h2>
            <p className="text-[17px] text-moss mt-2">
              Clear, grounded answers on skill scoring, privacy, and platform rules.
            </p>
          </div>
        </ScrollReveal>

        {/* Radix single-accordion */}
        <ScrollReveal delayMs={100}>
          <Accordion type="single" collapsible className="w-full divide-y divide-hairline">
            {faqItems.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  );
};
