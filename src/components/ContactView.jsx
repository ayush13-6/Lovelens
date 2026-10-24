import React, { useState } from 'react';
import { Mail, MessageSquare, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';

export default function ContactView({ onGoHome }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'feedback',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.message.trim()) return;
    setSubmitted(true);
  };

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

      <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-[#F0E4E8] shadow-sm p-6 sm:p-12 space-y-8 animate-fadeIn">
        
        {/* Header */}
        <div className="border-b border-[#F0E4E8] pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCEBF0] text-[#C75C7A] text-xs font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" /> Get in Touch
          </div>
          <h1 className="font-serif-editorial text-3xl sm:text-4xl text-[#30272C] font-normal leading-tight">
            Contact & Feedback
          </h1>
          <p className="text-sm text-[#786B72]">
            Have a question, feedback on question phrasing, or an idea to improve LoveLens? We would love to hear from you.
          </p>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#E5F0E5] text-[#2D4F3A] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-serif-editorial text-2xl text-[#30272C]">
              Thank You for Reaching Out
            </h3>
            <p className="text-sm text-[#786B72] max-w-md mx-auto">
              Your message has been received. Because LoveLens operates as a privacy-focused project, we review all reader feedback with great care.
            </p>
            <div className="pt-4">
              <button
                onClick={onGoHome}
                className="px-6 py-2.5 rounded-full bg-[#C75C7A] text-white text-sm font-semibold hover:bg-[#b44f6c] transition-colors cursor-pointer"
              >
                Return to Home
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="topic" className="block text-xs font-semibold uppercase tracking-wider text-[#786B72] mb-1.5">
                Topic
              </label>
              <select
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border border-[#F0E4E8] bg-[#FFF9F5] text-sm text-[#30272C] focus:bg-white focus:outline-none focus:border-[#C75C7A]"
              >
                <option value="feedback">Quiz Feedback or Suggestions</option>
                <option value="question">Methodology Inquiry</option>
                <option value="bug">Technical Issue or Typo</option>
                <option value="general">General Relationship Reflection</option>
              </select>
            </div>

            <div>
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-[#786B72] mb-1.5">
                Your Name <span className="text-xs text-[#786B72] font-normal normal-case">(optional)</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Alex"
                className="w-full px-4 py-3 rounded-2xl border border-[#F0E4E8] bg-[#FFF9F5] text-sm text-[#30272C] focus:bg-white focus:outline-none focus:border-[#C75C7A]"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#786B72] mb-1.5">
                Email Address <span className="text-xs text-[#786B72] font-normal normal-case">(optional, only if you'd like a reply)</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-2xl border border-[#F0E4E8] bg-[#FFF9F5] text-sm text-[#30272C] focus:bg-white focus:outline-none focus:border-[#C75C7A]"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-[#786B72] mb-1.5">
                Your Message <span className="text-[#C75C7A]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Share your thoughts, suggestions, or reflections..."
                className="w-full px-4 py-3 rounded-2xl border border-[#F0E4E8] bg-[#FFF9F5] text-sm text-[#30272C] focus:bg-white focus:outline-none focus:border-[#C75C7A]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#C75C7A] hover:bg-[#b44f6c] text-white font-semibold text-sm shadow-sm transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </div>

            <div className="text-center pt-2">
              <p className="text-xs text-[#786B72]">
                Prefer direct email? Reach out at <a href="mailto:hello@lovelens.me" className="text-[#C75C7A] underline">hello@lovelens.me</a>.
              </p>
            </div>
          </form>
        )}

      </div>

    </div>
  );
}
