import React from 'react';
import { FileText, ArrowLeft, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function TermsView({ onGoHome }) {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEE8FA] text-[#533744] text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" /> Legal & Terms
          </div>
          <h1 className="font-serif-editorial text-3xl sm:text-4xl text-[#30272C] font-normal leading-tight">
            Terms of Service
          </h1>
          <p className="text-xs text-[#786B72]">
            Last updated: October 2026 · Effective immediately
          </p>
        </div>

        {/* Section 1: Agreement to Terms */}
        <section className="space-y-3 text-sm text-[#786B72] leading-relaxed">
          <h2 className="font-serif-editorial text-xl text-[#30272C]">
            1. Agreement to Terms
          </h2>
          <p>
            By accessing or using LoveLens (accessible from https://lovelens.me or associated domains), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you should not access or use the website.
          </p>
        </section>

        {/* Section 2: Informational & Reflection Purpose */}
        <section className="space-y-3 text-sm text-[#786B72] leading-relaxed">
          <h2 className="font-serif-editorial text-xl text-[#30272C]">
            2. Informational & Self-Reflection Purpose
          </h2>
          <p>
            LoveLens provides interactive self-reflection questionnaires based on relationship communication concepts. The test results, summaries, and conversational prompts provided by LoveLens are intended solely for personal reflection, insight, and educational amusement.
          </p>
          <div className="p-4 rounded-2xl bg-[#FFF5F8] border border-[#FCEBF0] flex items-start gap-3 text-xs text-[#533744]">
            <AlertTriangle className="w-4 h-4 text-[#C75C7A] shrink-0 mt-0.5" />
            <p>
              LoveLens is not a substitute for professional mental health advice, couples therapy, psychiatric diagnosis, or clinical relationship counseling. Always consult a qualified professional for therapeutic care.
            </p>
          </div>
        </section>

        {/* Section 3: Intellectual Property */}
        <section className="space-y-3 text-sm text-[#786B72] leading-relaxed">
          <h2 className="font-serif-editorial text-xl text-[#30272C]">
            3. Intellectual Property Rights
          </h2>
          <p>
            The software, visual design, custom question formulations, scoring engines, brand assets, and interface components of LoveLens are the intellectual property of LoveLens and its licensors. You may not scrape, redistribute, or reverse-engineer the site's code or content for commercial resale without prior written authorization.
          </p>
        </section>

        {/* Section 4: Advertising & Third-Party Content */}
        <section className="space-y-3 text-sm text-[#786B72] leading-relaxed">
          <h2 className="font-serif-editorial text-xl text-[#30272C]">
            4. Third-Party Links & Advertisements
          </h2>
          <p>
            LoveLens may display third-party advertisements (such as Google AdSense) or links to external websites. We do not endorse, guarantee, or assume responsibility for any products, services, or claims advertised through third-party ad networks. Your interactions with advertisers are governed by their respective terms and privacy policies.
          </p>
        </section>

        {/* Section 5: User Conduct */}
        <section className="space-y-3 text-sm text-[#786B72] leading-relaxed">
          <h2 className="font-serif-editorial text-xl text-[#30272C]">
            5. User Conduct
          </h2>
          <p>
            You agree not to use the website in any manner that could disable, overburden, or impair the server infrastructure, nor interfere with any other party's enjoyment of the service. Automated scraping, DDoS attacks, and unauthorized reverse-proxying are strictly prohibited.
          </p>
        </section>

        {/* Section 6: Limitation of Liability */}
        <section className="space-y-3 text-sm text-[#786B72] leading-relaxed">
          <h2 className="font-serif-editorial text-xl text-[#30272C]">
            6. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by applicable law, LoveLens and its creators shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or inability to use the service or any interpretation of test results.
          </p>
        </section>

        {/* Section 7: Updates to Terms */}
        <section className="space-y-3 text-sm text-[#786B72] leading-relaxed">
          <h2 className="font-serif-editorial text-xl text-[#30272C]">
            7. Changes to Terms
          </h2>
          <p>
            We reserve the right to revise these Terms of Service at any time. Any changes will be posted on this page with an updated modification date. Your continued use of the website following any changes constitutes acceptance of the new terms.
          </p>
        </section>

        {/* Section 8: Contact */}
        <section className="space-y-3 text-sm text-[#786B72] leading-relaxed pt-4 border-t border-[#F0E4E8]">
          <h2 className="font-serif-editorial text-xl text-[#30272C]">
            8. Contact Information
          </h2>
          <p>
            If you have any questions or feedback regarding these Terms of Service, please reach out via our contact page or email us at <code className="bg-[#FCEBF0] text-[#C75C7A] px-2 py-0.5 rounded text-xs font-mono">support@lovelens.me</code>.
          </p>
        </section>

      </article>

    </div>
  );
}

