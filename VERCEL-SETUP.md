# Vercel KV Database Kurulumu

Bu proje Vercel KV Database kullanıyor. Kurulum için aşağıdaki adımları takip et:

## 🚀 Vercel Dashboard'da KV Kurulumu

### 1. Vercel Dashboard'a Git
- [vercel.com/dashboard](https://vercel.com/dashboard) adresine git
- Projenizi seçin (destelistudio)

### 2. Storage Oluştur
- Sol menüden **Storage** sekmesine tıkla
- **Create Database** butonuna tıkla
- **KV** seçeneğini seç
- Database adı: `destelistudio-kv` (veya istediğin bir isim)
- Region: **Frankfurt** (Avrupa için en yakın)
- **Create** butonuna tıkla

### 3. Environment Variables Ayarla
KV oluştuktan sonra otomatik olarak:
- `.env.local` tab'ı açılacak
- `KV_REST_API_URL` ve `KV_REST_API_TOKEN` değerleri gösterilecek

**Production için:** Bu değerler otomatik olarak projeye eklenir, bir şey yapman gerekmez.

**Local Development için:**
1. Gösterilen değerleri kopyala
2. Proje klasöründe `.env.local` dosyası oluştur:

```bash
# .env.local
KV_REST_API_URL="https://your-kv-url.vercel-storage.com"
KV_REST_API_TOKEN="your-token-here"
```

3. Dev server'ı yeniden başlat: `npm run dev`

### 4. İlk Verileri Yükle (Opsiyonel)

Eğer `data/app-links.json` dosyanda mevcut veriler varsa, bunları KV'ye aktarmak için:

1. Admin paneline git: `http://localhost:3000/admin/app-links`
2. JSON dosyasındaki her uygulamayı manuel olarak ekle
3. Veriler otomatik olarak KV'ye kaydedilecek

## 📝 Nasıl Çalışır?

- **KV Varsa (Production veya Local'de kuruluysa):** Vercel KV kullanır
- **KV Yoksa (Local development, KV kurulmamışsa):** `data/app-links.json` dosyasını kullanır (fallback)

Bu sayede:
- Local'de test ederken KV olmadan da çalışır
- Production'da KV otomatik kullanılır
- Vercel'in read-only dosya sistemi sorunu çözülür

## ✅ Kurulum Tamamlandı mı Kontrol Et

1. Vercel'e deploy et: `vercel --prod`
2. Admin paneline git: `https://destelistudio.vercel.app/admin/app-links`
3. Yeni uygulama ekle
4. "✅ Uygulama eklendi" mesajı görmelisin

## 🆘 Sorun mu Yaşıyorsun?

- **Local'de çalışmıyor:** `.env.local` dosyasını kontrol et
- **Production'da çalışmıyor:** Vercel Dashboard > Settings > Environment Variables'dan KV değerlerini kontrol et
- **Veriler kayboldu:** KV database'de `app-links` key'ini kontrol et

## 💰 Fiyatlandırma

Vercel KV ücretsiz plan:
- 256 MB depolama
- 30,000 komut/ay
- Sınırsız database sayısı

Bizim kullanımımız için **tamamen ücretsiz** yeterli!
