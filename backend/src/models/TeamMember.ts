import { Schema, model, Document, Types } from "mongoose";

export interface ITeamMember extends Document {
    _id: Types.ObjectId;
    workspace: Types.ObjectId;
    user?: Types.ObjectId;
    role: "owner" | "admin" | "member";
    status: "active" | "invited";
    invitedEmail?: string;
    createdAt: Date;
}

const teamMemberSchema = new Schema<ITeamMember>(
    {
        workspace: { type: Schema.Types.ObjectId, ref: "User", required: true },
        user: { type: Schema.Types.ObjectId, ref: "User" },
        role: { type: String, enum: ["owner", "admin", "member"], default: "member" },
        status: { type: String, enum: ["active", "invited"], default: "invited" },
        invitedEmail: { type: String },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

// L'exportation doit s'appeler exactement "TeamMember"
export const TeamMember = model<ITeamMember>("TeamMember", teamMemberSchema);