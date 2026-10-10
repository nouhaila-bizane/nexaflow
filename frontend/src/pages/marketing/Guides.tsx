import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Clock, ArrowRight, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";

const categories = ["All", "Getting Started", "Workflows", "AI Agents", "Integrations", "Advanced"];

const guides = [
    {
        title: "Build your first workflow in 10 minutes",
        excerpt: "Step-by-step tutorial to create an automated lead qualification pipeline from scratch.",
        category: "Getting Started",
        duration: "10 min",
        level: "Beginner",
        featured: true,
    },
    {
        title: "Understanding triggers and actions",
        excerpt: "Learn the core concepts of workflow automation: what triggers events and how actions respond.",
        category: "Getting Started",
        duration: "8 min",
        level: "Beginner",
    },
    {
        title: "Advanced AI agent configuration",
        excerpt: "Fine-tune your AI agents with custom instructions, tone settings, and knowledge bases.",
        category: "AI Agents",
        duration: "15 min",
        level: "Advanced",
    },
    {
        title: "Connecting Slack to your workflows",
        excerpt: "Complete guide to setting up Slack notifications and triggers in NexaFlow.",
        category: "Integrations",
        duration: "12 min",
        level: "Intermediate",
    },
    {
        title: "Building conditional logic branches",
        excerpt: "Use if/else logic to create smart workflows that adapt based on data.",
        category: "Workflows",
        duration: "14 min",
        level: "Intermediate",
    },
    {
        title: "Webhooks deep dive",
        excerpt: "How to send and receive webhooks for custom integrations with any API.",
        category: "Advanced",
        duration: "20 min",
        level: "Advanced",
    },
    {
        title: "Team permissions best practices",
        excerpt: "Set up roles and permissions to keep your workflows secure and organized.",
        category: "Advanced",
        duration: "10 min",
        level: "Intermediate",
    },
    {
        title: "Gmail automation patterns",
        excerpt: "Common Gmail automation recipes: auto-reply, label, forward, and archive.",
        category: "Integrations",
        duration: "11 min",
        level: "Beginner",
    },
    {
        title: "Scaling workflows for enterprise",
        excerpt: "Architecture patterns for running thousands of workflows reliably at scale.",
        category: "Advanced",
        duration: "25 min",
        level: "Advanced",
    },
];

export default function Guides() {
    return (
        <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
            {/* Hero */}
            <section className="relative overflow-hidden border-b border-slate-200/60 bg-slate-50/50 py-20 dark:border-slate-800/60 dark:bg-slate-900/30">
                <div className="absolute inset-0 mesh-gradient opacity-50" />
                <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Button as={Link} to="/" variant="ghost" size="sm" leftIcon={<ArrowLeft className="h-4 w-4" />} className="mb-6">
                            Back to home
                        </Button>
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg">
                                <BookOpen className="h-7 w-7" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                                    <span className="text-gradient-violet">Guides</span>
                                </h1>
                                <p className="mt-2 text-slate-600 dark:text-slate-400">Learn NexaFlow from beginner to expert</p>
                            </div>
                        </div>

                        <div className="mx-auto mt-8 max-w-xl">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search guides..."
                                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-base shadow-lg focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Categories filter */}
            <section className="border-b border-slate-200/60 py-6 dark:border-slate-800/60">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center gap-2">
                        <Filter className="h-4 w-4 text-slate-400" />
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${cat === "All"
                                        ? "bg-violet-600 text-white"
                                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured guide */}
            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {guides.filter((g) => g.featured).map((guide, i) => (
                        <motion.a
                            key={guide.title}
                            href="#"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group block rounded-3xl border border-slate-200/60 bg-gradient-to-br from-violet-50 to-indigo-50 p-8 transition-all hover:shadow-xl dark:border-slate-800/60 dark:from-violet-500/5 dark:to-indigo-500/5 md:p-12"
                        >
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-600 px-3 py-1 text-xs font-semibold text-white">
                                Featured
                            </span>
                            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">{guide.title}</h2>
                            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">{guide.excerpt}</p>
                            <div className="mt-6 flex items-center gap-4 text-sm text-slate-500">
                                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {guide.duration}</span>
                                <span>·</span>
                                <span>{guide.level}</span>
                                <span>·</span>
                                <span>{guide.category}</span>
                            </div>
                            <div className="mt-6 inline-flex items-center gap-2 font-semibold text-violet-600 dark:text-violet-400">
                                Start reading <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </div>
                        </motion.a>
                    ))}
                </div>
            </section>

            {/* All guides */}
            <section className="pb-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">All guides</h2>
                    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {guides.filter((g) => !g.featured).map((guide, i) => (
                            <motion.a
                                key={guide.title}
                                href="#"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="group block rounded-2xl border border-slate-200/60 bg-white p-6 transition-all hover:border-violet-500 hover:shadow-lg dark:border-slate-800/60 dark:bg-slate-900"
                            >
                                <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                    {guide.category}
                                </span>
                                <h3 className="mt-4 text-lg font-bold text-slate-900 transition-colors group-hover:text-violet-600 dark:text-white">
                                    {guide.title}
                                </h3>
                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{guide.excerpt}</p>
                                <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
                                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {guide.duration}</span>
                                    <span>·</span>
                                    <span>{guide.level}</span>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}