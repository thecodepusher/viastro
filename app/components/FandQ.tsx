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
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 ">
      <h3 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 text-center mb-14">
        {title}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        {faqs.map((faq, index) => {
          const isOpen = openItems.has(index);
          return (
            <div
              key={faq.question}
              className={cn(
                "border border-gray-200 rounded-lg overflow-hidden transition-colors self-start",
                isOpen ? "bg-pl/40" : "bg-pl/20 hover:bg-pl/40"
              )}>
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors cursor-pointer">
                <dt className="text-base/7 font-semibold text-gray-900 pr-4">
                  {faq.question}
                </dt>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-gray-500 shrink-0 transition-transform duration-200",
                    isOpen && "transform rotate-180"
                  )}
                />
              </button>
              <dd
                className={cn(
                  "text-base/7 text-gray-600 px-6 overflow-hidden transition-all duration-300 ease-in-out",
                  isOpen ? "max-h-96 pb-4" : "max-h-0"
                )}>
                <div className="pt-2">{faq.answer}</div>
              </dd>
            </div>
          );
        })}
      </div>
    </div>
  );
}
