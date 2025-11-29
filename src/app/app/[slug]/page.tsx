"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface AppLink {
  id: string;
  name: string;
  appStoreUrl: string;
  playStoreUrl: string;
  active: boolean;
}

export default function AppRedirect() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [appData, setAppData] = useState<AppLink | null>(null);
  const [platform, setPlatform] = useState<"ios" | "android" | "desktop" | null>(null);
  const [redirecting, setRedirecting] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // Detect platform
    const userAgent = navigator.userAgent.toLowerCase();

    if (/iphone|ipad|ipod/.test(userAgent)) {
      setPlatform("ios");
    } else if (/android/.test(userAgent)) {
      setPlatform("android");
    } else {
      setPlatform("desktop");
    }

    // Fetch app data
    fetch("/api/app-links")
      .then((res) => res.json())
      .then((apps: AppLink[]) => {
        const app = apps.find((a) => a.id === slug && a.active);

        if (app) {
          setAppData(app);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => {
        setNotFound(true);
      });
  }, [slug]);

  useEffect(() => {
    if (appData && platform && platform !== "desktop") {
      setRedirecting(true);

      const redirectUrl = platform === "ios" ? appData.appStoreUrl : appData.playStoreUrl;

      // Redirect after 1 second
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1000);
    }
  }, [appData, platform]);

  if (notFound) {
    return (
      <main className="relative min-h-screen w-full flex items-center justify-center bg-[#0f172a]">
        <div className="fixed inset-0 animate-aurora opacity-40" />

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-12 rounded-2xl max-w-md mx-auto"
          >
            <div className="text-6xl mb-6">❌</div>
            <h1 className="text-2xl font-bold text-white mb-4">Uygulama Bulunamadı</h1>
            <p className="text-gray-400 mb-8">
              Bu link geçersiz veya uygulama artık mevcut değil.
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-lg transition-all"
            >
              Ana Sayfaya Dön
            </button>
          </motion.div>
        </div>
      </main>
    );
  }

  if (!appData || !platform) {
    return (
      <main className="relative min-h-screen w-full flex items-center justify-center bg-[#0f172a]">
        <div className="fixed inset-0 animate-aurora opacity-40" />
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Yükleniyor...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center bg-[#0f172a]">
      <div className="fixed inset-0 animate-aurora opacity-40" />

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 rounded-2xl"
        >
          {redirecting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="text-6xl mb-6"
              >
                📱
              </motion.div>
              <h1 className="text-3xl font-bold text-white mb-4">
                Yönlendiriliyorsunuz...
              </h1>
              <p className="text-gray-400 mb-2">
                {appData.name}
              </p>
              <p className="text-sm text-gray-500">
                {platform === "ios" ? "App Store" : "Play Store"} açılıyor
              </p>
              <div className="mt-8">
                <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-6xl mb-6">💻</div>
              <h1 className="text-3xl font-bold text-white mb-4">
                {appData.name}
              </h1>
              <p className="text-gray-400 mb-8">
                Bu uygulama mobil cihazlarda indirilir. Lütfen telefonunuzdan bu linke tıklayın.
              </p>
              <div className="space-y-4">
                <a
                  href={appData.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-black hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition-all"
                >
                  🍎 App Store
                </a>
                <a
                  href={appData.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
                >
                  🤖 Google Play
                </a>
              </div>
            </>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-500 text-sm mt-8"
        >
          DESTELISTUDIO
        </motion.p>
      </div>
    </main>
  );
}
