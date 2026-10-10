import { Link } from "react-router-dom";
import { Briefcase, Megaphone, Headphones, Settings2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const solutions = [
    { icon: Briefcase, title: "Sales", text: "Qualify leads, personalize outreach, and keep your CRM in sync — automatically.", bullets: ["Lead scoring", "Auto follow-ups", "CRM sync"] },
    { icon: Megaphone, title: "Marketing", text: "Segment audiences, trigger campaigns, and report on performance.", bullets: ["Audience segmentation", "Campaign triggers", "Performance reporting"] },
    { icon: Headphones, title: "Customer support", text: "Triage tickets, auto-respond, and escalate intelligently.", bullets: ["Ticket triage", "Auto-responses", "Smart escalation"] },
    { icon: Settings2, title: "Operations", text: "Automate approvals, reporting, and cross-tool handoffs.", bullets: ["Approval flows", "Auto reporting", "Cross-tool sync"] },
];

export default function Solutions() {
    return (
        <>
            <section className="border-b border-ink-100 py-20 dark:border-ink-800">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl dark:text-ink-50">
                        Built for every team that moves fast
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-600 dark:text-ink-300">
                        From sales to support, NexaFlow adapts to your workflow.
                    </p>
                </div>
            </section>
            <section className="py-20">
                <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
                    {solutions.map((s) => (
                        <div key={s.title} className="rounded-2xl border border-ink-200 bg-white p-7 dark:border-ink-800 dark:bg-ink-900">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300">
                                <s.icon className="h-5 w-5" />
                            </div>
                            <h2 className="mt-4 text-xl font-bold text-ink-900 dark:text-ink-50">{s.title}</h2>
                            <p className="mt-2 text-ink-600 dark:text-ink-300">{s.text}</p>
                            <ul className="mt-4 space-y-1.5">
                                {s.bullets.map((b) => (
                                    <li key={b} className="flex items-center gap-2 text-sm text-ink-700 dark:text-ink-200">
                                        <span className="h-1.5 w-1.5 rounded-full bg-brand-500" /> {b}
                                    </li>
                                ))}
                            </ul>
                            <Button as={Link} to="/register" variant="ghost" size="sm" className="mt-5" rightIcon={<ArrowRight className="h-4 w-4" />}>
                                Try for {s.title.toLowerCase()}
                            </Button>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}