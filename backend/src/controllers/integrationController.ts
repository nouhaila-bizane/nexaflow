import type { Response, NextFunction } from "express";
import { Integration } from "../models/Integration.js";
import type { AuthRequest } from "../middleware/auth.js";

const PROVIDERS = ["slack", "gmail", "google_sheets", "hubspot", "notion", "discord", "shopify"];

export async function list(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const rows = await Integration.find({ user: req.user!.sub });
        const map = new Map(rows.map((r) => [r.provider, r.connected]));
        const integrations = PROVIDERS.map((p) => ({
            provider: p,
            connected: map.get(p) ?? false,
        }));
        res.json({ integrations });
    } catch (err) {
        next(err);
    }
}

export async function toggle(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const { provider } = req.body;
        if (!PROVIDERS.includes(provider)) {
            res.status(400).json({ error: "Unknown provider" });
            return;
        }
        const existing = await Integration.findOne({ user: req.user!.sub, provider });
        const connected = !(existing?.connected ?? false);
        await Integration.findOneAndUpdate(
            { user: req.user!.sub, provider },
            { $set: { connected, connectedAt: connected ? new Date() : undefined } },
            { upsert: true, new: true }
        );
        res.json({ provider, connected });
    } catch (err) {
        next(err);
    }
}