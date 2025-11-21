"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivacyPolicy() {
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
            Ana Sayfa
          </Link>
        </motion.div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-card p-8 md:p-12 rounded-2xl"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-8 animate-text-gradient inline-block">
            Gizlilik Politikası
          </h1>

          <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-6">
            {/* Buraya içerik gelecek */}
            <p className="text-gray-400 italic">
              🔐 1. Topladığımız Bilgiler

Sandalye Kapmaca oyunu:
	•	Herhangi bir kişisel bilgi toplamaz.
	•	Konum bilgisi toplamaz.
	•	Cihazda depolanan hiçbir özel veriye erişmez.
	•	Kamera, mikrofon, rehber veya dosyalara erişim istemez.
	•	Kayıt/üyelik sistemi yoktur.

Bazı durumlarda yalnızca geliştirici analizleri için anonim ve kişisel tanımlayıcı içermeyen teknik veriler tutulabilir (cihaz modeli, oyun süresi, çökme raporları gibi). Bu veriler kullanıcıyı tanımlamaz.

⸻

📊 2. Üçüncü Taraf Hizmetleri

Oyun içinde reklam veya analiz kullanıyorsanız bu bölümü ekleyebiliriz.
Şu an için:
	•	Herhangi bir üçüncü taraf reklam ağı kullanılmamaktadır.
	•	Herhangi bir analiz hizmeti kullanılmamaktadır.

Eğer gelecekte reklam (Google AdMob vb.) eklenirse politika güncellenecektir.

⸻

👦👧 3. Çocukların Gizliliği (COPPA Uyumlu)

Oyun çocuklar için güvenlidir ve:
	•	Çocuklardan herhangi bir kişisel bilgi toplamaz.
	•	Çocukları hedefleyen reklamlar içermez.

Herhangi bir ebeveyn, çocuğuna ait veri toplandığını düşünürse bize ulaşabilir; ancak oyunda böyle bir toplama mekanizması bulunmamaktadır.

⸻

🌍 4. Verilerin Güvenliği

Oyun herhangi bir kişisel veri saklamadığı için ek güvenlik riski yoktur.
Bununla birlikte, oyun içinde oluşan teknik veriler (çökme raporları gibi) yalnızca geliştirme ve iyileştirme amacıyla güvenli altyapılarda tutulur.

⸻

🔄 5. Gizlilik Politikasında Değişiklik

Bu gizlilik politikası zaman zaman güncellenebilir.
Değişiklikler bu sayfa üzerinden duyurulur ve yayınlandığı anda yürürlüğe girer.

⸻

📞 6. İletişim

Bu gizlilik politikası veya oyun ile ilgili sorularınız için bizimle iletişime geçebilirsiniz:

E-posta: fatihdesteli@gmail.com
Web Site: destelistudio.com.tr

            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 text-sm mt-8"
        >
          DESTELISTUDIO
        </motion.p>
      </div>
    </main>
  );
}
