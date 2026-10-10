import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
    return (
        <div
            className={cn("animate-pulse rounded-lg bg-ink-100 dark:bg-ink-800", className)}
            aria-hidden
        />
    );
}

export function StatSkeleton() {
    return (
        <div className="rounded-2xl border border-ink-200 bg-white p-5 dark:border-ink-800 dark:bg-ink-900">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="mt-3 h-7 w-20" />
            <Skeleton className="mt-3 h-2 w-32" />
        </div>
    );
}