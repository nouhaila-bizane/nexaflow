
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { MarketingLayout } from "./components/layout/MarketingLayout";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Skeleton } from "./components/ui/Skeleton";

import Home from "./pages/marketing/Home";
import Features from "./pages/marketing/Features";
import Pricing from "./pages/marketing/Pricing";
import About from "./pages/marketing/About";
import Solutions from "./pages/marketing/Solutions";
import Contact from "./pages/marketing/Contact";
import ComingSoon from "./pages/marketing/ComingSoon";
import Documentation from "./pages/marketing/Documentation";
import Blog from "./pages/marketing/Blog";
import Careers from "./pages/marketing/Careers";
import Legal from "./pages/marketing/Legal";
import Changelog from "./pages/marketing/Changelog";
import Guides from "./pages/marketing/Guides";
import ApiReference from "./pages/marketing/ApiReference";
import Press from "./pages/marketing/Press";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Overview from "./pages/dashboard/Overview";
import Workflows from "./pages/dashboard/Workflows";
import WorkflowBuilder from "./pages/dashboard/WorkflowBuilder";
import Agents from "./pages/dashboard/Agents";
import Integrations from "./pages/dashboard/Integrations";
import Analytics from "./pages/dashboard/Analytics";
import Team from "./pages/dashboard/Team";
import Settings from "./pages/dashboard/Settings";
import Inbox from "./pages/dashboard/Inbox";

import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";

function LoadingScreen() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-ink-50 dark:bg-ink-950">
            <div className="w-64 space-y-3">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-48 w-full" />
            </div>
        </div>
    );
}

function Protected({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();

    if (loading) return <LoadingScreen />;
    if (!user) return <Navigate to="/login" replace />;

    return <>{children}</>;
}

function SuperAdminProtected({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();

    if (loading) return <LoadingScreen />;
    if (!user) return <Navigate to="/login" replace />;

    if (user.role !== "superadmin") {
        return <Navigate to="/app" replace />;
    }

    return <>{children}</>;
}

function PublicOnly({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();

    if (loading) return null;

    if (user) {
        return (
            <Navigate
                to={user.role === "superadmin" ? "/admin" : "/app"}
                replace
            />
        );
    }

    return <>{children}</>;
}

export default function App() {
    return (
        <Routes>
            <Route element={<MarketingLayout />}>
                <Route index element={<Home />} />
                <Route path="features" element={<Features />} />
                <Route path="solutions" element={<Solutions />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="coming-soon" element={<ComingSoon />} />
                <Route path="documentation" element={<Documentation />} />
                <Route path="blog" element={<Blog />} />
                <Route path="careers" element={<Careers />} />
                <Route path="legal" element={<Legal />} />
                <Route path="changelog" element={<Changelog />} />
                <Route path="guides" element={<Guides />} />
                <Route path="api-reference" element={<ApiReference />} />
                <Route path="press" element={<Press />} />
            </Route>

            <Route path="login" element={<PublicOnly><Login /></PublicOnly>} />
            <Route path="register" element={<PublicOnly><Register /></PublicOnly>} />

            <Route
                path="admin"
                element={
                    <SuperAdminProtected>
                        <AdminDashboard />
                    </SuperAdminProtected>
                }
            />

            <Route path="app" element={<Protected><DashboardLayout /></Protected>}>
                <Route index element={<Overview />} />
                <Route path="workflows" element={<Workflows />} />
                <Route path="workflows/new" element={<WorkflowBuilder />} />
                <Route path="workflows/:id" element={<WorkflowBuilder />} />
                <Route path="agents" element={<Agents />} />
                <Route path="integrations" element={<Integrations />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="inbox" element={<Inbox />} />
                <Route path="team" element={<Team />} />
                <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
