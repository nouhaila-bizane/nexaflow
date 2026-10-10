import { Schema, model, Document, Types } from "mongoose";

export interface IWorkflowStep {
    id: string;
    type: "trigger" | "ai" | "action" | "decision";
    title: string;
    description?: string;
    config?: Record<string, unknown>;
}

export interface IWorkflow extends Document {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    name: string;
    description: string;
    status: "active" | "paused" | "draft";
    trigger: string;
    steps: IWorkflowStep[];
    executions: number;
    lastExecution?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const stepSchema = new Schema<IWorkflowStep>(
    {
        id: { type: String, required: true },
        type: { type: String, enum: ["trigger", "ai", "action", "decision"], required: true },
        title: { type: String, required: true },
        description: { type: String },
        config: { type: Schema.Types.Mixed },
    },
    { _id: false }
);

const workflowSchema = new Schema<IWorkflow>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
        name: { type: String, required: true, trim: true },
        description: { type: String, default: "" },
        status: { type: String, enum: ["active", "paused", "draft"], default: "draft" },
        trigger: { type: String, default: "" },
        steps: { type: [stepSchema], default: [] },
        executions: { type: Number, default: 0 },
        lastExecution: { type: Date },
    },
    { timestamps: true }
);

export const Workflow = model<IWorkflow>("Workflow", workflowSchema);