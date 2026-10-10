import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { saveMessage } from "@/lib/messages";

export default function Contact() {
    const { toast } = useToast();
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const e: Record<string, string> = {};
        if (form.name.trim().length < 2) e.name = "Please enter your name";
        if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Please enter a valid email";
        if (form.message.trim().length < 10) e.message = "Message must be at least 10 characters";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const submit = async (ev: React.FormEvent) => {
        ev.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            saveMessage({ name: form.name, email: form.email, message: form.message });
            toast({ type: "success", message: "Message sent! We'll reply within 24h." });
            setForm({ name: "", email: "", message: "" });
        } catch {
            toast({ type: "error", message: "Failed to send" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="border-b border-ink-100 py-20 dark:border-ink-800">
                <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl dark:text-ink-50">Get in touch</h1>
                    <p className="mt-4 text-lg text-ink-600 dark:text-ink-300">Questions, feedback, or partnership inquiries — we'd love to hear from you.</p>
                </div>
            </section>
            <section className="py-16">
                <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="space-y-4 rounded-2xl border border-ink-200 bg-white p-6 shadow-soft dark:border-ink-800 dark:bg-ink-900" noValidate>
                        <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} />
                        <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} />
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">Message</label>
                            <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-xl border border-ink-200 bg-white p-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-50" />
                            {errors.message && <p className="mt-1.5 text-xs text-red-600">{errors.message}</p>}
                        </div>
                        <Button type="submit" loading={loading} className="w-full">Send message</Button>
                    </form>
                </div>
            </section>
        </>
    );
}