import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import CategoryCards from './components/CategoryCards.jsx';
import ResultsPreview from './components/ResultsPreview.jsx';
import FaqSection from './components/FaqSection.jsx';
import FinalCta from './components/FinalCta.jsx';
import QuizView from './components/QuizView.jsx';
import ResultsView from './components/ResultsView.jsx';
import AboutView from './components/AboutView.jsx';
import PrivacyPolicyView from './components/PrivacyPolicyView.jsx';
import ContactView from './components/ContactView.jsx';
import TermsView from './components/TermsView.jsx';
import { calculateQuizResult } from './utils/scoring.js';
import { LanguageProvider } from './i18n/index.jsx';

function AppContent() {
  const [currentView, setCurrentView] = useState('home');
  const [quizResult, setQuizResult] = useState(null);

  // Sync hash with views
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'quiz', 'about', 'privacy', 'contact', 'terms'].includes(hash)) {
        setCurrentView(hash);
      } else if (hash === 'results' && quizResult) {
        setCurrentView('results');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [quizResult]);

  const navigateTo = (view) => {
    setCurrentView(view);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Called when all 25 questions are submitted
  const handleQuizComplete = (answers) => {
    try {
      const result = calculateQuizResult(answers);
      setQuizResult(result);
      setCurrentView('results');
      window.location.hash = 'results';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Quiz completion error:', err);
      alert('An error occurred calculating your scores. Please check that all questions were answered.');
    }
  };

  // Retake quiz resets results
  const handleRetakeQuiz = () => {
    setQuizResult(null);
    setCurrentView('quiz');
    window.location.hash = 'quiz';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. Quiz View (focused screen)
  if (currentView === 'quiz') {
    return (
      <QuizView
        onComplete={handleQuizComplete}
        onExit={() => navigateTo('home')}
      />
    );
  }

  // 2. Results View
  if (currentView === 'results' && quizResult) {
    return (
      <>
        <ResultsView
          result={quizResult}
          onRetake={handleRetakeQuiz}
          onGoHome={() => navigateTo('home')}
        />
        <Footer onNavigate={navigateTo} />
      </>
    );
  }

  // 3. About & Methodology View
  if (currentView === 'about') {
    return (
      <>
        <Navbar onNavigate={navigateTo} currentView={currentView} />
        <AboutView 
          onGoHome={() => navigateTo('home')} 
          onStartQuiz={() => navigateTo('quiz')} 
        />
        <Footer onNavigate={navigateTo} />
      </>
    );
  }

  // 4. Privacy Policy View
  if (currentView === 'privacy') {
    return (
      <>
        <Navbar onNavigate={navigateTo} currentView={currentView} />
        <PrivacyPolicyView onGoHome={() => navigateTo('home')} />
        <Footer onNavigate={navigateTo} />
      </>
    );
  }

  // 5. Contact View
  if (currentView === 'contact') {
    return (
      <>
        <Navbar onNavigate={navigateTo} currentView={currentView} />
        <ContactView onGoHome={() => navigateTo('home')} />
        <Footer onNavigate={navigateTo} />
      </>
    );
  }

  // 6. Terms of Service View
  if (currentView === 'terms') {
    return (
      <>
        <Navbar onNavigate={navigateTo} currentView={currentView} />
        <TermsView onGoHome={() => navigateTo('home')} />
        <Footer onNavigate={navigateTo} />
      </>
    );
  }

  // Default: Landing Page View
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F5] text-[#30272C]">
      <Navbar onNavigate={navigateTo} currentView={currentView} />
      
      <main className="grow">
        <Hero onStartQuiz={() => navigateTo('quiz')} />
        <HowItWorks />
        <CategoryCards onStartQuiz={() => navigateTo('quiz')} />
        <ResultsPreview onStartQuiz={() => navigateTo('quiz')} />
        <FaqSection />
        <FinalCta onStartQuiz={() => navigateTo('quiz')} />
      </main>

      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
