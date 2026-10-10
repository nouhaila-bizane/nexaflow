import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "rounded-2xl border border-ink-200 bg-white shadow-soft transition-shadow hover:shadow-card dark:border-ink-800 dark:bg-ink-900",
                className
            )}
            {...rest}
        />
    );
}

export function CardHeader({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("border-b border-ink-100 p-5 dark:border-ink-800", className)} {...rest} />;
}

export function CardBody({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("p-5", className)} {...rest} />;
}

export function CardFooter({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("border-t border-ink-100 p-5 dark:border-ink-800", className)} {...rest} />
    );
}