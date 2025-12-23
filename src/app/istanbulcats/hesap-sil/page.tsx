"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function ContactSupport() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    requestType: "feedback",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          reason: `[${formData.requestType.toUpperCase()}] ${formData.message}`,
          app: "Istanbul Cats",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setResponseMessage(
          formData.requestType === "deletion"
            ? "Your account deletion request has been received. It will be processed within 30 days."
            : "Thank you for your feedback! We appreciate your input."
        );
        setFormData({ username: "", email: "", requestType: "feedback", message: "" });
      } else {
        setStatus("error");
        setResponseMessage(data.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setResponseMessage("Connection error. Please try again later.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
          backgroundSize: "50px 50px",
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
            href="/istanbulcats"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Privacy Policy
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
            Contact & Support
          </h1>

          <p className="text-gray-300 mb-8">
            Welcome to <strong className="text-white">Istanbul Cats</strong> support page by{" "}
            <strong className="text-white">DESTELISTUDIO</strong>. You can submit feedback about the
            game or request account deletion using the form below.
          </p>

          {/* Options Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Feedback Card */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-green-300 mb-3">💬 Send Feedback</h2>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Share your thoughts about the game</li>
                <li>• Report bugs or issues</li>
                <li>• Suggest new features</li>
                <li>• Rate your experience</li>
              </ul>
            </div>

            {/* Deletion Card */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-red-300 mb-3">🗑️ Account Deletion</h2>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Request will be processed within 30 days</li>
                <li>• All your game data will be permanently deleted</li>
                <li>• Leaderboard entries will be removed</li>
                <li>• This action cannot be undone</li>
              </ul>
            </div>
          </div>

          {/* Data Deletion Info */}
          {formData.requestType === "deletion" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6 mb-8"
            >
              <h2 className="text-xl font-semibold text-purple-300 mb-4">📋 Data Deletion Details</h2>

              <h3 className="text-lg font-semibold text-purple-300 mb-3">Data to be Deleted:</h3>
              <ul className="text-gray-300 space-y-2 list-disc list-inside mb-4">
                <li>
                  <strong className="text-white">Player Name:</strong> Your in-game username
                </li>
                <li>
                  <strong className="text-white">Leaderboard Data:</strong> All scores and rankings
                </li>
                <li>
                  <strong className="text-white">Preferences:</strong> Game settings and configurations
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-purple-300 mb-3">Data Retention:</h3>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>
                  <strong className="text-white">Anonymous Analytics:</strong> Non-identifiable technical
                  data (device model, crash reports) may be retained for up to{" "}
                  <strong className="text-white">90 days</strong>
                </li>
                <li>
                  <strong className="text-white">Legal Requirements:</strong> Data required by law may be
                  retained for the legally mandated period
                </li>
              </ul>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Request Type */}
            <div>
              <label htmlFor="requestType" className="block text-sm font-medium text-gray-300 mb-2">
                Request Type <span className="text-red-400">*</span>
              </label>
              <select
                id="requestType"
                name="requestType"
                value={formData.requestType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              >
                <option value="feedback" className="bg-gray-800">
                  💬 Feedback / Suggestion
                </option>
                <option value="bug" className="bg-gray-800">
                  🐛 Bug Report
                </option>
                <option value="question" className="bg-gray-800">
                  ❓ Question
                </option>
                <option value="deletion" className="bg-gray-800">
                  🗑️ Account Deletion Request
                </option>
              </select>
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Player Name / Username <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                placeholder="Enter your in-game username"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                placeholder="your@email.com"
              />
              <p className="mt-2 text-sm text-gray-400">
                We&apos;ll use this email to respond to your request
              </p>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                {formData.requestType === "deletion" ? "Reason for Deletion (Optional)" : "Your Message"}{" "}
                {formData.requestType !== "deletion" && <span className="text-red-400">*</span>}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required={formData.requestType !== "deletion"}
                rows={5}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
                placeholder={
                  formData.requestType === "deletion"
                    ? "Tell us why you want to delete your account (optional)"
                    : formData.requestType === "bug"
                    ? "Please describe the bug in detail. Include steps to reproduce if possible."
                    : formData.requestType === "question"
                    ? "What would you like to know?"
                    : "Share your feedback, suggestions, or thoughts about the game..."
                }
              />
            </div>

            {/* Status Messages */}
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-500/20 border border-green-500/50 text-green-300 px-4 py-3 rounded-lg"
              >
                ✅ {responseMessage}
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg"
              >
                ❌ {responseMessage}
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "loading"}
              className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed ${
                formData.requestType === "deletion"
                  ? "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:from-gray-500 disabled:to-gray-600"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600"
              } text-white`}
            >
              {status === "loading"
                ? "Submitting..."
                : formData.requestType === "deletion"
                ? "Submit Deletion Request"
                : "Send Message"}
            </button>
          </form>

          {/* Contact Info */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <h3 className="text-lg font-semibold text-gray-300 mb-3">📧 Direct Contact</h3>
            <p className="text-gray-400 text-sm">
              You can also reach us directly at:{" "}
              <a
                href="mailto:fatihdesteli@gmail.com"
                className="text-purple-400 hover:text-purple-300 transition"
              >
                fatihdesteli@gmail.com
              </a>
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Developer: <span className="text-purple-400">Desteli Studio</span>
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Website:{" "}
              <a
                href="https://destelistudio.com.tr"
                className="text-purple-400 hover:text-purple-300 transition"
              >
                destelistudio.com.tr
              </a>
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
          DESTELISTUDIO - Istanbul Cats
        </motion.p>
      </div>
    </main>
  );
}
