import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Book, Code, Zap, Bot, ArrowRight, Search, FileText, Settings } from "lucide-react";
import { Button } from "@/components/ui/Button";

const categories = [
    { icon: Zap, title: "Getting Started", desc: "Build your first workflow in 5 minutes", articles: ["Quick start guide", "Core concepts", "Authentication", "API overview"] },
    { icon: Bot, title: "AI Agents", desc: "Deploy and configure intelligent agents", articles: ["Agent types", "Custom instructions", "Tone settings", "Knowledge base"] },
    { icon: Code, title: "API Reference", desc: "Complete REST API documentation", articles: ["Endpoints", "Authentication", "Rate limits", "Webhooks"] },
    { icon: Settings, title: "Integrations", desc: "Connect your favorite tools", articles: ["Slack setup", "Gmail OAuth", "HubSpot sync", "Custom webhooks"] },
];

const popularArticles = [
    "How to create a workflow",
    "Understanding triggers and actions",
    "Setting up AI agents",
    "Managing team permissions",
    "Using webhooks effectively",
    "Troubleshooting common issues",
];

export default function Documentation() {
    return (
        <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
            {/* Hero */}
            <section className="relative overflow-hidden border-b border-slate-200/60 bg-slate-50/50 py-20 dark:border-slate-800/60 dark:bg-slate-900/30">
                <div className="absolute inset-0 mesh-gradient opacity-50" />
                <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Book className="mx-auto h-12 w-12 text-violet-600 dark:text-violet-400" />
                        <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl">
                            <span className="text-gradient-violet">Documentation</span>
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                            Everything you need to build, deploy, and scale intelligent workflows with NexaFlow.
                        </p>
                        <div className="mx-auto mt-8 max-w-xl">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search documentation..."
                                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-base shadow-lg focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-6 md:grid-cols-2">
                        {categories.map((cat, i) => (
                            <motion.div
                                key={cat.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group rounded-3xl border border-slate-200/60 bg-white p-8 transition-all hover:shadow-xl dark:border-slate-800/60 dark:bg-slate-900"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg">
                                    <cat.icon className="h-6 w-6" />
                                </div>
                                <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">{cat.title}</h2>
                                <p className="mt-2 text-slate-600 dark:text-slate-400">{cat.desc}</p>
                                <ul className="mt-6 space-y-2">
                                    {cat.articles.map((a) => (
                                        <li key={a}>
                                            <a href="#" className="flex items-center gap-2 text-sm text-slate-700 transition-colors hover:text-violet-600 dark:text-slate-300 dark:hover:text-violet-400">
                                                <FileText className="h-4 w-4" /> {a}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular articles */}
            <section className="border-t border-slate-200/60 bg-slate-50/50 py-20 dark:border-slate-800/60 dark:bg-slate-900/30">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Popular articles</h2>
                    <div className="mt-8 grid gap-3 md:grid-cols-2">
                        {popularArticles.map((a) => (
                            <a
                                key={a}
                                href="#"
                                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-violet-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                            >
                                <span className="font-medium text-slate-900 dark:text-white">{a}</span>
                                <ArrowRight className="h-4 w-4 text-slate-400" />
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20">
                <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Can't find what you need?</h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-400">Our support team is here to help.</p>
                    <Button as={Link} to="/contact" size="lg" className="mt-6">
                        Contact support
                    </Button>
                </div>
            </section>
        </div>
    );
}