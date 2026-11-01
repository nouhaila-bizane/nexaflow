export type User = {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    workspace: string;
    role: "user" | "superadmin";
};


export type WorkflowStatus = "active" | "paused" | "draft";
export type WorkflowStepType = "trigger" | "ai" | "action" | "decision";

export type WorkflowStep = {
    id: string;
    type: WorkflowStepType;
    title: string;
    description?: string;
    config?: Record<string, unknown>;
};

export type Workflow = {
    _id: string;
    name: string;
    description: string;
    status: WorkflowStatus;
    trigger: string;
    steps: WorkflowStep[];
    executions: number;
    lastExecution?: string;
    createdAt: string;
    updatedAt: string;
};

export type AIAgent = {
    _id: string;
    name: string;
    description: string;
    goal: string;
    instructions: string;
    tone: string;
    model: string;
    status: "active" | "inactive";
    createdAt: string;
};

export type Integration = {
    provider: string;
    connected: boolean;
};

export type TeamMember = {
    _id: string;
    user?: { name: string; email: string; avatar?: string };
    role: "owner" | "admin" | "member";
    status: "active" | "invited";
    invitedEmail?: string;
};

export type Activity = {
    _id: string;
    type: "workflow_run" | "agent_run" | "integration" | "auth" | "system";
    message: string;
    createdAt: string;
};

export type AnalyticsSummary = {
    activeWorkflows: number;
    totalExecutions: number;
    successRate: number;
    hoursSaved: number;
    series: { date: string; runs: number }[];
    recentActivity: Activity[];
};
