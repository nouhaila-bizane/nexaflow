import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, FileText, Lock, Cookie, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

const pages: Record<string, { icon: any; title: string; sections: { h: string; p: string }[] }> = {
    "Privacy Policy": {
        icon: Shield,
        title: "Privacy Policy",
        sections: [
            { h: "Information we collect", p: "We collect information you provide directly (name, email) and usage data (workflow executions, feature usage) to improve our service." },
            { h: "How we use your data", p: "Your data is used to operate NexaFlow, process transactions, send updates, and improve our products. We never sell your data to third parties." },
            { h: "Data security", p: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We undergo regular security audits and are SOC 2 Type II compliant." },
            { h: "Your rights", p: "You can export, modify, or delete your data at any time from your account settings. Contact us at privacy@nexaflow.app for assistance." },
        ],
    },
    "Terms of Service": {
        icon: FileText,
        title: "Terms of Service",
        sections: [
            { h: "Acceptance of terms", p: "By using NexaFlow, you agree to these terms. If you don't agree, please don't use our service." },
            { h: "License", p: "We grant you a limited, non-exclusive license to use NexaFlow for your internal business purposes in accordance with your subscription plan." },
            { h: "User responsibilities", p: "You are responsible for the content you process through NexaFlow and for maintaining the security of your account credentials." },
            { h: "Termination", p: "You may cancel your subscription at any time. We may suspend accounts that violate these terms or our acceptable use policy." },
        ],
    },
    "Security": {
        icon: Lock,
        title: "Security",
        sections: [
            { h: "Our commitment", p: "Security is foundational to NexaFlow. We employ defense-in-depth strategies across our infrastructure, applications, and processes." },
            { h: "Certifications", p: "NexaFlow is SOC 2 Type II certified. We undergo annual penetration testing by independent security firms." },
            { h: "Encryption", p: "All data is encrypted in transit using TLS 1.3 and at rest using AES-256. Encryption keys are managed through AWS KMS with automatic rotation." },
            { h: "Incident response", p: "We maintain a 24/7 incident response team. In the event of a security incident, affected users are notified within 72 hours." },
        ],
    },
    "Cookies": {
        icon: Cookie,
        title: "Cookie Policy",
        sections: [
            { h: "What are cookies", p: "Cookies are small text files stored on your device. We use them to remember your preferences and analyze site traffic." },
            { h: "Essential cookies", p: "These are required for NexaFlow to function (authentication, session management). They cannot be disabled." },
            { h: "Analytics cookies", p: "We use anonymized analytics to understand how our site is used. You can opt out at any time." },
            { h: "Managing cookies", p: "You can control cookies through your browser settings. Note that disabling essential cookies may break site functionality." },
        ],
    },
};

export default function Legal() {
    const [searchParams] = useSearchParams();
    const pageName = searchParams.get("page") || "Privacy Policy";
    const page = pages[pageName] || pages["Privacy Policy"];
    const Icon = page.icon;

    return (
        <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
            <section className="border-b border-slate-200/60 bg-slate-50/50 py-20 dark:border-slate-800/60 dark:bg-slate-900/30">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <motion.div key={pageName} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Button as={Link} to="/" variant="ghost" size="sm" leftIcon={<ArrowLeft className="h-4 w-4" />} className="mb-6">
                            Back to home
                        </Button>
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg">
                                <Icon className="h-7 w-7" />
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                                <span className="text-gradient-violet">{page.title}</span>
                            </h1>
                        </div>
                        <p className="mt-4 text-slate-600 dark:text-slate-400">Last updated: October 10, 2026</p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="space-y-10">
                        {page.sections.map((s, i) => (
                            <motion.div
                                key={s.h}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{s.h}</h2>
                                <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">{s.p}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 rounded-2xl border border-slate-200/60 bg-slate-50 p-8 dark:border-slate-800/60 dark:bg-slate-900">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Questions?</h3>
                        <p className="mt-2 text-slate-600 dark:text-slate-400">
                            If you have questions about our {page.title.toLowerCase()}, contact us at{" "}
                            <a href="mailto:legal@nexaflow.app" className="font-medium text-violet-600 hover:underline dark:text-violet-400">
                                legal@nexaflow.app
                            </a>.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}