import type { Request, Response, NextFunction } from "express";
import { env } from "../config/env.js";

export class AppError extends Error {
    status: number;
    constructor(message: string, status = 500) {
        super(message);
        this.status = status;
    }
}

export function notFound(req: Request, res: Response, next: NextFunction): void {
    res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {
    const status = err instanceof AppError ? err.status : 500;
    const message = err.message || "Internal server error";
    if (status === 500) console.error("Server error:", err);
    res.status(status).json({
        error: message,
        ...(env.nodeEnv !== "production" && { stack: err.stack }),
    });
}