import type { Request, Response, NextFunction } from "express";
import { verifyToken, TokenPayload } from "../utils/jwt.js";

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