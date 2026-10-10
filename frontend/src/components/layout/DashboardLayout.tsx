import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { useState, useEffect } from "react";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { Home } from "lucide-react";

export function DashboardLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [commandOpen, setCommandOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setCommandOpen((prev) => !prev);
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    return (
        <div className="min-h-screen bg-ink-50 text-ink-900 dark:bg-ink-950 dark:text-ink-50">
            <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
            <div className="lg:pl-64">
                <TopNav onMenuClick={() => setMobileOpen(true)} />
                <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    {/* Bouton Back to Home */}
                    <a
                        href="/"
                        className="mb-4 inline-flex items-center gap-2 rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-600 transition-colors hover:bg-ink-50 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-300 dark:hover:bg-ink-800"
                    >
                        <Home className="h-3.5 w-3.5" />
                        Back to home
                    </a>

                    <Outlet />
                </main>
            </div>
            <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
        </div>
    );
}