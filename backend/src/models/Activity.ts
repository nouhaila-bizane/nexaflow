import { Schema, model, Document, Types } from "mongoose";

export interface IActivity extends Document {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    type: "workflow_run" | "agent_run" | "integration" | "auth" | "system";
    message: string;
    meta?: Record<string, unknown>;
    createdAt: Date;
}

const activitySchema = new Schema<IActivity>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
        type: {
            type: String,
            enum: ["workflow_run", "agent_run", "integration", "auth", "system"],
            required: true,
        },
        message: { type: String, required: true },
        meta: { type: Schema.Types.Mixed },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

export const Activity = model<IActivity>("Activity", activitySchema);