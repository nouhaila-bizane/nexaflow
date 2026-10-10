import { Link, useSearchParams } from "react-router-dom";
import { Construction, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ComingSoon() {
    const [searchParams] = useSearchParams();
    // Récupère le nom de la page dans l'URL (ex: ?page=Documentation)
    const pageName = searchParams.get("page") || "Cette fonctionnalité";

    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                <Construction className="h-8 w-8" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl dark:text-ink-50">
                {pageName} arrive bientôt
            </h1>

            <p className="mx-auto mt-4 max-w-md text-ink-600 dark:text-ink-300">
                Nous travaillons d'arrache-pied pour finaliser cette section.
                Revenez très bientôt pour découvrir les dernières mises à jour de NexaFlow.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button as={Link} to="/" variant="outline" leftIcon={<ArrowLeft className="h-4 w-4" />}>
                    Retour à l'accueil
                </Button>
                <Button as={Link} to="/contact" leftIcon={<Sparkles className="h-4 w-4" />}>
                    Nous contacter
                </Button>
            </div>
        </div>
    );
}