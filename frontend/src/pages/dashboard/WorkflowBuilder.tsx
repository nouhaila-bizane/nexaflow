import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Save,
    Play,
    Zap,
    Bot,
    GitBranch,
    MessageSquare,
    Mail,
    Database,
    Plus,
    Trash2,
    GripVertical,
    CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";

const availableSteps = [
    { type: "trigger", label: "Trigger", icon: Zap, color: "bg-amber-500" },
    { type: "ai", label: "AI Action", icon: Bot, color: "bg-violet-500" },
    { type: "decision", label: "Decision", icon: GitBranch, color: "bg-indigo-500" },
    { type: "action", label: "Send Message", icon: MessageSquare, color: "bg-emerald-500" },
    { type: "action", label: "Send Email", icon: Mail, color: "bg-blue-500" },
    { type: "action", label: "Save to DB", icon: Database, color: "bg-rose-500" },
];

type WorkflowStep = {
    id: string;
    type: string;
    label: string;
};

export default function WorkflowBuilder() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [name, setName] = useState("");
    const [steps, setSteps] = useState<WorkflowStep[]>([]);
    const [saving, setSaving] = useState(false);
    const [activated, setActivated] = useState(false);

    const addStep = (step: typeof availableSteps[0]) => {
        setSteps([
            ...steps,
            { id: `step-${Date.now()}`, type: step.type, label: step.label },
        ]);
        toast({ type: "success", message: `${step.label} added` });
    };

    const removeStep = (stepId: string) => {
        setSteps(steps.filter((s) => s.id !== stepId));
    };

    const save = async () => {
        if (!name.trim()) {
            toast({ type: "error", message: "Please enter a workflow name" });
            return;
        }
        if (steps.length === 0) {
            toast({ type: "error", message: "Please add at least one step" });
            return;
        }
        setSaving(true);
        try {
            // Simulation de sauvegarde (le backend n'a pas encore cette route)
            await new Promise((r) => setTimeout(r, 600));
            const saved = JSON.parse(localStorage.getItem("nexaflow_workflows") || "[]");
            saved.push({
                id: id || `wf-${Date.now()}`,
                name,
                steps,
                status: activated ? "active" : "draft",
                createdAt: new Date().toISOString(),
            });
            localStorage.setItem("nexaflow_workflows", JSON.stringify(saved));
            toast({ type: "success", message: `Workflow "${name}" saved successfully` });
            setTimeout(() => navigate("/app/workflows"), 800);
        } catch (e: any) {
            toast({ type: "error", message: e?.message || "Failed to save" });
        } finally {
            setSaving(false);
        }
    };

    const activate = () => {
        if (!name.trim() || steps.length === 0) {
            toast({ type: "error", message: "Save the workflow first" });
            return;
        }
        setActivated(true);
        toast({ type: "success", message: "Workflow activated! It's now running." });
    };

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap items-center justify-between gap-4"
            >
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate("/app/workflows")}
                        leftIcon={<ArrowLeft className="h-4 w-4" />}
                    >
                        Back
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-ink-900 dark:text-ink-50">
                            {id ? "Edit Workflow" : "New Workflow"}
                        </h1>
                        <p className="text-sm text-ink-500">Build your automation visually</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={save} loading={saving} leftIcon={<Save className="h-4 w-4" />}>
                        Save
                    </Button>
                    <Button onClick={activate} leftIcon={<Play className="h-4 w-4" />} className={activated ? "bg-emerald-600 hover:bg-emerald-700" : ""}>
                        {activated ? (
                            <>
                                <CheckCircle2 className="h-4 w-4" /> Active
                            </>
                        ) : (
                            "Activate"
                        )}
                    </Button>
                </div>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card>
                        <CardHeader>
                            <h2 className="font-semibold text-ink-900 dark:text-ink-50">Available steps</h2>
                            <p className="text-xs text-ink-500">Click to add to your workflow</p>
                        </CardHeader>
                        <CardBody className="space-y-2">
                            {availableSteps.map((step) => (
                                <button
                                    key={step.label}
                                    onClick={() => addStep(step)}
                                    className="flex w-full items-center gap-3 rounded-xl border border-ink-200 bg-white p-3 text-left transition-all hover:border-brand-500 hover:shadow-md dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-500"
                                >
                                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${step.color} text-white`}>
                                        <step.icon className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-ink-900 dark:text-ink-50">{step.label}</p>
                                        <p className="text-xs text-ink-500 capitalize">{step.type}</p>
                                    </div>
                                    <Plus className="h-4 w-4 text-ink-400" />
                                </button>
                            ))}
                        </CardBody>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-3"
                >
                    <Card>
                        <CardHeader>
                            <Input
                                label="Workflow name"
                                placeholder="e.g. Lead qualification pipeline"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </CardHeader>
                        <CardBody>
                            {steps.length === 0 ? (
                                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-ink-200 py-16 text-center dark:border-ink-800">
                                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                                        <Plus className="h-6 w-6" />
                                    </div>
                                    <p className="font-medium text-ink-900 dark:text-ink-50">No steps yet</p>
                                    <p className="mt-1 text-sm text-ink-500">Add steps from the sidebar to build your workflow</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {steps.map((step, i) => {
                                        const stepDef = availableSteps.find((s) => s.label === step.label);
                                        const Icon = stepDef?.icon || Zap;
                                        return (
                                            <motion.div
                                                key={step.id}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="relative flex items-center gap-4 rounded-2xl border border-ink-200 bg-white p-4 dark:border-ink-800 dark:bg-ink-900"
                                            >
                                                <GripVertical className="h-5 w-5 cursor-grab text-ink-400" />
                                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${stepDef?.color || "bg-slate-500"} text-white`}>
                                                    <Icon className="h-5 w-5" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-medium text-ink-900 dark:text-ink-50">{step.label}</p>
                                                        <Badge tone="neutral">{step.type}</Badge>
                                                    </div>
                                                    <p className="text-xs text-ink-500">Step {i + 1}</p>
                                                </div>
                                                <button
                                                    onClick={() => removeStep(step.id)}
                                                    className="rounded-lg p-2 text-ink-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                                {i < steps.length - 1 && (
                                                    <div className="absolute -bottom-3 left-9 h-3 w-0.5 bg-gradient-to-b from-ink-300 to-transparent dark:from-ink-700" />
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            )}
                        </CardBody>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}