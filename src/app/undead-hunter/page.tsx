"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function UndeadHunterPrivacy() {
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
            Undead Hunter - Privacy Policy
          </h1>

          <p className="text-gray-400 text-sm mb-8">Last Updated: December 11, 2025</p>

          <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-8">

            {/* Child Safety Banner */}
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-6">
              <h2 className="text-xl font-bold text-green-300 mb-3 flex items-center gap-2">
                <span>👨‍👩‍👧‍👦</span> Child-Friendly & Family Safe
              </h2>
              <p className="text-gray-300 text-base">
                <strong className="text-white">Undead Hunter</strong> is designed to be safe for players of all ages, including children.
                We are committed to complying with the Children&apos;s Online Privacy Protection Act (COPPA),
                GDPR-K, and other applicable child protection regulations worldwide.
              </p>
            </div>

            {/* No Data Collection Banner */}
            <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-6">
              <h2 className="text-xl font-bold text-blue-300 mb-3 flex items-center gap-2">
                <span>🔒</span> We Do NOT Collect Personal Data
              </h2>
              <p className="text-gray-300 text-base">
                <strong className="text-white">Undead Hunter does not collect, store, or share any personal information.</strong> We respect your privacy and have designed our game to function without requiring any personal data from you or your children.
              </p>
            </div>

            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
              <p className="text-gray-300 mb-4">
                <strong className="text-green-400">We do not collect any personal information.</strong> Specifically:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>We do <strong className="text-white">NOT</strong> collect names, email addresses, or contact information</li>
                <li>We do <strong className="text-white">NOT</strong> collect location data</li>
                <li>We do <strong className="text-white">NOT</strong> collect device identifiers or advertising IDs</li>
                <li>We do <strong className="text-white">NOT</strong> track user behavior or analytics</li>
                <li>We do <strong className="text-white">NOT</strong> use cookies or similar tracking technologies</li>
                <li>We do <strong className="text-white">NOT</strong> collect any data from children</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Local Data Storage</h2>
              <p className="text-gray-300 mb-3">
                The only data stored by our game is kept <strong className="text-white">locally on your device</strong>:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li><strong className="text-white">Game Progress:</strong> Your current level and achievements</li>
                <li><strong className="text-white">Game Settings:</strong> Sound and music preferences</li>
                <li><strong className="text-white">High Scores:</strong> Your personal best scores</li>
              </ul>
              <p className="text-gray-300 mt-4">
                This data is stored only on your device and is <strong className="text-white">never transmitted</strong> to our servers or any third parties.
                You can delete this data at any time by uninstalling the game.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Third-Party Services</h2>
              <p className="text-gray-300">
                <strong className="text-green-400">Undead Hunter does not use any third-party analytics, advertising, or tracking services.</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 mt-3">
                <li>No Google Analytics or Firebase Analytics</li>
                <li>No advertising networks (AdMob, Unity Ads, etc.)</li>
                <li>No social media integrations</li>
                <li>No external login services</li>
              </ul>
            </section>

            {/* Section 4 - Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Children&apos;s Privacy (COPPA Compliance)</h2>

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6 mb-4">
                <p className="text-gray-300 mb-4">
                  We take children&apos;s privacy very seriously. Our game is designed to be completely safe for children of all ages:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li><strong className="text-white">No personal information collection</strong> from users of any age</li>
                  <li><strong className="text-white">No registration or account creation</strong> required</li>
                  <li><strong className="text-white">No in-app purchases</strong> that could be made by children</li>
                  <li><strong className="text-white">No advertisements</strong> displayed to users</li>
                  <li><strong className="text-white">No links to external websites</strong> or social media</li>
                  <li><strong className="text-white">No chat features</strong> or user-to-user communication</li>
                  <li><strong className="text-white">No sharing features</strong> that could expose personal information</li>
                </ul>
              </div>

              <p className="text-gray-300">
                Parents and guardians can feel confident that their children can safely enjoy Undead Hunter without any privacy concerns.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
              <p className="text-gray-300">
                Since we do not collect any personal data, there is no risk of your personal information being compromised,
                leaked, or misused. All game data remains on your device under your control.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
              <p className="text-gray-300 mb-3">
                Since we do not collect personal data, traditional data rights (access, correction, deletion) do not apply. However:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>You can <strong className="text-white">delete all local game data</strong> by uninstalling the app</li>
                <li>You can <strong className="text-white">reset game progress</strong> through the game settings</li>
                <li>You have <strong className="text-white">full control</strong> over any data stored on your device</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Changes to This Policy</h2>
              <p className="text-gray-300">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated
                &quot;Last Updated&quot; date. We encourage you to review this policy periodically. Your continued use of the
                game after any changes constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Contact Us</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <ul className="text-gray-300 space-y-2">
                  <li><strong className="text-white">Developer:</strong> Desteli Studio</li>
                  <li><strong className="text-white">Email:</strong> <a href="mailto:fatihdesteli@gmail.com" className="text-purple-400 hover:text-purple-300">fatihdesteli@gmail.com</a></li>
                  <li><strong className="text-white">Website:</strong> <a href="https://destelistudio.com.tr" className="text-purple-400 hover:text-purple-300">destelistudio.com.tr</a></li>
                  <li><strong className="text-white">Application:</strong> Undead Hunter</li>
                </ul>
              </div>
            </section>

            {/* Summary Box */}
            <section className="border-t border-white/10 pt-8">
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-3">📋 Summary</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>✅ <strong className="text-green-400">No personal data collection</strong></li>
                  <li>✅ <strong className="text-green-400">No tracking or analytics</strong></li>
                  <li>✅ <strong className="text-green-400">No advertisements</strong></li>
                  <li>✅ <strong className="text-green-400">Child-safe and COPPA compliant</strong></li>
                  <li>✅ <strong className="text-green-400">All data stored locally on device</strong></li>
                  <li>✅ <strong className="text-green-400">Safe for all ages</strong></li>
                </ul>
              </div>
            </section>

            {/* Consent */}
            <section>
              <p className="text-gray-400 text-sm italic">
                By downloading, installing, or using Undead Hunter, you acknowledge that you have read and understood this Privacy Policy.
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
            href="/undead-hunter/hesap-sil"
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
          DESTELISTUDIO - Undead Hunter
        </motion.p>
      </div>
    </main>
  );
}
