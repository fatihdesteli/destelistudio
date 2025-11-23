"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function MemesAvcisiPrivacy() {
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
            Memes Avcısı - Gizlilik Politikası
          </h1>

          <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-6">
            {/* Buraya içerik gelecek */}
            <p className="text-gray-400 italic">
              Gizlilik Politikası

Son Güncelleme: 2025

Bu Gizlilik Politikası, [Uygulama Adı] (“Uygulama”, “Biz”) tarafından sunulan hizmetleri kullanırken kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar. Uygulamayı kullanarak bu politikayı kabul etmiş sayılırsınız.

⸻

1. Topladığımız Veriler

Uygulamamız, çalışması için gerekli olan en minimal verileri toplar.

1.1. Kullanıcı Adı
	•	Oyunda görüntülenmek ve skor tablosunda gösterilmek amacıyla kullanılır.
	•	Gerçek kimliğinizi belirleyen bilgiler içermez.
	•	Kullanıcı tarafından serbestçe belirlenir.

1.2. Cihaz Bilgileri (Otomatik Veriler)

Uygulamanın stabil ve güvenli çalışması için cihaz tarafından otomatik iletilen teknik bilgiler alınabilir:
	•	İşletim sistemi versiyonu
	•	Uygulama sürümü
	•	Çökme (crash) raporları
	•	Performans ve hata kayıtları

Bu bilgiler kişisel veri değildir ve kullanıcıyı tanımlamak için kullanılmaz.

1.3. Oyun İçi Analitik Verileri

Performans geliştirmek amacıyla şu bilgiler anonim olarak toplanabilir:
	•	Ne kadar süre oynadığınız
	•	Hangi bölümlerde hata oluştuğu
	•	Oyun içi başarılar / skorlar

Bu veriler kimliğinizi belirlemez.

⸻

2. Verilerin Kullanım Amaçları

Toplanan veriler aşağıdaki amaçlarla kullanılır:
	•	Uygulamanın çalışması, geliştirilmesi ve iyileştirilmesi
	•	Oyun içi kullanıcı adının görüntülenmesi
	•	Hata tespiti ve performans analizi
	•	Hile, kötüye kullanım veya teknik sorunların engellenmesi

Herhangi bir reklam profillemesi, kişisel takip veya üçüncü taraflarla paylaşım yapılmaz.

⸻

3. Verilerin Saklanması
	•	Kullanıcı adı ve oyun verileri yalnızca oyun sırasında veya uygulamanın temel işleyişi için saklanır.
	•	Gereksiz veriler tutmayız.
	•	Verileriniz güvenli sunucularda saklanır ve üçüncü şahıslarla paylaşılmaz.

Talep etmeniz durumunda kullanıcı adınız ve oyun kayıtlarınız tamamen silinebilir.

⸻

4. Üçüncü Taraf Hizmetleri

Uygulama aşağıdaki üçüncü taraf hizmetlerini kullanabilir:
	•	Analitik hizmetleri (Crash report, performans ölçümü)
	•	Bulut altyapısı (veri saklama)

Bu hizmetler yalnızca teknik verileri işler ve kimliğinizi belirlemez.
Üçüncü taraflara herhangi bir kişisel veri aktarımı yapılmaz.

⸻

5. Çocukların Gizliliği

Uygulama tüm yaş grupları için uygundur ve çocukların kişisel verilerini toplamaz.
Kullanıcı adı, gerçek kimliği belirlemeyen bir bilgidir.

⸻

6. Verilerinizin Paylaşılmaması

Toplanan hiçbir veri:
	•	Satılmaz
	•	Üçüncü kişilere pazarlama için aktarılmaz
	•	Reklam amaçlı kullanılmaz

Sadece yasal zorunluluk olması halinde resmi makamlarla paylaşılabilir.

⸻

7. Verilerin Silinmesi ve Haklarınız

İstediğiniz zaman aşağıdaki haklara sahipsiniz:
	•	Kayıtlı verilerinizi öğrenme
	•	Yanlış bilgileri düzeltme
	•	Tüm verilerin kalıcı olarak silinmesini talep etme

Bu talepler için bize e-posta yoluyla ulaşabilirsiniz:
[E-posta adresinizi yazın]

⸻

8. Gizlilik Politikasındaki Değişiklikler

Gizlilik Politikası güncellenebilir. Değişiklikler uygulama içinde yayınlanır ve yayınlandığı tarihte geçerli olur.

⸻

9. İletişim

Gizlilik ile ilgili her türlü soru için:
[fatihdesteli@gmail.com]
[destelistudio.com.tr]
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
