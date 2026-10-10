import type { Response, NextFunction } from "express";
import { AIAgent } from "../models/AIAgent.js";
import { AppError } from "../middleware/errorHandler.js";
import type { AuthRequest } from "../middleware/auth.js";

export async function list(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const agents = await AIAgent.find({ user: req.user!.sub }).sort({ updatedAt: -1 });
        res.json({ agents });
    } catch (err) {
        next(err);
    }
}

export async function create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const agent = await AIAgent.create({ user: req.user!.sub, ...req.body });
        res.status(201).json({ agent });
    } catch (err) {
        next(err);
    }
}

export async function update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const a = await AIAgent.findOneAndUpdate(
            { _id: req.params.id, user: req.user!.sub },
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!a) throw new AppError("Agent not found", 404);
        res.json({ agent: a });
    } catch (err) {
        next(err);
    }
}

export async function remove(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const a = await AIAgent.findOneAndDelete({ _id: req.params.id, user: req.user!.sub });
        if (!a) throw new AppError("Agent not found", 404);
        res.json({ success: true });
    } catch (err) {
        next(err);
    }
}