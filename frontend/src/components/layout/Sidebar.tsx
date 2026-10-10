import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Workflow,
    Bot,
    Plug,
    BarChart3,
    Users,
    Settings,
    Sparkles,
    X,
    Mail,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const items = [
    { to: "/app", label: "Overview", icon: LayoutDashboard, end: true },
    { to: "/app/workflows", label: "Workflows", icon: Workflow },
    { to: "/app/agents", label: "AI Agents", icon: Bot },
    { to: "/app/integrations", label: "Integrations", icon: Plug },
    { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/app/inbox", label: "Inbox", icon: Mail },
    { to: "/app/team", label: "Team", icon: Users },
    { to: "/app/settings", label: "Settings", icon: Settings },
];

type Props = { mobileOpen: boolean; onClose: () => void };

export function Sidebar({ mobileOpen, onClose }: Props) {
    const location = useLocation();
    const navigate = useNavigate();

    // Fermer automatiquement le menu quand la route change
    useEffect(() => {
        if (mobileOpen) {
            onClose();
        }
    }, [location.pathname]);

    const handleNavClick = (path: string) => {
        navigate(path);
        onClose();
    };

    const content = (
        <aside className="relative flex h-full w-72 flex-col border-r border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
            <div className="flex h-16 items-center justify-between gap-2 border-b border-ink-100 px-5 dark:border-ink-800">
                <div className="flex items-center gap-2">
                    <motion.div
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white"
                    >
                        <Sparkles className="h-4 w-4" />
                    </motion.div>
                    <span className="text-base font-semibold tracking-tight">NexaFlow</span>
                </div>
                <button
                    onClick={onClose}
                    aria-label="Close menu"
                    className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800 lg:hidden"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
                {items.map((item) => (
                    <button
                        key={item.to}
                        onClick={() => handleNavClick(item.to)}
                        className={cn(
                            "group relative flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all",
                            location.pathname === item.to || (item.end && location.pathname === "/app")
                                ? "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"
                                : "text-ink-600 hover:bg-ink-50 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-ink-50"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="border-t border-ink-100 p-4 dark:border-ink-800">
                <motion.div
                    whileHover={{ y: -2 }}
                    className="cursor-pointer rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 p-4 dark:from-brand-500/10 dark:to-brand-500/5"
                >
                    <p className="text-xs font-semibold text-brand-800 dark:text-brand-200">Upgrade to Growth</p>
                    <p className="mt-1 text-xs text-brand-700/80 dark:text-brand-300/80">
                        Unlock unlimited workflows and AI agents.
                    </p>
                    <button
                        onClick={() => handleNavClick("/pricing")}
                        className="mt-3 inline-flex text-xs font-semibold text-brand-700 underline-offset-2 hover:underline dark:text-brand-300"
                    >
                        See plans →
                    </button>
                </motion.div>
            </div>
        </aside>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="fixed inset-y-0 left-0 z-30 hidden lg:block">{content}</div>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 z-40 bg-ink-950/60 backdrop-blur-sm lg:hidden"
                        />
                        <motion.div
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 z-50 lg:hidden"
                        >
                            {content}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}