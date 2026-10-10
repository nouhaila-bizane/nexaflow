import type { Response, NextFunction } from "express";
import { Workflow } from "../models/Workflow.js";
import { AppError } from "../middleware/errorHandler.js";
import type { AuthRequest } from "../middleware/auth.js";

export async function list(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const workflows = await Workflow.find({ user: req.user!.sub }).sort({ updatedAt: -1 });
        res.json({ workflows });
    } catch (err) {
        next(err);
    }
}

export async function get(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const w = await Workflow.findOne({ _id: req.params.id, user: req.user!.sub });
        if (!w) throw new AppError("Workflow not found", 404);
        res.json({ workflow: w });
    } catch (err) {
        next(err);
    }
}

export async function create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const { name, description, trigger, steps, status } = req.body;
        const w = await Workflow.create({
            user: req.user!.sub,
            name,
            description: description ?? "",
            trigger: trigger ?? "",
            steps: steps ?? [],
            status: status ?? "draft",
        });
        res.status(201).json({ workflow: w });
    } catch (err) {
        next(err);
    }
}

export async function update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const w = await Workflow.findOneAndUpdate(
            { _id: req.params.id, user: req.user!.sub },
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!w) throw new AppError("Workflow not found", 404);
        res.json({ workflow: w });
    } catch (err) {
        next(err);
    }
}

export async function remove(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const w = await Workflow.findOneAndDelete({ _id: req.params.id, user: req.user!.sub });
        if (!w) throw new AppError("Workflow not found", 404);
        res.json({ success: true });
    } catch (err) {
        next(err);
    }
}