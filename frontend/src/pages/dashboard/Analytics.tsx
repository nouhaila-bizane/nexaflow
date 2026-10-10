import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Skeleton, StatSkeleton } from "@/components/ui/Skeleton";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/Toast";
import type { AnalyticsSummary } from "@/types";

export default function Analytics() {
    const { toast } = useToast();
    const [data, setData] = useState<AnalyticsSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [range, setRange] = useState<"7d" | "30d" | "90d">("30d");

    useEffect(() => {
        (async () => {
            try {
                const a = await api.get<AnalyticsSummary>("/analytics");
                setData(a);
            } catch (e: any) {
                toast({ type: "error", message: e?.message || "Failed to load analytics" });
            } finally {
                setLoading(false);
            }
        })();
    }, [toast]);

    const series = data?.series.slice(range === "7d" ? -7 : range === "30d" ? -30 : -90) ?? [];

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-ink-900 dark:text-ink-50">Analytics</h1>
                    <p className="mt-1 text-sm text-ink-500">Measure the impact of your automation.</p>
                </div>
                <div className="inline-flex rounded-lg border border-ink-200 bg-white p-0.5 dark:border-ink-700 dark:bg-ink-900">
                    {(["7d", "30d", "90d"] as const).map((r) => (
                        <button
                            key={r}
                            onClick={() => setRange(r)}
                            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${range === r ? "bg-ink-900 text-white dark:bg-white dark:text-ink-900" : "text-ink-600 dark:text-ink-300"
                                }`}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {loading
                    ? Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)
                    : [
                        { label: "Total executions", value: data!.totalExecutions.toLocaleString() },
                        { label: "Success rate", value: `${data!.successRate}%` },
                        { label: "Failed executions", value: Math.round(data!.totalExecutions * 0.036).toLocaleString() },
                        { label: "Time saved", value: `${data!.hoursSaved}h` },
                    ].map((s) => (
                        <Card key={s.label}>
                            <CardBody>
                                <p className="text-sm text-ink-500">{s.label}</p>
                                <p className="mt-1.5 text-2xl font-semibold text-ink-900 dark:text-ink-50">{s.value}</p>
                            </CardBody>
                        </Card>
                    ))}
            </div>

            <Card>
                <CardHeader className="flex items-center justify-between">
                    <div>
                        <h2 className="font-semibold text-ink-900 dark:text-ink-50">Activity</h2>
                        <p className="text-xs text-ink-500">Workflow runs over time</p>
                    </div>
                    <Badge tone="success" dot>Trending up</Badge>
                </CardHeader>
                <CardBody>
                    {loading ? (
                        <Skeleton className="h-64 w-full" />
                    ) : (
                        <div className="flex h-64 items-end gap-1.5">
                            {series.map((d) => {
                                const max = Math.max(...series.map((s) => s.runs), 1);
                                const h = (d.runs / max) * 100;
                                return (
                                    <div
                                        key={d.date}
                                        title={`${d.date}: ${d.runs} runs`}
                                        style={{ height: `${h}%` }}
                                        className="flex-1 rounded-t bg-gradient-to-t from-brand-600 to-brand-400 transition-all hover:from-brand-700 hover:to-brand-500"
                                    />
                                );
                            })}
                        </div>
                    )}
                </CardBody>
            </Card>

            <div className="grid gap-5 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <h2 className="font-semibold text-ink-900 dark:text-ink-50">Most used workflows</h2>
                    </CardHeader>
                    <CardBody className="space-y-3">
                        {(data ? [
                            { name: "Lead Qualification Pipeline", runs: 248 },
                            { name: "Weekly Report Generator", runs: 42 },
                            { name: "Support Ticket Triage", runs: 112 },
                            { name: "Onboarding Email Sequence", runs: 86 },
                        ] : []).map((w, i) => (
                            <div key={w.name} className="flex items-center gap-3">
                                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-ink-100 text-xs font-semibold text-ink-600 dark:bg-ink-800 dark:text-ink-300">
                                    {i + 1}
                                </span>
                                <span className="flex-1 text-sm text-ink-800 dark:text-ink-100">{w.name}</span>
                                <span className="text-xs text-ink-500">{w.runs} runs</span>
                            </div>
                        ))}
                    </CardBody>
                </Card>
                <Card>
                    <CardHeader>
                        <h2 className="font-semibold text-ink-900 dark:text-ink-50">Activity by day</h2>
                    </CardHeader>
                    <CardBody>
                        {loading ? (
                            <Skeleton className="h-48 w-full" />
                        ) : (
                            <div className="grid grid-cols-7 gap-1.5">
                                {Array.from({ length: 28 }).map((_, i) => {
                                    const v = ((i * 53) % 100) / 100;
                                    return (
                                        <div
                                            key={i}
                                            style={{ opacity: 0.15 + v * 0.85 }}
                                            className="aspect-square rounded bg-brand-500"
                                            title={`Day ${i + 1}`}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}