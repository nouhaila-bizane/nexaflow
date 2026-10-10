import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Zap, Bot, Shield, Code, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";

const releases = [
    {
        version: "2.4.0",
        date: "Oct 10, 2026",
        tag: "Major",
        tagColor: "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300",
        title: "AI Agents 2.0",
        summary: "Introducing multi-step AI agents with memory and custom tools.",
        changes: [
            { type: "feature", text: "Multi-step AI agents with persistent memory" },
            { type: "feature", text: "Custom tool integration for agents" },
            { type: "improvement", text: "3x faster agent response times" },
            { type: "fix", text: "Fixed webhook retry logic for timeouts" },
        ],
    },
    {
        version: "2.3.0",
        date: "Sep 28, 2026",
        tag: "Feature",
        tagColor: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300",
        title: "Advanced Analytics Dashboard",
        summary: "New charts, filters, and export options for workflow analytics.",
        changes: [
            { type: "feature", text: "Custom date range filters" },
            { type: "feature", text: "CSV and PDF export for reports" },
            { type: "improvement", text: "Redesigned bar charts with animations" },
        ],
    },
    {
        version: "2.2.0",
        date: "Sep 15, 2026",
        tag: "Feature",
        tagColor: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300",
        title: "Team Collaboration v2",
        summary: "Real-time collaboration, comments, and shared libraries.",
        changes: [
            { type: "feature", text: "Real-time co-editing on workflows" },
            { type: "feature", text: "Inline comments on workflow steps" },
            { type: "improvement", text: "Improved permission system" },
        ],
    },
    {
        version: "2.1.0",
        date: "Sep 1, 2026",
        tag: "Improvement",
        tagColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
        title: "Performance & Security",
        summary: "Faster load times and SOC 2 Type II certification.",
        changes: [
            { type: "improvement", text: "40% faster dashboard load times" },
            { type: "feature", text: "SOC 2 Type II certification achieved" },
            { type: "fix", text: "Fixed edge case in OAuth token refresh" },
        ],
    },
    {
        version: "2.0.0",
        date: "Aug 15, 2026",
        tag: "Major",
        tagColor: "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300",
        title: "The NexaFlow Rebuild",
        summary: "Complete platform redesign with new visual builder.",
        changes: [
            { type: "feature", text: "Brand new visual workflow builder" },
            { type: "feature", text: "Dark mode support" },
            { type: "feature", text: "100+ new integrations" },
            { type: "breaking", text: "Deprecated v1 API endpoints" },
        ],
    },
];

const typeConfig: Record<string, { icon: any; color: string; label: string }> = {
    feature: { icon: Sparkles, color: "text-violet-600 dark:text-violet-400", label: "New" },
    improvement: { icon: Zap, color: "text-blue-600 dark:text-blue-400", label: "Improved" },
    fix: { icon: Code, color: "text-emerald-600 dark:text-emerald-400", label: "Fixed" },
    breaking: { icon: Shield, color: "text-red-600 dark:text-red-400", label: "Breaking" },
};

export default function Changelog() {
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
                                <Zap className="h-7 w-7" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                                    <span className="text-gradient-violet">Changelog</span>
                                </h1>
                                <p className="mt-2 text-slate-600 dark:text-slate-400">What's new in NexaFlow</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-20">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="relative">
                        {/* Ligne verticale */}
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500 via-indigo-500 to-transparent md:left-8" />

                        <div className="space-y-12">
                            {releases.map((release, i) => (
                                <motion.div
                                    key={release.version}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="relative pl-16 md:pl-20"
                                >
                                    {/* Point sur la timeline */}
                                    <div className="absolute left-4 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white ring-4 ring-violet-100 dark:bg-slate-950 dark:ring-violet-500/20 md:left-6">
                                        <div className="h-2 w-2 rounded-full bg-violet-500" />
                                    </div>

                                    <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-slate-800/60 dark:bg-slate-900 md:p-8">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-sm font-semibold text-slate-900 dark:bg-slate-800 dark:text-white">
                                                v{release.version}
                                            </span>
                                            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${release.tagColor}`}>
                                                {release.tag}
                                            </span>
                                            <span className="flex items-center gap-1 text-xs text-slate-500">
                                                <Calendar className="h-3 w-3" /> {release.date}
                                            </span>
                                        </div>

                                        <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">{release.title}</h2>
                                        <p className="mt-2 text-slate-600 dark:text-slate-400">{release.summary}</p>

                                        <ul className="mt-6 space-y-2.5">
                                            {release.changes.map((change, j) => {
                                                const config = typeConfig[change.type];
                                                const Icon = config.icon;
                                                return (
                                                    <li key={j} className="flex items-start gap-3">
                                                        <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${config.color}`} />
                                                        <span className="text-sm text-slate-700 dark:text-slate-300">
                                                            <span className={`font-medium ${config.color}`}>{config.label}:</span> {change.text}
                                                        </span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Subscribe */}
            <section className="border-t border-slate-200/60 bg-slate-50/50 py-20 dark:border-slate-800/60 dark:bg-slate-900/30">
                <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Stay updated</h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-400">Get notified when we ship new features.</p>
                    <div className="mx-auto mt-6 flex max-w-md gap-2">
                        <input
                            type="email"
                            placeholder="you@company.com"
                            className="h-11 flex-1 rounded-xl border border-slate-200 bg-white px-4 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                        />
                        <Button>Subscribe</Button>
                    </div>
                </div>
            </section>
        </div>
    );
}