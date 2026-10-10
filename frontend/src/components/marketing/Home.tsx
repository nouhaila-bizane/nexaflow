import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Workflow,
    Bot,
    BarChart3,
    Plug,
    Users,
    Sparkles,
    Check,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WorkflowVisual } from "@/components/marketing/WorkflowVisual";

const logos = ["Lumen", "Northwind", "Atlas", "Helio", "Pulsar", "Orbit"];

const problems = [
    { title: "Manual data entry", text: "Teams copy-paste between tools all day." },
    { title: "Slow follow-ups", text: "Leads go cold before anyone replies." },
    { title: "Scattered context", text: "Information lives in 10 different apps." },
    { title: "No visibility", text: "Nobody knows what's working or failing." },
];

const features = [
    { icon: Sparkles, title: "AI-powered automation", text: "Let AI handle classification, drafting, and routing." },
    { icon: Workflow, title: "Visual workflow builder", text: "Design complex flows in minutes, not days." },
    { icon: Bot, title: "Intelligent agents", text: "Deploy specialized AI agents for any task." },
    { icon: BarChart3, title: "Real-time analytics", text: "See what's running, what's failing, what's saving time." },
    { icon: Plug, title: "100+ integrations", text: "Connect the tools you already use." },
    { icon: Users, title: "Team collaboration", text: "Build together with roles, permissions, and shared workspaces." },
];

const howItWorks = [
    { step: "01", title: "Choose a trigger", text: "Form submission, schedule, webhook, or app event." },
    { step: "02", title: "Build your workflow", text: "Drag steps together in a visual canvas." },
    { step: "03", title: "Add AI actions", text: "Classify, summarize, draft, translate, route." },
    { step: "04", title: "Automate your process", text: "Activate and let NexaFlow run 24/7." },
    { step: "05", title: "Monitor results", text: "Track success rates, time saved, and usage." },
];

const useCases = [
    { title: "Sales", text: "Qualify leads, personalize outreach, and sync to CRM automatically." },
    { title: "Marketing", text: "Segment audiences, trigger campaigns, and report on performance." },
    { title: "Customer support", text: "Triage tickets, auto-respond, and escalate intelligently." },
    { title: "Operations", text: "Automate approvals, reporting, and cross-tool handoffs." },
];

const testimonials = [
    {
        quote:
            "NexaFlow replaced four internal tools and saved our team roughly 20 hours a week. The AI agents are genuinely useful.",
        name: "Maya Chen",
        role: "Head of Growth, Lumen",
    },
    {
        quote:
            "We went from idea to live workflow in an afternoon. The builder is the best I've used — and I've tried most of them.",
        name: "Daniel Okafor",
        role: "Ops Lead, Northwind",
    },
    {
        quote:
            "Our support team's response time dropped by 60% in the first month. The AI triage is shockingly accurate.",
        name: "Priya Raman",
        role: "Support Manager, Atlas",
    },
];

const faqs = [
    {
        q: "Do I need to know how to code?",
        a: "No. NexaFlow is designed for non-technical users. If you can draw a flowchart, you can build a workflow.",
    },
    {
        q: "Which apps can I connect?",
        a: "Slack, Gmail, Google Sheets, HubSpot, Notion, Discord, Shopify, and 90+ more via native integrations and webhooks.",
    },
    {
        q: "Is my data secure?",
        a: "Yes. All data is encrypted in transit and at rest. We never train models on your private data.",
    },
    {
        q: "Can I cancel anytime?",
        a: "Yes. All plans are month-to-month with no long-term commitment.",
    },
];

export default function Home() {
    return (
        <>
            {/* HERO */}
            <section className="relative overflow-hidden">
                <div
                    aria-hidden
                    className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(99,102,241,0.12),transparent_70%)]"
                />
                <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mx-auto max-w-3xl text-center"
                    >
                        <span className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3 py-1 text-xs font-medium text-ink-600 shadow-soft dark:border-ink-800 dark:bg-ink-900 dark:text-ink-300">
                            <Sparkles className="h-3.5 w-3.5 text-brand-500" />
                            New · AI Agents are here
                        </span>
                        <h1 className="mt-5 text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl lg:text-6xl dark:text-ink-50">
                            Automate the work.{" "}
                            <span className="bg-gradient-to-r from-brand-600 to-violet-600 bg-clip-text text-transparent">
                                Amplify what your team can do.
                            </span>
                        </h1>
                        <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-600 dark:text-ink-300">
                            NexaFlow helps modern teams build intelligent workflows, connect their tools, and
                            automate repetitive work with AI.
                        </p>
                        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Button as={Link} to="/register" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                                Start for free
                            </Button>
                            <Button as={Link} to="/features" variant="outline" size="lg">
                                Explore platform
                            </Button>
                        </div>
                        <p className="mt-4 text-xs text-ink-500">
                            No credit card required · Free plan forever
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="mx-auto mt-14 max-w-5xl"
                    >
                        <WorkflowVisual />
                    </motion.div>
                </div>
            </section>

            {/* LOGOS */}
            <section className="border-y border-ink-100 bg-ink-50/50 py-10 dark:border-ink-800 dark:bg-ink-900/40">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-xs font-semibold uppercase tracking-wider text-ink-500">
                        Trusted by modern teams at
                    </p>
                    <div className="mt-6 grid grid-cols-3 gap-6 sm:grid-cols-6">
                        {logos.map((l) => (
                            <div
                                key={l}
                                className="flex items-center justify-center text-base font-semibold tracking-tight text-ink-400 dark:text-ink-500"
                            >
                                {l}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROBLEM */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl dark:text-ink-50">
                            Your team shouldn't spend hours on repetitive work.
                        </h2>
                        <p className="mt-4 text-ink-600 dark:text-ink-300">
                            Most teams lose 20+ hours a week to manual tasks that a workflow could handle in seconds.
                        </p>
                    </div>
                    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {problems.map((p) => (
                            <div
                                key={p.title}
                                className="rounded-2xl border border-ink-200 bg-white p-5 dark:border-ink-800 dark:bg-ink-900"
                            >
                                <h3 className="font-semibold text-ink-900 dark:text-ink-50">{p.title}</h3>
                                <p className="mt-1.5 text-sm text-ink-500 dark:text-ink-400">{p.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="bg-ink-50/50 py-20 dark:bg-ink-900/40">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                            Platform
                        </p>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl dark:text-ink-50">
                            One platform. Smarter workflows.
                        </h2>
                    </div>
                    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((f) => (
                            <div
                                key={f.title}
                                className="group rounded-2xl border border-ink-200 bg-white p-6 transition-shadow hover:shadow-card dark:border-ink-800 dark:bg-ink-900"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-500/10 dark:text-brand-300">
                                    <f.icon className="h-5 w-5" />
                                </div>
                                <h3 className="mt-4 font-semibold text-ink-900 dark:text-ink-50">{f.title}</h3>
                                <p className="mt-1.5 text-sm text-ink-500 dark:text-ink-400">{f.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl dark:text-ink-50">
                            From idea to live workflow in minutes
                        </h2>
                    </div>
                    <ol className="mt-12 grid gap-5 md:grid-cols-5">
                        {howItWorks.map((h, i) => (
                            <li
                                key={h.step}
                                className="relative rounded-2xl border border-ink-200 bg-white p-5 dark:border-ink-800 dark:bg-ink-900"
                            >
                                <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                                    {h.step}
                                </span>
                                <h3 className="mt-2 font-semibold text-ink-900 dark:text-ink-50">{h.title}</h3>
                                <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{h.text}</p>
                                {i < howItWorks.length - 1 && (
                                    <ChevronRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-ink-300 md:block dark:text-ink-700" />
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* USE CASES */}
            <section className="border-y border-ink-100 bg-ink-50/50 py-20 dark:border-ink-800 dark:bg-ink-900/40">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                                Use cases
                            </p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl dark:text-ink-50">
                                Built for every team that moves fast
                            </h2>
                            <p className="mt-4 text-ink-600 dark:text-ink-300">
                                Whether you're closing deals, supporting customers, or shipping campaigns, NexaFlow
                                adapts to your workflow.
                            </p>
                            <Button as={Link} to="/solutions" variant="outline" size="md" className="mt-6">
                                See all solutions
                            </Button>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {useCases.map((u) => (
                                <div
                                    key={u.title}
                                    className="rounded-2xl border border-ink-200 bg-white p-5 dark:border-ink-800 dark:bg-ink-900"
                                >
                                    <h3 className="font-semibold text-ink-900 dark:text-ink-50">{u.title}</h3>
                                    <p className="mt-1.5 text-sm text-ink-500 dark:text-ink-400">{u.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ANALYTICS PREVIEW */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                                Analytics
                            </p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl dark:text-ink-50">
                                See what's working. Fix what isn't.
                            </h2>
                            <p className="mt-4 text-ink-600 dark:text-ink-300">
                                Live dashboards show execution volume, success rates, and time saved across every
                                workflow. Know the impact of automation in real time.
                            </p>
                            <ul className="mt-6 space-y-2 text-sm text-ink-700 dark:text-ink-200">
                                {["Per-workflow success rates", "Time saved estimates", "Failure root-cause insights"].map(
                                    (t) => (
                                        <li key={t} className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-emerald-500" /> {t}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card dark:border-ink-800 dark:bg-ink-900">
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { k: "Executions", v: "12,480" },
                                    { k: "Success rate", v: "96.4%" },
                                    { k: "Hours saved", v: "2,246" },
                                ].map((s) => (
                                    <div
                                        key={s.k}
                                        className="rounded-xl border border-ink-100 p-3 dark:border-ink-800"
                                    >
                                        <p className="text-xs text-ink-500">{s.k}</p>
                                        <p className="mt-1 text-xl font-semibold text-ink-900 dark:text-ink-50">{s.v}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-5 flex h-32 items-end gap-1.5">
                                {Array.from({ length: 24 }).map((_, i) => {
                                    const h = 20 + ((i * 37) % 80);
                                    return (
                                        <div
                                            key={i}
                                            style={{ height: `${h}%` }}
                                            className="flex-1 rounded-t bg-gradient-to-t from-brand-500 to-brand-400"
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="bg-ink-50/50 py-20 dark:bg-ink-900/40">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl dark:text-ink-50">
                            Teams ship faster with NexaFlow
                        </h2>
                    </div>
                    <div className="mt-12 grid gap-5 md:grid-cols-3">
                        {testimonials.map((t) => (
                            <figure
                                key={t.name}
                                className="rounded-2xl border border-ink-200 bg-white p-6 dark:border-ink-800 dark:bg-ink-900"
                            >
                                <blockquote className="text-sm text-ink-700 dark:text-ink-200">"{t.quote}"</blockquote>
                                <figcaption className="mt-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
                                        {t.name.split(" ").map((n) => n[0]).join("")}
                                    </span>
                                    <div>
                                        <p className="text-sm font-semibold text-ink-900 dark:text-ink-50">{t.name}</p>
                                        <p className="text-xs text-ink-500">{t.role}</p>
                                    </div>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRICING PREVIEW */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl dark:text-ink-50">
                            Simple, transparent pricing
                        </h2>
                        <p className="mt-3 text-ink-600 dark:text-ink-300">
                            Start free. Upgrade when you need more.
                        </p>
                    </div>
                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        {[
                            { name: "Starter", price: "$0", per: "forever", cta: "Start free" },
                            { name: "Growth", price: "$29", per: "per month", cta: "Start 14-day trial", featured: true },
                            { name: "Scale", price: "$99", per: "per month", cta: "Contact sales" },
                        ].map((p) => (
                            <div
                                key={p.name}
                                className={`rounded-2xl border p-6 ${p.featured
                                        ? "border-brand-500 bg-white shadow-card dark:bg-ink-900"
                                        : "border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900"
                                    }`}
                            >
                                <h3 className="text-sm font-semibold text-ink-900 dark:text-ink-50">{p.name}</h3>
                                <p className="mt-3 flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-ink-900 dark:text-ink-50">{p.price}</span>
                                    <span className="text-sm text-ink-500">/ {p.per}</span>
                                </p>
                                <Button
                                    as={Link}
                                    to="/pricing"
                                    variant={p.featured ? "primary" : "outline"}
                                    className="mt-5 w-full"
                                >
                                    {p.cta}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="border-t border-ink-100 py-20 dark:border-ink-800">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-center text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl dark:text-ink-50">
                        Frequently asked questions
                    </h2>
                    <div className="mt-10 divide-y divide-ink-100 dark:divide-ink-800">
                        {faqs.map((f) => (
                            <details key={f.q} className="group py-5">
                                <summary className="flex cursor-pointer items-center justify-between text-left font-medium text-ink-900 dark:text-ink-50">
                                    {f.q}
                                    <span className="ml-4 text-ink-400 group-open:rotate-45">+</span>
                                </summary>
                                <p className="mt-3 text-sm text-ink-600 dark:text-ink-300">{f.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-20">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-violet-700 px-8 py-16 text-center text-white shadow-card sm:px-16">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Ready to automate the work?
                        </h2>
                        <p className="mx-auto mt-3 max-w-xl text-brand-100">
                            Join thousands of teams shipping faster with NexaFlow.
                        </p>
                        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Button as={Link} to="/register" size="lg" className="bg-white text-brand-700 hover:bg-ink-50">
                                Start for free
                            </Button>
                            <Button
                                as={Link}
                                to="/contact"
                                size="lg"
                                variant="ghost"
                                className="text-white hover:bg-white/10"
                            >
                                Talk to sales
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}