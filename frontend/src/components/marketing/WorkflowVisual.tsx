import { motion } from "framer-motion";
import { Zap, Brain, GitBranch, CheckCircle2 } from "lucide-react";

const steps = [
    { icon: Zap, label: "Trigger", sub: "New lead submitted", color: "from-amber-400 to-orange-500" },
    { icon: Brain, label: "AI Analysis", sub: "Extract intent & context", color: "from-brand-500 to-brand-700" },
    { icon: GitBranch, label: "Decision", sub: "Classify lead quality", color: "from-violet-500 to-fuchsia-600" },
    { icon: CheckCircle2, label: "Action", sub: "Send response & log to CRM", color: "from-emerald-500 to-teal-600" },
];

export function WorkflowVisual() {
    return (
        <div className="relative rounded-2xl border border-ink-200 bg-gradient-to-br from-white to-ink-50 p-6 shadow-card dark:border-ink-800 dark:from-ink-900 dark:to-ink-950 sm:p-8">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map((s, i) => (
                    <motion.div
                        key={s.label}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.4 }}
                        className="relative"
                    >
                        <div className="flex items-center gap-3 rounded-xl border border-ink-200 bg-white p-4 dark:border-ink-800 dark:bg-ink-900">
                            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${s.color} text-white shadow-soft`}>
                                <s.icon className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Step {i + 1} · {s.label}</p>
                                <p className="truncate text-sm font-semibold text-ink-900 dark:text-ink-50">{s.sub}</p>
                            </div>
                        </div>
                        {i < steps.length - 1 && (
                            <div className="absolute -right-2 top-1/2 hidden h-px w-4 -translate-y-1/2 bg-gradient-to-r from-ink-300 to-transparent lg:block dark:from-ink-700" />
                        )}
                    </motion.div>
                ))}
            </div>
            <div className="mt-6 flex items-center justify-between text-xs text-ink-500">
                <span className="inline-flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    Live workflow preview
                </span>
                <span>Last run 2m ago · 142ms</span>
            </div>
        </div>
    );
}