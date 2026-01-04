"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function KazandiranMisyonPrivacy() {
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
            Kazandıran Misyon - Privacy Policy
          </h1>

          <p className="text-gray-400 text-sm mb-8">Last Updated: December 2024</p>

          <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-8">

            {/* İçerik buraya gelecek */}
            <section>
              <p className="text-gray-400 italic">
                # GİZLİLİK POLİTİKASI

**Son Güncellenme Tarihi:** 04 Ocak 2026

Desteli Studio olarak, kullanıcılarımızın gizliliğine saygı duyar ve kişisel verilerinizi korumayı taahhüt ederiz. Bu gizlilik politikası, "Kazandıran Misyon/Komiserlik" mobil uygulaması (bundan sonra "Uygulama" olarak anılacaktır) kapsamında toplanan, kullanılan ve paylaşılan bilgileri açıklamaktadır.

## 1. TOPLANAN BİLGİLER

### 1.1. Hesap Bilgileri
Uygulamamızı kullanırken aşağıdaki bilgiler toplanabilir:

- **Google ile Giriş:** Google hesabınızdan ad, e-posta adresi ve profil fotoğrafı
- **Apple ile Giriş:** Apple ID'nizden ad ve e-posta adresi
- **Anonim Hesap:** Rastgele oluşturulan benzersiz kullanıcı kimliği

### 1.2. Kullanım Verileri
Uygulamayı kullanımınız sırasında otomatik olarak toplanan bilgiler:

- Çözülen soru sayısı ve doğru/yanlış cevap istatistikleri
- Test geçmişi ve performans verileri
- Kategori bazlı başarı oranları
- Yarışma katılım bilgileri
- Günlük kullanım verileri
- Uygulama içi tercihler ve ayarlar

### 1.3. Teknik Bilgiler
- Cihaz modeli ve işletim sistemi bilgileri
- Uygulama sürümü ve hata kayıtları
- IP adresi ve genel konum bilgisi (şehir/ülke düzeyinde)

### 1.4. Ödeme Bilgileri
- PRO üyelik satın alımlarınız Google Play Store veya Apple App Store üzerinden gerçekleştirilir
- Kredi kartı veya ödeme bilgileriniz doğrudan Desteli Studio tarafından saklanmaz
- Sadece satın alma işleminin başarılı olup olmadığı bilgisi kaydedilir

## 2. BİLGİLERİN KULLANIMI

Toplanan bilgiler aşağıdaki amaçlarla kullanılır:

### 2.1. Hizmet Sunumu
- Hesap oluşturma ve kimlik doğrulama
- Kullanıcı profilinizi ve ilerlemenizi saklama
- Test ve yarışma özelliklerini sağlama
- İstatistiklerinizi hesaplama ve gösterme

### 2.2. Uygulama Geliştirme
- Hataları tespit etme ve düzeltme
- Performans iyileştirmeleri yapma
- Yeni özellikler geliştirme
- Kullanıcı deneyimini optimize etme

### 2.3. İletişim
- Hesabınızla ilgili önemli bildirimleri gönderme
- Teknik destek sağlama
- Uygulama güncellemeleri hakkında bilgilendirme

## 3. BİLGİLERİN PAYLAŞIMI

### 3.1. Üçüncü Taraf Hizmetler
Uygulamamız aşağıdaki üçüncü taraf hizmetleri kullanır:

**Firebase (Google LLC)**
- Kimlik doğrulama ve kullanıcı yönetimi
- Veritabanı hizmetleri
- Analitik ve performans izleme
- [Firebase Gizlilik Politikası](https://firebase.google.com/support/privacy)

**Google Play Services**
- Oturum açma hizmeti
- Uygulama içi satın alma
- [Google Gizlilik Politikası](https://policies.google.com/privacy)

**Apple Services**
- Apple ile Giriş
- Uygulama içi satın alma
- [Apple Gizlilik Politikası](https://www.apple.com/legal/privacy/)

### 3.2. Yasal Gereklilikler
Bilgileriniz aşağıdaki durumlarda paylaşılabilir:
- Yasal zorunluluklar ve mahkeme kararları
- Hukuki hakların korunması
- Dolandırıcılık ve güvenlik ihlallerinin önlenmesi
- Kamu sağlığı ve güvenliğinin korunması

### 3.3. Diğer Kullanıcılar
- Yarışma odalarında kullanıcı adınız ve skorunuz diğer katılımcılar tarafından görülebilir
- E-posta adresiniz ve diğer kişisel bilgileriniz asla diğer kullanıcılarla paylaşılmaz

## 4. VERİ GÜVENLİĞİ

Verilerinizin güvenliğini sağlamak için aşağıdaki önlemleri alırız:

- SSL/TLS şifreleme ile veri aktarımı
- Firebase güvenlik kuralları ile veritabanı koruması
- Düzenli güvenlik güncellemeleri
- Erişim kontrolü ve yetkilendirme sistemleri
- Güvenli kimlik doğrulama mekanizmaları

Ancak, internet üzerinden hiçbir veri aktarımının %100 güvenli olmadığını unutmayın.

## 5. VERİ SAKLAMA SÜRESİ

- **Aktif Hesaplar:** Hesabınız aktif olduğu sürece verileriniz saklanır
- **Pasif Hesaplar:** 24 ay boyunca giriş yapılmayan hesaplar silinebilir
- **Silinen Hesaplar:** Hesap silme işleminden sonra verileriniz 30 gün içinde kalıcı olarak silinir
- **Yasal Yükümlülükler:** Yasal gerekliliklere göre bazı veriler daha uzun süre saklanabilir

## 6. KULLANICI HAKLARI

KVKK ve GDPR kapsamında aşağıdaki haklara sahipsiniz:

### 6.1. Erişim Hakkı
Hakkınızda işlenen kişisel verilere erişim talep edebilirsiniz.

### 6.2. Düzeltme Hakkı
Yanlış veya eksik bilgilerinizin düzeltilmesini talep edebilirsiniz.

### 6.3. Silme Hakkı
Kişisel verilerinizin silinmesini talep edebilirsiniz. Uygulama içinden hesabınızı kalıcı olarak silebilirsiniz.

### 6.4. İtiraz Hakkı
Verilerinizin işlenmesine itiraz edebilirsiniz.

### 6.5. Veri Taşınabilirliği
Verilerinizin yapılandırılmış, yaygın kullanılan bir formatta size iletilmesini talep edebilirsiniz.

## 7. ÇOCUKLARIN GİZLİLİĞİ

Uygulamamız 13 yaşın altındaki çocuklara yönelik değildir. Bilerek 13 yaşın altındaki çocuklardan kişisel bilgi toplamıyoruz. Eğer 13 yaşın altındaki bir çocuğun kişisel verilerini topladığımızı fark ederseniz, lütfen bizimle iletişime geçin.

## 8. ANONİM HESAPLAR

Anonim olarak giriş yaparsanız:
- Sadece cihazınızda saklanan benzersiz bir kimlik oluşturulur
- E-posta veya ad gibi kişisel bilgiler toplanmaz
- Cihazınızı sıfırlarsanız veya uygulamayı sillerseniz, verileriniz kaybedilir
- Anonim hesabınızı Google veya Apple hesabı ile bağlayarak verilerinizi güvence altına alabilirsiniz

## 9. PROMOSYON KODLARI

PRO üyelik promosyon kodları kullanıldığında:
- Kod kullanım bilgisi kaydedilir
- Kullanıcı kimliğiniz kod kullanımı ile ilişkilendirilir
- Promosyon kodu kötüye kullanımını önlemek için bu bilgiler saklanır

## 10. ÇEREZLER VE İZLEME TEKNOLOJİLERİ

Uygulamamız aşağıdaki teknolojileri kullanır:
- Oturum yönetimi için güvenli tokenlar
- Yerel veri depolama (SharedPreferences, Hive)
- Firebase Analytics (isimsiz kullanım istatistikleri)
- Performans izleme araçları

Bu teknolojilerin kullanımını engellemek isterseniz, uygulamayı kullanmayı bırakmanız gerekebilir.

## 11. POLİTİKA DEĞİŞİKLİKLERİ

Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler:
- Uygulama içi bildirim ile duyurulur
- "Son Güncellenme Tarihi" alanı güncellenir
- Değişiklikler yayınlandıktan sonra uygulamayı kullanmaya devam ederseniz, yeni politikayı kabul etmiş sayılırsınız

## 12. İLETİŞİM

Gizlilik politikamız veya kişisel verileriniz hakkında sorularınız için bizimle iletişime geçebilirsiniz:

**E-posta:** destek@kazandiransinav.com
**Adres:** Desteli Studio
**Veri Sorumlusu:** Desteli Studio

## 13. ULUSLARARASI VERİ AKTARIMı

Verileriniz, Firebase hizmetleri aracılığıyla Avrupa Birliği dışındaki sunucularda saklanabilir. Bu aktarımlar, uygun güvenlik önlemleri ve GDPR gerekliliklerine uygun olarak gerçekleştirilir.

## 14. ONAY

Uygulamayı kullanarak, bu gizlilik politikasında belirtilen şartları kabul etmiş olursunuz. Bu politikayı kabul etmiyorsanız, lütfen uygulamayı kullanmayın.

---

**Not:** Bu gizlilik politikası Türkiye Cumhuriyeti Kişisel Verilerin Korunması Kanunu (KVKK) ve Avrupa Birliği Genel Veri Koruma Yönetmeliği (GDPR) ile uyumlu olacak şekilde hazırlanmıştır.

© 2026 Desteli Studio. Tüm hakları saklıdır.

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
            href="/kazandiranmisyon/hesap-sil"
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
          DESTELISTUDIO - Kazandıran Misyon
        </motion.p>
      </div>
    </main>
  );
}
