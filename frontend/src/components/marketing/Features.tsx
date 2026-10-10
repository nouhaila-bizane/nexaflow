import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Workflow, Bot, Plug, BarChart3, Users, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const features = [
    {
        icon: Workflow,
        title: "Workflow automation",
        description:
            "Design, test, and deploy complex automations with a visual canvas. No code required.",
        benefits: [
            "Drag-and-drop builder",
            "Conditional logic & loops",
            "Version history",
            "Instant rollback",
        ],
        useCase: "Route inbound leads to the right team based on intent and region.",
    },
    {
        icon: Bot,
        title: "AI agents",
        description:
            "Deploy specialized AI agents that classify, draft, summarize, and route work.",
        benefits: ["Custom instructions", "Tone & model selection", "Knowledge base", "Usage analytics"],
        useCase: "Triage support tickets and draft empathetic responses in seconds.",
    },
    {
        icon: Plug,
        title: "Integrations",
        description: "Connect the tools your team already uses. 100+ native integrations and webhooks.",
        benefits: ["One-click OAuth", "Bi-directional sync", "Custom webhooks", "Field mapping"],
        useCase: "Sync CRM records to Slack channels and Google Sheets automatically.",
    },
    {
        icon: BarChart3,
        title: "Analytics",
        description: "See what's working. Drill into success rates, time saved, and failure causes.",
        benefits: ["Live dashboards", "Per-workflow metrics", "Exportable reports", "Alerts"],
        useCase: "Identify which workflows drive the most ROI and double down.",
    },
    {
        icon: Users,
        title: "Team collaboration",
        description: "Build together with roles, permissions, and shared workspaces.",
        benefits: ["Owner / Admin / Member roles", "Audit log", "Comments", "Shared libraries"],
        useCase: "Let marketing build campaigns while ops reviews compliance.",
    },
    {
        icon: Shield,
        title: "Security",
        description: "Enterprise-grade security out of the box. Your data stays yours.",
        benefits: ["Encryption in transit & at rest", "SSO (SAML)", "SOC 2 roadmap", "Data residency"],
        useCase: "Meet compliance requirements without slowing your team down.",
    },
];

export default function Features() {
    return (
        <>
            <section className="border-b border-ink-100 py-20 dark:border-ink-800">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl dark:text-ink-50"
                    >
                        Everything you need to automate work
                    </motion.h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-600 dark:text-ink-300">
                        A complete platform for building intelligent workflows, deploying AI agents, and
                        measuring real impact.
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={f.title}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.4 }}
                            className={`grid gap-10 lg:grid-cols-2 lg:items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                                }`}
                        >
                            <div>
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300">
                                    <f.icon className="h-5 w-5" />
                                </div>
                                <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl dark:text-ink-50">
                                    {f.title}
                                </h2>
                                <p className="mt-3 text-ink-600 dark:text-ink-300">{f.description}</p>
                                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                                    {f.benefits.map((b) => (
                                        <li key={b} className="flex items-center gap-2 text-sm text-ink-700 dark:text-ink-200">
                                            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-6 rounded-xl border border-ink-200 bg-ink-50/60 p-4 dark:border-ink-800 dark:bg-ink-900/60">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                                        Use case
                                    </p>
                                    <p className="mt-1 text-sm text-ink-700 dark:text-ink-200">{f.useCase}</p>
                                </div>
                                <Button as={Link} to="/register" size="md" className="mt-6" rightIcon={<ArrowRight className="h-4 w-4" />}>
                                    Try it free
                                </Button>
                            </div>
                            <div className="rounded-2xl border border-ink-200 bg-gradient-to-br from-white to-ink-50 p-8 shadow-soft dark:border-ink-800 dark:from-ink-900 dark:to-ink-950">
                                <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-brand-500/10 via-violet-500/10 to-transparent p-6">
                                    <div className="flex h-full flex-col justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                                            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                                        </div>
                                        <div className="space-y-3">
                                            {["Trigger", "AI step", "Decision", "Action"].map((s, idx) => (
                                                <div
                                                    key={s}
                                                    className="flex items-center gap-3 rounded-lg border border-ink-200 bg-white/70 p-3 dark:border-ink-700 dark:bg-ink-900/60"
                                                >
                                                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-600 text-xs font-semibold text-white">
                                                        {idx + 1}
                                                    </span>
                                                    <span className="text-sm font-medium text-ink-800 dark:text-ink-100">{s}</span>
                                                    <span className="ml-auto text-xs text-ink-500">connected</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </>
    );
}