'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  customFaqs?: FAQItem[];
  title?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  customFaqs,
  title = 'Frequently Asked Questions',
}) => {
  const defaultFaqs: FAQItem[] = [
    {
      q: 'Is Downloadbits completely free to use?',
      a: 'Yes, 100% free! You can download unlimited Instagram Reels, Pinterest Pins, Twitter videos, and TikTok clips without paying or creating an account.',
    },
    {
      q: 'Do downloaded videos contain watermarks?',
      a: 'No. Downloadbits fetches original, uncompressed source streams directly from media servers without adding watermarks or logos.',
    },
    {
      q: 'Do I need to sign up or install browser extensions?',
      a: 'Not at all. Everything works directly inside your browser on desktop, iPhone, iPad, and Android devices.',
    },
    {
      q: 'Are my downloaded files stored on Downloadbits servers?',
      a: 'No. Your files are fetched in real-time and streamed directly to your browser download folder. We do not store or track your media downloads.',
    },
    {
      q: 'What resolution quality options are available?',
      a: 'We support maximum available resolutions including 1080p Full HD, 720p HD, 480p, and high-bitrate Audio MP3 extraction.',
    },
  ];

  const faqs = customFaqs || defaultFaqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative z-10 py-24 bg-[#0c0c10]/60 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-950/20 text-xs font-mono text-violet-300">
            <HelpCircle className="w-3.5 h-3.5 text-violet-400" />
            SUPPORT & KNOWLEDGE BASE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {title}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl glass-card bg-[#141319]/80 border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-zinc-100 hover:text-violet-300 transition-colors"
                >
                  <span className="text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-violet-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm text-zinc-400 leading-relaxed border-t border-white/5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
