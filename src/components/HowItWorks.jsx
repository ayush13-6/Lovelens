import React from 'react';
import { Sparkles, BarChart3, MessageSquareHeart } from 'lucide-react';
import { useLanguage } from '../i18n/index.jsx';

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      step: '01',
      icon: Sparkles,
      iconBg: 'bg-[#FCEBF0]',
      iconColor: 'text-[#C75C7A]',
      title: t.howItWorks.step01Title,
      description: t.howItWorks.step01Desc,
    },
    {
      step: '02',
      icon: BarChart3,
      iconBg: 'bg-[#EEE8FA]',
      iconColor: 'text-[#533744]',
      title: t.howItWorks.step02Title,
      description: t.howItWorks.step02Desc,
    },
    {
      step: '03',
      icon: MessageSquareHeart,
      iconBg: 'bg-[#E5F0E5]',
      iconColor: 'text-[#496E58]',
      title: t.howItWorks.step03Title,
      description: t.howItWorks.step03Desc,
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white border-y border-[#F0E4E8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#C75C7A]">
            {t.howItWorks.badge}
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[#30272C] font-normal">
            {t.howItWorks.title}
          </h2>
          <p className="text-base text-[#786B72]">
            {t.howItWorks.subtitle}
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="relative rounded-3xl bg-[#FFF9F5] border border-[#F0E4E8] p-8 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl ${item.iconBg} ${item.iconColor} flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-serif-editorial text-2xl font-bold text-[#786B72]/40">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif-editorial text-[#30272C] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#786B72] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F0E4E8]/60 text-xs text-[#786B72] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C75C7A]"></span>
                  <span>{t.howItWorks.timeNote}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
