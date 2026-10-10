import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                404
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl dark:text-ink-50">
                Page not found
            </h1>
            <p className="mt-3 max-w-md text-ink-600 dark:text-ink-300">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Button as={Link} to="/" leftIcon={<Home className="h-4 w-4" />} className="mt-6">
                Back to home
            </Button>
        </div>
    );
}