import React, { useState } from 'react';
import { Heart, Menu, X, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/index.jsx';
import LanguageSelector from './LanguageSelector.jsx';

export default function Navbar({ onNavigate, currentView }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const handleNav = (target) => {
    onNavigate(target);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnchorScroll = (id) => {
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFF9F5]/90 backdrop-blur-md border-b border-[#F0E4E8] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Brand Wordmark */}
        <button 
          onClick={() => handleNav('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer shrink-0"
          aria-label="LoveLens Home"
        >
          <div className="w-10 h-10 rounded-full bg-[#FCEBF0] border border-[#F0E4E8] flex items-center justify-center text-[#C75C7A] shadow-xs group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 fill-[#C75C7A] text-[#C75C7A]" />
          </div>
          <div>
            <span className="font-serif-editorial text-2xl font-bold tracking-tight text-[#30272C] group-hover:text-[#C75C7A] transition-colors">
              LoveLens
            </span>
            <span className="hidden sm:block text-[11px] font-medium tracking-wider text-[#786B72] uppercase">
              {t.nav.brandSubtitle}
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#30272C]">
          <button 
            onClick={() => handleAnchorScroll('how-it-works')}
            className="hover:text-[#C75C7A] transition-colors cursor-pointer"
          >
            {t.nav.howItWorks}
          </button>
          <button 
            onClick={() => handleAnchorScroll('five-languages')}
            className="hover:text-[#C75C7A] transition-colors cursor-pointer"
          >
            {t.nav.fiveLanguages}
          </button>
          <button 
            onClick={() => handleAnchorScroll('faq')}
            className="hover:text-[#C75C7A] transition-colors cursor-pointer"
          >
            {t.nav.faq}
          </button>
          <button 
            onClick={() => handleNav('about')}
            className={`hover:text-[#C75C7A] transition-colors cursor-pointer ${currentView === 'about' ? 'text-[#C75C7A] font-semibold' : ''}`}
          >
            {t.nav.about}
          </button>
        </nav>

        {/* Desktop Language Selector & CTA */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSelector />

          <button
            onClick={() => handleNav('quiz')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C75C7A] hover:bg-[#b44f6c] text-white text-sm font-semibold shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
          >
            {t.nav.takeTest}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Button + Quick Language */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSelector />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-[#30272C] hover:bg-[#FCEBF0] focus:outline-none transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#F0E4E8] bg-[#FFF9F5] px-6 py-5 shadow-lg animate-fadeIn">
          <div className="flex flex-col gap-4 text-base font-medium text-[#30272C]">
            <button
              onClick={() => handleAnchorScroll('how-it-works')}
              className="text-left py-2 hover:text-[#C75C7A] transition-colors"
            >
              {t.nav.howItWorks}
            </button>
            <button
              onClick={() => handleAnchorScroll('five-languages')}
              className="text-left py-2 hover:text-[#C75C7A] transition-colors"
            >
              {t.nav.fiveLanguages}
            </button>
            <button
              onClick={() => handleAnchorScroll('faq')}
              className="text-left py-2 hover:text-[#C75C7A] transition-colors"
            >
              {t.nav.faq}
            </button>
            <button
              onClick={() => handleNav('about')}
              className="text-left py-2 hover:text-[#C75C7A] transition-colors"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => handleNav('privacy')}
              className="text-left py-2 hover:text-[#C75C7A] transition-colors"
            >
              {t.nav.privacy}
            </button>
            <button
              onClick={() => handleNav('contact')}
              className="text-left py-2 hover:text-[#C75C7A] transition-colors"
            >
              {t.nav.contact}
            </button>

            <div className="pt-2 border-t border-[#F0E4E8]">
              <button
                onClick={() => handleNav('quiz')}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C75C7A] text-white text-base font-semibold shadow-md active:scale-98 transition-all"
              >
                {t.nav.takeFreeTest}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

