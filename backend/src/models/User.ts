import { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    avatar?: string;
    workspace: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true, trim: true, minlength: 2, maxlength: 60 },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Invalid email"],
        },
        password: { type: String, required: true, minlength: 8, select: false },
        avatar: { type: String },
        workspace: { type: String, default: "My Workspace" },
    },
    { timestamps: true }
);

export const User = model<IUser>("User", userSchema);