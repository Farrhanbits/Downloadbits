import React from 'react';

export default function TermsOfServicePage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 space-y-8 text-zinc-300">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Terms of Service</h1>
      <p className="text-xs text-zinc-500 font-mono">Last updated: September 2026</p>

      <div className="space-y-6 text-sm leading-relaxed border-t border-white/10 pt-6">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Personal Use Only</h2>
          <p>
            Downloadbits is designed as an online personal media utility. Users are solely responsible for ensuring they possess rights or permissions to download and store media clips for personal reference.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Intellectual Property Rights</h2>
          <p>
            All video clips, photos, images, and audio tracks belong to their respective original content creators and platform rights holders. Downloadbits does not claim ownership over downloaded assets.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Disclaimer of Warranty</h2>
          <p>
            The service is provided "as is" without warranty of any kind. Downloadbits is not affiliated with Instagram, Meta, Pinterest, Twitter/X, or TikTok.
          </p>
        </section>
      </div>
    </div>
  );
}
