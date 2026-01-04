"use client";

import { useState, useEffect } from "react";
import { Settings, User, Lock, Shield, Loader2 } from "lucide-react";
import { ProfileSettings } from "@/components/dashboard/settings/ProfileSettings";
import { SecuritySettings } from "@/components/dashboard/settings/SecuritySettings";
import { AccountSettings } from "@/components/dashboard/settings/AccountSettings";
import { api } from "@/lib/api";
import { useAuthStore } from "@/lib/store";

export default function SettingsPage() {
    const { user, setAuth } = useAuthStore();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"profile" | "security" | "account">("profile");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get("/auth/profile");
                if (res.data.success) {
                    setAuth(res.data.data, useAuthStore.getState().token || "");
                }
            } catch (err) {
                console.error("Failed to fetch profile", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [setAuth]);

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center p-20">
                <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            </div>
        );
    }

    const tabs = [
        { id: "profile" as const, label: "Profile", icon: User },
        { id: "security" as const, label: "Security", icon: Lock },
        { id: "account" as const, label: "Account", icon: Shield },
    ];

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <Settings className="w-6 h-6 text-purple-400" />
                    <h1 className="text-2xl font-bold text-white">Settings</h1>
                </div>
                <p className="text-zinc-500 text-sm">Manage your account settings and preferences</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-white/5 pb-2">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
                                ${
                                    isActive
                                        ? "bg-purple-500/10 text-purple-400 border-b-2 border-purple-500"
                                        : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                                }
                            `}
                        >
                            <Icon className="w-4 h-4" />
                            <span className="font-medium">{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Content */}
            <div className="mt-6">
                {activeTab === "profile" && <ProfileSettings />}
                {activeTab === "security" && <SecuritySettings />}
                {activeTab === "account" && <AccountSettings />}
            </div>
        </div>
    );
}





