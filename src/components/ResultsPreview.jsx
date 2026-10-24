import React from 'react';
import { SlidersHorizontal, FileText, HeartHandshake, Share2, Sparkles, Check } from 'lucide-react';
import { useLanguage } from '../i18n/index.jsx';

export default function ResultsPreview({ onStartQuiz }) {
  const { t } = useLanguage();

  const deliverables = [
    {
      icon: SlidersHorizontal,
      title: t.resultsPreview.item1Title,
      desc: t.resultsPreview.item1Desc,
    },
    {
      icon: FileText,
      title: t.resultsPreview.item2Title,
      desc: t.resultsPreview.item2Desc,
    },
    {
      icon: HeartHandshake,
      title: t.resultsPreview.item3Title,
      desc: t.resultsPreview.item3Desc,
    },
    {
      icon: Sparkles,
      title: t.resultsPreview.item4Title,
      desc: t.resultsPreview.item4Desc,
    },
    {
      icon: Share2,
      title: t.resultsPreview.item5Title,
      desc: t.resultsPreview.item5Desc,
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-y border-[#F0E4E8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#C75C7A]">
              {t.resultsPreview.badge}
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[#30272C] font-normal leading-tight">
              {t.resultsPreview.title}
            </h2>
            <p className="text-base text-[#786B72] leading-relaxed">
              {t.resultsPreview.subtitle}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm font-medium text-[#30272C]">
                <div className="w-5 h-5 rounded-full bg-[#E5F0E5] text-[#2D4F3A] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>{t.resultsPreview.check1}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-[#30272C]">
                <div className="w-5 h-5 rounded-full bg-[#E5F0E5] text-[#2D4F3A] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>{t.resultsPreview.check2}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-[#30272C]">
                <div className="w-5 h-5 rounded-full bg-[#E5F0E5] text-[#2D4F3A] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>{t.resultsPreview.check3}</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onStartQuiz}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#C75C7A] hover:bg-[#b44f6c] text-white font-semibold text-sm shadow-sm transition-all cursor-pointer"
              >
                {t.resultsPreview.cta}
              </button>
            </div>
          </div>

          {/* Right Cards List */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {deliverables.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className={`p-6 rounded-3xl border border-[#F0E4E8] bg-[#FFF9F5] hover:bg-white transition-all duration-200 ${idx === 4 ? 'sm:col-span-2' : ''}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FCEBF0] text-[#C75C7A] flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif-editorial text-lg text-[#30272C] mb-1.5 font-bold">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#786B72] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
