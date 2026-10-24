import React from 'react';
import { useLanguage } from '../i18n/index.jsx';
import { MessageSquare, Clock, Gift, HandHeart, HeartHandshake } from 'lucide-react';

const CATEGORY_ICONS = {
  words_of_affirmation: MessageSquare,
  quality_time: Clock,
  receiving_gifts: Gift,
  acts_of_service: HandHeart,
  physical_touch: HeartHandshake,
};

export default function CategoryCards({ onStartQuiz }) {
  const { t, categories } = useLanguage();
  const categoryList = Object.values(categories);

  return (
    <section id="five-languages" className="py-16 md:py-24 bg-[#FFF9F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#C75C7A]">
            {t.categoryCards.badge}
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[#30272C] font-normal">
            {t.categoryCards.title}
          </h2>
          <p className="text-base text-[#786B72]">
            {t.categoryCards.subtitle}
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryList.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id] || MessageSquare;

            return (
              <div
                key={cat.id}
                className="group rounded-3xl bg-white border border-[#F0E4E8] p-7 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header with Icon & Category Name */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 shrink-0"
                      style={{ backgroundColor: cat.bgSoft, color: cat.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif-editorial text-xl text-[#30272C]">
                        {cat.name}
                      </h3>
                      <span className="text-xs font-medium text-[#786B72]">
                        {cat.shortName}
                      </span>
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: cat.badgeText }}>
                    {cat.tagline}
                  </p>

                  {/* Summary */}
                  <p className="text-sm text-[#786B72] leading-relaxed mb-6">
                    {cat.summary}
                  </p>
                </div>

                {/* Practical Example Snippet */}
                <div className="pt-4 border-t border-[#F0E4E8]">
                  <p className="text-xs text-[#30272C] font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                    <span className="text-[#786B72]">{t.categoryCards.keyGesture}</span>
                    <span className="truncate">{cat.practicalWays[0]?.title}</span>
                  </p>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Prompt to Take Test */}
          <div className="rounded-3xl bg-gradient-to-br from-[#FCEBF0] via-[#FFF9F5] to-[#EEE8FA] border border-[#F0E4E8] p-7 flex flex-col justify-between shadow-xs">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-white/80 text-[#C75C7A] text-xs font-semibold uppercase tracking-wider mb-4">
                {t.categoryCards.whichResonates}
              </span>
              <h3 className="font-serif-editorial text-2xl text-[#30272C] mb-3">
                {t.categoryCards.findRank}
              </h3>
              <p className="text-sm text-[#786B72] leading-relaxed">
                {t.categoryCards.findRankDesc}
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={onStartQuiz}
                className="w-full py-3.5 px-6 rounded-full bg-[#C75C7A] hover:bg-[#b44f6c] text-white text-sm font-semibold shadow-sm transition-all text-center cursor-pointer"
              >
                {t.categoryCards.startQuizNow}
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
