import React from 'react';
import { ShieldCheck, ArrowLeft, Lock, EyeOff, Server, HardDrive } from 'lucide-react';

export default function PrivacyPolicyView({ onGoHome }) {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5F0E5] text-[#2D4F3A] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" /> Privacy First
          </div>
          <h1 className="font-serif-editorial text-3xl sm:text-4xl text-[#30272C] font-normal leading-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#786B72]">
            Last updated: October 2026 · Effective immediately
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#FFF9F5] border border-[#F0E4E8] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#FCEBF0] text-[#C75C7A] flex items-center justify-center">
              <HardDrive className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-[#30272C]">Client-Side Only</h3>
            <p className="text-xs text-[#786B72] leading-relaxed">
              All quiz statements, answers, and score algorithms run strictly in your browser.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF9F5] border border-[#F0E4E8] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#EEE8FA] text-[#533744] flex items-center justify-center">
              <EyeOff className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-[#30272C]">No Personal Data</h3>
            <p className="text-xs text-[#786B72] leading-relaxed">
              We never ask for your name, email address, phone number, or dating history.
            </p>
          </div>
        </div>

        {/* Section 1: Information We Collect */}
        <section className="space-y-3 text-sm text-[#786B72] leading-relaxed">
          <h2 className="font-serif-editorial text-xl text-[#30272C]">
            1. Information We Do Not Collect
          </h2>
          <p>
            When you use the LoveLens website or take the Love Language Test:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#30272C]">
            <li>We do <strong>not</strong> collect personal identifying information (PII).</li>
            <li>We do <strong>not</strong> transmit your quiz answers or results to any backend server.</li>
            <li>We do <strong>not</strong> build user profiles, sell advertising identifiers, or track you across the web.</li>
            <li>We do <strong>not</strong> require user registration or social logins.</li>
          </ul>
        </section>

        {/* Section 2: How Quiz Scoring Operates */}
        <section className="space-y-3 text-sm text-[#786B72] leading-relaxed">
          <h2 className="font-serif-editorial text-xl text-[#30272C]">
            2. Local Execution and Device Privacy
          </h2>
          <p>
            When you select answers on LoveLens, the ratings are stored temporarily in your local web browser's volatile memory (React state). Once you close your browser tab or restart the quiz, this session data is cleared. No database records are created or stored.
          </p>
        </section>

        {/* Section 3: Third-Party Services and Advertising (Google AdSense) */}
        <section className="space-y-3 text-sm text-[#786B72] leading-relaxed">
          <h2 className="font-serif-editorial text-xl text-[#30272C]">
            3. Third-Party Services & Advertising (Google AdSense)
          </h2>
          <p>
            The website is hosted on static content delivery networks. Standard HTTP server access logs (such as IP address and user-agent) may be recorded by hosting infrastructure solely for diagnostic and security purposes.
          </p>
          <p>
            Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to LoveLens and/or other sites on the Internet.
          </p>
          <p>
            Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#C75C7A] underline">Google Ads Settings</a>. Alternatively, users can opt out of third-party vendor use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-[#C75C7A] underline">www.aboutads.info</a>.
          </p>
        </section>

        {/* Section 4: Social Sharing */}
        <section className="space-y-3 text-sm text-[#786B72] leading-relaxed">
          <h2 className="font-serif-editorial text-xl text-[#30272C]">
            4. Social Sharing & Card Generation
          </h2>
          <p>
            When you generate a shareable results graphic or copy your score breakdown, the image is synthesized locally using the standard HTML5 Canvas API in your browser. None of your answers or images are uploaded to any external image host.
          </p>
        </section>

        {/* Section 5: Contact */}
        <section className="space-y-3 text-sm text-[#786B72] leading-relaxed pt-4 border-t border-[#F0E4E8]">
          <h2 className="font-serif-editorial text-xl text-[#30272C]">
            5. Contact Us
          </h2>
          <p>
            If you have questions regarding this Privacy Policy or our client-side architecture, you can contact us at <code className="bg-[#FCEBF0] text-[#C75C7A] px-2 py-0.5 rounded text-xs font-mono">privacy@lovelens.me</code>.
          </p>
        </section>

      </article>

    </div>
  );
}
