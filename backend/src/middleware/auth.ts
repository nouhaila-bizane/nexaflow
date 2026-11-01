
import type { Request, Response, NextFunction } from "express";
import { verifyToken, TokenPayload } from "../utils/jwt.js";
import { User } from "../models/User.js";

export interface AuthRequest extends Request {
    user?: TokenPayload;
}

export function auth(req: AuthRequest, res: Response, next: NextFunction): void {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        res.status(401).json({ error: "Missing or invalid authorization header" });
        return;
    }

    try {
        const token = header.slice(7);
        req.user = verifyToken(token);
        next();
    } catch {
        res.status(401).json({ error: "Invalid or expired token" });
    }
}

// Checks the user's current role directly in the database.
export async function requireSuperAdmin(
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        if (!req.user?.sub) {
            res.status(401).json({ error: "Authentication required" });
            return;
        }

        const user = await User.findById(req.user.sub).select("role");

        if (!user || user.role !== "superadmin") {
            res.status(403).json({ error: "Super Admin access required" });
            return;
        }

        next();
    } catch (error) {
        next(error);
    }
}
