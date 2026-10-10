import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const sections = [
    {
        title: "Product",
        links: [
            { to: "/features", label: "Features" },
            { to: "/pricing", label: "Pricing" },
            { to: "/solutions", label: "Solutions" },
            { to: "/changelog", label: "Changelog" },
        ],
    },
    {
        title: "Resources",
        links: [
            { to: "/documentation", label: "Documentation" },
            { to: "/guides", label: "Guides" },
            { to: "/api-reference", label: "API reference" },
            { to: "/blog", label: "Blog" },
        ],
    },
    {
        title: "Company",
        links: [
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
            { to: "/careers", label: "Careers" },
            { to: "/press", label: "Press" },
        ],
    },
    {
        title: "Legal",
        links: [
            { to: "/legal?page=Privacy Policy", label: "Privacy" },
            { to: "/legal?page=Terms of Service", label: "Terms" },
            { to: "/legal?page=Security", label: "Security" },
            { to: "/legal?page=Cookies", label: "Cookies" },
        ],
    },
];
export function MarketingFooter() {
    return (
        <footer className="border-t border-ink-100 bg-white dark:border-ink-800 dark:bg-ink-950">
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="grid gap-10 md:grid-cols-6">
                    <div className="md:col-span-2">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                                <Sparkles className="h-4 w-4" />
                            </div>
                            <span className="text-base font-semibold tracking-tight">NexaFlow</span>
                        </Link>
                        <p className="mt-3 max-w-sm text-sm text-ink-500 dark:text-ink-400">
                            Automate the work. Amplify what your team can do. Intelligent workflows for modern teams.
                        </p>
                        <div className="mt-5 flex gap-3 text-ink-500">
                            {["twitter", "linkedin", "github"].map((s) => (
                                <a
                                    key={s}
                                    href="#"
                                    aria-label={s}
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-ink-200 hover:bg-ink-50 dark:border-ink-800 dark:hover:bg-ink-800"
                                >
                                    <span className="text-xs uppercase">{s[0]}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                    {sections.map((s) => (
                        <div key={s.title}>
                            <h3 className="text-sm font-semibold text-ink-900 dark:text-ink-50">{s.title}</h3>
                            <ul className="mt-3 space-y-2">
                                {s.links.map((l) => (
                                    <li key={l.label}>
                                        <Link
                                            to={l.to}
                                            className="text-sm text-ink-500 hover:text-ink-900 dark:text-ink-400 dark:hover:text-ink-50"
                                        >
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-ink-100 pt-6 text-xs text-ink-500 dark:border-ink-800 dark:text-ink-400 sm:flex-row sm:items-center">
                    <p>© {new Date().getFullYear()} NexaFlow, Inc. All rights reserved.</p>
                    <p>Built for modern teams.</p>
                </div>
            </div>
        </footer>
    );
}