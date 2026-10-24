import React from 'react';
import { ArrowRight, Clock, CheckCircle2, Shield, Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/index.jsx';

export default function Hero({ onStartQuiz }) {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Decorative background atmospheric blur circles */}
      <div 
        aria-hidden="true" 
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#FCEBF0]/60 via-[#EEE8FA]/40 to-[#FBE6D9]/50 rounded-full blur-3xl -z-10 pointer-events-none" 
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCEBF0] border border-[#F0E4E8] text-[#C75C7A] text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.hero.eyebrow}</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl text-[#30272C] tracking-tight leading-[1.12]">
              {t.hero.heading} <span className="text-[#C75C7A] italic">{t.hero.headingHighlight}</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-[#786B72] max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {t.hero.supporting}
            </p>

            {/* CTA Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onStartQuiz}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#C75C7A] hover:bg-[#b44f6c] text-white font-semibold text-base sm:text-lg shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>{t.hero.cta}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Secondary Metadata Info */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs sm:text-sm text-[#786B72] font-medium pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C75C7A]" /> {t.hero.questionsCount}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#786B72]" /> {t.hero.timeEst}
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#496E58]" /> {t.hero.freePrivate}
              </span>
            </div>

          </div>

          {/* Right Column: Decorative Editorial Composition */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Backing decorative card */}
              <div className="absolute inset-0 bg-[#EEE8FA] rounded-3xl transform rotate-3 scale-95 opacity-80 blur-xs"></div>

              {/* Main composition card */}
              <div className="relative rounded-3xl bg-white border border-[#F0E4E8] p-6 sm:p-7 shadow-xl space-y-5">
                
                {/* Header of the mock card */}
                <div className="flex items-center justify-between border-b border-[#F0E4E8] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#FCEBF0] flex items-center justify-center text-[#C75C7A]">
                      <Heart className="w-5 h-5 fill-[#C75C7A]" />
                    </div>
                    <div>
                      <h3 className="font-serif-editorial text-lg text-[#30272C] font-bold">{t.hero.previewTitle}</h3>
                      <p className="text-xs text-[#786B72]">{t.hero.previewSubtitle}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#E5F0E5] text-[#2D4F3A]">
                    {t.hero.sampleResult}
                  </span>
                </div>

                {/* Micro Visual Language Bars */}
                <div className="space-y-3 pt-1">
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-[#30272C] font-semibold">Quality Time</span>
                      <span className="text-[#C75C7A] font-bold">24 / 25</span>
                    </div>
                    <div className="w-full h-2.5 bg-[#FCEBF0] rounded-full overflow-hidden">
                      <div className="h-full bg-[#C75C7A] rounded-full w-[96%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-[#30272C] font-semibold">Words of Affirmation</span>
                      <span className="text-[#533744] font-bold">22 / 25</span>
                    </div>
                    <div className="w-full h-2.5 bg-[#EEE8FA] rounded-full overflow-hidden">
                      <div className="h-full bg-[#533744] rounded-full w-[88%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-[#30272C]">Acts of Service</span>
                      <span className="text-[#786B72]">18 / 25</span>
                    </div>
                    <div className="w-full h-2 bg-[#F0E4E8] rounded-full overflow-hidden">
                      <div className="h-full bg-[#786B72] rounded-full w-[72%]" />
                    </div>
                  </div>
                </div>

                {/* Sample Prompt Highlight */}
                <div className="p-4 rounded-2xl bg-[#FFF9F5] border border-[#F0E4E8] text-xs space-y-1">
                  <span className="text-[#C75C7A] font-semibold uppercase tracking-wider text-[10px]">
                    {t.hero.sampleActionable}
                  </span>
                  <p className="text-[#30272C] italic">
                    {t.hero.sampleActionableText}
                  </p>
                </div>

                {/* Mini banner */}
                <div className="pt-1 flex items-center justify-between text-[11px] text-[#786B72]">
                  <span>{t.hero.clientSideText}</span>
                  <span className="text-[#C75C7A] font-medium">{t.hero.noSignup}</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
