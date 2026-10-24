import React from 'react';
import { Heart, ArrowLeft, ShieldAlert, BookOpen, Sparkles, HelpCircle } from 'lucide-react';

export default function AboutView({ onGoHome, onStartQuiz }) {
  return (
    <div className="min-h-screen bg-[#FFF9F5] py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Top Bar */}
      <div className="max-w-3xl mx-auto mb-8">
        <button
          onClick={onGoHome}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#786B72] hover:text-[#C75C7A] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      <article className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#F0E4E8] shadow-sm p-6 sm:p-12 space-y-8 animate-fadeIn">
        
        {/* Header */}
        <div className="border-b border-[#F0E4E8] pb-6 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCEBF0] text-[#C75C7A] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" /> About & Methodology
          </div>
          <h1 className="font-serif-editorial text-3xl sm:text-4xl text-[#30272C] font-normal leading-tight">
            About LoveLens and Our Methodology
          </h1>
          <p className="text-base text-[#786B72]">
            Our mission is to make relationship self-reflection gentle, honest, accessible, and grounded in mutual respect.
          </p>
        </div>

        {/* 1. Origin and Conceptual Foundation */}
        <section className="space-y-4">
          <h2 className="font-serif-editorial text-2xl text-[#30272C]">
            The Five Expressions Framework
          </h2>
          <p className="text-sm sm:text-base text-[#30272C] leading-relaxed">
            LoveLens is an independent, free self-reflection tool inspired by the popular five love languages framework originally introduced by Dr. Gary Chapman. Over the past three decades, this conceptual model has provided millions of people with a shared vocabulary to express how they feel appreciated, understood, and emotionally secure.
          </p>
          <p className="text-sm sm:text-base text-[#30272C] leading-relaxed">
            Rather than treating these five categories as rigid personality types, LoveLens views them as dynamic channels of communication that help people translate everyday intentions into meaningful connection.
          </p>
        </section>

        {/* 2. Scientific Integrity & Clear Disclaimer */}
        <section className="p-6 rounded-2xl bg-[#FFF5F8] border border-[#FCEBF0] space-y-3">
          <div className="flex items-center gap-2 text-[#C75C7A] font-semibold text-sm">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>Methodology & Reflection Disclaimer</span>
          </div>

          <p className="text-sm sm:text-base text-[#533744] font-medium leading-relaxed italic bg-white/70 p-4 rounded-xl border border-[#FCEBF0]">
            “This quiz is intended for reflection and conversation. It is not a clinical assessment or a scientifically validated diagnostic test. Your results reflect your answers to these statements and do not determine your ability to love or the compatibility of a relationship.”
          </p>

          <p className="text-xs text-[#786B72] leading-relaxed">
            LoveLens does not make medical, therapeutic, or psychological diagnoses. Human relationships are shaped by emotional maturity, mutual trust, effective conflict resolution, and personal values — factors that no 25-question test can fully encapsulate.
          </p>
        </section>

        {/* 3. Scoring Architecture */}
        <section className="space-y-4">
          <h2 className="font-serif-editorial text-2xl text-[#30272C]">
            How Scoring Works
          </h2>
          <p className="text-sm sm:text-base text-[#30272C] leading-relaxed">
            The LoveLens test presents 25 original reflective statements, with exactly 5 statements corresponding to each of the five categories: Words of Affirmation, Quality Time, Receiving Gifts, Acts of Service, and Physical Touch.
          </p>
          <ul className="space-y-2 text-sm text-[#786B72] list-disc list-inside">
            <li><strong className="text-[#30272C]">1–5 Rating Scale:</strong> Statements are rated from "Not at all meaningful" (1) to "Extremely meaningful" (5).</li>
            <li><strong className="text-[#30272C]">Raw Category Scores:</strong> Each category produces a raw score between 5 and 25.</li>
            <li><strong className="text-[#30272C]">Balanced Blend Detection:</strong> When the top two categories differ by 0 to 2 points, LoveLens recognizes a blended leading profile rather than picking an arbitrary winner.</li>
            <li><strong className="text-[#30272C]">No "Deficit" Labeling:</strong> Categories with lower scores are described simply as less prominent in your answers, never as flaws or relationship weaknesses.</li>
          </ul>
        </section>

        {/* 4. Privacy & Independence */}
        <section className="space-y-4">
          <h2 className="font-serif-editorial text-2xl text-[#30272C]">
            Commitment to Privacy
          </h2>
          <p className="text-sm sm:text-base text-[#30272C] leading-relaxed">
            LoveLens runs entirely inside your web browser. Your responses are never transmitted to an external server, stored in a database, or attached to your personal identity. There are no tracking accounts, advertising pixels inside the quiz, or data brokering.
          </p>
        </section>

        {/* CTA */}
        <div className="pt-6 border-t border-[#F0E4E8] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#786B72]">
            Ready to explore your own profile?
          </span>
          <button
            onClick={onStartQuiz}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#C75C7A] hover:bg-[#b44f6c] text-white text-sm font-semibold transition-all cursor-pointer"
          >
            Take the Free Test
          </button>
        </div>

      </article>

    </div>
  );
}
