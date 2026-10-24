import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../i18n/index.jsx';
import { Globe, ChevronDown, Check } from 'lucide-react';

export default function LanguageSelector({ variant = 'default' }) {
  const { lang, setLang, languages, currentLanguageObj } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code) => {
    setLang(code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
          isOpen
            ? 'bg-[#FCEBF0] border-[#C75C7A] text-[#C75C7A] shadow-xs'
            : 'bg-white/80 hover:bg-[#FFFDFB] border-[#F0E4E8] text-[#30272C] hover:border-[#C75C7A]/40'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Change Language / भाषा बदलें"
      >
        <span className="text-sm">{currentLanguageObj.flag}</span>
        <span className="font-semibold text-[#30272C]">{currentLanguageObj.native}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#786B72] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#C75C7A]' : ''
          }`}
        />
      </button>

      {/* Floating Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-[#F0E4E8] shadow-xl p-2 z-50 animate-fadeIn space-y-1">
          <div className="px-3 py-1.5 border-b border-[#F0E4E8]/60 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#786B72] flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#C75C7A]" /> Language / भाषा
            </span>
            <span className="text-[10px] text-[#A0939A]">5 options</span>
          </div>

          <div className="max-h-60 overflow-y-auto py-1 space-y-1">
            {languages.map((item) => {
              const isSelected = item.code === lang;

              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => handleSelect(item.code)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs sm:text-sm transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-[#FCEBF0] text-[#533744] font-semibold'
                      : 'text-[#30272C] hover:bg-[#FFF9F5] hover:text-[#C75C7A]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{item.flag}</span>
                    <div>
                      <p className="font-medium text-[#30272C]">
                        {item.native}
                      </p>
                      <p className="text-[10px] text-[#786B72]">
                        {item.name}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-[#C75C7A] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

