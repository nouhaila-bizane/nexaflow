
import { useEffect, useState } from "react";
import api from "../../lib/api";

type AdminStats = {
    overview: {
        totalUsers: number;
        newUsersLast30Days: number;
        totalWorkflows: number;
        activeWorkflows: number;
        totalAgents: number;
        activeAgents: number;
        totalActivities: number;
    };
    recentUsers: {
        _id: string;
        name: string;
        email: string;
        role: string;
        createdAt: string;
    }[];
    recentActivities: {
        _id: string;
        type: string;
        message: string;
        createdAt: string;
        user?: {
            name: string;
            email: string;
        };
    }[];
};

function StatCard({
    title,
    value,
    description,
}: {
    title: string;
    value: number;
    description: string;
}) {
    return (
        <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm dark:border-ink-800 dark:bg-ink-900">
            <p className="text-sm font-medium text-ink-500">{title}</p>
            <p className="mt-3 text-3xl font-bold text-ink-950 dark:text-white">
                {value.toLocaleString()}
            </p>
            <p className="mt-2 text-sm text-ink-500">{description}</p>
        </div>
    );
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadStats() {
            try {
                const data = await api.get<AdminStats>("/admin/stats");
                setStats(data);
            } catch (err) {
                setError("Impossible de charger les statistiques.");
            } finally {
                setLoading(false);
            }
        }

        loadStats();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-ink-50 p-8 dark:bg-ink-950">
                <p className="text-ink-500">Chargement du tableau de bord...</p>
            </div>
        );
    }

    if (error || !stats) {
        return (
            <div className="min-h-screen bg-ink-50 p-8 dark:bg-ink-950">
                <h1 className="text-2xl font-bold text-ink-950 dark:text-white">
                    Super Admin
                </h1>
                <p className="mt-4 text-red-500">
                    {error || "Aucune donnée disponible."}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 rounded-xl bg-ink-950 px-4 py-2 text-white dark:bg-white dark:text-ink-950"
                >
                    Réessayer
                </button>
            </div>
        );
    }

    const { overview, recentUsers, recentActivities } = stats;

    return (
        <div className="min-h-screen bg-ink-50 p-6 dark:bg-ink-950 md:p-10">
            <div className="mx-auto max-w-7xl space-y-8">
                <header className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
                            NexaFlow Administration
                        </p>
                        <h1 className="mt-2 text-3xl font-bold text-ink-950 dark:text-white">
                            Super Admin Dashboard
                        </h1>
                        <p className="mt-2 text-ink-500">
                            Vue globale de votre plateforme.
                        </p>
                    </div>

                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                        Super Admin
                    </span>
                </header>

                <section>
                    <h2 className="mb-4 text-lg font-semibold text-ink-950 dark:text-white">
                        Vue d'ensemble
                    </h2>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <StatCard
                            title="Utilisateurs"
                            value={overview.totalUsers}
                            description={`+${overview.newUsersLast30Days} ces 30 derniers jours`}
                        />
                        <StatCard
                            title="Workflows"
                            value={overview.totalWorkflows}
                            description={`${overview.activeWorkflows} actifs`}
                        />
                        <StatCard
                            title="Agents IA"
                            value={overview.totalAgents}
                            description={`${overview.activeAgents} actifs`}
                        />
                        <StatCard
                            title="Activités"
                            value={overview.totalActivities}
                            description="Activités enregistrées"
                        />
                    </div>
                </section>

                <section className="rounded-2xl border border-ink-200 bg-white p-6 dark:border-ink-800 dark:bg-ink-900">
                    <h2 className="mb-5 text-lg font-semibold text-ink-950 dark:text-white">
                        Derniers utilisateurs inscrits
                    </h2>

                    {recentUsers.length === 0 ? (
                        <p className="text-sm text-ink-500">
                            Aucun utilisateur pour le moment.
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-ink-200 text-ink-500 dark:border-ink-800">
                                        <th className="px-3 py-3">Nom</th>
                                        <th className="px-3 py-3">Email</th>
                                        <th className="px-3 py-3">Rôle</th>
                                        <th className="px-3 py-3">Inscription</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentUsers.map((user) => (
                                        <tr
                                            key={user._id}
                                            className="border-b border-ink-100 dark:border-ink-800"
                                        >
                                            <td className="px-3 py-4 font-medium text-ink-950 dark:text-white">
                                                {user.name}
                                            </td>
                                            <td className="px-3 py-4 text-ink-500">
                                                {user.email}
                                            </td>
                                            <td className="px-3 py-4">
                                                <span className="rounded-full bg-ink-100 px-3 py-1 text-xs dark:bg-ink-800">
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-3 py-4 text-ink-500">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>

                <section className="rounded-2xl border border-ink-200 bg-white p-6 dark:border-ink-800 dark:bg-ink-900">
                    <h2 className="mb-5 text-lg font-semibold text-ink-950 dark:text-white">
                        Activités récentes
                    </h2>

                    {recentActivities.length === 0 ? (
                        <p className="text-sm text-ink-500">
                            Aucune activité enregistrée pour le moment.
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {recentActivities.map((activity) => (
                                <div
                                    key={activity._id}
                                    className="flex flex-col justify-between gap-2 border-b border-ink-100 pb-4 dark:border-ink-800 sm:flex-row"
                                >
                                    <div>
                                        <p className="font-medium text-ink-950 dark:text-white">
                                            {activity.message}
                                        </p>
                                        <p className="mt-1 text-xs text-ink-500">
                                            {activity.user?.name || "Système"} · {activity.type}
                                        </p>
                                    </div>
                                    <p className="text-xs text-ink-500">
                                        {new Date(activity.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
