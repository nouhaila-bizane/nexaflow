import { forwardRef } from "react";
import type { ReactNode, ElementType } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type Size = "sm" | "md" | "lg";

type Props<C extends ElementType = "button"> = {
    as?: C;
    variant?: Variant;
    size?: Size;
    loading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
} & Omit<React.ComponentPropsWithoutRef<C>, "as" | "variant" | "size" | "loading" | "leftIcon" | "rightIcon">;

const variants: Record<Variant, string> = {
    primary: "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-soft",
    secondary: "bg-ink-900 text-white hover:bg-ink-800 dark:bg-white dark:text-ink-900 dark:hover:bg-ink-100",
    ghost: "text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800",
    outline: "border border-ink-200 bg-white text-ink-800 hover:bg-ink-50 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-100 dark:hover:bg-ink-800",
    danger: "bg-red-600 text-white hover:bg-red-700",
};

const sizes: Record<Size, string> = {
    sm: "h-8 px-3 text-sm rounded-lg gap-1.5",
    md: "h-10 px-4 text-sm rounded-xl gap-2",
    lg: "h-12 px-6 text-base rounded-xl gap-2.5",
};

export const Button = forwardRef(function Button<C extends ElementType = "button">(
    { as, variant = "primary", size = "md", loading, leftIcon, rightIcon, className, disabled, children, ...rest }: Props<C>,
    ref: React.Ref<any>
) {
    const Component = as || "button";

    return (
        <motion.span
            whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
            whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
            className="inline-flex"
        >
            <Component
                ref={ref}
                disabled={disabled || loading}
                className={cn(
                    "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...rest}
            >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : leftIcon}
                {children}
                {!loading && rightIcon}
            </Component>
        </motion.span>
    );
});