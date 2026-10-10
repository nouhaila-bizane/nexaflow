import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
    icon?: ReactNode;
    title: string;
    description?: string;
    action?: ReactNode;
    className?: string;
};

export function EmptyState({ icon, title, description, action, className }: Props) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-200 bg-ink-50/50 px-6 py-16 text-center dark:border-ink-800 dark:bg-ink-900/40",
                className
            )}
        >
            {icon && <div className="mb-4 text-ink-400">{icon}</div>}
            <h3 className="text-base font-semibold text-ink-900 dark:text-ink-50">{title}</h3>
            {description && (
                <p className="mt-1.5 max-w-sm text-sm text-ink-500 dark:text-ink-400">{description}</p>
            )}
            {action && <div className="mt-5">{action}</div>}
        </div>
    );
}