import { Schema, model, Document, Types } from "mongoose";

export interface IIntegration extends Document {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    provider: string;
    connected: boolean;
    connectedAt?: Date;
}

const integrationSchema = new Schema<IIntegration>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
        provider: { type: String, required: true },
        connected: { type: Boolean, default: false },
        connectedAt: { type: Date },
    },
    { timestamps: true }
);

integrationSchema.index({ user: 1, provider: 1 }, { unique: true });

export const Integration = model<IIntegration>("Integration", integrationSchema);