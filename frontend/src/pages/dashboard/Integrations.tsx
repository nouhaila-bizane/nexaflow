import { useEffect, useState } from "react";
import { Check, Plug } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/Toast";
import type { Integration } from "@/types";

const catalog = [
    { provider: "slack", name: "Slack", desc: "Send notifications and trigger workflows from channels.", color: "from-purple-500 to-pink-500" },
    { provider: "gmail", name: "Gmail", desc: "Read, send, and label emails automatically.", color: "from-red-500 to-orange-500" },
    { provider: "google_sheets", name: "Google Sheets", desc: "Sync data to and from your spreadsheets.", color: "from-emerald-500 to-green-600" },
    { provider: "hubspot", name: "HubSpot", desc: "Sync contacts, deals, and activities.", color: "from-orange-500 to-red-500" },
    { provider: "notion", name: "Notion", desc: "Create and update pages and databases.", color: "from-ink-700 to-ink-900" },
    { provider: "discord", name: "Discord", desc: "Post messages and moderate communities.", color: "from-indigo-500 to-violet-600" },
    { provider: "shopify", name: "Shopify", desc: "Sync orders, customers, and inventory.", color: "from-green-500 to-emerald-600" },
];

export default function Integrations() {
    const { toast } = useToast();
    const [data, setData] = useState<Integration[]>([]);
    const [loading, setLoading] = useState(true);
    const [connecting, setConnecting] = useState<string | null>(null);
    const [done, setDone] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const { integrations } = await api.get<{ integrations: Integration[] }>("/integrations");
                setData(integrations);
            } catch (e: any) {
                toast({ type: "error", message: e?.message || "Failed to load integrations" });
            } finally {
                setLoading(false);
            }
        })();
    }, [toast]);

    const isConnected = (p: string) => data.find((d) => d.provider === p)?.connected ?? false;

    const connect = async (provider: string) => {
        setConnecting(provider);
        await new Promise((r) => setTimeout(r, 1200)); // simulated OAuth
        try {
            await api.post("/integrations/toggle", { provider });
            setData((prev) =>
                prev.find((d) => d.provider === provider)
                    ? prev.map((d) => (d.provider === provider ? { ...d, connected: true } : d))
                    : [...prev, { provider, connected: true }]
            );
            setDone(provider);
            setTimeout(() => setDone(null), 2000);
        } catch (e: any) {
            toast({ type: "error", message: e?.message || "Failed to connect" });
        } finally {
            setConnecting(null);
        }
    };

    const disconnect = async (provider: string) => {
        try {
            await api.post("/integrations/toggle", { provider });
            setData((prev) => prev.map((d) => (d.provider === provider ? { ...d, connected: false } : d)));
            toast({ type: "success", message: "Disconnected" });
        } catch (e: any) {
            toast({ type: "error", message: e?.message || "Failed to disconnect" });
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-ink-900 dark:text-ink-50">Integrations</h1>
                <p className="mt-1 text-sm text-ink-500">Connect the tools your team already uses.</p>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
                Connections are simulated for this demo. In production, each provider would use OAuth 2.0
                with real credentials.
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {catalog.map((c) => {
                    const connected = isConnected(c.provider);
                    return (
                        <Card key={c.provider}>
                            <CardBody>
                                <div className="flex items-start gap-3">
                                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${c.color} text-white`}>
                                        <Plug className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold text-ink-900 dark:text-ink-50">{c.name}</p>
                                            {connected && <Badge tone="success" dot>Connected</Badge>}
                                        </div>
                                        <p className="mt-1 text-sm text-ink-500">{c.desc}</p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    {connected ? (
                                        <Button variant="outline" size="sm" onClick={() => disconnect(c.provider)}>
                                            Disconnect
                                        </Button>
                                    ) : (
                                        <Button
                                            size="sm"
                                            onClick={() => connect(c.provider)}
                                            loading={connecting === c.provider}
                                        >
                                            Connect
                                        </Button>
                                    )}
                                </div>
                            </CardBody>
                        </Card>
                    );
                })}
            </div>

            <Modal open={!!done} onClose={() => setDone(null)} title="Connected">
                <div className="flex flex-col items-center py-4 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                        <Check className="h-6 w-6" />
                    </div>
                    <p className="mt-3 font-semibold text-ink-900 dark:text-ink-50">
                        {catalog.find((c) => c.provider === done)?.name} connected
                    </p>
                    <p className="mt-1 text-sm text-ink-500">You can now use this integration in your workflows.</p>
                    <Button className="mt-5" onClick={() => setDone(null)}>Done</Button>
                </div>
            </Modal>
        </div>
    );
}