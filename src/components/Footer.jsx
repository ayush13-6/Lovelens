import React from 'react';
import { Heart, ShieldCheck, Sparkles, MessageCircleHeart } from 'lucide-react';
import { useLanguage } from '../i18n/index.jsx';

export default function Footer({ onNavigate }) {
  const { t } = useLanguage();

  const handleNav = (target) => {
    onNavigate(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnchor = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('home');
      setTimeout(() => {
        const targetEl = document.getElementById(id);
        if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <footer className="bg-[#FFF9F5] border-t border-[#F0E4E8] pt-16 pb-12 text-[#30272C]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#F0E4E8]">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#FCEBF0] border border-[#F0E4E8] flex items-center justify-center text-[#C75C7A]">
                <Heart className="w-4 h-4 fill-[#C75C7A] text-[#C75C7A]" />
              </div>
              <span className="font-serif-editorial text-2xl font-bold tracking-tight text-[#30272C]">
                LoveLens
              </span>
            </div>
            
            <p className="text-sm text-[#786B72] leading-relaxed max-w-sm">
              {t.footer.desc}
            </p>

            <div className="flex items-center gap-3 text-xs text-[#786B72] pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCEBF0] text-[#C75C7A] font-medium">
                <ShieldCheck className="w-3.5 h-3.5" /> {t.footer.privateBadge}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEE8FA] text-[#533744] font-medium">
                <Sparkles className="w-3.5 h-3.5" /> {t.footer.freeBadge}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#786B72]">
              {t.footer.explore}
            </h4>
            <ul className="space-y-2.5 text-sm text-[#30272C]">
              <li>
                <button 
                  onClick={() => handleNav('quiz')}
                  className="hover:text-[#C75C7A] transition-colors cursor-pointer text-left"
                >
                  {t.footer.takeTest}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleAnchor('how-it-works')}
                  className="hover:text-[#C75C7A] transition-colors cursor-pointer text-left"
                >
                  {t.footer.howItWorks}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleAnchor('five-languages')}
                  className="hover:text-[#C75C7A] transition-colors cursor-pointer text-left"
                >
                  {t.footer.fiveLanguages}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleAnchor('faq')}
                  className="hover:text-[#C75C7A] transition-colors cursor-pointer text-left"
                >
                  {t.footer.faq}
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Transparency */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#786B72]">
              {t.footer.trustTitle}
            </h4>
            <ul className="space-y-2.5 text-sm text-[#30272C]">
              <li>
                <button 
                  onClick={() => handleNav('about')}
                  className="hover:text-[#C75C7A] transition-colors cursor-pointer text-left"
                >
                  {t.footer.about}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('privacy')}
                  className="hover:text-[#C75C7A] transition-colors cursor-pointer text-left"
                >
                  {t.footer.privacy}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('terms')}
                  className="hover:text-[#C75C7A] transition-colors cursor-pointer text-left"
                >
                  {t.footer.terms || 'Terms of Service'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('contact')}
                  className="hover:text-[#C75C7A] transition-colors cursor-pointer text-left"
                >
                  {t.footer.contact}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Methodology & Reflection Disclaimer */}
        <div className="my-8 p-5 rounded-2xl bg-[#FFF5F8] border border-[#FCEBF0] text-xs text-[#786B72] leading-relaxed">
          <p className="font-semibold text-[#533744] mb-1 flex items-center gap-1.5">
            <MessageCircleHeart className="w-4 h-4 text-[#C75C7A]" /> {t.footer.disclaimerTitle}
          </p>
          <p>
            {t.footer.disclaimerText}
          </p>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#786B72] gap-4">
          <p>© {new Date().getFullYear()} {t.footer.copyright}</p>
          <p className="flex items-center gap-1">
            {t.footer.craftedFor}
          </p>
        </div>

      </div>
    </footer>
  );
}
