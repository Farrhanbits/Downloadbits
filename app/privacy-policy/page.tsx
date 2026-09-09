import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 space-y-8 text-zinc-300">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Privacy Policy</h1>
      <p className="text-xs text-zinc-500 font-mono">Last updated: September 2026</p>

      <div className="space-y-6 text-sm leading-relaxed border-t border-white/10 pt-6">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Information We Do Not Collect</h2>
          <p>
            Downloadbits is built with a strict privacy-first architecture. We do not require account registration, passwords, names, or emails. We do not track personal identifying information when you use our web app.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Media File Storage</h2>
          <p>
            We do not host or store any downloaded videos, photos, or audio files on our servers. Media downloads are processed transiently via direct stream buffer and immediately discarded.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Cookies & Analytics</h2>
          <p>
            We use minimal local browser session storage solely to preserve theme preferences and user UI settings. No third-party tracking cookies are deployed.
          </p>
        </section>
      </div>
    </div>
  );
}
