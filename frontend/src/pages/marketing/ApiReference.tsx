import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Code, Copy, Check, Lock, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

const endpoints = [
    {
        method: "POST",
        methodColor: "bg-emerald-500",
        path: "/api/auth/login",
        description: "Authenticate a user and receive a JWT token.",
        body: `{
  "email": "user@example.com",
  "password": "••••••••"
}`,
        response: `{
  "token": "eyJhbGciOi...",
  "user": {
    "id": "usr_123",
    "name": "Alex Morgan",
    "email": "user@example.com"
  }
}`,
    },
    {
        method: "GET",
        methodColor: "bg-blue-500",
        path: "/api/workflows",
        description: "List all workflows for the authenticated user.",
        response: `{
  "workflows": [
    {
      "id": "wf_abc",
      "name": "Lead Qualification",
      "status": "active",
      "executions": 248
    }
  ]
}`,
    },
    {
        method: "POST",
        methodColor: "bg-emerald-500",
        path: "/api/workflows",
        description: "Create a new workflow.",
        body: `{
  "name": "New Workflow",
  "steps": [
    { "type": "trigger", "label": "Webhook" }
  ]
}`,
        response: `{
  "id": "wf_xyz",
  "name": "New Workflow",
  "status": "draft",
  "createdAt": "2026-10-10T12:00:00Z"
}`,
    },
    {
        method: "POST",
        methodColor: "bg-emerald-500",
        path: "/api/agents",
        description: "Deploy a new AI agent.",
        body: `{
  "name": "Support Agent",
  "model": "gpt-4",
  "instructions": "Handle tier-1 support..."
}`,
        response: `{
  "id": "agt_123",
  "name": "Support Agent",
  "status": "active"
}`,
    },
    {
        method: "GET",
        methodColor: "bg-blue-500",
        path: "/api/analytics",
        description: "Get workflow execution analytics.",
        response: `{
  "totalExecutions": 12480,
  "successRate": 96.4,
  "hoursSaved": 2246,
  "series": [...]
}`,
    },
];

function CodeBlock({ code, language }: { code: string; language: string }) {
    const [copied, setCopied] = useState(false);
    const copy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <div className="relative overflow-hidden rounded-xl bg-slate-950 p-4 font-mono text-sm text-slate-100">
            <div className="mb-2 flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs text-slate-500">{language}</span>
                <button onClick={copy} className="flex items-center gap-1 text-xs text-slate-400 hover:text-white">
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copied ? "Copied" : "Copy"}
                </button>
            </div>
            <pre className="overflow-x-auto whitespace-pre text-xs leading-relaxed">{code}</pre>
        </div>
    );
}

export default function ApiReference() {
    return (
        <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
            {/* Hero */}
            <section className="relative overflow-hidden border-b border-slate-200/60 bg-slate-50/50 py-20 dark:border-slate-800/60 dark:bg-slate-900/30">
                <div className="absolute inset-0 mesh-gradient opacity-50" />
                <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Button as={Link} to="/" variant="ghost" size="sm" leftIcon={<ArrowLeft className="h-4 w-4" />} className="mb-6">
                            Back to home
                        </Button>
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg">
                                <Code className="h-7 w-7" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                                    <span className="text-gradient-violet">API Reference</span>
                                </h1>
                                <p className="mt-2 text-slate-600 dark:text-slate-400">RESTful API · v2.4 · October 2026</p>
                            </div>
                        </div>

                        <div className="mt-8 grid gap-4 sm:grid-cols-3">
                            {[
                                { icon: Globe, label: "Base URL", value: "https://api.nexaflow.app" },
                                { icon: Lock, label: "Auth", value: "Bearer JWT" },
                                { icon: Zap, label: "Rate limit", value: "1000 req/min" },
                            ].map((item) => (
                                <div key={item.label} className="rounded-2xl border border-slate-200/60 bg-white p-4 dark:border-slate-800/60 dark:bg-slate-900">
                                    <item.icon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                                    <p className="mt-2 text-xs font-medium uppercase tracking-wider text-slate-500">{item.label}</p>
                                    <p className="mt-1 font-mono text-sm text-slate-900 dark:text-white">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Authentication */}
            <section className="py-16">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Authentication</h2>
                        <p className="mt-3 text-slate-600 dark:text-slate-400">
                            All API requests require a Bearer token in the Authorization header. Obtain a token via the login endpoint.
                        </p>
                        <div className="mt-6">
                            <CodeBlock language="bash" code={`curl -X POST https://api.nexaflow.app/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"user@example.com","password":"••••••••"}'`} />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Endpoints */}
            <section className="border-t border-slate-200/60 py-16 dark:border-slate-800/60">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Endpoints</h2>
                    <div className="mt-8 space-y-6">
                        {endpoints.map((ep, i) => (
                            <motion.div
                                key={ep.path}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white dark:border-slate-800/60 dark:bg-slate-900"
                            >
                                <div className="flex flex-wrap items-center gap-3 border-b border-slate-200/60 p-5 dark:border-slate-800/60">
                                    <span className={`${ep.methodColor} rounded-lg px-2.5 py-1 font-mono text-xs font-bold text-white`}>
                                        {ep.method}
                                    </span>
                                    <code className="font-mono text-sm text-slate-900 dark:text-white">{ep.path}</code>
                                </div>
                                <div className="p-5">
                                    <p className="text-slate-600 dark:text-slate-400">{ep.description}</p>
                                    {ep.body && (
                                        <div className="mt-4">
                                            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Request body</p>
                                            <CodeBlock language="json" code={ep.body} />
                                        </div>
                                    )}
                                    <div className="mt-4">
                                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Response</p>
                                        <CodeBlock language="json" code={ep.response} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SDKs */}
            <section className="border-t border-slate-200/60 bg-slate-50/50 py-16 dark:border-slate-800/60 dark:bg-slate-900/30">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Official SDKs</h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-400">Use our SDKs to integrate NexaFlow in your favorite language.</p>
                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {["JavaScript / Node", "Python", "Go", "Ruby"].map((sdk, i) => (
                            <motion.div
                                key={sdk}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="rounded-2xl border border-slate-200/60 bg-white p-6 text-center transition-all hover:border-violet-500 hover:shadow-lg dark:border-slate-800/60 dark:bg-slate-900"
                            >
                                <Code className="mx-auto h-8 w-8 text-violet-600 dark:text-violet-400" />
                                <p className="mt-3 font-semibold text-slate-900 dark:text-white">{sdk}</p>
                                <Button variant="ghost" size="sm" className="mt-3">
                                    View docs
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}