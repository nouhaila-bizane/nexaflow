import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, MailOpen, Trash2, Clock, User } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getMessages, markAsRead, type ContactMessage } from "@/lib/messages";
import { formatRelative } from "@/lib/utils";

export default function Inbox() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [selected, setSelected] = useState<ContactMessage | null>(null);

    useEffect(() => {
        setMessages(getMessages());
    }, []);

    const open = (msg: ContactMessage) => {
        if (!msg.read) {
            markAsRead(msg.id);
            setMessages(getMessages());
        }
        setSelected(msg);
    };

    const deleteMsg = (id: string) => {
        const remaining = messages.filter((m) => m.id !== id).map((m) => ({ ...m }));
        localStorage.setItem("nexaflow_messages", JSON.stringify(remaining));
        setMessages(remaining);
        if (selected?.id === id) setSelected(null);
    };

    const unread = messages.filter((m) => !m.read).length;

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-2xl font-bold text-ink-900 dark:text-ink-50">Inbox</h1>
                <p className="mt-1 text-sm text-ink-500">
                    {unread > 0 ? `${unread} unread message${unread > 1 ? "s" : ""}` : "No new messages"}
                </p>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-3">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <h2 className="font-semibold text-ink-900 dark:text-ink-50">Messages</h2>
                        </CardHeader>
                        <CardBody className="p-0">
                            {messages.length === 0 ? (
                                <div className="p-8 text-center text-sm text-ink-500">
                                    <Mail className="mx-auto mb-2 h-8 w-8 text-ink-300" />
                                    No messages yet
                                </div>
                            ) : (
                                <div className="divide-y divide-ink-100 dark:divide-ink-800">
                                    {messages.map((m) => (
                                        <button
                                            key={m.id}
                                            onClick={() => open(m)}
                                            className={`flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-ink-50 dark:hover:bg-ink-800/50 ${selected?.id === m.id ? "bg-brand-50 dark:bg-brand-500/10" : ""
                                                } ${!m.read ? "bg-brand-50/30 dark:bg-brand-500/5" : ""}`}
                                        >
                                            {m.read ? (
                                                <MailOpen className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" />
                                            ) : (
                                                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                                            )}
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center justify-between gap-2">
                                                    <p className={`truncate text-sm ${!m.read ? "font-semibold text-ink-900 dark:text-ink-50" : "text-ink-700 dark:text-ink-200"}`}>
                                                        {m.name}
                                                    </p>
                                                    <span className="shrink-0 text-[10px] text-ink-400">{formatRelative(m.createdAt)}</span>
                                                </div>
                                                <p className="truncate text-xs text-ink-500">{m.email}</p>
                                                <p className="mt-1 truncate text-xs text-ink-400">{m.message}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </CardBody>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
                    <Card>
                        {selected ? (
                            <>
                                <CardHeader className="flex items-start justify-between">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h2 className="font-semibold text-ink-900 dark:text-ink-50">{selected.name}</h2>
                                            {!selected.read && <Badge tone="brand">New</Badge>}
                                        </div>
                                        <p className="mt-1 text-xs text-ink-500">{selected.email}</p>
                                        <p className="mt-1 flex items-center gap-1 text-xs text-ink-400">
                                            <Clock className="h-3 w-3" /> {formatRelative(selected.createdAt)}
                                        </p>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => deleteMsg(selected.id)} leftIcon={<Trash2 className="h-4 w-4" />}>
                                        Delete
                                    </Button>
                                </CardHeader>
                                <CardBody>
                                    <div className="whitespace-pre-wrap rounded-xl bg-ink-50 p-4 text-sm text-ink-800 dark:bg-ink-800/50 dark:text-ink-100">
                                        {selected.message}
                                    </div>
                                    <div className="mt-4 flex items-center gap-2 rounded-xl border border-ink-200 bg-white p-3 dark:border-ink-800 dark:bg-ink-900">
                                        <User className="h-4 w-4 text-ink-400" />
                                        <span className="flex-1 text-sm text-ink-500">Reply to {selected.email} (demo only)</span>
                                        <Button size="sm">Reply</Button>
                                    </div>
                                </CardBody>
                            </>
                        ) : (
                            <div className="flex h-96 flex-col items-center justify-center text-center">
                                <Mail className="h-12 w-12 text-ink-300" />
                                <p className="mt-3 font-medium text-ink-700 dark:text-ink-200">Select a message</p>
                                <p className="mt-1 text-sm text-ink-500">Choose a message from the list to read it</p>
                            </div>
                        )}
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}