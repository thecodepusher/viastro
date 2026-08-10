import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { faqsEn, faqsSr, faqsRu } from "@/constants/FaQ";

export default function FandQ(props: { langCode: string }) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  let faqs = faqsEn;
  let title = "Frequently asked questions";

  if (props.langCode == "sr") {
    title = "Često postavljana pitanja";
    faqs = faqsSr;
  } else if (props.langCode == "ru") {
    title = "Часто задаваемые вопросы";
    faqs = faqsRu;
  }

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <section className="bg-surface section-pattern py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-center mb-10 sm:mb-14">
          {title}
        </h3>

        <dl className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-start">
          {faqs.map((faq, index) => {
            const isOpen = openItems.has(index);
            return (
              <div
                key={faq.question}
                className="rounded-xl border border-border/70 bg-card overflow-hidden self-start">
                <dt>
                  <button
                    onClick={() => toggleItem(index)}
                    className={cn(
                      "w-full px-5 py-4 flex items-center justify-between text-left transition-colors cursor-pointer",
                      isOpen ? "bg-pl/60" : "hover:bg-pl/30",
                    )}>
                    <span className="text-sm sm:text-base font-semibold text-foreground pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-200",
                        isOpen && "rotate-180 text-p",
                      )}
                    />
                  </button>
                </dt>
                <div
                  className={cn(
                    "text-sm sm:text-base text-muted-foreground px-5 overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-96 pb-4" : "max-h-0",
                  )}>
                  <div className="pt-1">{faq.answer}</div>
                </div>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
