import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Mail, FileText, Image, Newspaper, Quote } from "lucide-react";
import { Button } from "@/components/ui/Button";

const pressReleases = [
    {
        date: "Oct 10, 2026",
        title: "NexaFlow raises $24M Series A to expand AI automation platform",
        excerpt: "Led by Sequoia Capital, the round will fund international expansion and AI research.",
    },
    {
        date: "Aug 15, 2026",
        title: "NexaFlow launches visual workflow builder 2.0",
        excerpt: "The complete platform rebuild brings drag-and-drop automation to every team.",
    },
    {
        date: "Jun 3, 2026",
        title: "NexaFlow achieves SOC 2 Type II certification",
        excerpt: "Enterprise-grade security validation for our growing customer base.",
    },
];

const mentions = [
    { outlet: "TechCrunch", quote: "NexaFlow is redefining what workflow automation can be in the AI era.", date: "Sep 2026" },
    { outlet: "The Verge", quote: "The most intuitive automation platform we've tested this year.", date: "Aug 2026" },
    { outlet: "Wired", quote: "A serious contender to Zapier, with AI-native features that feel magical.", date: "Jul 2026" },
];

const assets = [
    { name: "Logo (SVG)", size: "24 KB", icon: Image },
    { name: "Logo (PNG, dark)", size: "18 KB", icon: Image },
    { name: "Logo (PNG, light)", size: "18 KB", icon: Image },
    { name: "Brand guidelines", size: "2.4 MB", icon: FileText },
    { name: "Product screenshots", size: "8.1 MB", icon: Image },
    { name: "Press kit (ZIP)", size: "12 MB", icon: Download },
];

export default function Press() {
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
                                <Newspaper className="h-7 w-7" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                                    <span className="text-gradient-violet">Press</span>
                                </h1>
                                <p className="mt-2 text-slate-600 dark:text-slate-400">News, resources, and media contacts</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Press releases */}
            <section className="py-20">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Press releases</h2>
                    <div className="mt-8 space-y-4">
                        {pressReleases.map((pr, i) => (
                            <motion.a
                                key={pr.title}
                                href="#"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="group block rounded-2xl border border-slate-200/60 bg-white p-6 transition-all hover:border-violet-500 hover:shadow-lg dark:border-slate-800/60 dark:bg-slate-900"
                            >
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <span className="text-sm text-slate-500">{pr.date}</span>
                                    <span className="inline-flex items-center gap-1 text-sm font-medium text-violet-600 dark:text-violet-400">
                                        Read more <ArrowLeft className="h-3 w-3 rotate-180 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </div>
                                <h3 className="mt-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-violet-600 dark:text-white">
                                    {pr.title}
                                </h3>
                                <p className="mt-2 text-slate-600 dark:text-slate-400">{pr.excerpt}</p>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mentions */}
            <section className="border-t border-slate-200/60 bg-slate-50/50 py-20 dark:border-slate-800/60 dark:bg-slate-900/30">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">In the news</h2>
                    <div className="mt-8 grid gap-6 md:grid-cols-3">
                        {mentions.map((m, i) => (
                            <motion.figure
                                key={m.outlet}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="rounded-2xl border border-slate-200/60 bg-white p-6 dark:border-slate-800/60 dark:bg-slate-900"
                            >
                                <Quote className="h-8 w-8 text-violet-400" />
                                <blockquote className="mt-3 text-sm italic text-slate-700 dark:text-slate-300">"{m.quote}"</blockquote>
                                <figcaption className="mt-4 border-t border-slate-200 pt-3 text-xs text-slate-500 dark:border-slate-800">
                                    <span className="font-semibold text-slate-900 dark:text-white">{m.outlet}</span> · {m.date}
                                </figcaption>
                            </motion.figure>
                        ))}
                    </div>
                </div>
            </section>

            {/* Media assets */}
            <section className="py-20">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Media assets</h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-400">Download logos, screenshots, and brand guidelines.</p>
                    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {assets.map((asset, i) => (
                            <motion.button
                                key={asset.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="group flex items-center gap-4 rounded-2xl border border-slate-200/60 bg-white p-5 text-left transition-all hover:border-violet-500 hover:shadow-lg dark:border-slate-800/60 dark:bg-slate-900"
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                                    <asset.icon className="h-5 w-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="truncate font-medium text-slate-900 dark:text-white">{asset.name}</p>
                                    <p className="text-xs text-slate-500">{asset.size}</p>
                                </div>
                                <Download className="h-4 w-4 text-slate-400 transition-colors group-hover:text-violet-600" />
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="border-t border-slate-200/60 bg-slate-50/50 py-20 dark:border-slate-800/60 dark:bg-slate-900/30">
                <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                    <Mail className="mx-auto h-12 w-12 text-violet-600 dark:text-violet-400" />
                    <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">Press inquiries</h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-400">
                        For interviews, partnership opportunities, or press questions, reach out to our communications team.
                    </p>
                    <div className="mt-6 inline-flex flex-col items-center gap-2 rounded-2xl border border-slate-200/60 bg-white p-6 dark:border-slate-800/60 dark:bg-slate-900">
                        <p className="text-sm text-slate-500">Email</p>
                        <a href="mailto:press@nexaflow.app" className="text-lg font-semibold text-violet-600 hover:underline dark:text-violet-400">
                            press@nexaflow.app
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}