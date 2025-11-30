"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function UndeadHunterPrivacy() {
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
            Undead Hunter - Gizlilik Politikası
          </h1>

          <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-6">
            {/* Buraya içerik gelecek */}
            <p className="text-gray-400 italic">
             # Privacy Policy

**Last Updated: November 30, 2024**

**Desteli Studio** ("we", "our", "us") is committed to protecting your privacy when you use our mobile game **UNDEAD HUNTER** ("Game", "Application"). This Privacy Policy explains what information we collect, how we use it, and how we protect it when you use our Game.

## 1. Information We Collect

### 1.1. User-Provided Information
- **Player Name**: The username you choose when first entering the game
- **Game Data**: Your scores, levels, and game progress
- **Power-up Inventory**: The number of power-ups you own

### 1.2. Automatically Collected Information
- **Device Information**: Device model, operating system version
- **Game Statistics**: Play duration, session count
- **Technical Data**: Application performance data, crash reports

### 1.3. Advertising and Analytics Information
Our Game displays advertisements through Google AdMob. AdMob may collect:
- Advertising ID
- IP Address
- Location Information (approximate location)
- Device and Network Information

## 2. How We Use Your Information

We use the collected information for the following purposes:
- To provide and improve your gaming experience
- To provide the leaderboard feature
- To save your in-game progress
- To display personalized advertisements
- To identify and fix technical issues
- To ensure the security of the game

## 3. Third-Party Services

Our Game uses the following third-party services:

### 3.1. Google Firebase
- **Purpose**: Storage of leaderboard data
- **Data Collected**: Player name, scores, game statistics
- **Privacy Policy**: https://firebase.google.com/support/privacy

### 3.2. Google AdMob
- **Purpose**: Advertisement display and revenue generation
- **Data Collected**: Advertising ID, usage data
- **Privacy Policy**: https://support.google.com/admob/answer/6128543

## 4. Data Storage and Security

### 4.1. Data Storage
- Game data is stored locally on your device (Local Storage)
- Leaderboard data is stored on Google Firebase servers
- Your data is retained as long as necessary

### 4.2. Security
We implement industry-standard measures to protect your data. However, please note that no method of transmission over the internet or electronic storage is 100% secure.

## 5. Children's Privacy

Our Game is not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are under 13, please do not use this Game or provide us with any information.

## 6. Personalized Advertising

Our Game may display personalized advertisements through Google AdMob. To opt-out of personalized advertising:

**Android**:
Settings → Google → Ads → Opt out of Ads Personalization

## 7. Your Rights

Under GDPR and applicable data protection laws, you have the following rights:
- Right to access your data
- Right to request correction of your data
- Right to request deletion of your data
- Right to object to data processing

To exercise these rights, please contact us.

## 8. Data Deletion

To delete your data:
- Uninstall the application from your device (local data will be deleted)
- Contact us to delete your leaderboard data

## 9. Changes to This Privacy Policy

We may update this Privacy Policy from time to time. Changes will be posted on this page and the "Last Updated" date will be revised. For significant changes, we may display a notification within the Game.

## 10. Contact Us

If you have any questions about this Privacy Policy, please contact us:

**Email**: [Add your email address here]
**Developer**: Desteli Studio
**Application**: UNDEAD HUNTER

---

By accepting this privacy policy, you consent to the collection and use of your information as described above.

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
