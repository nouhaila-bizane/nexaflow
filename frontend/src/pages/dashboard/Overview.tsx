import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
    Workflow,
    Zap,
    Clock,
    CheckCircle2,
    Plus,
    Bot,
    ArrowUpRight,
} from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Skeleton, StatSkeleton } from "@/components/ui/Skeleton";
import { api } from "@/lib/api";
import type { AnalyticsSummary, Workflow as TWorkflow } from "@/types";
import { formatRelative } from "@/lib/utils";

// Composant compteur animé - ne se rejoue qu'une seule fois
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!isInView || hasAnimated.current) return;
        hasAnimated.current = true;

        const duration = 1000;
        const steps = 30;
        const increment = value / steps;
        let current = 0;
        const interval = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(interval);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);
        return () => clearInterval(interval);
    }, [isInView, value]);

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function Overview() {
    const [data, setData] = useState<AnalyticsSummary | null>(null);
    const [workflows, setWorkflows] = useState<TWorkflow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const [a, w] = await Promise.all([
                    api.get<AnalyticsSummary>("/analytics"),
                    api.get<{ workflows: TWorkflow[] }>("/workflows"),
                ]);
                setData(a);
                setWorkflows(w.workflows);
            } catch (e: any) {
                setError(e?.message || "Failed to load overview");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const stats = data
        ? [
            { label: "Active workflows", value: data.activeWorkflows, icon: Workflow, tone: "brand" as const, suffix: "" },
            { label: "Tasks automated", value: data.totalExecutions, icon: Zap, tone: "success" as const, suffix: "" },
            { label: "Hours saved", value: data.hoursSaved, icon: Clock, tone: "warning" as const, suffix: "" },
            { label: "Success rate", value: data.successRate, icon: CheckCircle2, tone: "success" as const, suffix: "%" },
        ]
        : [];

    return (
        <div className="space-y-6">
            {/* Header - animation simple, pas de replay */}
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-ink-900 dark:text-ink-50">Overview</h1>
                    <p className="mt-1 text-sm text-ink-500">Welcome back. Here's what's happening.</p>
                </div>
                <div className="flex gap-2">
                    <Button as={Link} to="/app/workflows/new" leftIcon={<Plus className="h-4 w-4" />}>
                        Create workflow
                    </Button>
                    <Button as={Link} to="/app/agents" variant="outline" leftIcon={<Bot className="h-4 w-4" />}>
                        New agent
                    </Button>
                </div>
            </div>

            {/* Stats - apparition simple sans replay */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {loading
                    ? Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)
                    : stats.map((s) => (
                        <Card key={s.label} className="shine-effect">
                            <CardBody className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-ink-500">{s.label}</p>
                                    <p className="mt-1.5 text-2xl font-semibold text-ink-900 dark:text-ink-50">
                                        <AnimatedCounter value={s.value} suffix={s.suffix} />
                                    </p>
                                </div>
                                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-${s.tone === "brand" ? "brand" : s.tone === "success" ? "emerald" : "amber"}-50 text-${s.tone === "brand" ? "brand" : s.tone === "success" ? "emerald" : "amber"}-600 dark:bg-${s.tone === "brand" ? "brand" : s.tone === "success" ? "emerald" : "amber"}-500/10`}>
                                    <s.icon className="h-5 w-5" />
                                </div>
                            </CardBody>
                        </Card>
                    ))}
            </div>

            {/* Chart + Activity */}
            <div className="grid gap-5 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="flex items-center justify-between">
                            <div>
                                <h2 className="font-semibold text-ink-900 dark:text-ink-50">Workflow executions</h2>
                                <p className="text-xs text-ink-500">Last 30 days</p>
                            </div>
                            <Badge tone="success" dot>Live</Badge>
                        </CardHeader>
                        <CardBody>
                            {loading ? (
                                <Skeleton className="h-56 w-full" />
                            ) : error ? (
                                <p className="text-sm text-red-600">{error}</p>
                            ) : (
                                <div className="flex h-56 items-end gap-1.5">
                                    {data!.series.map((d) => {
                                        const max = Math.max(...data!.series.map((s) => s.runs), 1);
                                        const h = (d.runs / max) * 100;
                                        return (
                                            <div
                                                key={d.date}
                                                title={`${d.date}: ${d.runs} runs`}
                                                style={{ height: `${h}%` }}
                                                className="flex-1 cursor-pointer rounded-t bg-gradient-to-t from-brand-600 to-brand-400 transition-all hover:from-brand-700 hover:to-brand-500"
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </CardBody>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <h2 className="font-semibold text-ink-900 dark:text-ink-50">Recent activity</h2>
                    </CardHeader>
                    <CardBody className="space-y-3">
                        {loading
                            ? Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-4 w-full" />)
                            : data!.recentActivity.length === 0
                                ? <p className="text-sm text-ink-500">No activity yet.</p>
                                : data!.recentActivity.map((a) => (
                                    <div key={a._id} className="flex items-start gap-3 text-sm">
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-ink-800 dark:text-ink-100">{a.message}</p>
                                            <p className="text-xs text-ink-500">{formatRelative(a.createdAt)}</p>
                                        </div>
                                    </div>
                                ))}
                    </CardBody>
                </Card>
            </div>

            {/* Recent workflows */}
            <Card>
                <CardHeader className="flex items-center justify-between">
                    <h2 className="font-semibold text-ink-900 dark:text-ink-50">Recent workflows</h2>
                    <Button as={Link} to="/app/workflows" variant="ghost" size="sm" rightIcon={<ArrowUpRight className="h-3.5 w-3.5" />}>
                        View all
                    </Button>
                </CardHeader>
                <CardBody>
                    {loading ? (
                        <div className="space-y-3">
                            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
                        </div>
                    ) : workflows.length === 0 ? (
                        <p className="text-sm text-ink-500">No workflows yet. Create your first one.</p>
                    ) : (
                        <div className="divide-y divide-ink-100 dark:divide-ink-800">
                            {workflows.slice(0, 5).map((w) => (
                                <Link
                                    key={w._id}
                                    to={`/app/workflows/${w._id}`}
                                    className="flex items-center justify-between gap-4 py-3 transition-colors hover:bg-ink-50 dark:hover:bg-ink-800/50 -mx-2 px-2 rounded-lg"
                                >
                                    <div className="min-w-0">
                                        <p className="truncate font-medium text-ink-900 dark:text-ink-50">{w.name}</p>
                                        <p className="truncate text-xs text-ink-500">
                                            {w.trigger || "No trigger"} · {w.executions} runs
                                        </p>
                                    </div>
                                    <Badge
                                        tone={w.status === "active" ? "success" : w.status === "paused" ? "warning" : "neutral"}
                                        dot
                                    >
                                        {w.status}
                                    </Badge>
                                </Link>
                            ))}
                        </div>
                    )}
                </CardBody>
            </Card>
        </div>
    );
}