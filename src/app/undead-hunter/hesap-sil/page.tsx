"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function DeleteAccount() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    reason: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, app: "Undead Hunter" }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message);
        setFormData({ username: "", email: "", reason: "" });
      } else {
        setStatus("error");
        setMessage(data.error || "Bir hata oluştu.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Bağlantı hatası. Lütfen tekrar deneyin.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
            href="/undead-hunter"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Geri Dön
          </Link>
        </motion.div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-card p-8 md:p-12 rounded-2xl"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-6 animate-text-gradient inline-block">
            Hesap Silme Talebi
          </h1>

          <p className="text-gray-300 mb-8">
            <strong className="text-white">DESTELISTUDIO</strong> tarafından geliştirilen{" "}
            <strong className="text-white">Undead Hunter</strong> uygulaması için hesap silme talebi oluşturabilirsiniz.
          </p>

          {/* Information Section */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-300 mb-4">📋 Hesap Silme Süreci</h2>
            <ol className="text-gray-300 space-y-3 list-decimal list-inside">
              <li>Aşağıdaki formu doldurun ve gönder butonuna tıklayın</li>
              <li>Talebiniz en geç <strong className="text-white">30 gün</strong> içinde işleme alınacaktır</li>
              <li>Hesabınız ve ilgili tüm verileriniz kalıcı olarak silinecektir</li>
              <li>Silme işlemi tamamlandığında e-posta ile bilgilendirileceksiniz</li>
            </ol>
          </div>

          {/* Data Information */}
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-4">🗑️ Silinecek Veriler</h2>
            <ul className="text-gray-300 space-y-2 list-disc list-inside">
              <li><strong className="text-white">Kullanıcı Adı:</strong> Oyun içi kullanıcı adınız</li>
              <li><strong className="text-white">Liderlik Tablosu Verileri:</strong> Tüm skor ve sıralama kayıtlarınız</li>
              <li><strong className="text-white">Tercihler:</strong> Oyun ayarları ve tercihleriniz</li>
            </ul>

            <h3 className="text-lg font-semibold text-purple-300 mt-6 mb-3">📦 Saklanan Veriler</h3>
            <ul className="text-gray-300 space-y-2 list-disc list-inside">
              <li>
                <strong className="text-white">Anonim Analitik Veriler:</strong> Kişisel tanımlayıcı içermeyen
                teknik veriler (cihaz modeli, çökme raporları) en fazla{" "}
                <strong className="text-white">90 gün</strong> süreyle saklanabilir
              </li>
              <li>
                <strong className="text-white">Yasal Zorunluluklar:</strong> Yasal mevzuat gereği saklanması
                gereken veriler ilgili süre boyunca tutulabilir
              </li>
            </ul>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Kullanıcı Adı <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                placeholder="Oyundaki kullanıcı adınızı girin"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                E-posta Adresi <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                placeholder="ornek@email.com"
              />
              <p className="mt-2 text-sm text-gray-400">
                Bilgilendirme için geçerli bir e-posta adresi girin
              </p>
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-300 mb-2">
                Silme Sebebi (İsteğe Bağlı)
              </label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
                placeholder="Hesabınızı neden silmek istediğinizi belirtebilirsiniz (opsiyonel)"
              />
            </div>

            {/* Status Messages */}
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-500/20 border border-green-500/50 text-green-300 px-4 py-3 rounded-lg"
              >
                ✅ {message}
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg"
              >
                ❌ {message}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Gönderiliyor..." : "Hesap Silme Talebini Gönder"}
            </button>
          </form>

          {/* Contact Info */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <h3 className="text-lg font-semibold text-gray-300 mb-3">📞 İletişim</h3>
            <p className="text-gray-400 text-sm">
              Sorularınız için:{" "}
              <a href="mailto:fatihdesteli@gmail.com" className="text-purple-400 hover:text-purple-300 transition">
                fatihdesteli@gmail.com
              </a>
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Web: <span className="text-purple-400">destelistudio.com.tr</span>
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
          DESTELISTUDIO - Undead Hunter
        </motion.p>
      </div>
    </main>
  );
}
