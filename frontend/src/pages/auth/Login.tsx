import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/Toast";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { toast } = useToast();
    const [form, setForm] = useState({ email: "demo@nexaflow.app", password: "password123" });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs: Record<string, string> = {};
        if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email";
        if (form.password.length < 8) errs.password = "Password must be at least 8 characters";
        setErrors(errs);
        if (Object.keys(errs).length) return;

        setLoading(true);
        try {
            await login(form.email, form.password);
            toast({ type: "success", message: "Welcome back!" });
            navigate("/app");
        } catch (err: any) {
            toast({ type: "error", message: err?.message || "Login failed" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-ink-50 px-4 py-12 dark:bg-ink-950">
            <div className="w-full max-w-md">
                <Link to="/" className="mb-8 flex items-center justify-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                        <Sparkles className="h-4 w-4" />
                    </div>
                    <span className="text-lg font-semibold tracking-tight">NexaFlow</span>
                </Link>
                <div className="rounded-2xl border border-ink-200 bg-white p-7 shadow-card dark:border-ink-800 dark:bg-ink-900">
                    <h1 className="text-2xl font-bold tracking-tight text-ink-900 dark:text-ink-50">
                        Welcome back
                    </h1>
                    <p className="mt-1 text-sm text-ink-500">Sign in to your workspace</p>
                    <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
                        <Input
                            label="Email"
                            type="email"
                            autoComplete="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            error={errors.email}
                        />
                        <Input
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            error={errors.password}
                        />
                        <Button type="submit" loading={loading} className="w-full">
                            Sign in
                        </Button>
                    </form>
                    <p className="mt-5 text-center text-sm text-ink-500">
                        Don't have an account?{" "}
                        <Link to="/register" className="font-medium text-brand-600 hover:underline dark:text-brand-400">
                            Create one
                        </Link>
                    </p>
                </div>
                <p className="mt-6 text-center text-xs text-ink-500">
                    Demo credentials pre-filled.
                </p>
            </div>
        </div>
    );
}