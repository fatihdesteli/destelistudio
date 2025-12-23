"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function IstanbulCatsPrivacy() {
  return (
    <main className="relative min-h-screen w-full overflow-y-auto bg-[#0f172a]">
      {/* Aurora Background */}
      <div className="fixed inset-0 animate-aurora opacity-40" />

      {/* Grid Overlay */}
      <div
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "50px 50px"
        }}
      />

      <div className="relative z-10 container mx-auto px-6 py-12 max-w-4xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </motion.div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-card p-8 md:p-12 rounded-2xl"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-text-gradient inline-block">
            Privacy Policy for Istanbul Cats
          </h1>

          <p className="text-gray-400 text-sm mb-8">Last Updated: December 2024</p>

          <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-8">

            <p className="text-gray-300">
              Desteli Studio (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the Istanbul Cats mobile application (the &quot;Game&quot;).
              This Privacy Policy explains how we collect, use, and protect your information when you use our Game.
            </p>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>

              <h3 className="text-xl font-semibold text-purple-300 mb-3">Automatically Collected Information</h3>
              <p className="text-gray-300 mb-3">When you use Istanbul Cats, we may automatically collect:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
                <li><strong className="text-white">Game Data:</strong> High scores, gameplay statistics, and progress data</li>
                <li><strong className="text-white">Device Information:</strong> Device type, operating system version, and unique device identifiers</li>
                <li><strong className="text-white">Usage Data:</strong> How you interact with the Game, session duration, and feature usage</li>
              </ul>

              <h3 className="text-xl font-semibold text-purple-300 mb-3">Information You Provide</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li><strong className="text-white">Username/Nickname:</strong> If you choose to appear on the leaderboard, you may provide a display name</li>
                <li><strong className="text-white">Game Preferences:</strong> Sound and music settings</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
              <p className="text-gray-300 mb-3">We use the collected information to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Save and display your high scores on the global leaderboard</li>
                <li>Improve game performance and user experience</li>
                <li>Analyze gameplay patterns to enhance game features</li>
                <li>Provide technical support and respond to inquiries</li>
              </ul>
            </section>

            {/* Third-Party Services */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
              <p className="text-gray-300 mb-4">Istanbul Cats uses the following third-party services:</p>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mb-4">
                <h3 className="text-xl font-semibold text-blue-300 mb-3">Firebase (Google)</h3>
                <p className="text-gray-300 mb-2">We use Firebase for:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li><strong className="text-white">Cloud Firestore:</strong> To store leaderboard data and high scores</li>
                  <li><strong className="text-white">Firebase Analytics:</strong> To understand how players use the Game</li>
                </ul>
                <p className="text-gray-400 text-sm mt-3">
                  Firebase&apos;s privacy policy: <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">https://firebase.google.com/support/privacy</a>
                </p>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-purple-300 mb-3">Google Fonts</h3>
                <p className="text-gray-300">We use Google Fonts for typography in the Game.</p>
                <p className="text-gray-400 text-sm mt-2">
                  Google Fonts privacy policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">https://policies.google.com/privacy</a>
                </p>
              </div>
            </section>

            {/* Data Storage and Security */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Data Storage and Security</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Your game data is stored securely using Firebase Cloud services</li>
                <li>High scores are stored anonymously with only a display name you choose</li>
                <li>We implement appropriate security measures to protect your data</li>
                <li>We do not sell, trade, or rent your personal information to third parties</li>
              </ul>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Children&apos;s Privacy</h2>
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-6">
                <p className="text-gray-300 mb-4">
                  Istanbul Cats is suitable for all ages. We do not knowingly collect personal information from children under 13. The Game:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Does not require account registration</li>
                  <li>Does not collect real names or contact information</li>
                  <li>Only stores optional display names for leaderboard purposes</li>
                  <li>Does not contain in-app purchases or advertising</li>
                </ul>
                <p className="text-gray-300 mt-4">
                  If you are a parent or guardian and believe your child has provided personal information, please contact us.
                </p>
              </div>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Data Retention</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Game progress and high scores are retained as long as you use the Game</li>
                <li>You can request deletion of your data by contacting us</li>
                <li>Leaderboard entries may be retained to maintain the integrity of the global rankings</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
              <p className="text-gray-300 mb-3">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Access the data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of analytics collection</li>
              </ul>
            </section>

            {/* Changes to This Privacy Policy */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-300">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy in the Game or on our website. Changes are effective immediately upon posting.
              </p>
            </section>

            {/* Contact Us */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <ul className="text-gray-300 space-y-2">
                  <li><strong className="text-white">Developer:</strong> Desteli Studio</li>
                  <li><strong className="text-white">Email:</strong> <a href="mailto:fatihdesteli@gmail.com" className="text-purple-400 hover:text-purple-300">fatihdesteli@gmail.com</a></li>
                  <li><strong className="text-white">Website:</strong> <a href="https://destelistudio.com.tr" className="text-purple-400 hover:text-purple-300">destelistudio.com.tr</a></li>
                </ul>
              </div>
            </section>

            {/* Consent */}
            <section className="border-t border-white/10 pt-8">
              <p className="text-gray-400 text-sm italic">
                By using Istanbul Cats, you agree to the collection and use of information in accordance with this Privacy Policy.
              </p>
            </section>

          </div>
        </motion.div>

        {/* Account Deletion Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6"
        >
          <Link
            href="/istanbulcats/hesap-sil"
            className="text-purple-400 hover:text-purple-300 transition text-sm"
          >
            Contact & Support / Account Deletion →
          </Link>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 text-sm mt-4"
        >
          DESTELISTUDIO - Istanbul Cats
        </motion.p>
      </div>
    </main>
  );
}
