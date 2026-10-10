import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Briefcase, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

const positions = [
    { title: "Senior Frontend Engineer", team: "Engineering", location: "Remote", type: "Full-time" },
    { title: "Product Designer", team: "Design", location: "Remote", type: "Full-time" },
    { title: "Backend Engineer (Node.js)", team: "Engineering", location: "Remote", type: "Full-time" },
    { title: "Developer Advocate", team: "Marketing", location: "Remote", type: "Full-time" },
    { title: "Customer Success Manager", team: "Operations", location: "New York", type: "Full-time" },
];

const benefits = [
    { title: "Remote-first", desc: "Work from anywhere in the world" },
    { title: "Unlimited PTO", desc: "Take the time you need to recharge" },
    { title: "Equity for all", desc: "Every employee owns a piece of NexaFlow" },
    { title: "Learning budget", desc: "$2,000/year for courses and conferences" },
    { title: "Home office", desc: "$1,500 to set up your perfect workspace" },
    { title: "Health coverage", desc: "Premium medical, dental, and vision" },
];

export default function Careers() {
    return (
        <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
            <section className="relative overflow-hidden border-b border-slate-200/60 bg-slate-50/50 py-24 dark:border-slate-800/60 dark:bg-slate-900/30">
                <div className="absolute inset-0 mesh-gradient opacity-50" />
                <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Sparkles className="mx-auto h-12 w-12 text-violet-600 dark:text-violet-400" />
                        <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl">
                            Join the <span className="text-gradient-violet">NexaFlow</span> team
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                            We're building the future of work automation. Help us make it happen.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Open positions</h2>
                    <div className="mt-8 space-y-3">
                        {positions.map((pos, i) => (
                            <motion.a
                                key={pos.title}
                                href="#"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="group flex items-center justify-between rounded-2xl border border-slate-200/60 bg-white p-6 transition-all hover:border-violet-500 hover:shadow-lg dark:border-slate-800/60 dark:bg-slate-900"
                            >
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-violet-600 dark:text-white">{pos.title}</h3>
                                    <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate-500">
                                        <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> {pos.team}</span>
                                        <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {pos.location}</span>
                                        <span>{pos.type}</span>
                                    </div>
                                </div>
                                <ArrowRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-violet-600" />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-slate-200/60 bg-slate-50/50 py-20 dark:border-slate-800/60 dark:bg-slate-900/30">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Why work at NexaFlow?</h2>
                    <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {benefits.map((b, i) => (
                            <motion.div
                                key={b.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="rounded-2xl border border-slate-200/60 bg-white p-6 dark:border-slate-800/60 dark:bg-slate-900"
                            >
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{b.title}</h3>
                                <p className="mt-2 text-slate-600 dark:text-slate-400">{b.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-12 text-center">
                        <Button as={Link} to="/contact" size="lg">
                            Don't see your role? Get in touch <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}