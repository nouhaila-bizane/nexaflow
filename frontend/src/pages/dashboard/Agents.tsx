import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bot, Plus, MoreHorizontal, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/Toast";
import type { AIAgent } from "@/types";

export default function Agents() {
    const { toast } = useToast();
    const [agents, setAgents] = useState<AIAgent[]>([]);
    const [loading, setLoading] = useState(true);
    const [createOpen, setCreateOpen] = useState(false);
    const [form, setForm] = useState({
        name: "", description: "", goal: "", instructions: "", tone: "professional", model: "nexaflow-v1",
    });
    const [menu, setMenu] = useState<string | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<AIAgent | null>(null);

    const load = async () => {
        setLoading(true);
        try {
            const { agents } = await api.get<{ agents: AIAgent[] }>("/agents");
            setAgents(agents);
        } catch (e: any) {
            toast({ type: "error", message: e?.message || "Failed to load agents" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

    const create = async () => {
        if (!form.name.trim()) { toast({ type: "error", message: "Name is required" }); return; }
        try {
            await api.post("/agents", form);
            toast({ type: "success", message: "Agent created (simulated)" });
            setCreateOpen(false);
            setForm({ name: "", description: "", goal: "", instructions: "", tone: "professional", model: "nexaflow-v1" });
            load();
        } catch (e: any) {
            toast({ type: "error", message: e?.message || "Failed to create" });
        }
    };

    const toggle = async (a: AIAgent) => {
        const next = a.status === "active" ? "inactive" : "active";
        try {
            await api.put(`/agents/${a._id}`, { status: next });
            setAgents((prev) => prev.map((x) => (x._id === a._id ? { ...x, status: next } : x)));
            toast({ type: "success", message: `Agent ${next}` });
        } catch (e: any) {
            toast({ type: "error", message: e?.message || "Failed to update" });
        }
    };

    const remove = async () => {
        if (!confirmDelete) return;
        try {
            await api.del(`/agents/${confirmDelete._id}`);
            setAgents((prev) => prev.filter((a) => a._id !== confirmDelete._id));
            toast({ type: "success", message: "Agent deleted" });
        } catch (e: any) {
            toast({ type: "error", message: e?.message || "Failed to delete" });
        } finally {
            setConfirmDelete(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-ink-900 dark:text-ink-50">AI Agents</h1>
                    <p className="mt-1 text-sm text-ink-500">Deploy specialized AI agents for any task.</p>
                </div>
                <Button onClick={() => setCreateOpen(true)} leftIcon={<Plus className="h-4 w-4" />}>
                    New agent
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {agents.map((a) => (
                    <Card key={a._id} className="relative">
                        <CardBody>
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 text-white">
                                        <Bot className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-ink-900 dark:text-ink-50">{a.name}</p>
                                        <p className="text-xs text-ink-500">{a.model}</p>
                                    </div>
                                </div>
                                <div className="relative">
                                    <button
                                        onClick={() => setMenu(menu === a._id ? null : a._id)}
                                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800"
                                        aria-label="Agent actions"
                                    >
                                        <MoreHorizontal className="h-4 w-4" />
                                    </button>
                                    {menu === a._id && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setMenu(null)} />
                                            <div className="absolute right-0 z-20 mt-1 w-40 rounded-xl border border-ink-200 bg-white p-1 shadow-card dark:border-ink-800 dark:bg-ink-900">
                                                <button
                                                    onClick={() => { toggle(a); setMenu(null); }}
                                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-ink-50 dark:hover:bg-ink-800"
                                                >
                                                    {a.status === "active" ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                                                    {a.status === "active" ? "Deactivate" : "Activate"}
                                                </button>
                                                <button
                                                    onClick={() => { setConfirmDelete(a); setMenu(null); }}
                                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                                                >
                                                    <Trash2 className="h-4 w-4" /> Delete
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <p className="mt-3 line-clamp-2 text-sm text-ink-600 dark:text-ink-300">{a.description}</p>
                            <div className="mt-4 flex items-center justify-between">
                                <Badge tone={a.status === "active" ? "success" : "neutral"} dot>
                                    {a.status}
                                </Badge>
                                <span className="text-xs text-ink-500">Tone: {a.tone}</span>
                            </div>
                        </CardBody>
                    </Card>
                ))}
                {!loading && agents.length === 0 && (
                    <EmptyState
                        icon={<Bot className="h-6 w-6" />}
                        title="No agents yet"
                        description="Create your first AI agent to start automating tasks."
                        action={<Button onClick={() => setCreateOpen(true)} leftIcon={<Plus className="h-4 w-4" />}>Create agent</Button>}
                        className="md:col-span-2 xl:col-span-3"
                    />
                )}
            </div>

            <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Create AI agent" size="lg">
                <div className="space-y-4">
                    <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Sales Assistant" />
                    <Input label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                    <Input label="Goal" value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} placeholder="What should this agent achieve?" />
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">Instructions</label>
                        <textarea
                            rows={3}
                            value={form.instructions}
                            onChange={(e) => setForm({ ...form, instructions: e.target.value })}
                            className="w-full rounded-xl border border-ink-200 bg-white p-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-50"
                        />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">Tone</label>
                            <select
                                value={form.tone}
                                onChange={(e) => setForm({ ...form, tone: e.target.value })}
                                className="h-10 w-full rounded-xl border border-ink-200 bg-white px-3 text-sm dark:border-ink-700 dark:bg-ink-900 dark:text-ink-50"
                            >
                                <option>professional</option>
                                <option>friendly</option>
                                <option>concise</option>
                                <option>empathetic</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">Model</label>
                            <select
                                value={form.model}
                                onChange={(e) => setForm({ ...form, model: e.target.value })}
                                className="h-10 w-full rounded-xl border border-ink-200 bg-white px-3 text-sm dark:border-ink-700 dark:bg-ink-900 dark:text-ink-50"
                            >
                                <option>nexaflow-v1</option>
                                <option>nexaflow-fast</option>
                                <option>nexaflow-pro</option>
                            </select>
                        </div>
                    </div>
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
                        AI responses are simulated in this demo. The architecture supports plugging in a real
                        model provider (OpenAI, Anthropic, etc.) via a service layer.
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
                        <Button onClick={create}>Create agent</Button>
                    </div>
                </div>
            </Modal>

            <Modal
                open={!!confirmDelete}
                onClose={() => setConfirmDelete(null)}
                title="Delete agent"
                description="This action cannot be undone."
            >
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setConfirmDelete(null)}>Cancel</Button>
                    <Button variant="danger" onClick={remove}>Delete</Button>
                </div>
            </Modal>
        </div>
    );
}