import { useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { useToast } from "@/components/ui/Toast";
import { initials } from "@/lib/utils";

export default function Settings() {
    const { user } = useAuth();
    const { theme, toggle } = useTheme();
    const { toast } = useToast();
    const [profile, setProfile] = useState({
        name: user?.name ?? "",
        email: user?.email ?? "",
        workspace: user?.workspace ?? "",
    });
    const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
    const [notifications, setNotifications] = useState({
        workflowAlerts: true,
        weeklyDigest: true,
        productUpdates: false,
    });

    const saveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        toast({ type: "success", message: "Profile updated" });
    };

    const savePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwords.next.length < 8) {
            toast({ type: "error", message: "Password must be at least 8 characters" });
            return;
        }
        if (passwords.next !== passwords.confirm) {
            toast({ type: "error", message: "Passwords don't match" });
            return;
        }
        toast({ type: "success", message: "Password updated (simulated)" });
        setPasswords({ current: "", next: "", confirm: "" });
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-ink-900 dark:text-ink-50">Settings</h1>
                <p className="mt-1 text-sm text-ink-500">Manage your account and preferences.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <h2 className="font-semibold text-ink-900 dark:text-ink-50">Profile</h2>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={saveProfile} className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-lg font-semibold text-white">
                                    {initials(profile.name || "U")}
                                </span>
                                <div>
                                    <p className="font-medium text-ink-900 dark:text-ink-50">{profile.name || "Your name"}</p>
                                    <p className="text-xs text-ink-500">{profile.email}</p>
                                </div>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Input label="Name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                                <Input label="Email" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                                <Input label="Workspace" value={profile.workspace} onChange={(e) => setProfile({ ...profile, workspace: e.target.value })} className="sm:col-span-2" />
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit">Save changes</Button>
                            </div>
                        </form>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>
                        <h2 className="font-semibold text-ink-900 dark:text-ink-50">Appearance</h2>
                    </CardHeader>
                    <CardBody>
                        <p className="text-sm text-ink-500">Theme</p>
                        <div className="mt-2 inline-flex rounded-lg border border-ink-200 bg-white p-0.5 dark:border-ink-700 dark:bg-ink-900">
                            <button
                                onClick={() => theme !== "light" && toggle()}
                                className={`rounded-md px-3 py-1.5 text-xs font-medium ${theme === "light" ? "bg-ink-900 text-white dark:bg-white dark:text-ink-900" : "text-ink-600 dark:text-ink-300"}`}
                            >
                                Light
                            </button>
                            <button
                                onClick={() => theme !== "dark" && toggle()}
                                className={`rounded-md px-3 py-1.5 text-xs font-medium ${theme === "dark" ? "bg-ink-900 text-white dark:bg-white dark:text-ink-900" : "text-ink-600 dark:text-ink-300"}`}
                            >
                                Dark
                            </button>
                        </div>
                    </CardBody>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <h2 className="font-semibold text-ink-900 dark:text-ink-50">Security</h2>
                </CardHeader>
                <CardBody>
                    <form onSubmit={savePassword} className="grid gap-4 sm:grid-cols-3">
                        <Input label="Current password" type="password" value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} />
                        <Input label="New password" type="password" value={passwords.next} onChange={(e) => setPasswords({ ...passwords, next: e.target.value })} />
                        <Input label="Confirm password" type="password" value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} />
                        <div className="sm:col-span-3 flex justify-end">
                            <Button type="submit">Update password</Button>
                        </div>
                    </form>
                </CardBody>
            </Card>

            <Card>
                <CardHeader>
                    <h2 className="font-semibold text-ink-900 dark:text-ink-50">Notifications</h2>
                </CardHeader>
                <CardBody className="space-y-3">
                    {[
                        { k: "workflowAlerts", label: "Workflow alerts", desc: "Get notified when workflows fail." },
                        { k: "weeklyDigest", label: "Weekly digest", desc: "Summary of automation activity." },
                        { k: "productUpdates", label: "Product updates", desc: "New features and announcements." },
                    ].map((n) => (
                        <label key={n.k} className="flex items-start justify-between gap-4 rounded-xl border border-ink-100 p-3 dark:border-ink-800">
                            <div>
                                <p className="text-sm font-medium text-ink-900 dark:text-ink-50">{n.label}</p>
                                <p className="text-xs text-ink-500">{n.desc}</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={(notifications as any)[n.k]}
                                onChange={(e) => setNotifications({ ...notifications, [n.k]: e.target.checked })}
                                className="mt-1 h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
                            />
                        </label>
                    ))}
                </CardBody>
            </Card>
        </div>
    );
}