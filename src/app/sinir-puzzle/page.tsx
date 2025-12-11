"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function SinirPuzzlePrivacy() {
  const [language, setLanguage] = useState<"en" | "tr">("en");

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
            {language === "en" ? "Back to Home" : "Ana Sayfa"}
          </Link>
        </motion.div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-card p-8 md:p-12 rounded-2xl"
        >
          {/* Header with Language Toggle */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold animate-text-gradient inline-block">
                Sinir Puzzle - {language === "en" ? "Privacy Policy" : "Gizlilik Politikası"}
              </h1>
              <p className="text-gray-400 text-sm mt-2">
                {language === "en" ? "Last Updated" : "Son Güncelleme"}: 11 {language === "en" ? "December" : "Aralık"} 2025
              </p>
            </div>

            {/* Language Toggle */}
            <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
              <button
                onClick={() => setLanguage("en")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  language === "en"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                🇬🇧 English
              </button>
              <button
                onClick={() => setLanguage("tr")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  language === "tr"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                🇹🇷 Türkçe
              </button>
            </div>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={language}
              initial={{ opacity: 0, x: language === "en" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: language === "en" ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-8"
            >
              {language === "en" ? <EnglishContent /> : <TurkishContent />}
            </motion.div>
          </AnimatePresence>
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

function EnglishContent() {
  return (
    <>
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

        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-yellow-300 mb-2">Unity Analytics</h3>
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
          <li>Analytics data is stored on secure third-party servers</li>
          <li>Data is retained only as long as necessary for the purposes outlined</li>
        </ul>

        <h3 className="text-xl font-semibold text-purple-300 mb-3 mt-6">4.2. Security Measures</h3>
        <p className="text-gray-300">
          We implement industry-standard security measures to protect your information, including encryption and secure data transmission. However, no method of electronic storage or transmission is 100% secure.
        </p>
      </section>

      {/* Section 5 */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">5. Children&apos;s Privacy</h2>
        <p className="text-gray-300">
          Our Game is designed for general audiences. We do not knowingly collect personal information from children under 13 years of age (or under 16 in certain jurisdictions). If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
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
          <li><strong className="text-white">Right to Object:</strong> Object to certain data processing activities</li>
        </ul>
      </section>

      {/* Section 8 */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">8. Data Deletion</h2>
        <p className="text-gray-300 mb-3">To delete your data:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li><strong className="text-white">Local Data:</strong> Uninstall the application from your device</li>
          <li><strong className="text-white">Cloud Data:</strong> Contact us via email to request deletion</li>
          <li><strong className="text-white">Advertising Data:</strong> Reset your Advertising ID in device settings</li>
        </ul>
      </section>

      {/* Section 9 */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">9. Changes to This Policy</h2>
        <p className="text-gray-300">
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
        </p>
      </section>

      {/* Section 10 */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">10. Contact Us</h2>
        <p className="text-gray-300 mb-4">
          If you have any questions about this Privacy Policy, please contact us:
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
    </>
  );
}

function TurkishContent() {
  return (
    <>
      {/* Giriş */}
      <section>
        <p>
          <strong className="text-white">Desteli Studio</strong> (&quot;biz&quot;, &quot;bizim&quot;) olarak, mobil bulmaca oyunumuz <strong className="text-white">Sinir Puzzle</strong>&apos;ı (&quot;Oyun&quot;, &quot;Uygulama&quot;) kullanırken gizliliğinizi korumayı taahhüt ediyoruz. Bu Gizlilik Politikası, hangi bilgileri topladığımızı, nasıl kullandığımızı ve nasıl koruduğumuzu açıklar.
        </p>
      </section>

      {/* Bölüm 1 */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">1. Topladığımız Bilgiler</h2>

        <h3 className="text-xl font-semibold text-purple-300 mb-3">1.1. Sağladığınız Bilgiler</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li><strong className="text-white">Oyuncu Adı:</strong> Oyunu oynarken seçtiğiniz kullanıcı adı</li>
          <li><strong className="text-white">Oyun İlerlemesi:</strong> Bulmaca tamamlama durumunuz, açılan seviyeler ve başarılar</li>
          <li><strong className="text-white">Oyun Ayarları:</strong> Ses ayarları, tema seçimleri gibi tercihleriniz</li>
        </ul>

        <h3 className="text-xl font-semibold text-purple-300 mb-3 mt-6">1.2. Otomatik Toplanan Bilgiler</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li><strong className="text-white">Cihaz Bilgileri:</strong> Cihaz modeli, işletim sistemi sürümü, ekran çözünürlüğü</li>
          <li><strong className="text-white">Oyun İstatistikleri:</strong> Oynama süresi, oturum süresi, tamamlanan seviyeler</li>
          <li><strong className="text-white">Teknik Veriler:</strong> Uygulama performans ölçümleri, çökme raporları, hata kayıtları</li>
          <li><strong className="text-white">Kullanım Verileri:</strong> Kullanılan özellikler, tıklanan butonlar, gezinme kalıpları</li>
        </ul>

        <h3 className="text-xl font-semibold text-purple-300 mb-3 mt-6">1.3. Reklam ve Analitik Verileri</h3>
        <p className="text-gray-300">Oyunumuz Google AdMob üzerinden reklam göstermektedir. AdMob şunları toplayabilir:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-300 mt-2">
          <li>Reklam Kimliği (IDFA/GAID)</li>
          <li>IP Adresi</li>
          <li>Yaklaşık konum verileri</li>
          <li>Cihaz ve ağ bilgileri</li>
          <li>Reklam etkileşim verileri</li>
        </ul>
      </section>

      {/* Bölüm 2 */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">2. Bilgilerinizi Nasıl Kullanıyoruz</h2>
        <p className="text-gray-300 mb-3">Toplanan bilgileri aşağıdaki amaçlarla kullanıyoruz:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Oyunu sağlamak ve sürdürmek</li>
          <li>Oyun ilerlemenizi kaydetmek ve senkronize etmek</li>
          <li>Oyun deneyimini ve kullanıcı arayüzünü geliştirmek</li>
          <li>Reklam göstermek (kişiselleştirilmiş reklamlar dahil)</li>
          <li>Oyun performansını ve kullanıcı davranışını analiz etmek</li>
          <li>Hataları ve teknik sorunları tespit edip düzeltmek</li>
          <li>Müşteri desteği sağlamak</li>
          <li>Yasal yükümlülüklere uymak</li>
        </ul>
      </section>

      {/* Bölüm 3 */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">3. Üçüncü Taraf Hizmetleri</h2>
        <p className="text-gray-300 mb-4">Oyunumuz aşağıdaki üçüncü taraf hizmetlerini kullanmaktadır:</p>

        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-yellow-300 mb-2">Unity Analytics</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li><strong>Amaç:</strong> Oyun analitiği ve performans izleme</li>
            <li><strong>Toplanan Veriler:</strong> Oyun olayları, oturum verileri</li>
            <li><strong>Gizlilik Politikası:</strong> <a href="https://unity.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">https://unity.com/legal/privacy-policy</a></li>
          </ul>
        </div>
      </section>

      {/* Bölüm 4 */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">4. Veri Depolama ve Güvenlik</h2>

        <h3 className="text-xl font-semibold text-purple-300 mb-3">4.1. Veri Depolama</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Oyun ilerlemesi ve ayarları cihazınızda yerel olarak saklanır</li>
          <li>Analitik veriler güvenli üçüncü taraf sunucularında saklanır</li>
          <li>Veriler yalnızca belirtilen amaçlar için gerekli olduğu sürece tutulur</li>
        </ul>

        <h3 className="text-xl font-semibold text-purple-300 mb-3 mt-6">4.2. Güvenlik Önlemleri</h3>
        <p className="text-gray-300">
          Bilgilerinizi korumak için şifreleme ve güvenli veri iletimi dahil endüstri standardı güvenlik önlemleri uyguluyoruz. Ancak hiçbir elektronik depolama veya iletim yöntemi %100 güvenli değildir.
        </p>
      </section>

      {/* Bölüm 5 */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">5. Çocukların Gizliliği</h2>
        <p className="text-gray-300">
          Oyunumuz genel kitleler için tasarlanmıştır. 13 yaşın altındaki çocuklardan (bazı yargı bölgelerinde 16 yaşın altındaki) bilerek kişisel bilgi toplamıyoruz. Ebeveyn veya veli iseniz ve çocuğunuzun bize kişisel bilgi verdiğini düşünüyorsanız, lütfen hemen bizimle iletişime geçin.
        </p>
      </section>

      {/* Bölüm 6 */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">6. Reklam ve Devre Dışı Bırakma Seçenekleri</h2>
        <p className="text-gray-300 mb-3">
          Oyunumuz geliştirmeyi desteklemek için reklam göstermektedir. Kişiselleştirilmiş reklamları devre dışı bırakabilirsiniz:
        </p>

        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-3">
          <h4 className="font-semibold text-green-300 mb-2">Android:</h4>
          <p className="text-gray-300 text-sm">Ayarlar → Google → Reklamlar → Reklam Kişiselleştirmesini Devre Dışı Bırak</p>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <h4 className="font-semibold text-blue-300 mb-2">iOS:</h4>
          <p className="text-gray-300 text-sm">Ayarlar → Gizlilik → Apple Reklamcılığı → Kişiselleştirilmiş Reklamları Kapat</p>
        </div>
      </section>

      {/* Bölüm 7 */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">7. Haklarınız</h2>
        <p className="text-gray-300 mb-3">
          Bulunduğunuz konuma bağlı olarak, KVKK, GDPR veya diğer geçerli yasalar kapsamında aşağıdaki haklara sahip olabilirsiniz:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li><strong className="text-white">Erişim Hakkı:</strong> Kişisel verilerinizin bir kopyasını talep etme</li>
          <li><strong className="text-white">Düzeltme Hakkı:</strong> Hatalı verilerin düzeltilmesini talep etme</li>
          <li><strong className="text-white">Silme Hakkı:</strong> Kişisel verilerinizin silinmesini talep etme</li>
          <li><strong className="text-white">Kısıtlama Hakkı:</strong> Veri işlemenin sınırlandırılmasını talep etme</li>
          <li><strong className="text-white">İtiraz Hakkı:</strong> Belirli veri işleme faaliyetlerine itiraz etme</li>
        </ul>
      </section>

      {/* Bölüm 8 */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">8. Veri Silme</h2>
        <p className="text-gray-300 mb-3">Verilerinizi silmek için:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li><strong className="text-white">Yerel Veriler:</strong> Uygulamayı cihazınızdan kaldırın</li>
          <li><strong className="text-white">Bulut Verileri:</strong> Silme talebi için e-posta ile bize ulaşın</li>
          <li><strong className="text-white">Reklam Verileri:</strong> Cihaz ayarlarından Reklam Kimliğinizi sıfırlayın</li>
        </ul>
      </section>

      {/* Bölüm 9 */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">9. Bu Politikadaki Değişiklikler</h2>
        <p className="text-gray-300">
          Bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Değişiklikleri bu sayfada yayınlayarak ve &quot;Son Güncelleme&quot; tarihini güncelleyerek size bildireceğiz.
        </p>
      </section>

      {/* Bölüm 10 */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">10. Bize Ulaşın</h2>
        <p className="text-gray-300 mb-4">
          Bu Gizlilik Politikası hakkında sorularınız varsa, lütfen bizimle iletişime geçin:
        </p>
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
          <ul className="text-gray-300 space-y-2">
            <li><strong className="text-white">E-posta:</strong> <a href="mailto:fatihdesteli@gmail.com" className="text-purple-400 hover:text-purple-300">fatihdesteli@gmail.com</a></li>
            <li><strong className="text-white">Geliştirici:</strong> Desteli Studio</li>
            <li><strong className="text-white">Uygulama:</strong> Sinir Puzzle</li>
            <li><strong className="text-white">Web Sitesi:</strong> <a href="https://destelistudio.com.tr" className="text-purple-400 hover:text-purple-300">destelistudio.com.tr</a></li>
          </ul>
        </div>
      </section>

      {/* Onay */}
      <section className="border-t border-white/10 pt-8">
        <p className="text-gray-400 text-sm italic">
          Sinir Puzzle&apos;ı indirerek, yükleyerek veya kullanarak, bu Gizlilik Politikasını okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan etmiş olursunuz.
        </p>
      </section>
    </>
  );
}
