"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, DollarSign, Save, CheckCircle, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { CURRENCIES } from "@/lib/currency";

const currencies = Object.entries(CURRENCIES).map(([code, info]) => ({
    code,
    symbol: info.symbol,
    name: info.name,
}));

export function ProfileSettings() {
    const { user, setAuth, token } = useAuthStore();
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        currency: user?.currency || "USD",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        try {
            const res = await api.put("/auth/profile", formData);
            if (res.data.success) {
                setAuth(res.data.data, res.data.data.token || token || "");
                setMessage({ type: "success", text: "Profile updated successfully!" });
                setTimeout(() => setMessage(null), 3000);
            }
        } catch (err: any) {
            setMessage({
                type: "error",
                text: err.response?.data?.message || "Failed to update profile. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5"
        >
            <h2 className="text-lg font-semibold text-white mb-6">Profile Information</h2>

            {message && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className={cn(
                        "mb-4 p-3 rounded-lg flex items-center gap-2",
                        message.type === "success"
                            ? "bg-green-500/10 border border-green-500/20 text-green-400"
                            : "bg-red-500/10 border border-red-500/20 text-red-400"
                    )}
                >
                    {message.type === "success" ? (
                        <CheckCircle className="w-4 h-4" />
                    ) : (
                        <AlertCircle className="w-4 h-4" />
                    )}
                    <span className="text-sm">{message.text}</span>
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                        <User className="w-4 h-4" />
                        Full Name
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-zinc-900/50 border border-white/5 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="Enter your full name"
                        required
                    />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                        <Mail className="w-4 h-4" />
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-zinc-900/50 border border-white/5 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                {/* Currency Field */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                        <DollarSign className="w-4 h-4" />
                        Currency
                    </label>
                    <select
                        value={formData.currency}
                        onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                        className="w-full bg-zinc-900/50 border border-white/5 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                    >
                        {currencies.map((currency) => (
                            <option key={currency.code} value={currency.code} className="bg-zinc-900">
                                {currency.symbol} {currency.code} - {currency.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                    className={cn(
                        "w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-medium py-3 rounded-lg shadow-lg shadow-purple-900/20 transition-all duration-300",
                        isLoading && "opacity-80 cursor-wait"
                    )}
                >
                    {isLoading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4" />
                            Save Changes
                        </>
                    )}
                </motion.button>
            </form>
        </motion.div>
    );
}

