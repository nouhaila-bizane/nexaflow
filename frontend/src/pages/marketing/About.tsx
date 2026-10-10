import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";

const team = [
    { name: "Sofia Alvarez", role: "CEO & Co-founder", initials: "SA" },
    { name: "Marcus Lin", role: "CTO & Co-founder", initials: "ML" },
    { name: "Aisha Bello", role: "Head of Design", initials: "AB" },
    { name: "Jonas Weber", role: "Head of Engineering", initials: "JW" },
];

export default function About() {
    return (
        <>
            <section className="border-b border-ink-100 py-20 dark:border-ink-800">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl dark:text-ink-50">
                        We're building the operating system for modern work
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-600 dark:text-ink-300">
                        NexaFlow was founded in 2024 by a team of engineers and operators who were tired of copy-pasting between tools. We believe automation should be invisible, intelligent, and accessible to every team.
                    </p>
                </div>
            </section>
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-center text-2xl font-bold tracking-tight text-ink-900 dark:text-ink-50">Meet the team</h2>
                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {team.map((m) => (
                            <div key={m.name} className="rounded-2xl border border-ink-200 bg-white p-6 text-center dark:border-ink-800 dark:bg-ink-900">
                                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-lg font-semibold text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
                                    {m.initials}
                                </span>
                                <p className="mt-4 font-semibold text-ink-900 dark:text-ink-50">{m.name}</p>
                                <p className="text-sm text-ink-500">{m.role}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-14 text-center">
                        <Button as={Link} to="/contact" size="lg">Get in touch</Button>
                    </div>
                </div>
            </section>
        </>
    );
}