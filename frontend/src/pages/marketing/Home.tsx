import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    ArrowRight,
    Sparkles,
    Zap,
    Bot,
    CheckCircle2,
    Shield,
    Play,
    Workflow,
    BarChart3,
    Users,
    Brain,
    Code,
    Globe,
    Star,
    TrendingUp,
    Clock,
    Layers,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

// ============ LOGOS SVG COLORÉS ============

const logos = [
    {
        name: "Slack",
        svg: (
            <svg className="h-8 w-auto" viewBox="0 0 122.8 122.8" fill="none">
                <path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" fill="#E01E5A" />
                <path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z" fill="#36C5F0" />
                <path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z" fill="#2EB67D" />
                <path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" fill="#ECB22E" />
            </svg>
        ),
    },
    {
        name: "Stripe",
        svg: (
            <svg className="h-8 w-auto" viewBox="0 0 60 25" fill="#635BFF">
                <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a13.4 13.4 0 0 1-4.56.78c-4.14 0-6.9-2.55-6.9-7.12 0-3.81 2.38-7.17 6.28-7.17 3.74 0 6.11 3.04 6.11 7.29 0 .52-.05 1.09-.12 1.3zm-4.17-4.92c0-1.14-.53-2.45-1.64-2.45-1.09 0-1.73 1.28-1.82 2.45h3.46zM40.1 2.58c2.07 0 3.37.97 3.37 3.24v3.46h3.46v3.37h-3.46v8.37c0 1.73.52 2.71 2 2.71.67 0 1.45-.22 2.07-.55v3.37a7.4 7.4 0 0 1-2.91.61c-3.04 0-4.63-1.64-4.63-5.04v-9.47h-2.76V9.28h2.76V6.19c0-2.51 1.34-3.61 3.1-3.61zM27.78 1.3c2.98 0 5.13 1.42 5.13 4.58 0 2.4-1.39 3.87-3.15 4.66 1.98.71 3.43 2.32 3.43 4.86 0 3.43-2.6 5.13-5.99 5.13-2.82 0-5.02-1.2-6.37-3.04l3.37-2.26c.97 1.34 2.01 2.01 3.43 2.01 1.51 0 2.54-.88 2.54-2.29 0-1.58-1.2-2.4-3.32-2.4h-1.82v-3.18h1.82c1.64 0 2.73-.74 2.73-2.18 0-1.28-.92-1.98-2.35-1.98-1.2 0-2.21.55-3.07 1.64l-2.9-2.21c1.2-1.53 2.9-2.34 5.02-2.34h1.5zM13.4 1.3c2.98 0 5.13 1.42 5.13 4.58 0 2.4-1.39 3.87-3.15 4.66 1.98.71 3.43 2.32 3.43 4.86 0 3.43-2.6 5.13-5.99 5.13-2.82 0-5.02-1.2-6.37-3.04l3.37-2.26c.97 1.34 2.01 2.01 3.43 2.01 1.51 0 2.54-.88 2.54-2.29 0-1.58-1.2-2.4-3.32-2.4H10.65v-3.18h1.82c1.64 0 2.73-.74 2.73-2.18 0-1.28-.92-1.98-2.35-1.98-1.2 0-2.21.55-3.07 1.64l-2.9-2.21c1.2-1.53 2.9-2.34 5.02-2.34h1.5zM0 2.58h3.46v17.94H0V2.58z" />
            </svg>
        ),
    },
    {
        name: "Vercel",
        svg: (
            <svg className="h-8 w-auto" viewBox="0 0 76 65" fill="#000000">
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
            </svg>
        ),
    },
    {
        name: "GitHub",
        svg: (
            <svg className="h-8 w-auto" viewBox="0 0 24 24" fill="#24292F">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    {
        name: "Figma",
        svg: (
            <svg className="h-8 w-auto" viewBox="0 0 38 57" fill="none">
                <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
                <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
                <path d="M19 0h9.5a9.5 9.5 0 0 1 0 19H19V0z" fill="#FF7262" />
                <path d="M0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5z" fill="#F24E1E" />
                <path d="M0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5z" fill="#A259FF" />
            </svg>
        ),
    },
    {
        name: "Notion",
        svg: (
            <svg className="h-8 w-auto" viewBox="0 0 100 100" fill="#000000">
                <path d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z" />
                <path d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917zM25.92 19.523c-5.247 0.353 -6.437 0.433 -9.417 -1.99L8.927 11.507c-0.77 -0.78 -0.383 -1.753 1.557 -1.947l53.003 -3.887c4.467 -0.39 6.793 1.167 8.543 2.527l9.123 6.61c0.39 0.197 1.36 1.36 -0.193 1.557l-54.04 3.113z" />
                <path d="M18.737 88.3V30.78c0 -2.53 0.777 -3.697 3.103 -3.893L86 22.02c2.14 -0.193 3.107 1.167 3.107 3.693v57.133c0 2.53 -0.39 4.67 -3.883 4.863l-60.04 3.5c-3.493 0.193 -5.047 -0.97 -6.447 -2.913z" />
            </svg>
        ),
    },
];

// ============ ANIMATION VARIANTS ============

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
    visible: { transition: { staggerChildren: 0.1 } },
};

// ============ PAGE PRINCIPALE ============

export default function Home() {
    const { scrollYProgress } = useScroll();
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    return (
        <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white overflow-x-hidden">
            {/* HERO SECTION */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-violet-950/20" />
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMzksOTIsMjQ2LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
                </div>

                <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left content */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={stagger}
                            className="text-center lg:text-left"
                        >
                            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 border border-violet-200 dark:border-violet-800 mb-6">
                                <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                                <span className="text-sm font-medium text-violet-700 dark:text-violet-300">New: AI Agents 2.0</span>
                            </motion.div>

                            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                                Automate work.
                                <br />
                                <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    Amplify your team.
                                </span>
                            </motion.h1>

                            <motion.p variants={fadeInUp} className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0">
                                NexaFlow helps modern teams build intelligent workflows, connect their tools, and automate repetitive work with AI — in minutes, not months.
                            </motion.p>

                            <motion.div variants={fadeInUp} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Button as={Link} to="/register" size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-500/25">
                                    Start for free
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                                <Button as={Link} to="/features" variant="outline" size="lg" className="border-2">
                                    <Play className="mr-2 h-4 w-4" />
                                    Watch demo
                                </Button>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap items-center gap-6 justify-center lg:justify-start">
                                <div className="flex -space-x-3">
                                    {["bg-violet-500", "bg-indigo-500", "bg-purple-500", "bg-pink-500"].map((color, i) => (
                                        <div key={i} className={`w-10 h-10 rounded-full ${color} border-2 border-white dark:border-slate-900 flex items-center justify-center text-white text-xs font-bold`}>
                                            {["AM", "JD", "SK", "RL"][i]}
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        ))}
                                        <span className="ml-2 font-bold text-slate-900 dark:text-white">4.9</span>
                                    </div>
                                    <p className="text-sm text-slate-500">Loved by 2,000+ teams</p>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right visual */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative hidden lg:block"
                        >
                            {/* Main dashboard card - Flotte légèrement */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 backdrop-blur-xl"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                                            <Sparkles className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="font-semibold">NexaFlow</span>
                                    </div>
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-400" />
                                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                                        <div className="w-3 h-3 rounded-full bg-emerald-400" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-3 mb-6">
                                    {[
                                        { label: "Executions", value: "12,480", trend: "+24%", icon: BarChart3 },
                                        { label: "Success", value: "96.4%", trend: "+2.1%", icon: CheckCircle2 },
                                        { label: "Time saved", value: "2,246h", trend: "+18%", icon: Clock },
                                    ].map((stat, i) => (
                                        <motion.div
                                            key={stat.label}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 + i * 0.1 }}
                                            className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3"
                                        >
                                            <stat.icon className="w-4 h-4 text-violet-500 mb-2" />
                                            <p className="text-xs text-slate-500 mb-1">{stat.label}</p>
                                            <p className="text-lg font-bold">{stat.value}</p>
                                            <p className="text-xs text-emerald-600 font-medium">{stat.trend}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Chart */}
                                <div className="h-32 flex items-end gap-1">
                                    {Array.from({ length: 20 }).map((_, i) => {
                                        const height = 20 + ((i * 47) % 80);
                                        return (
                                            <motion.div
                                                key={i}
                                                initial={{ height: 0 }}
                                                animate={{ height: `${height}%` }}
                                                transition={{ delay: 0.8 + i * 0.03, duration: 0.5 }}
                                                className="flex-1 bg-gradient-to-t from-violet-600 to-indigo-400 rounded-t"
                                            />
                                        );
                                    })}
                                </div>
                            </motion.div>

                            {/* Floating card 1 - Top left */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0, y: [0, -15, 0] }}
                                transition={{
                                    delay: 1,
                                    duration: 0.6,
                                    y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                                }}
                                className="absolute -left-8 top-20 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-4 w-56"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                                        <Zap className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold">New lead captured</p>
                                        <p className="text-xs text-slate-500">From landing page</p>
                                        <div className="flex items-center gap-1 mt-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            <span className="text-xs text-emerald-600 font-medium">Triggered</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating card 2 - Right */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0, y: [0, -12, 0] }}
                                transition={{
                                    delay: 1.2,
                                    duration: 0.6,
                                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                                }}
                                className="absolute -right-4 top-32 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-4 w-52"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                                        <Bot className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold">AI Agent analyzing</p>
                                        <p className="text-xs text-slate-500">Intent: Purchase</p>
                                        <div className="mt-2 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "78%" }}
                                                transition={{ duration: 2, delay: 1.5 }}
                                                className="h-full bg-gradient-to-r from-violet-500 to-indigo-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating card 3 - Bottom */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: [0, -10, 0] }}
                                transition={{
                                    delay: 1.4,
                                    duration: 0.6,
                                    y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }
                                }}
                                className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-4 w-48"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                                        <CheckCircle2 className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Response sent</p>
                                        <p className="text-lg font-bold text-emerald-600">142ms</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* LOGOS MARQUEE - Carrousel infini */}
            <section className="py-16 border-y border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                    <p className="text-center text-sm font-medium text-slate-500">Trusted by innovative teams at</p>
                </div>

                <div className="relative mask-fade-sides">
                    {/* Première rangée */}
                    <div className="flex animate-scroll gap-16">
                        {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
                            <div
                                key={i}
                                className="flex shrink-0 items-center justify-center hover:scale-110 transition-transform"
                            >
                                {logo.svg}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURES BENTO GRID */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="text-center mb-16"
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 mb-4">
                            <Layers className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                            <span className="text-sm font-medium text-violet-700 dark:text-violet-300">Platform</span>
                        </motion.div>
                        <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold tracking-tight">
                            Everything you need to{" "}
                            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                                automate work
                            </span>
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            A complete toolkit for modern teams to build, deploy, and monitor intelligent workflows.
                        </motion.p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Large card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden group hover:shadow-2xl transition-shadow"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors" />
                            <Brain className="w-12 h-12 mb-6 relative z-10" />
                            <h3 className="text-3xl font-bold mb-4 relative z-10">AI-Powered Logic</h3>
                            <p className="text-lg text-violet-100 mb-8 relative z-10">
                                Let AI classify, route, and draft responses automatically based on context.
                            </p>
                            <div className="relative z-10 space-y-3">
                                {["Smart classification", "Intent detection", "Auto-routing", "Context-aware responses"].map((feature, i) => (
                                    <motion.div
                                        key={feature}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-3"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                                        <span>{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Small cards */}
                        {[
                            { icon: Workflow, title: "Visual Builder", desc: "Drag, drop, and connect. No code required.", color: "from-blue-500 to-cyan-500" },
                            { icon: Globe, title: "100+ Integrations", desc: "Slack, Gmail, HubSpot, and more.", color: "from-emerald-500 to-teal-500" },
                            { icon: Users, title: "Team Collaboration", desc: "Shared workspaces, roles, and permissions.", color: "from-amber-500 to-orange-500" },
                            { icon: Shield, title: "Enterprise Security", desc: "SOC 2 compliant. Encrypted at rest and in transit.", color: "from-fuchsia-500 to-pink-500" },
                        ].map((feature, i) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -4 }}
                                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow"
                            >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                                    <feature.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WORKFLOW DEMO */}
            <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 mb-4">
                                <Code className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                                <span className="text-sm font-medium text-violet-700 dark:text-violet-300">How it works</span>
                            </motion.div>
                            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
                                From idea to live workflow in{" "}
                                <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                                    minutes
                                </span>
                            </motion.h2>
                            <motion.p variants={fadeInUp} className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                                Design complex automations visually. Connect triggers, add AI steps, and deploy without writing a single line of code.
                            </motion.p>
                            <motion.div variants={fadeInUp}>
                                <Button as={Link} to="/features" variant="outline" size="lg">
                                    Explore the builder
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6">
                                <div className="space-y-4">
                                    {[
                                        { icon: Zap, label: "Trigger", desc: "New lead submitted", color: "bg-amber-500" },
                                        { icon: Brain, label: "AI Analysis", desc: "Extract intent & context", color: "bg-violet-500" },
                                        { icon: Workflow, label: "Decision", desc: "Classify lead quality", color: "bg-indigo-500" },
                                        { icon: CheckCircle2, label: "Action", desc: "Send personalized reply", color: "bg-emerald-500" },
                                    ].map((step, i) => (
                                        <motion.div
                                            key={step.label}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.15 }}
                                            className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800"
                                        >
                                            <div className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center`}>
                                                <step.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs font-medium text-slate-500 mb-1">Step {i + 1} · {step.label}</p>
                                                <p className="font-semibold">{step.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { value: "12,480+", label: "Workflows created", icon: Workflow },
                            { value: "96.4%", label: "Success rate", icon: CheckCircle2 },
                            { value: "2,246h", label: "Time saved monthly", icon: Clock },
                            { value: "2,000+", label: "Happy teams", icon: Users },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center"
                            >
                                <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 items-center justify-center mb-4">
                                    <stat.icon className="w-8 h-8 text-white" />
                                </div>
                                <p className="text-4xl font-bold mb-2">{stat.value}</p>
                                <p className="text-slate-600 dark:text-slate-400">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-600 rounded-3xl p-12 sm:p-16 text-center text-white overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
                        <div className="relative z-10">
                            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Ready to automate the work?</h2>
                            <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
                                Join thousands of teams shipping faster with NexaFlow. Start your free trial today.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button as={Link} to="/register" size="lg" className="bg-white text-violet-700 hover:bg-violet-50">
                                    Start for free
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                                <Button as={Link} to="/contact" variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white/10">
                                    Talk to sales
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}