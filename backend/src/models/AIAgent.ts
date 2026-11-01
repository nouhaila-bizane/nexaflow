import { Schema, model, Types } from "mongoose";

export interface IAIAgent {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    name: string;
    description: string;
    goal: string;
    instructions: string;
    tone: string;
    model: string;
    status: "active" | "inactive";
    createdAt: Date;
    updatedAt: Date;
}

const agentSchema = new Schema<IAIAgent>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
        name: { type: String, required: true, trim: true },
        description: { type: String, default: "" },
        goal: { type: String, default: "" },
        instructions: { type: String, default: "" },
        tone: { type: String, default: "professional" },
        model: { type: String, default: "nexaflow-v1" },
        status: { type: String, enum: ["active", "inactive"], default: "inactive" },
    },
    { timestamps: true }
);

export const AIAgent = model<IAIAgent>("AIAgent", agentSchema);
