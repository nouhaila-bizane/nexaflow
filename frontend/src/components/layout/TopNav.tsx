import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Sun, Moon, Search, CheckCircle2, AlertCircle, Info, LogOut, Settings, User, Home } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { formatRelative } from "@/lib/utils";
import { Link } from "react-router-dom";

type Notification = {
    id: string;
    type: "success" | "error" | "info";
    title: string;
    message: string;
    time: string;
    read: boolean;
};

const demoNotifications: Notification[] = [
    {
        id: "1",
        type: "success",
        title: "Workflow completed",
        message: "Lead Qualification Pipeline ran successfully",
        time: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        read: false,
    },
    {
        id: "2",
        type: "info",
        title: "New integration available",
        message: "Connect your Slack workspace to enable notifications",
        time: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        read: false,
    },
    {
        id: "3",
        type: "error",
        title: "Workflow failed",
        message: "Support Ticket Triage encountered an error at step 2",
        time: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        read: true,
    },
    {
        id: "4",
        type: "success",
        title: "AI Agent deployed",
        message: "Customer Support Agent is now active",
        time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        read: true,
    },
];

export function TopNav({ onMenuClick }: { onMenuClick: () => void }) {
    const { theme, toggle } = useTheme();
    const { user, logout } = useAuth();
    const [notifOpen, setNotifOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>(demoNotifications);
    const notifRef = useRef<HTMLDivElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter((n) => !n.read).length;

    const initials = user?.name
        ? user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()
        : "U";

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
                setNotifOpen(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const markAsRead = (id: string) => {
        setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
    };

    const markAllRead = () => {
        setNotifications(notifications.map((n) => ({ ...n, read: true })));
    };

    const getIcon = (type: string) => {
        if (type === "success") return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
        if (type === "error") return <AlertCircle className="h-4 w-4 text-red-500" />;
        return <Info className="h-4 w-4 text-blue-500" />;
    };

    const handleLogout = () => {
        logout();
        setUserMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-ink-100 bg-white/80 px-4 backdrop-blur-xl dark:border-ink-800 dark:bg-ink-950/80 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuClick}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink-600 hover:bg-ink-100 lg:hidden dark:text-ink-300 dark:hover:bg-ink-800"
                    aria-label="Open menu"
                >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <div className="relative hidden max-w-md flex-1 sm:block">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                    <input
                        type="text"
                        placeholder="Search workflows, agents..."
                        className="h-10 w-full rounded-xl border border-ink-200 bg-ink-50/50 pl-10 pr-4 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-50 dark:placeholder:text-ink-500"
                    />
                    <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-ink-200 bg-white px-1.5 py-0.5 text-[10px] font-mono text-ink-500 dark:border-ink-700 dark:bg-ink-800">
                        K
                    </kbd>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {/* Theme toggle */}
                <button
                    onClick={toggle}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink-600 transition-colors hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
                    aria-label="Toggle theme"
                >
                    {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>

                {/* Notifications */}
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => setNotifOpen(!notifOpen)}
                        className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink-600 transition-colors hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
                        aria-label="Notifications"
                    >
                        <Bell className="h-4 w-4" />
                        {unreadCount > 0 && (
                            <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    <AnimatePresence>
                        {notifOpen && (
                            <>
                                {/* Overlay mobile pour fermer en cliquant à l'extérieur */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setNotifOpen(false)}
                                    className="fixed inset-0 z-30 lg:hidden"
                                />

                                {/* Dropdown notifications */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 z-40 mt-2 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-2xl dark:border-ink-800 dark:bg-ink-900 sm:right-2"
                                    style={{ maxHeight: "min(28rem, calc(100vh - 5rem))" }}
                                >
                                    <div className="flex items-center justify-between border-b border-ink-100 p-4 dark:border-ink-800">
                                        <h3 className="font-semibold text-ink-900 dark:text-ink-50">Notifications</h3>
                                        {unreadCount > 0 && (
                                            <button
                                                onClick={markAllRead}
                                                className="text-xs font-medium text-brand-600 hover:underline dark:text-brand-400"
                                            >
                                                Mark all as read
                                            </button>
                                        )}
                                    </div>
                                    <div className="overflow-y-auto" style={{ maxHeight: "calc(100% - 3.5rem)" }}>
                                        {notifications.length === 0 ? (
                                            <div className="p-8 text-center text-sm text-ink-500">No notifications yet</div>
                                        ) : (
                                            notifications.map((n) => (
                                                <button
                                                    key={n.id}
                                                    onClick={() => markAsRead(n.id)}
                                                    className={`flex w-full items-start gap-3 border-b border-ink-100 p-4 text-left transition-colors hover:bg-ink-50 dark:border-ink-800 dark:hover:bg-ink-800/50 ${!n.read ? "bg-brand-50/30 dark:bg-brand-500/5" : ""
                                                        }`}
                                                >
                                                    <div className="mt-0.5 shrink-0">{getIcon(n.type)}</div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`text-sm ${!n.read ? "font-semibold text-ink-900 dark:text-ink-50" : "text-ink-700 dark:text-ink-200"}`}>
                                                            {n.title}
                                                        </p>
                                                        <p className="mt-0.5 text-xs text-ink-500 line-clamp-2">{n.message}</p>
                                                        <p className="mt-1 text-[10px] text-ink-400">{formatRelative(n.time)}</p>
                                                    </div>
                                                    {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-500" />}
                                                </button>
                                            ))
                                        )}
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>

                {/* User menu */}
                <div className="relative" ref={userMenuRef}>
                    <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="flex items-center gap-2 rounded-full border border-ink-200 bg-white py-1 pl-1 pr-3 transition-colors hover:bg-ink-50 dark:border-ink-800 dark:bg-ink-900 dark:hover:bg-ink-800"
                    >
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-semibold text-white">
                            {initials}
                        </div>
                        <span className="hidden text-sm font-medium text-ink-900 dark:text-ink-50 sm:block">
                            {user?.name || "User"}
                        </span>
                    </button>

                    <AnimatePresence>
                        {userMenuOpen && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setUserMenuOpen(false)}
                                    className="fixed inset-0 z-30 lg:hidden"
                                />

                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 z-40 mt-2 w-56 overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-2xl dark:border-ink-800 dark:bg-ink-900"
                                >
                                    <div className="border-b border-ink-100 p-3 dark:border-ink-800">
                                        <p className="text-sm font-semibold text-ink-900 dark:text-ink-50">{user?.name}</p>
                                        <p className="text-xs text-ink-500">{user?.email}</p>
                                    </div>
                                    <div className="p-2">
                                        <Link
                                            to="/app/settings"
                                            onClick={() => setUserMenuOpen(false)}
                                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-700 transition-colors hover:bg-ink-50 dark:text-ink-200 dark:hover:bg-ink-800"
                                        >
                                            <User className="h-4 w-4" />
                                            Profile
                                        </Link>
                                        <Link
                                            to="/app/settings"
                                            onClick={() => setUserMenuOpen(false)}
                                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-700 transition-colors hover:bg-ink-50 dark:text-ink-200 dark:hover:bg-ink-800"
                                        >
                                            <Settings className="h-4 w-4" />
                                            Settings
                                        </Link>
                                        <Link
                                            to="/"
                                            onClick={() => setUserMenuOpen(false)}
                                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-700 transition-colors hover:bg-ink-50 dark:text-ink-200 dark:hover:bg-ink-800"
                                        >
                                            <Home className="h-4 w-4" />
                                            Back to home
                                        </Link>
                                    </div>
                                    <div className="border-t border-ink-100 p-2 dark:border-ink-800">
                                        <button
                                            onClick={handleLogout}
                                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Log out
                                        </button>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}