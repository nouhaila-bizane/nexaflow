import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Search, MoreHorizontal, Trash2, Copy, ToggleLeft, ToggleRight } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import { Modal } from "@/components/ui/Modal";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/Toast";
import { formatRelative } from "@/lib/utils";
import type { Workflow } from "@/types";

export default function Workflows() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [workflows, setWorkflows] = useState<Workflow[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState<"all" | "active" | "paused" | "draft">("all");
    const [menu, setMenu] = useState<string | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<Workflow | null>(null);

    const load = async () => {
        setLoading(true);
        try {
            const { workflows } = await api.get<{ workflows: Workflow[] }>("/workflows");
            setWorkflows(workflows);
        } catch (e: any) {
            toast({ type: "error", message: e?.message || "Failed to load workflows" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

    const toggleStatus = async (w: Workflow) => {
        const next = w.status === "active" ? "paused" : "active";
        try {
            await api.put(`/workflows/${w._id}`, { status: next });
            setWorkflows((prev) => prev.map((x) => (x._id === w._id ? { ...x, status: next } : x)));
            toast({ type: "success", message: `Workflow ${next}` });
        } catch (e: any) {
            toast({ type: "error", message: e?.message || "Failed to update" });
        }
    };

    const duplicate = async (w: Workflow) => {
        try {
            await api.post("/workflows", {
                name: `${w.name} (copy)`,
                description: w.description,
                trigger: w.trigger,
                steps: w.steps,
                status: "draft",
            });
            toast({ type: "success", message: "Workflow duplicated" });
            load();
        } catch (e: any) {
            toast({ type: "error", message: e?.message || "Failed to duplicate" });
        }
    };

    const remove = async () => {
        if (!confirmDelete) return;
        try {
            await api.del(`/workflows/${confirmDelete._id}`);
            setWorkflows((prev) => prev.filter((w) => w._id !== confirmDelete._id));
            toast({ type: "success", message: "Workflow deleted" });
        } catch (e: any) {
            toast({ type: "error", message: e?.message || "Failed to delete" });
        } finally {
            setConfirmDelete(null);
        }
    };

    const filtered = workflows.filter((w) => {
        const matchesQuery =
            !query ||
            w.name.toLowerCase().includes(query.toLowerCase()) ||
            w.description.toLowerCase().includes(query.toLowerCase());
        const matchesFilter = filter === "all" || w.status === filter;
        return matchesQuery && matchesFilter;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-ink-900 dark:text-ink-50">Workflows</h1>
                    <p className="mt-1 text-sm text-ink-500">Build and manage your automated workflows.</p>
                </div>
                <Button as={Link} to="/app/workflows/new" leftIcon={<Plus className="h-4 w-4" />}>
                    New workflow
                </Button>
            </div>

            <Card>
                <CardHeader className="flex flex-wrap items-center gap-3">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search workflows..."
                            className="h-9 w-full rounded-lg border border-ink-200 bg-white pl-9 pr-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-50"
                        />
                    </div>
                    <div className="inline-flex rounded-lg border border-ink-200 bg-white p-0.5 dark:border-ink-700 dark:bg-ink-900">
                        {(["all", "active", "paused", "draft"] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors ${filter === f
                                        ? "bg-ink-900 text-white dark:bg-white dark:text-ink-900"
                                        : "text-ink-600 hover:text-ink-900 dark:text-ink-300"
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </CardHeader>
                <CardBody className="p-0">
                    {loading ? (
                        <div className="space-y-2 p-5">
                            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
                        </div>
                    ) : filtered.length === 0 ? (
                        <EmptyState
                            icon={<Plus className="h-6 w-6" />}
                            title={workflows.length === 0 ? "No workflows yet" : "No workflows match your filters"}
                            description={
                                workflows.length === 0
                                    ? "Create your first automated workflow and start saving time."
                                    : "Try adjusting your search or filters."
                            }
                            action={
                                workflows.length === 0 ? (
                                    <Button as={Link} to="/app/workflows/new" leftIcon={<Plus className="h-4 w-4" />}>
                                        Create workflow
                                    </Button>
                                ) : undefined
                            }
                            className="m-5"
                        />
                    ) : (
                        <ul className="divide-y divide-ink-100 dark:divide-ink-800">
                            {filtered.map((w) => (
                                <li key={w._id} className="group flex items-center gap-4 p-4 hover:bg-ink-50/50 dark:hover:bg-ink-800/30">
                                    <Link to={`/app/workflows/${w._id}`} className="min-w-0 flex-1">
                                        <p className="truncate font-medium text-ink-900 dark:text-ink-50">{w.name}</p>
                                        <p className="mt-0.5 truncate text-xs text-ink-500">
                                            {w.trigger || "No trigger"} · {w.steps.length} steps · Last run {formatRelative(w.lastExecution)}
                                        </p>
                                    </Link>
                                    <div className="hidden items-center gap-2 text-xs text-ink-500 sm:flex">
                                        <span>{w.executions} runs</span>
                                    </div>
                                    <Badge
                                        tone={w.status === "active" ? "success" : w.status === "paused" ? "warning" : "neutral"}
                                        dot
                                    >
                                        {w.status}
                                    </Badge>
                                    <div className="relative">
                                        <button
                                            onClick={() => setMenu(menu === w._id ? null : w._id)}
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800"
                                            aria-label="Workflow actions"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                        </button>
                                        {menu === w._id && (
                                            <>
                                                <div className="fixed inset-0 z-10" onClick={() => setMenu(null)} />
                                                <div className="absolute right-0 z-20 mt-1 w-44 rounded-xl border border-ink-200 bg-white p-1 shadow-card dark:border-ink-800 dark:bg-ink-900">
                                                    <button
                                                        onClick={() => { toggleStatus(w); setMenu(null); }}
                                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-ink-700 hover:bg-ink-50 dark:text-ink-200 dark:hover:bg-ink-800"
                                                    >
                                                        {w.status === "active" ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                                                        {w.status === "active" ? "Pause" : "Activate"}
                                                    </button>
                                                    <button
                                                        onClick={() => { duplicate(w); setMenu(null); }}
                                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-ink-700 hover:bg-ink-50 dark:text-ink-200 dark:hover:bg-ink-800"
                                                    >
                                                        <Copy className="h-4 w-4" /> Duplicate
                                                    </button>
                                                    <button
                                                        onClick={() => { setConfirmDelete(w); setMenu(null); }}
                                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                                                    >
                                                        <Trash2 className="h-4 w-4" /> Delete
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </CardBody>
            </Card>

            <Modal
                open={!!confirmDelete}
                onClose={() => setConfirmDelete(null)}
                title="Delete workflow"
                description="This action cannot be undone. All execution history will be lost."
            >
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setConfirmDelete(null)}>Cancel</Button>
                    <Button variant="danger" onClick={remove}>Delete</Button>
                </div>
            </Modal>
        </div>
    );
}