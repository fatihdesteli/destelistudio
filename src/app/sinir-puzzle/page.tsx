"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function SinirPuzzlePrivacy() {
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
            Sinir Puzzle - Privacy Policy
          </h1>

          <p className="text-gray-400 text-sm mb-8">Last Updated: December 11, 2025</p>

          <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-8">

            {/* Introduction */}
            <section>
              <p>
                <strong className="text-white">Desteli Studio</strong> (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your privacy when you use our mobile puzzle game <strong className="text-white">Sinir Puzzle</strong> (&quot;Game&quot;, &quot;Application&quot;). This Privacy Policy explains what information we collect, how we use it, and how we protect it.
              </p>
            </section>

            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>

              <h3 className="text-xl font-semibold text-purple-300 mb-3">1.1. Information You Provide</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li><strong className="text-white">Player Name:</strong> The username you choose when playing the game</li>
                <li><strong className="text-white">Game Progress:</strong> Your puzzle completion status, levels unlocked, and achievements</li>
                <li><strong className="text-white">Game Settings:</strong> Your preferences such as sound settings, theme choices</li>
              </ul>

              <h3 className="text-xl font-semibold text-purple-300 mb-3 mt-6">1.2. Automatically Collected Information</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li><strong className="text-white">Device Information:</strong> Device model, operating system version, screen resolution</li>
                <li><strong className="text-white">Game Statistics:</strong> Play time, session duration, levels completed</li>
                <li><strong className="text-white">Technical Data:</strong> App performance metrics, crash reports, error logs</li>
                <li><strong className="text-white">Usage Data:</strong> Features used, buttons clicked, navigation patterns</li>
              </ul>

              <h3 className="text-xl font-semibold text-purple-300 mb-3 mt-6">1.3. Advertising & Analytics Data</h3>
              <p className="text-gray-300">Our Game displays advertisements through Google AdMob. AdMob may collect:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 mt-2">
                <li>Advertising ID (IDFA/GAID)</li>
                <li>IP Address</li>
                <li>Approximate location data</li>
                <li>Device and network information</li>
                <li>Ad interaction data</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-300 mb-3">We use the collected information for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>To provide and maintain the Game</li>
                <li>To save and sync your game progress</li>
                <li>To improve gameplay experience and user interface</li>
                <li>To display advertisements (including personalized ads)</li>
                <li>To analyze game performance and user behavior</li>
                <li>To identify and fix bugs and technical issues</li>
                <li>To provide customer support</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Third-Party Services</h2>
              <p className="text-gray-300 mb-4">Our Game integrates the following third-party services:</p>

              <div className="bg-white/5 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-green-300 mb-2">Google AdMob</h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li><strong>Purpose:</strong> Advertisement display and monetization</li>
                  <li><strong>Data Collected:</strong> Advertising ID, device info, ad interactions</li>
                  <li><strong>Privacy Policy:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">https://policies.google.com/privacy</a></li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Google Firebase</h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li><strong>Purpose:</strong> Analytics, crash reporting, cloud storage</li>
                  <li><strong>Data Collected:</strong> Usage data, device info, crash logs</li>
                  <li><strong>Privacy Policy:</strong> <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">https://firebase.google.com/support/privacy</a></li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-yellow-300 mb-2">Unity Analytics (if applicable)</h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li><strong>Purpose:</strong> Game analytics and performance monitoring</li>
                  <li><strong>Data Collected:</strong> Game events, session data</li>
                  <li><strong>Privacy Policy:</strong> <a href="https://unity.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">https://unity.com/legal/privacy-policy</a></li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Data Storage & Security</h2>

              <h3 className="text-xl font-semibold text-purple-300 mb-3">4.1. Data Storage</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Game progress and settings are stored locally on your device</li>
                <li>Analytics data is stored on secure third-party servers (Firebase)</li>
                <li>Data is retained only as long as necessary for the purposes outlined</li>
              </ul>

              <h3 className="text-xl font-semibold text-purple-300 mb-3 mt-6">4.2. Security Measures</h3>
              <p className="text-gray-300">
                We implement industry-standard security measures to protect your information, including encryption and secure data transmission. However, no method of electronic storage or transmission is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Children&apos;s Privacy</h2>
              <p className="text-gray-300">
                Our Game is designed for general audiences. We do not knowingly collect personal information from children under 13 years of age (or under 16 in certain jurisdictions). If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
              </p>
              <p className="text-gray-300 mt-3">
                If we discover that we have collected personal information from a child under the applicable age limit, we will take steps to delete that information as soon as possible.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Advertising & Opt-Out Options</h2>
              <p className="text-gray-300 mb-3">
                Our Game displays advertisements to support development. You can opt out of personalized advertising:
              </p>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-3">
                <h4 className="font-semibold text-green-300 mb-2">Android:</h4>
                <p className="text-gray-300 text-sm">Settings → Google → Ads → Opt out of Ads Personalization</p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-300 mb-2">iOS:</h4>
                <p className="text-gray-300 text-sm">Settings → Privacy → Apple Advertising → Turn off Personalized Ads</p>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights</h2>
              <p className="text-gray-300 mb-3">
                Depending on your location, you may have the following rights under GDPR, CCPA, or other applicable laws:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li><strong className="text-white">Right to Access:</strong> Request a copy of your personal data</li>
                <li><strong className="text-white">Right to Rectification:</strong> Request correction of inaccurate data</li>
                <li><strong className="text-white">Right to Erasure:</strong> Request deletion of your personal data</li>
                <li><strong className="text-white">Right to Restriction:</strong> Request limitation of data processing</li>
                <li><strong className="text-white">Right to Portability:</strong> Receive your data in a portable format</li>
                <li><strong className="text-white">Right to Object:</strong> Object to certain data processing activities</li>
                <li><strong className="text-white">Right to Withdraw Consent:</strong> Withdraw previously given consent</li>
              </ul>
              <p className="text-gray-300 mt-3">
                To exercise any of these rights, please contact us using the information provided below.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Data Deletion</h2>
              <p className="text-gray-300 mb-3">To delete your data:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li><strong className="text-white">Local Data:</strong> Uninstall the application from your device</li>
                <li><strong className="text-white">Cloud Data:</strong> Contact us via email to request deletion of any cloud-stored data</li>
                <li><strong className="text-white">Advertising Data:</strong> Reset your Advertising ID in your device settings</li>
              </ul>
              <p className="text-gray-300 mt-3">
                Please note that some anonymized analytics data may be retained for up to 90 days for statistical purposes.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. International Data Transfers</h2>
              <p className="text-gray-300">
                Your information may be transferred to and processed in countries other than your own. These countries may have different data protection laws. By using the Game, you consent to the transfer of your information to these countries. We ensure appropriate safeguards are in place to protect your data.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Changes to This Policy</h2>
              <p className="text-gray-300">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date. For significant changes, we may provide additional notice within the Game. Your continued use of the Game after any changes constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Contact Us</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <ul className="text-gray-300 space-y-2">
                  <li><strong className="text-white">Email:</strong> <a href="mailto:fatihdesteli@gmail.com" className="text-purple-400 hover:text-purple-300">fatihdesteli@gmail.com</a></li>
                  <li><strong className="text-white">Developer:</strong> Desteli Studio</li>
                  <li><strong className="text-white">Application:</strong> Sinir Puzzle</li>
                  <li><strong className="text-white">Website:</strong> <a href="https://destelistudio.com.tr" className="text-purple-400 hover:text-purple-300">destelistudio.com.tr</a></li>
                </ul>
              </div>
            </section>

            {/* Consent */}
            <section className="border-t border-white/10 pt-8">
              <p className="text-gray-400 text-sm italic">
                By downloading, installing, or using Sinir Puzzle, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
              </p>
            </section>

          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 text-sm mt-8"
        >
          DESTELISTUDIO - Sinir Puzzle
        </motion.p>
      </div>
    </main>
  );
}
