import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/Toast";

export default function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const { toast } = useToast();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs: Record<string, string> = {};
        if (form.name.trim().length < 2) errs.name = "Name must be at least 2 characters";
        if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email";
        if (form.password.length < 8) errs.password = "Password must be at least 8 characters";
        setErrors(errs);
        if (Object.keys(errs).length) return;

        setLoading(true);
        try {
            await register(form.name, form.email, form.password);
            toast({ type: "success", message: "Account created. Welcome to NexaFlow!" });
            navigate("/app");
        } catch (err: any) {
            toast({ type: "error", message: err?.message || "Registration failed" });
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
                        Create your account
                    </h1>
                    <p className="mt-1 text-sm text-ink-500">Start automating in under a minute.</p>
                    <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
                        <Input
                            label="Full name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            error={errors.name}
                        />
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
                            autoComplete="new-password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            error={errors.password}
                            hint="At least 8 characters"
                        />
                        <Button type="submit" loading={loading} className="w-full">
                            Create account
                        </Button>
                    </form>
                    <p className="mt-5 text-center text-sm text-ink-500">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-brand-600 hover:underline dark:text-brand-400">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}