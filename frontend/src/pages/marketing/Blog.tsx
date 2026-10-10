import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/Button";

const posts = [
    {
        title: "Introducing AI Agents: Your new digital teammates",
        excerpt: "Learn how our new AI agents can handle complex tasks autonomously, from customer support to data analysis.",
        category: "Product",
        date: "Oct 5, 2026",
        readTime: "5 min read",
        featured: true,
    },
    {
        title: "Building scalable workflows: Best practices",
        excerpt: "Tips and patterns for designing workflows that grow with your team.",
        category: "Engineering",
        date: "Sep 28, 2026",
        readTime: "8 min read",
    },
    {
        title: "How Lumen automated 80% of their lead qualification",
        excerpt: "A case study on how one team saved 40 hours per week with NexaFlow.",
        category: "Case Study",
        date: "Sep 20, 2026",
        readTime: "6 min read",
    },
    {
        title: "The future of work is automated",
        excerpt: "Why every knowledge worker will have an AI assistant by 2027.",
        category: "Insights",
        date: "Sep 15, 2026",
        readTime: "4 min read",
    },
    {
        title: "New integrations: Shopify, Discord, and more",
        excerpt: "We've added 15 new integrations this month. Here's what's new.",
        category: "Product",
        date: "Sep 10, 2026",
        readTime: "3 min read",
    },
    {
        title: "Security best practices for workflow automation",
        excerpt: "How to keep your data safe while automating sensitive processes.",
        category: "Security",
        date: "Sep 5, 2026",
        readTime: "7 min read",
    },
];

export default function Blog() {
    const featured = posts.find((p) => p.featured);
    const others = posts.filter((p) => !p.featured);

    return (
        <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
            <section className="border-b border-slate-200/60 bg-slate-50/50 py-20 dark:border-slate-800/60 dark:bg-slate-900/30">
                <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
                            <span className="text-gradient-violet">Blog</span>
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                            Insights, tutorials, and updates from the NexaFlow team.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {featured && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12 rounded-3xl border border-slate-200/60 bg-white p-8 shadow-sm transition-all hover:shadow-xl dark:border-slate-800/60 dark:bg-slate-900 md:p-12"
                        >
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">
                                <Tag className="h-3 w-3" /> {featured.category}
                            </span>
                            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">{featured.title}</h2>
                            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">{featured.excerpt}</p>
                            <div className="mt-6 flex items-center gap-4 text-sm text-slate-500">
                                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {featured.date}</span>
                                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {featured.readTime}</span>
                            </div>
                            <Button as={Link} to="/blog" variant="outline" className="mt-6">
                                Read article <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </motion.div>
                    )}

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {others.map((post, i) => (
                            <motion.article
                                key={post.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group rounded-2xl border border-slate-200/60 bg-white p-6 transition-all hover:shadow-lg dark:border-slate-800/60 dark:bg-slate-900"
                            >
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                    {post.category}
                                </span>
                                <h3 className="mt-4 text-xl font-bold text-slate-900 transition-colors group-hover:text-violet-600 dark:text-white">{post.title}</h3>
                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{post.excerpt}</p>
                                <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
                                    <span>{post.date}</span>
                                    <span>·</span>
                                    <span>{post.readTime}</span>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}