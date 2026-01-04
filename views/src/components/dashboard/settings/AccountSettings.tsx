"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, LogOut, AlertTriangle, Calendar, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function AccountSettings() {
    const { user, logout } = useAuthStore();
    const router = useRouter();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    const handleDeleteAccount = () => {
        // TODO: Implement account deletion API call
        alert("Account deletion feature will be implemented soon.");
        setShowDeleteConfirm(false);
    };

    const accountCreatedDate = user ? new Date().toLocaleDateString() : "N/A";

    return (
        <div className="space-y-6">
            {/* Account Information */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5"
            >
                <h2 className="text-lg font-semibold text-white mb-6">Account Information</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/30 border border-white/5">
                        <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-zinc-500" />
                            <div>
                                <p className="text-xs text-zinc-500">Email</p>
                                <p className="text-sm text-white">{user?.email || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/30 border border-white/5">
                        <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-zinc-500" />
                            <div>
                                <p className="text-xs text-zinc-500">Member Since</p>
                                <p className="text-sm text-white">{accountCreatedDate}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Danger Zone */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-3xl bg-red-500/5 border border-red-500/20"
            >
                <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    Danger Zone
                </h2>
                <div className="space-y-4">
                    {/* Logout */}
                    <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/30 border border-white/5">
                        <div>
                            <p className="text-sm font-medium text-white">Sign Out</p>
                            <p className="text-xs text-zinc-500 mt-1">Sign out from your account</p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors border border-white/5"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </motion.button>
                    </div>

                    {/* Delete Account */}
                    <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/30 border border-red-500/20">
                        <div>
                            <p className="text-sm font-medium text-white">Delete Account</p>
                            <p className="text-xs text-zinc-500 mt-1">
                                Permanently delete your account and all associated data
                            </p>
                        </div>
                        {!showDeleteConfirm ? (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowDeleteConfirm(true)}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors border border-red-500/20"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete
                            </motion.button>
                        ) : (
                            <div className="flex items-center gap-2">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleDeleteAccount}
                                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                                >
                                    Confirm
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                                >
                                    Cancel
                                </motion.button>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}





