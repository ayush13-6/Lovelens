import React from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { useLanguage } from '../i18n/index.jsx';

export default function FinalCta({ onStartQuiz }) {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#FFF9F5] to-[#FCEBF0]/60 border-t border-[#F0E4E8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-sm border border-[#F0E4E8] text-[#C75C7A] mb-2">
          <Heart className="w-7 h-7 fill-[#C75C7A]" />
        </div>

        <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl text-[#30272C] leading-tight">
          {t.finalCta.readyText} <br className="hidden sm:inline" />
          <span className="italic text-[#C75C7A]">{t.finalCta.readyHighlight}</span>
        </h2>

        <p className="text-base sm:text-lg text-[#786B72] max-w-xl mx-auto leading-relaxed">
          {t.finalCta.subtext}
        </p>

        <div className="pt-2">
          <button
            onClick={onStartQuiz}
            className="inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-[#C75C7A] hover:bg-[#b44f6c] text-white font-semibold text-lg shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>{t.finalCta.button}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#786B72] pt-2">
          {t.finalCta.note}
        </p>

      </div>
    </section>
  );
}
