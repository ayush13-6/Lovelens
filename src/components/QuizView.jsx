import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Heart, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../i18n/index.jsx';
import LanguageSelector from './LanguageSelector.jsx';

export default function QuizView({ onComplete, onExit }) {
  const { t, questions, ratingOptions } = useLanguage();

  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionId]: rating }
  const [showRestartModal, setShowRestartModal] = useState(false);
  const [validationError, setValidationError] = useState('');

  const currentQuestion = questions[currentIndex] || questions[0];
  const totalQuestions = questions.length;
  const currentAnswer = answers[currentQuestion.id];
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const isFirstQuestion = currentIndex === 0;

  // Keyboard shortcut listener: 1-5 keys to pick answer, Enter to advance
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showRestartModal) return;

      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 5) {
        handleSelectAnswer(num);
      } else if (e.key === 'Enter') {
        if (currentAnswer !== undefined) {
          handleNext();
        }
      } else if (e.key === 'ArrowLeft' && !isFirstQuestion) {
        handleBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentAnswer, showRestartModal, isFirstQuestion]);

  // Select rating
  const handleSelectAnswer = (value) => {
    setValidationError('');
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  // Next question / submit
  const handleNext = () => {
    if (currentAnswer === undefined) {
      setValidationError(t.quiz.pleaseSelect);
      return;
    }

    if (isLastQuestion) {
      // Validate all answers are present
      const answeredCount = Object.keys(answers).length;
      if (answeredCount < totalQuestions) {
        setValidationError(t.quiz.pleaseAnswerAll(totalQuestions, answeredCount));
        return;
      }
      onComplete(answers);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  // Back question
  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setValidationError('');
    }
  };

  // Restart Quiz
  const confirmRestart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setShowRestartModal(false);
    setValidationError('');
  };

  return (
    <div className="h-[100dvh] max-h-[100dvh] bg-[#FFF9F5] flex flex-col justify-between py-2 sm:py-5 px-3 sm:px-6 lg:px-8 overflow-y-auto sm:overflow-hidden select-none">
      
      {/* Quiz Top Header */}
      <header className="max-w-2xl mx-auto w-full shrink-0">
        <div className="flex items-center justify-between pb-1.5 sm:pb-3 border-b border-[#F0E4E8] gap-2">
          
          <button
            onClick={onExit}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none shrink-0"
            aria-label="Back to home"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FCEBF0] text-[#C75C7A] flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#C75C7A]" />
            </div>
            <div>
              <span className="font-serif-editorial text-base sm:text-lg font-bold text-[#30272C] group-hover:text-[#C75C7A] transition-colors">
                LoveLens
              </span>
              <span className="hidden sm:inline text-xs text-[#786B72] ml-2 font-sans">
                {t.quiz.testTitle}
              </span>
            </div>
          </button>

          {/* Top Controls: Language Switcher + Restart */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <LanguageSelector />

            <button
              onClick={() => setShowRestartModal(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-[#786B72] hover:text-[#30272C] hover:bg-[#FCEBF0] transition-colors cursor-pointer border border-[#F0E4E8]"
              title={t.quiz.restart}
            >
              <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">{t.quiz.restart}</span>
            </button>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="pt-1.5 sm:pt-3 pb-1">
          <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold text-[#786B72] uppercase tracking-wider mb-1">
            <span className="text-[#C75C7A]">
              {t.quiz.questionOf(currentIndex + 1, totalQuestions)}
            </span>
            <span>{t.quiz.completePercent(progressPercent)}</span>
          </div>
          
          {/* Progress Bar */}
          <div 
            className="w-full h-1.5 sm:h-2 bg-[#FCEBF0] rounded-full overflow-hidden" 
            role="progressbar" 
            aria-valuenow={progressPercent} 
            aria-valuemin={0} 
            aria-valuemax={100}
          >
            <div
              className="h-full bg-[#C75C7A] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Short Instruction - subtle on desktop, hidden on tiny screens */}
        <div className="hidden sm:block text-center py-1">
          <p className="text-xs text-[#786B72] italic">
            {t.quiz.instruction}
          </p>
        </div>
      </header>

      {/* Main Question Card - centered in available viewport */}
      <main className="max-w-xl mx-auto w-full my-auto py-1 sm:py-2 flex-1 flex flex-col justify-center">
        
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#F0E4E8] shadow-sm p-3.5 sm:p-7 text-center animate-fadeIn flex flex-col justify-between">
          
          {/* Question Text & Badge */}
          <div>
            <span className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FFF9F5] border border-[#F0E4E8] text-[#786B72] mb-1.5 sm:mb-3">
              {t.quiz.statement(currentIndex + 1)}
            </span>

            <h2 className="font-serif-editorial text-base sm:text-xl md:text-2xl text-[#30272C] leading-snug font-normal min-h-[2.5rem] sm:min-h-[3.5rem] flex items-center justify-center mb-1.5 sm:mb-2 px-1">
              "{currentQuestion.text}"
            </h2>

            <p className="text-[10px] sm:text-xs text-[#786B72] mb-2 sm:mb-3">
              {t.quiz.howMeaningful}
            </p>

            {/* 5 Rating Answer Options */}
            <div className="space-y-1.5 sm:space-y-2 text-left">
              {ratingOptions.map((option) => {
                const isSelected = currentAnswer === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelectAnswer(option.value)}
                    className={`w-full py-2 px-3 sm:py-2.5 sm:px-4 rounded-xl sm:rounded-2xl border transition-all duration-150 flex items-center justify-between cursor-pointer group ${
                      isSelected
                        ? 'bg-[#FCEBF0] border-[#C75C7A] text-[#30272C] shadow-xs'
                        : 'bg-white border-[#F0E4E8] text-[#30272C] hover:border-[#C75C7A]/50 hover:bg-[#FFF9F5]'
                    }`}
                    aria-pressed={isSelected}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3.5">
                      {/* Circle Indicator / Key badge */}
                      <div
                        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors shrink-0 ${
                          isSelected
                            ? 'bg-[#C75C7A] text-white'
                            : 'bg-[#FFF9F5] border border-[#F0E4E8] text-[#786B72] group-hover:text-[#C75C7A]'
                        }`}
                      >
                        {option.value}
                      </div>

                      <span className={`text-xs sm:text-sm font-medium leading-tight ${isSelected ? 'font-semibold text-[#533744]' : 'text-[#30272C]'}`}>
                        {option.label}
                      </span>
                    </div>

                    {/* Radio tick check */}
                    <div className="text-right shrink-0 ml-2">
                      {isSelected ? (
                        <CheckCircle className="w-4 h-4 text-[#C75C7A]" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-[#D9CCD2] group-hover:border-[#C75C7A]" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Validation Error Banner */}
            {validationError && (
              <div className="mt-2 p-2 rounded-xl bg-[#FFF0F4] border border-[#FCEBF0] text-[#C75C7A] text-xs flex items-center justify-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}
          </div>

          {/* Bottom Navigation Buttons */}
          <div className="mt-3 sm:mt-5 pt-2.5 sm:pt-3.5 border-t border-[#F0E4E8] flex items-center justify-between gap-3">
            {/* Back Button */}
            {!isFirstQuestion ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-[#F0E4E8] bg-white text-[#786B72] hover:text-[#30272C] hover:border-[#D9CCD2] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t.quiz.back}</span>
              </button>
            ) : (
              <div />
            )}

            {/* Next / Submit Button */}
            <button
              type="button"
              onClick={handleNext}
              disabled={currentAnswer === undefined}
              className={`inline-flex items-center gap-1.5 px-6 py-2 sm:px-8 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-xs transition-all cursor-pointer ${
                currentAnswer !== undefined
                  ? 'bg-[#C75C7A] hover:bg-[#b44f6c] text-white hover:shadow-md transform hover:-translate-y-0.5'
                  : 'bg-[#F0E4E8] text-[#A0939A] cursor-not-allowed'
              }`}
            >
              <span>{isLastQuestion ? t.quiz.seeResults : t.quiz.next}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Desktop keyboard shortcut hint */}
          <div className="hidden sm:block mt-2 text-[11px] text-[#A0939A]">
            {t.quiz.keyboardTip}
          </div>

        </div>

      </main>

      {/* Quiz Bottom Footer */}
      <footer className="max-w-2xl mx-auto w-full text-center text-[10px] sm:text-xs text-[#786B72] py-1 shrink-0">
        {t.quiz.privateFooter}
      </footer>

      {/* Restart Confirmation Modal */}
      {showRestartModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full border border-[#F0E4E8] shadow-2xl text-center space-y-4">
            <div className="w-11 h-11 rounded-full bg-[#FCEBF0] text-[#C75C7A] flex items-center justify-center mx-auto">
              <RotateCcw className="w-5 h-5" />
            </div>
            
            <h3 className="font-serif-editorial text-xl sm:text-2xl text-[#30272C]">
              {t.quiz.restartTitle}
            </h3>
            
            <p className="text-xs sm:text-sm text-[#786B72]">
              {t.quiz.restartDesc}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowRestartModal(false)}
                className="w-1/2 py-2 rounded-full border border-[#F0E4E8] text-[#786B72] font-semibold text-xs sm:text-sm hover:bg-[#FFF9F5] transition-colors cursor-pointer"
              >
                {t.quiz.cancel}
              </button>
              <button
                onClick={confirmRestart}
                className="w-1/2 py-2 rounded-full bg-[#C75C7A] hover:bg-[#b44f6c] text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                {t.quiz.confirmRestart}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

