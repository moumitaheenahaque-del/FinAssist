"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Save, CheckCircle, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

export function SecuritySettings() {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        // Validation
        if (formData.newPassword.length < 6) {
            setMessage({ type: "error", text: "Password must be at least 6 characters long." });
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setMessage({ type: "error", text: "New passwords do not match." });
            return;
        }

        setIsLoading(true);

        try {
            const res = await api.put("/auth/profile", {
                password: formData.newPassword,
                currentPassword: formData.currentPassword,
            });

            if (res.data.success) {
                setMessage({ type: "success", text: "Password updated successfully!" });
                setFormData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
                setTimeout(() => setMessage(null), 3000);
            }
        } catch (err: any) {
            setMessage({
                type: "error",
                text: err.response?.data?.message || "Failed to update password. Please try again.",
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
            <h2 className="text-lg font-semibold text-white mb-6">Change Password</h2>

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
                {/* Current Password */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                        <Lock className="w-4 h-4" />
                        Current Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPasswords.current ? "text" : "password"}
                            value={formData.currentPassword}
                            onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                            className="w-full bg-zinc-900/50 border border-white/5 rounded-lg px-4 py-3 pr-10 text-white placeholder:text-zinc-600 focus:border-purple-500 focus:outline-none transition-colors"
                            placeholder="Enter current password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                            {showPasswords.current ? (
                                <EyeOff className="w-4 h-4" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>

                {/* New Password */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                        <Lock className="w-4 h-4" />
                        New Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPasswords.new ? "text" : "password"}
                            value={formData.newPassword}
                            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                            className="w-full bg-zinc-900/50 border border-white/5 rounded-lg px-4 py-3 pr-10 text-white placeholder:text-zinc-600 focus:border-purple-500 focus:outline-none transition-colors"
                            placeholder="Enter new password (min. 6 characters)"
                            required
                            minLength={6}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                            {showPasswords.new ? (
                                <EyeOff className="w-4 h-4" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                        <Lock className="w-4 h-4" />
                        Confirm New Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPasswords.confirm ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            className="w-full bg-zinc-900/50 border border-white/5 rounded-lg px-4 py-3 pr-10 text-white placeholder:text-zinc-600 focus:border-purple-500 focus:outline-none transition-colors"
                            placeholder="Confirm new password"
                            required
                            minLength={6}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                            {showPasswords.confirm ? (
                                <EyeOff className="w-4 h-4" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Password Requirements */}
                <div className="p-4 rounded-lg bg-zinc-900/30 border border-white/5">
                    <p className="text-xs text-zinc-500 mb-2">Password requirements:</p>
                    <ul className="text-xs text-zinc-600 space-y-1">
                        <li>• At least 6 characters long</li>
                        <li>• Use a combination of letters, numbers, and symbols for better security</li>
                    </ul>
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
                            Updating...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4" />
                            Update Password
                        </>
                    )}
                </motion.button>
            </form>
        </motion.div>
    );
}

