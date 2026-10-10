import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
    hint?: string;
};

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
    { label, error, hint, className, id, ...rest },
    ref
) {
    const inputId = id || rest.name;
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">
                    {label}
                </label>
            )}
            <input
                ref={ref}
                id={inputId}
                className={cn(
                    "h-10 w-full rounded-xl border bg-white px-3.5 text-sm text-ink-900 placeholder:text-ink-400 transition-colors",
                    "border-ink-200 hover:border-ink-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-100",
                    "dark:border-ink-700 dark:bg-ink-900 dark:text-ink-50 dark:placeholder:text-ink-500",
                    error && "border-red-500 focus:border-red-500 focus:ring-red-100",
                    className
                )}
                aria-invalid={!!error}
                aria-describedby={error ? `${inputId}-error` : undefined}
                {...rest}
            />
            {error && (
                <p id={`${inputId}-error`} className="mt-1.5 text-xs text-red-600" role="alert">
                    {error}
                </p>
            )}
            {hint && !error && <p className="mt-1.5 text-xs text-ink-500">{hint}</p>}
        </div>
    );
});