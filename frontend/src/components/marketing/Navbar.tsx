```tsx
import { Link, NavLink } from "react-router-dom";
import { Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

const links = [
    { to: "/features", label: "Features" },
    { to: "/solutions", label: "Solutions" },
    { to: "/pricing", label: "Pricing" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
];

export function MarketingNavbar() {
    const [open, setOpen] = useState(false);
    const { user } = useAuth();

    const appPath = user?.role === "superadmin" ? "/admin" : "/app";

    return (
        <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/80 backdrop-blur dark:border-ink-800 dark:bg-ink-950/80">
            <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
                <Link to="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                        <Sparkles className="h-4 w-4" />
                    </div>
                    <span className="text-base font-semibold tracking-tight">NexaFlow</span>
                </Link>

                <nav className="ml-6 hidden items-center gap-1 md:flex">
                    {links.map((l) => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            className={({ isActive }) =>
                                cn(
                                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "text-brand-700 dark:text-brand-300"
                                        : "text-ink-600 hover:text-ink-900 dark:text-ink-300 dark:hover:text-ink-50"
                                )
                            }
                        >
                            {l.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="ml-auto flex items-center gap-2">
                    {user ? (
                        <Button as={Link} to={appPath} size="sm">
                            Open app
                        </Button>
                    ) : (
                        <>
                            <Button as={Link} to="/login" variant="ghost" size="sm" className="hidden sm:inline-flex">
                                Log in
                            </Button>
                            <Button as={Link} to="/register" size="sm">
                                Start for free
                            </Button>
                        </>
                    )}

                    <button
                        onClick={() => setOpen((o) => !o)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink-700 hover:bg-ink-100 md:hidden dark:text-ink-200 dark:hover:bg-ink-800"
                        aria-label="Toggle menu"
                    >
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-ink-100 bg-white md:hidden dark:border-ink-800 dark:bg-ink-950"
                    >
                        <div className="space-y-1 px-4 py-3">
                            {links.map((l) => (
                                <NavLink
                                    key={l.to}
                                    to={l.to}
                                    onClick={() => setOpen(false)}
                                    className="block rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50 dark:text-ink-200 dark:hover:bg-ink-800"
                                >
                                    {l.label}
                                </NavLink>
                            ))}

                            <div className="my-2 h-px bg-ink-100 dark:bg-ink-800" />

                            {user ? (
                                <NavLink
                                    to={appPath}
                                    onClick={() => setOpen(false)}
                                    className="block rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50 dark:text-ink-200 dark:hover:bg-ink-800"
                                >
                                    Open app
                                </NavLink>
                            ) : (
                                <>
                                    <NavLink
                                        to="/login"
                                        onClick={() => setOpen(false)}
                                        className="block rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50 dark:text-ink-200 dark:hover:bg-ink-800"
                                    >
                                        Log in
                                    </NavLink>
                                    <NavLink
                                        to="/register"
                                        onClick={() => setOpen(false)}
                                        className="block rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50 dark:text-ink-200 dark:hover:bg-ink-800"
                                    >
                                        Start for free
                                    </NavLink>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
```
