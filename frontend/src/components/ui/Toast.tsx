import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Toast = { id: number; type: "success" | "error"; message: string };
type Ctx = { toast: (t: Omit<Toast, "id">) => void };

const ToastCtx = createContext<Ctx | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const toast = useCallback((t: Omit<Toast, "id">) => {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { ...t, id }]);
        setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 3500);
    }, []);

    const dismiss = (id: number) => setToasts((p) => p.filter((x) => x.id !== id));

    return (
        <ToastCtx.Provider value={{ toast }}>
            {children}
            <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex w-full max-w-sm flex-col gap-2">
                <AnimatePresence>
                    {toasts.map((t) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 12, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            className={cn(
                                "pointer-events-auto flex items-start gap-3 rounded-xl border p-3 shadow-card",
                                t.type === "success"
                                    ? "border-emerald-200 bg-white text-emerald-900 dark:border-emerald-500/30 dark:bg-ink-900 dark:text-emerald-200"
                                    : "border-red-200 bg-white text-red-900 dark:border-red-500/30 dark:bg-ink-900 dark:text-red-200"
                            )}
                            role="status"
                        >
                            {t.type === "success" ? (
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                            ) : (
                                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                            )}
                            <p className="flex-1 text-sm">{t.message}</p>
                            <button
                                onClick={() => dismiss(t.id)}
                                className="rounded-md p-1 text-current opacity-60 hover:opacity-100"
                                aria-label="Dismiss"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastCtx.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastCtx);
    if (!ctx) throw new Error("useToast must be used within ToastProvider");
    return ctx;
}