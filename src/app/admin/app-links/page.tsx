"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

interface AppLink {
  id: string;
  name: string;
  appStoreUrl: string;
  playStoreUrl: string;
  active: boolean;
  createdAt: string;
}

export default function AppLinksAdmin() {
  const [apps, setApps] = useState<AppLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    appStoreUrl: "",
    playStoreUrl: "",
    active: true,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchApps = async () => {
    try {
      const response = await fetch("/api/app-links");
      const data = await response.json();
      setApps(data);
    } catch (error) {
      console.error("Error fetching apps:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/app-links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message);
        setFormData({
          id: "",
          name: "",
          appStoreUrl: "",
          playStoreUrl: "",
          active: true,
        });
        setEditingId(null);
        fetchApps();

        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 3000);
      } else {
        setStatus("error");
        setMessage(data.error || "Bir hata oluştu");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Bağlantı hatası");
    }
  };

  const handleEdit = (app: AppLink) => {
    setFormData({
      id: app.id,
      name: app.name,
      appStoreUrl: app.appStoreUrl,
      playStoreUrl: app.playStoreUrl,
      active: app.active,
    });
    setEditingId(app.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu uygulamayı silmek istediğinize emin misiniz?")) {
      return;
    }

    try {
      const response = await fetch(`/api/app-links?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchApps();
        setMessage("Uygulama silindi");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error deleting app:", error);
    }
  };

  const handleCancel = () => {
    setFormData({
      id: "",
      name: "",
      appStoreUrl: "",
      playStoreUrl: "",
      active: true,
    });
    setEditingId(null);
  };

  const copyToClipboard = (id: string) => {
    const url = `${window.location.origin}/app/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
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
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 py-12 max-w-6xl">
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

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-card p-8 md:p-12 rounded-2xl mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-6 animate-text-gradient inline-block">
            {editingId ? "Uygulamayı Düzenle" : "Yeni Uygulama Ekle"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="id" className="block text-sm font-medium text-gray-300 mb-2">
                  Uygulama ID (URL'de görünecek) <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  required
                  disabled={!!editingId}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="ornek: sandalyekapmaca"
                />
                <p className="mt-1 text-sm text-gray-400">
                  Küçük harf, rakam ve tire kullanın. Boşluk yok.
                </p>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Uygulama Adı <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="Sandalye Kapma Ca"
                />
              </div>
            </div>

            <div>
              <label htmlFor="appStoreUrl" className="block text-sm font-medium text-gray-300 mb-2">
                App Store URL <span className="text-red-400">*</span>
              </label>
              <input
                type="url"
                id="appStoreUrl"
                name="appStoreUrl"
                value={formData.appStoreUrl}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                placeholder="https://apps.apple.com/app/..."
              />
            </div>

            <div>
              <label htmlFor="playStoreUrl" className="block text-sm font-medium text-gray-300 mb-2">
                Play Store URL <span className="text-red-400">*</span>
              </label>
              <input
                type="url"
                id="playStoreUrl"
                name="playStoreUrl"
                value={formData.playStoreUrl}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                placeholder="https://play.google.com/store/apps/details?id=..."
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={formData.active}
                onChange={handleChange}
                className="w-5 h-5 rounded border-white/10 bg-white/5 text-purple-500 focus:ring-purple-500 focus:ring-2"
              />
              <label htmlFor="active" className="text-sm font-medium text-gray-300">
                Aktif (Yönlendirme çalışsın)
              </label>
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

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Kaydediliyor..." : editingId ? "Güncelle" : "Ekle"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all"
                >
                  İptal
                </button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Apps List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card p-8 md:p-12 rounded-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Kayıtlı Uygulamalar</h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
              <p className="text-gray-400 mt-4">Yükleniyor...</p>
            </div>
          ) : apps.length === 0 ? (
            <p className="text-gray-400 text-center py-12">Henüz uygulama eklenmemiş.</p>
          ) : (
            <div className="space-y-4">
              {apps.map((app) => (
                <div
                  key={app.id}
                  className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{app.name}</h3>
                        {!app.active && (
                          <span className="px-2 py-1 bg-red-500/20 border border-red-500/50 text-red-300 text-xs rounded">
                            Pasif
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <code className="text-sm text-purple-400 bg-purple-500/10 px-3 py-1 rounded">
                          /app/{app.id}
                        </code>
                        <button
                          onClick={() => copyToClipboard(app.id)}
                          className="text-gray-400 hover:text-white transition"
                          title="Linki Kopyala"
                        >
                          {copiedId === app.id ? (
                            <span className="text-green-400">✓</span>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                      <div className="space-y-1 text-sm">
                        <a
                          href={app.appStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition flex items-center gap-2"
                        >
                          🍎 App Store
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                        <a
                          href={app.playStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition flex items-center gap-2"
                        >
                          🤖 Play Store
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(app)}
                        className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-300 rounded-lg transition"
                      >
                        Düzenle
                      </button>
                      <button
                        onClick={() => handleDelete(app.id)}
                        className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 rounded-lg transition"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 text-sm mt-8"
        >
          DESTELISTUDIO - App Link Manager
        </motion.p>
      </div>
    </main>
  );
}
