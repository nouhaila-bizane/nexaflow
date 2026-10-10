import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Modal } from "@/components/ui/Modal";

const plans = [
    {
        name: "Starter",
        monthly: 0,
        yearly: 0,
        description: "For individuals exploring automation.",
        features: [
            "3 active workflows",
            "500 executions / month",
            "1 AI agent",
            "Community support",
            "Core integrations",
        ],
        cta: "Start free",
    },
    {
        name: "Growth",
        monthly: 29,
        yearly: 24,
        description: "For teams ready to scale automation.",
        features: [
            "Unlimited workflows",
            "25,000 executions / month",
            "10 AI agents",
            "Priority support",
            "All integrations",
            "Team collaboration",
            "Advanced analytics",
        ],
        cta: "Start 14-day trial",
        featured: true,
    },
    {
        name: "Scale",
        monthly: 99,
        yearly: 89,
        description: "For organizations with advanced needs.",
        features: [
            "Everything in Growth",
            "250,000 executions / month",
            "Unlimited AI agents",
            "Dedicated success manager",
            "SSO (SAML)",
            "Audit log",
            "Custom contracts",
        ],
        cta: "Contact sales",
    },
];

const comparison = [
    { feature: "Active workflows", starter: "3", growth: "Unlimited", scale: "Unlimited" },
    { feature: "Executions / month", starter: "500", growth: "25,000", scale: "250,000" },
    { feature: "AI agents", starter: "1", growth: "10", scale: "Unlimited" },
    { feature: "Team members", starter: "1", growth: "10", scale: "Unlimited" },
    { feature: "Integrations", starter: "Core", growth: "All", scale: "All + custom" },
    { feature: "Analytics", starter: "Basic", growth: "Advanced", scale: "Advanced + export" },
    { feature: "Support", starter: "Community", growth: "Priority", scale: "Dedicated" },
    { feature: "SSO / SAML", starter: "—", growth: "—", scale: "✓" },
];

const faqs = [
    { q: "Can I change plans later?", a: "Yes. Upgrade, downgrade, or cancel at any time." },
    { q: "Do you offer refunds?", a: "Yes, within 14 days of purchase — no questions asked." },
    { q: "Is there a student discount?", a: "Yes. Contact us with your .edu email." },
];

export default function Pricing() {
    const [yearly, setYearly] = useState(false);
    const [modal, setModal] = useState<{ open: boolean; plan?: string }>({ open: false });
    const { toast } = useToast();

    const handleSelect = (plan: string) => {
        setModal({ open: true, plan });
    };

    const confirm = () => {
        toast({ type: "success", message: `${modal.plan} selected. This is a demo — no payment processed.` });
        setModal({ open: false });
    };

    return (
        <>
            <section className="border-b border-ink-100 py-20 dark:border-ink-800">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl dark:text-ink-50">
                        Simple pricing that grows with you
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-600 dark:text-ink-300">
                        Start free. Upgrade when you need more. Cancel anytime.
                    </p>
                    <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-ink-200 bg-white p-1 dark:border-ink-800 dark:bg-ink-900">
                        <button
                            onClick={() => setYearly(false)}
                            className={`rounded-full px-4 py-1.5 text-sm font-medium ${!yearly ? "bg-ink-900 text-white dark:bg-white dark:text-ink-900" : "text-ink-600 dark:text-ink-300"
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setYearly(true)}
                            className={`rounded-full px-4 py-1.5 text-sm font-medium ${yearly ? "bg-ink-900 text-white dark:bg-white dark:text-ink-900" : "text-ink-600 dark:text-ink-300"
                                }`}
                        >
                            Yearly <span className="ml-1 text-xs text-emerald-600">−20%</span>
                        </button>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
                    {plans.map((p) => (
                        <div
                            key={p.name}
                            className={`relative rounded-2xl border p-7 ${p.featured
                                    ? "border-brand-500 bg-white shadow-card dark:bg-ink-900"
                                    : "border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900"
                                }`}
                        >
                            {p.featured && (
                                <span className="absolute -top-3 left-7 inline-flex items-center gap-1 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
                                    <Sparkles className="h-3 w-3" /> Recommended
                                </span>
                            )}
                            <h3 className="text-lg font-semibold text-ink-900 dark:text-ink-50">{p.name}</h3>
                            <p className="mt-1 text-sm text-ink-500">{p.description}</p>
                            <p className="mt-5 flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-ink-900 dark:text-ink-50">
                                    ${yearly ? p.yearly : p.monthly}
                                </span>
                                <span className="text-sm text-ink-500">/ month</span>
                            </p>
                            <Button
                                onClick={() => handleSelect(p.name)}
                                variant={p.featured ? "primary" : "outline"}
                                className="mt-6 w-full"
                            >
                                {p.cta}
                            </Button>
                            <ul className="mt-6 space-y-2.5">
                                {p.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2 text-sm text-ink-700 dark:text-ink-200">
                                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section className="border-t border-ink-100 py-16 dark:border-ink-800">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-center text-2xl font-bold tracking-tight text-ink-900 dark:text-ink-50">
                        Compare plans
                    </h2>
                    <div className="mt-8 overflow-x-auto">
                        <table className="w-full min-w-[600px] text-left text-sm">
                            <thead>
                                <tr className="border-b border-ink-200 dark:border-ink-800">
                                    <th className="py-3 font-medium text-ink-500">Feature</th>
                                    <th className="py-3 font-medium text-ink-900 dark:text-ink-50">Starter</th>
                                    <th className="py-3 font-medium text-brand-700 dark:text-brand-300">Growth</th>
                                    <th className="py-3 font-medium text-ink-900 dark:text-ink-50">Scale</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-ink-100 dark:divide-ink-800">
                                {comparison.map((r) => (
                                    <tr key={r.feature}>
                                        <td className="py-3 text-ink-700 dark:text-ink-200">{r.feature}</td>
                                        <td className="py-3 text-ink-600 dark:text-ink-300">{r.starter}</td>
                                        <td className="py-3 font-medium text-ink-900 dark:text-ink-50">{r.growth}</td>
                                        <td className="py-3 text-ink-600 dark:text-ink-300">{r.scale}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-center text-2xl font-bold tracking-tight text-ink-900 dark:text-ink-50">
                        Frequently asked questions
                    </h2>
                    <div className="mt-8 divide-y divide-ink-100 dark:divide-ink-800">
                        {faqs.map((f) => (
                            <details key={f.q} className="group py-4">
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

            <Modal
                open={modal.open}
                onClose={() => setModal({ open: false })}
                title={`Start your ${modal.plan} plan`}
                description="This is a portfolio demo. No payment will be processed."
            >
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
                    Payment is simulated for this demo project. In a production environment, this would
                    connect to a real payment provider.
                </div>
                <div className="mt-5 flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setModal({ open: false })}>
                        Cancel
                    </Button>
                    <Button onClick={confirm}>Confirm (demo)</Button>
                </div>
            </Modal>
        </>
    );
}