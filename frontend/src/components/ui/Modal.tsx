import { useEffect } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: ReactNode;
    size?: "sm" | "md" | "lg";
};

const sizes = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl" };

export function Modal({ open, onClose, title, description, children, size = "md" }: Props) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [open, onClose]);

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm"
                        onClick={onClose}
                        aria-hidden
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: 8 }}
                        transition={{ duration: 0.18 }}
                        role="dialog"
                        aria-modal="true"
                        aria-label={title}
                        className={cn(
                            "relative z-10 w-full rounded-2xl border border-ink-200 bg-white shadow-card dark:border-ink-800 dark:bg-ink-900",
                            sizes[size]
                        )}
                    >
                        {(title || description) && (
                            <div className="border-b border-ink-100 p-5 dark:border-ink-800">
                                {title && <h2 className="text-lg font-semibold text-ink-900 dark:text-ink-50">{title}</h2>}
                                {description && (
                                    <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{description}</p>
                                )}
                            </div>
                        )}
                        <button
                            onClick={onClose}
                            aria-label="Close"
                            className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-100 hover:text-ink-800 dark:hover:bg-ink-800 dark:hover:text-ink-100"
                        >
                            <X className="h-4 w-4" />
                        </button>
                        <div className="p-5">{children}</div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}