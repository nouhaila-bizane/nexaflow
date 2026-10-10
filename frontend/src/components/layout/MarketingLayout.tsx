import { Outlet } from "react-router-dom";
import { MarketingNavbar } from "../marketing/Navbar";
import { MarketingFooter } from "../marketing/Footer";

export function MarketingLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-white text-ink-900 dark:bg-ink-950 dark:text-ink-50">
            <MarketingNavbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <MarketingFooter />
        </div>
    );
}