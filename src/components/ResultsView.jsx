import React, { useState } from 'react';
import { 
  Heart, 
  RotateCcw, 
  Share2, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowLeft, 
  MessageCircleHeart, 
  Info, 
} from 'lucide-react';
import { shareResult, generateShareText, generateShareCardImage } from '../utils/share.js';
import { useLanguage } from '../i18n/index.jsx';
import LanguageSelector from './LanguageSelector.jsx';

export default function ResultsView({ result, onRetake, onGoHome }) {
  const { t, lang, categories } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [shareNotice, setShareNotice] = useState('');
  const [cardImageUri, setCardImageUri] = useState('');
  const [isGeneratingCard, setIsGeneratingCard] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Localized versions of top & second categories
  const topMeta = categories[result.topCategory.categoryId] || result.topCategory;
  const secondMeta = categories[result.secondCategory.categoryId] || result.secondCategory;
  const overallCat = result.overallCategory || result.topCategory;
  const overallMeta = categories[overallCat.categoryId] || overallCat;

  // Localized headline
  let localizedHeadline = '';
  let localizedSubheadline = '';
  let localizedBlendNotice = '';

  if (result.profileType === 'combined') {
    if (lang === 'hinglish') {
      localizedHeadline = `Aapka leading profile ${topMeta.name} aur ${secondMeta.name} ka blend hai`;
      localizedSubheadline = `Aapka score ${topMeta.name} me ${result.topCategory.rawScore} aur ${secondMeta.name} me ${result.secondCategory.rawScore} hai. Dono expressions aapke liye barabar important hain.`;
      localizedBlendNotice = `Kyunki aapke top do scores me sirf ${result.gap} point ka fark hai, aap tab sabse khush rehte hain jab pyaar me dono cheezein shaamil hon.`;
    } else if (lang === 'hi') {
      localizedHeadline = `आपकी प्रमुख प्रोफ़ाइल ${topMeta.name} और ${secondMeta.name} का सुंदर संयोजन है`;
      localizedSubheadline = `आपने ${topMeta.name} में ${result.topCategory.rawScore} और ${secondMeta.name} में ${result.secondCategory.rawScore} अंक प्राप्त किए हैं।`;
      localizedBlendNotice = `क्योंकि आपके शीर्ष दो स्कोर बहुत करीब हैं (केवल ${result.gap} अंक का अंतर), दोनों ही अभिव्यक्तियाँ आपके लिए समान रूप से आवश्यक हैं।`;
    } else if (lang === 'ja') {
      localizedHeadline = `あなたの主要なプロファイルは「${topMeta.name}」と「${secondMeta.name}」の調和です`;
      localizedSubheadline = `${topMeta.name}が${result.topCategory.rawScore}点、${secondMeta.name}が${result.secondCategory.rawScore}点と、両方の言語が深く結びついています。`;
      localizedBlendNotice = `上位2つの差がわずか${result.gap}点のため、どちらか一方だけでなく両方が満たされることで安心感を覚えます。`;
    } else if (lang === 'ru') {
      localizedHeadline = `Ваш ведущий профиль — гармония ${topMeta.name} и ${secondMeta.name}`;
      localizedSubheadline = `Вы набрали ${result.topCategory.rawScore} баллов в категории «${topMeta.name}» и ${result.secondCategory.rawScore} в «${secondMeta.name}». Оба языка одинаково дороги вам.`;
      localizedBlendNotice = `Так как разница между первыми двумя местами составляет всего ${result.gap} балл(а), для вас критически важно присутствие обоих языков.`;
    } else {
      localizedHeadline = `Your leading profile is a blend of ${topMeta.name} and ${secondMeta.name}`;
      localizedSubheadline = `You scored ${result.topCategory.rawScore} in ${topMeta.name} and ${result.secondCategory.rawScore} in ${secondMeta.name}, showing both expressions play a deeply complementary role.`;
      localizedBlendNotice = `Because your scores are so close (${result.topCategory.rawScore} vs. ${result.secondCategory.rawScore} out of 25), you likely thrive when affection incorporates both.`;
    }
  } else {
    if (lang === 'hinglish') {
      localizedHeadline = `Aapki leading love language ${topMeta.name} hai`;
      localizedSubheadline = `${topMeta.name} aapke answers me sabse prominent hai, score: ${result.topCategory.rawScore} out of 25 (${result.topCategory.percentage}%).`;
    } else if (lang === 'hi') {
      localizedHeadline = `आपकी प्रमुख प्रेम भाषा ${topMeta.name} है`;
      localizedSubheadline = `${topMeta.name} आपके उत्तरों में सबसे प्रमुख है (${result.topCategory.rawScore}/25, ${result.topCategory.percentage}%)।`;
    } else if (lang === 'ja') {
      localizedHeadline = `あなたの最も主要な愛の言語は「${topMeta.name}」です`;
      localizedSubheadline = `${topMeta.name}が最も顕著に現れました（${result.topCategory.rawScore} / 25点、${result.topCategory.percentage}%）。`;
    } else if (lang === 'ru') {
      localizedHeadline = `Ваш ведущий язык любви — «${topMeta.name}»`;
      localizedSubheadline = `«${topMeta.name}» явно лидирует в ваших ответах: ${result.topCategory.rawScore} из 25 баллов (${result.topCategory.percentage}%).`;
    } else {
      localizedHeadline = `Your leading love language is ${topMeta.name}`;
      localizedSubheadline = `${topMeta.name} is distinctly prominent in your answers, scoring ${result.topCategory.rawScore} out of 25 (${result.topCategory.percentage}%).`;
    }
  }

  // Handle Share button click
  const handleShareClick = async () => {
    setShareNotice('');
    const res = await shareResult(result, lang, categories);
    if (res.success) {
      if (res.method === 'clipboard') {
        setCopied(true);
        setShareNotice(t.results.copiedBtn);
        setTimeout(() => {
          setCopied(false);
          setShareNotice('');
        }, 4000);
      } else {
        setShareNotice(t.results.copiedBtn);
        setTimeout(() => setShareNotice(''), 4000);
      }
    } else if (!res.aborted) {
      handleOpenShareModal();
    }
  };

  // Open share modal with image card option
  const handleOpenShareModal = async () => {
    setShowShareModal(true);
    if (!cardImageUri) {
      setIsGeneratingCard(true);
      try {
        const uri = await generateShareCardImage(result, lang, categories);
        setCardImageUri(uri);
      } catch (err) {
        console.error('Failed to generate image card:', err);
      } finally {
        setIsGeneratingCard(false);
      }
    }
  };

  // Copy text to clipboard manually
  const handleCopyText = async () => {
    const text = generateShareText(result, lang, categories);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  // Download image card
  const handleDownloadImage = () => {
    if (!cardImageUri) return;
    const a = document.createElement('a');
    a.href = cardImageUri;
    a.download = `LoveLens-Profile-${result.topCategory.categoryId}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5] py-10 px-4 sm:px-6 lg:px-8">
      
      {/* Top Navbar / Back Navigation & Language Selector */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onGoHome}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#786B72] hover:text-[#C75C7A] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.nav.backHome}</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSelector />

          <button
            onClick={onRetake}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#F0E4E8] bg-white text-xs sm:text-sm font-semibold text-[#786B72] hover:text-[#30272C] hover:bg-[#FFFDFB] transition-all cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.results.retakeBtn}</span>
          </button>

          <button
            onClick={handleOpenShareModal}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#C75C7A] hover:bg-[#b44f6c] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{t.results.shareBtn}</span>
          </button>
        </div>
      </div>

      {/* Main Results Container */}
      <main className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
        
        {/* 1. Profile Banner Header */}
        <section className="bg-white rounded-3xl border border-[#F0E4E8] p-6 sm:p-10 shadow-xs relative overflow-hidden">
          
          <div 
            aria-hidden="true" 
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-40 -mr-20 -mt-20 pointer-events-none"
            style={{ backgroundColor: topMeta.bgSoft }}
          />

          <div className="relative z-10 space-y-4">
            
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FCEBF0] text-[#C75C7A] text-xs font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" /> {t.results.yourResults}
              </span>

              <span className="text-xs text-[#786B72]">
                {t.results.completedOn} {new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl text-[#30272C] leading-tight">
              {localizedHeadline}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-[#786B72] leading-relaxed max-w-3xl">
              {localizedSubheadline}
            </p>

            {/* Combined Profile Notice if close */}
            {result.profileType === 'combined' && (
              <div className="p-4 rounded-2xl bg-[#EEE8FA]/70 border border-[#EEE8FA] text-sm text-[#533744] space-y-1">
                <p className="font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#C75C7A]" /> {t.results.blendBadge}
                </p>
                <p>{localizedBlendNotice}</p>
              </div>
            )}

            {/* Warm introductory explanation based on top category */}
            <div className="pt-2 text-sm sm:text-base text-[#30272C] leading-relaxed border-t border-[#F0E4E8]/60 mt-4">
              <p>{topMeta.summary}</p>
            </div>

          </div>
        </section>

        {/* ADDON FEATURE: Overall Core Love Language Spotlight */}
        <section className="bg-gradient-to-r from-white via-[#FFF8FA] to-white rounded-3xl border-2 border-[#FCEBF0] p-6 sm:p-7 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:border-[#C75C7A]/40">
          <div className="flex items-start sm:items-center gap-4">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-xs"
              style={{ backgroundColor: overallMeta.bgSoft, color: overallMeta.color }}
            >
              <Heart className="w-7 h-7 fill-current" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-[#C75C7A] text-white shadow-xs">
                  ★ {t.results.overallBadge}
                </span>
                <span className="text-xs font-semibold text-[#533744] bg-[#FCEBF0] px-2.5 py-0.5 rounded-full">
                  {overallCat.rawScore} / 25 ({overallCat.percentage}%)
                </span>
              </div>
              <h2 className="font-serif-editorial text-2xl sm:text-3xl text-[#30272C] font-bold">
                {overallMeta.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#786B72] max-w-xl">
                {t.results.overallDesc}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3 border-t md:border-t-0 md:border-l border-[#F0E4E8] pt-3 md:pt-0 md:pl-6 text-xs text-[#786B72]">
            <div>
              <p className="font-semibold text-sm text-[#30272C]">{overallMeta.shortName}</p>
              <p className="text-[11px] text-[#C75C7A] font-medium">{overallCat.band}</p>
            </div>
          </div>
        </section>

        {/* 2. Visual Display of All Five Scores */}
        <section className="bg-white rounded-3xl border border-[#F0E4E8] p-6 sm:p-10 shadow-xs space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0E4E8] pb-4">
            <div>
              <h2 className="font-serif-editorial text-2xl text-[#30272C]">
                {t.results.breakdownTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#786B72]">
                {t.results.breakdownSub}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#786B72]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C75C7A]"></span>
              <span>{t.results.leadingLabel}</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#786B72] ml-2"></span>
              <span>{t.results.otherLabel}</span>
            </div>
          </div>

          <div className="space-y-6">
            {result.scores.map((cat, idx) => {
              const isLeading = idx === 0;
              const isSecondInBlend = idx === 1 && result.profileType === 'combined';
              const localizedCat = categories[cat.categoryId] || cat;

              return (
                <div key={cat.categoryId} className="space-y-2">
                  
                  {/* Category Title & Numbers */}
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-base text-[#30272C]">
                        {idx + 1}. {localizedCat.name}
                      </span>
                      {(isLeading || isSecondInBlend) && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-[#FCEBF0] text-[#C75C7A]">
                          {isLeading ? t.results.primaryBadge : t.results.blendBadge}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <span className="font-bold text-[#30272C]">
                        {cat.rawScore} <span className="text-xs font-normal text-[#786B72]">/ 25</span>
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#FFF9F5] border border-[#F0E4E8] text-[#533744]">
                        {cat.percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Horizontal Bar */}
                  <div 
                    className="w-full h-3 bg-[#F0E4E8] rounded-full overflow-hidden" 
                    role="progressbar" 
                    aria-valuenow={cat.percentage} 
                    aria-valuemin={0} 
                    aria-valuemax={100}
                    aria-label={`${localizedCat.name} score: ${cat.rawScore} out of 25`}
                  >
                    <div
                      className={`h-full rounded-full transition-all duration-500 ease-out ${
                        isLeading 
                          ? 'bg-[#C75C7A]' 
                          : isSecondInBlend 
                            ? 'bg-[#533744]' 
                            : 'bg-[#786B72]'
                      }`}
                      style={{ width: `${Math.max(6, cat.percentage)}%` }}
                    />
                  </div>

                </div>
              );
            })}
          </div>

          <div className="pt-2 text-xs text-[#786B72] flex items-start gap-2 bg-[#FFF9F5] p-4 rounded-2xl border border-[#F0E4E8]">
            <Info className="w-4 h-4 text-[#786B72] shrink-0 mt-0.5" />
            <p>{t.results.lowScoreNote}</p>
          </div>

        </section>

        {/* 3. What this may mean for you */}
        <section className="bg-white rounded-3xl border border-[#F0E4E8] p-6 sm:p-10 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C75C7A]">
            <Sparkles className="w-4 h-4" /> {t.results.personalReflection}
          </div>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl text-[#30272C]">
            {t.results.whatThisMeans}
          </h2>
          <p className="text-base text-[#30272C] leading-relaxed">
            {topMeta.whatItMeans}
          </p>
        </section>

        {/* 4. Three Practical Ways to Express or Receive Affection */}
        <section className="bg-white rounded-3xl border border-[#F0E4E8] p-6 sm:p-10 shadow-xs space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C75C7A]">
              {t.results.actionableIdeas}
            </span>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl text-[#30272C] mt-1">
              {t.results.nurtureTitle(topMeta.name)}
            </h2>
            <p className="text-sm text-[#786B72] mt-1">
              {t.results.nurtureSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {topMeta.practicalWays.map((way, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-[#FFF9F5] border border-[#F0E4E8] flex flex-col justify-between"
              >
                <div>
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#FCEBF0] text-[#C75C7A] text-xs font-bold mb-3">
                    0{idx + 1}
                  </span>
                  <h3 className="font-semibold text-base text-[#30272C] mb-2">
                    {way.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#786B72] leading-relaxed">
                    {way.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. "Try Saying This" Conversation Starter */}
        <section className="bg-gradient-to-br from-[#FFF9F5] to-[#FCEBF0]/70 rounded-3xl border border-[#F0E4E8] p-6 sm:p-10 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C75C7A]">
            <MessageCircleHeart className="w-4 h-4" /> {t.results.conversationTitle}
          </div>
          
          <h2 className="font-serif-editorial text-2xl sm:text-3xl text-[#30272C]">
            {t.results.trySayingThis}
          </h2>

          <p className="text-sm text-[#786B72]">
            {t.results.conversationSub}
          </p>

          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#F0E4E8] shadow-xs">
            <p className="font-serif-editorial text-lg sm:text-xl text-[#30272C] italic leading-relaxed">
              "{topMeta.conversationStarter}"
            </p>
          </div>
        </section>

        {/* 6. Context: Preferences Can Vary */}
        <section className="bg-[#FFF9F5] rounded-3xl border border-[#F0E4E8] p-6 sm:p-8 text-sm text-[#786B72] space-y-3">
          <h3 className="font-semibold text-[#30272C] text-base flex items-center gap-2">
            <Info className="w-4 h-4 text-[#C75C7A]" /> {t.results.fluidityTitle}
          </h3>
          <p className="leading-relaxed">
            {t.results.fluidityText}
          </p>
          <p className="text-xs text-[#786B72] pt-1">
            {t.results.fluiditySub}
          </p>
        </section>

        {/* 7. Action Bar at Bottom */}
        <section className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
          <button
            onClick={onRetake}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-[#F0E4E8] bg-white text-[#30272C] hover:bg-[#FFFDFB] font-semibold text-sm shadow-xs transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-[#C75C7A]" />
            <span>{t.results.retakeBtn}</span>
          </button>

          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleShareClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#C75C7A] hover:bg-[#b44f6c] text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? t.results.copiedBtn : t.results.shareBtn}</span>
            </button>

            <button
              onClick={handleOpenShareModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-[#C75C7A] text-[#C75C7A] hover:bg-[#FCEBF0] font-semibold text-sm transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{t.results.downloadImageBtn}</span>
            </button>
          </div>
        </section>

        {/* Toast confirmation */}
        {shareNotice && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#30272C] text-white px-5 py-3 rounded-2xl shadow-xl text-sm flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-[#E5F0E5]" />
            <span>{shareNotice}</span>
          </div>
        )}

      </main>

      {/* Share Modal Dialog */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-[#F0E4E8] shadow-2xl p-6 sm:p-8 space-y-5">
            
            <div className="flex items-center justify-between border-b border-[#F0E4E8] pb-3">
              <h3 className="font-serif-editorial text-2xl text-[#30272C]">
                {t.results.shareModalTitle}
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-[#786B72] hover:text-[#30272C] text-lg font-bold p-1 cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Image Card Preview */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#786B72] uppercase tracking-wider">
                {t.results.shareCardLabel}
              </span>
              
              <div className="rounded-2xl border border-[#F0E4E8] bg-[#FFF9F5] p-2 flex items-center justify-center overflow-hidden min-h-[220px]">
                {isGeneratingCard ? (
                  <div className="text-center py-8 text-sm text-[#786B72] space-y-2">
                    <Sparkles className="w-6 h-6 text-[#C75C7A] animate-spin mx-auto" />
                    <p>{t.results.generatingCard}</p>
                  </div>
                ) : cardImageUri ? (
                  <img 
                    src={cardImageUri} 
                    alt="LoveLens Shareable Profile Card" 
                    className="max-h-64 rounded-xl shadow-xs object-contain"
                  />
                ) : (
                  <p className="text-xs text-[#786B72]">Card generation failed</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleDownloadImage}
                disabled={!cardImageUri}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#C75C7A] hover:bg-[#b44f6c] text-white font-semibold text-sm transition-all cursor-pointer shadow-xs disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>{t.results.saveImageBtn}</span>
              </button>

              <button
                onClick={handleCopyText}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-[#F0E4E8] text-[#30272C] hover:bg-[#FFF9F5] font-semibold text-sm transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-[#C75C7A]" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? t.results.copiedTextBtn : t.results.copySummaryBtn}</span>
              </button>
            </div>

            <p className="text-center text-[11px] text-[#786B72]">
              {t.results.noPersonalDataNotice}
            </p>

          </div>
        </div>
      )}

    </div>
  );
}
