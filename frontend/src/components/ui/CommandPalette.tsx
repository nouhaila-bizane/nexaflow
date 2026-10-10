import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Workflow, Bot, BarChart3, Settings, LogOut, Moon, Sun, X } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

type Command = {
    id: string;
    label: string;
    icon: React.ElementType;
    action: () => void;
    category?: string;
};

type Props = {
    open: boolean;
    onClose: () => void;
};

export function CommandPalette({ open, onClose }: Props) {
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();
    const { theme, toggle } = useTheme();
    const { logout } = useAuth();

    // Liste des commandes disponibles
    const commands: Command[] = useMemo(
        () => [
            { id: "1", label: "Aller aux Workflows", icon: Workflow, action: () => navigate("/app/workflows"), category: "Navigation" },
            { id: "2", label: "Voir les AI Agents", icon: Bot, action: () => navigate("/app/agents"), category: "Navigation" },
            { id: "3", label: "Ouvrir les Analytics", icon: BarChart3, action: () => navigate("/app/analytics"), category: "Navigation" },
            { id: "4", label: "Paramètres du compte", icon: Settings, action: () => navigate("/app/settings"), category: "Navigation" },
            { id: "5", label: theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre", icon: theme === "dark" ? Sun : Moon, action: toggle, category: "Préférences" },
            { id: "6", label: "Se déconnecter", icon: LogOut, action: () => { logout(); navigate("/login"); }, category: "Compte" },
        ],
        [navigate, theme, toggle, logout]
    );

    // Filtrer les commandes selon la recherche
    const filtered = useMemo(
        () =>
            commands.filter((c) =>
                c.label.toLowerCase().includes(query.toLowerCase())
            ),
        [query, commands]
    );

    // Reset de la sélection quand la recherche change
    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    // Gestion du clavier
    useEffect(() => {
        if (!open) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((i) => (i + 1) % filtered.length);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((i) => (i - 1 + filtered.length) % filtered.length);
            } else if (e.key === "Enter") {
                e.preventDefault();
                filtered[selectedIndex]?.action();
                onClose();
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [open, filtered, selectedIndex, onClose]);

    // Reset à la fermeture
    useEffect(() => {
        if (!open) {
            setQuery("");
            setSelectedIndex(0);
        }
    }, [open]);

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
                    {/* Fond sombre */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm"
                    />

                    {/* Boîte de commande */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-2xl dark:border-ink-800 dark:bg-ink-900"
                    >
                        {/* Barre de recherche */}
                        <div className="flex items-center border-b border-ink-100 px-4 dark:border-ink-800">
                            <Search className="h-5 w-5 text-ink-400" />
                            <input
                                autoFocus
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Tapez une commande ou recherchez..."
                                className="h-14 flex-1 bg-transparent px-3 text-base text-ink-900 placeholder:text-ink-400 focus:outline-none dark:text-ink-50"
                            />
                            <button onClick={onClose} className="rounded-md p-1 text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800">
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Liste des résultats */}
                        <div className="max-h-[300px] overflow-y-auto p-2">
                            {filtered.length === 0 ? (
                                <div className="py-8 text-center text-sm text-ink-500">Aucun résultat trouvé.</div>
                            ) : (
                                filtered.map((cmd, idx) => (
                                    <button
                                        key={cmd.id}
                                        onClick={() => {
                                            cmd.action();
                                            onClose();
                                        }}
                                        onMouseEnter={() => setSelectedIndex(idx)}
                                        className={cn(
                                            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                                            idx === selectedIndex
                                                ? "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"
                                                : "text-ink-700 hover:bg-ink-50 dark:text-ink-200 dark:hover:bg-ink-800"
                                        )}
                                    >
                                        <cmd.icon className={cn("h-4 w-4", idx === selectedIndex ? "text-brand-600 dark:text-brand-400" : "text-ink-400")} />
                                        <span className="flex-1 font-medium">{cmd.label}</span>
                                        {cmd.category && (
                                            <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">
                                                {cmd.category}
                                            </span>
                                        )}
                                    </button>
                                ))
                            )}
                        </div>

                        {/* Footer avec raccourcis */}
                        <div className="flex items-center justify-between border-t border-ink-100 bg-ink-50/50 px-4 py-2 text-xs text-ink-500 dark:border-ink-800 dark:bg-ink-950/50">
                            <div className="flex gap-3">
                                <span className="flex items-center gap-1"><kbd className="rounded bg-white px-1.5 py-0.5 font-mono text-[10px] shadow-sm dark:bg-ink-800">↑↓</kbd> Naviguer</span>
                                <span className="flex items-center gap-1"><kbd className="rounded bg-white px-1.5 py-0.5 font-mono text-[10px] shadow-sm dark:bg-ink-800">↵</kbd> Sélectionner</span>
                            </div>
                            <span className="flex items-center gap-1"><kbd className="rounded bg-white px-1.5 py-0.5 font-mono text-[10px] shadow-sm dark:bg-ink-800">esc</kbd> Fermer</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}