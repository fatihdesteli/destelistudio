# DESTELISTUDIO

Modern, animasyonlu landing page ve uygulama yönetim sistemi.

## 🚀 Özellikler

- ✨ Animasyonlu landing page (Framer Motion)
- 📱 Akıllı uygulama yönlendirme sistemi (iOS/Android)
- 🔗 Admin paneli ile link yönetimi
- 🗑️ Hesap silme sayfası (Google Play uyumlu)
- 📄 Gizlilik politikası sayfaları
- 🎨 Modern glassmorphism tasarım
- ☁️ Vercel KV Database entegrasyonu

## 🛠️ Teknolojiler

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Database:** Vercel KV (Redis)
- **Deployment:** Vercel
- **Language:** TypeScript

## 📦 Kurulum

### 1. Bağımlılıkları Yükle

```bash
npm install
```

### 2. Vercel KV Kurulumu

Detaylı talimatlar için [VERCEL-SETUP.md](VERCEL-SETUP.md) dosyasına bakın.

Kısaca:
1. Vercel Dashboard > Storage > Create Database > KV
2. `.env.local` dosyası oluştur ve KV değerlerini ekle
3. Dev server'ı başlat

### 3. Development Server'ı Başlat

```bash
npm run dev
```

Tarayıcıda aç: [http://localhost:3000](http://localhost:3000)

## 📄 Sayfalar

- `/` - Ana sayfa (Landing)
- `/admin/app-links` - Uygulama link yönetimi
- `/app/[slug]` - Akıllı yönlendirme (iOS/Android)
- `/memes-avcisi` - Memes Avcısı gizlilik politikası
- `/memes-avcisi/hesap-sil` - Hesap silme talebi
- `/privacy-policy` - Genel gizlilik politikası

## 🔗 Uygulama Yönlendirme Sistemi

### Nasıl Çalışır?

1. Admin panelden yeni uygulama ekle
2. URL: `destelistudio.com.tr/app/[uygulama-id]`
3. Kullanıcı tıkladığında:
   - iPhone/iPad → App Store
   - Android → Play Store
   - Desktop → Her iki store linkini göster

### Örnek Kullanım

```
URL: destelistudio.com.tr/app/sandalyekapmaca

iOS kullanıcı → App Store'a yönlendirilir
Android kullanıcı → Play Store'a yönlendirilir
```

## 🚀 Deployment

### Vercel'e Deploy

```bash
# Vercel CLI kurulu değilse
npm i -g vercel

# Deploy et
vercel --prod
```

### Environment Variables

Production'da otomatik eklenir:
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`

## 📁 Proje Yapısı

```
destelistudio/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Ana sayfa
│   │   ├── admin/app-links/           # Admin panel
│   │   ├── app/[slug]/                # Yönlendirme sayfası
│   │   ├── memes-avcisi/              # Gizlilik sayfaları
│   │   ├── api/
│   │   │   ├── app-links/             # Link yönetim API
│   │   │   └── delete-account/        # Hesap silme API
│   │   └── globals.css
├── public/
│   ├── app-ads.txt                    # AdMob doğrulama
│   └── google[...].html               # Search Console
├── data/                              # Fallback JSON storage
│   └── app-links.json
├── VERCEL-SETUP.md                    # KV kurulum talimatları
└── README.md
```

## 📝 Önemli Dosyalar

### `data/app-links.json`
Local development için fallback. KV yoksa buradan okur.

### `public/app-ads.txt`
Google AdMob doğrulama dosyası.

### `public/google[...].html`
Google Search Console doğrulama.

## 🔒 Güvenlik

- `data/` klasörü Git'e eklenmez (`.gitignore`)
- Kullanıcı talepleri JSON/KV'de saklanır
- Environment variables ile hassas veriler korunur

## 📞 İletişim

- Email: fatihdesteli@gmail.com
- Website: destelistudio.com.tr

## 📄 Lisans

Private - DESTELISTUDIO © 2025
