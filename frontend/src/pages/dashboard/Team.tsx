import { useEffect, useState } from "react";
import { UserPlus, Trash2 } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/Toast";
import { initials } from "@/lib/utils";
import type { TeamMember } from "@/types";

export default function Team() {
    const { toast } = useToast();
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [inviteOpen, setInviteOpen] = useState(false);
    const [form, setForm] = useState({ email: "", role: "member" as "admin" | "member" });
    const [confirmRemove, setConfirmRemove] = useState<TeamMember | null>(null);

    const load = async () => {
        setLoading(true);
        try {
            const { members } = await api.get<{ members: TeamMember[] }>("/team");
            console.log("Team members loaded:", members); // Debug log
            setMembers(members || []); // Fallback si undefined
        } catch (e: any) {
            console.error("Failed to load team:", e);
            toast({
                type: "error",
                message: e?.message || "Failed to load team members"
            });
            setMembers([]); // Fallback
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

    const invite = async () => {
        if (!/^\S+@\S+\.\S+$/.test(form.email)) {
            toast({ type: "error", message: "Enter a valid email" });
            return;
        }
        try {
            await api.post("/team/invite", form);
            toast({ type: "success", message: "Invitation sent (simulated)" });
            setInviteOpen(false);
            setForm({ email: "", role: "member" });
            load();
        } catch (e: any) {
            toast({ type: "error", message: e?.message || "Failed to invite" });
        }
    };

    const remove = async () => {
        if (!confirmRemove) return;
        try {
            await api.del(`/team/${confirmRemove._id}`);
            setMembers((prev) => prev.filter((m) => m._id !== confirmRemove._id));
            toast({ type: "success", message: "Member removed" });
        } catch (e: any) {
            toast({ type: "error", message: e?.message || "Failed to remove" });
        } finally {
            setConfirmRemove(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-ink-900 dark:text-ink-50">Team</h1>
                    <p className="mt-1 text-sm text-ink-500">Manage members and permissions.</p>
                </div>
                <Button onClick={() => setInviteOpen(true)} leftIcon={<UserPlus className="h-4 w-4" />}>
                    Invite member
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <h2 className="font-semibold text-ink-900 dark:text-ink-50">Members</h2>
                </CardHeader>
                <CardBody className="p-0">
                    {loading ? (
                        <div className="space-y-2 p-5">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="h-12 w-full animate-pulse rounded bg-ink-100 dark:bg-ink-800" />
                            ))}
                        </div>
                    ) : (
                        <ul className="divide-y divide-ink-100 dark:divide-ink-800">
                            {members.map((m) => {
                                const name = m.user?.name ?? m.invitedEmail ?? "Unknown";
                                const email = m.user?.email ?? m.invitedEmail ?? "";
                                return (
                                    <li key={m._id} className="flex items-center gap-4 p-4">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
                                            {initials(name)}
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate font-medium text-ink-900 dark:text-ink-50">{name}</p>
                                            <p className="truncate text-xs text-ink-500">{email}</p>
                                        </div>
                                        <Badge
                                            tone={m.role === "owner" ? "brand" : m.role === "admin" ? "warning" : "neutral"}
                                        >
                                            {m.role}
                                        </Badge>
                                        <Badge tone={m.status === "active" ? "success" : "neutral"} dot>
                                            {m.status}
                                        </Badge>
                                        {m.role !== "owner" && (
                                            <button
                                                onClick={() => setConfirmRemove(m)}
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
                                                aria-label="Remove member"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </CardBody>
            </Card>

            <Modal open={inviteOpen} onClose={() => setInviteOpen(false)} title="Invite team member">
                <div className="space-y-4">
                    <Input
                        label="Email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="colleague@company.com"
                    />
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">Role</label>
                        <select
                            value={form.role}
                            onChange={(e) => setForm({ ...form, role: e.target.value as any })}
                            className="h-10 w-full rounded-xl border border-ink-200 bg-white px-3 text-sm dark:border-ink-700 dark:bg-ink-900 dark:text-ink-50"
                        >
                            <option value="member">Member</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setInviteOpen(false)}>Cancel</Button>
                        <Button onClick={invite}>Send invite</Button>
                    </div>
                </div>
            </Modal>

            <Modal
                open={!!confirmRemove}
                onClose={() => setConfirmRemove(null)}
                title="Remove member"
                description="They will lose access to this workspace."
            >
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setConfirmRemove(null)}>Cancel</Button>
                    <Button variant="danger" onClick={remove}>Remove</Button>
                </div>
            </Modal>
        </div>
    );
}