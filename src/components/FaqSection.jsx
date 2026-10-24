import React, { useState } from 'react';
import { useLanguage } from '../i18n/index.jsx';
import { ChevronDown } from 'lucide-react';

export default function FaqSection() {
  const { t, faqs } = useLanguage();
  const [openIds, setOpenIds] = useState(['what-is-love-language']);

  const toggle = (id) => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#FFF9F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#C75C7A]">
            {t.faq.badge}
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[#30272C] font-normal">
            {t.faq.title}
          </h2>
          <p className="text-base text-[#786B72]">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);

            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-[#F0E4E8] bg-white transition-all overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer hover:bg-[#FFFDFB] transition-colors gap-4"
                >
                  <span className="font-serif-editorial text-lg sm:text-xl text-[#30272C] font-medium">
                    {faq.question}
                  </span>
                  <div className={`p-1 rounded-full text-[#786B72] transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#C75C7A]' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-sm sm:text-base text-[#786B72] leading-relaxed border-t border-[#F0E4E8]/60 pt-4 whitespace-pre-line animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
