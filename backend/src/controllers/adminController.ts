
import type { Request, Response, NextFunction } from "express";

import { User } from "../models/User.js";
import { Workflow } from "../models/Workflow.js";
import { AIAgent } from "../models/AIAgent.js";
import { Activity } from "../models/Activity.js";

import { hashPassword } from "../utils/password.js";
import { env } from "../config/env.js";
import { AppError } from "../middleware/errorHandler.js";

// Create the first Super Admin account
export async function setupSuperAdmin(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const setupSecret = req.headers["x-admin-setup-secret"];

        if (
            !env.adminSetupSecret ||
            setupSecret !== env.adminSetupSecret
        ) {
            throw new AppError("Invalid setup secret", 403);
        }

        const existingAdmin = await User.findOne({ role: "superadmin" });

        if (existingAdmin) {
            throw new AppError(
                "Super Admin has already been configured",
                409
            );
        }

        const { name, email, password } = req.body;

        if (
            typeof name !== "string" ||
            name.trim().length < 2 ||
            typeof email !== "string" ||
            !/^\S+@\S+\.\S+$/.test(email) ||
            typeof password !== "string" ||
            password.length < 12
        ) {
            throw new AppError(
                "Provide a valid name, email, and password of at least 12 characters",
                400
            );
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email: normalizedEmail,
        });

        if (existingUser) {
            throw new AppError(
                "This email already belongs to an account",
                409
            );
        }

        const hashedPassword = await hashPassword(password);

        const admin = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            role: "superadmin",
        });

        res.status(201).json({
            message: "Super Admin account created successfully",
            user: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
        });
    } catch (err) {
        next(err);
    }
}

// Get global platform statistics
export async function getAdminStats(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const [
            totalUsers,
            totalWorkflows,
            activeWorkflows,
            totalAgents,
            activeAgents,
            totalActivities,
            newUsers,
            recentUsers,
            recentActivities,
        ] = await Promise.all([
            User.countDocuments(),

            Workflow.countDocuments(),

            Workflow.countDocuments({ status: "active" }),

            AIAgent.countDocuments(),

            AIAgent.countDocuments({ status: "active" }),

            Activity.countDocuments(),

            User.countDocuments({
                createdAt: {
                    $gte: new Date(
                        Date.now() - 30 * 24 * 60 * 60 * 1000
                    ),
                },
            }),

            User.find()
                .select("name email role createdAt")
                .sort({ createdAt: -1 })
                .limit(10)
                .lean(),

            Activity.find()
                .populate("user", "name email")
                .sort({ createdAt: -1 })
                .limit(15)
                .lean(),
        ]);

        res.json({
            overview: {
                totalUsers,
                newUsersLast30Days: newUsers,
                totalWorkflows,
                activeWorkflows,
                totalAgents,
                activeAgents,
                totalActivities,
            },
            recentUsers,
            recentActivities,
        });
    } catch (err) {
        next(err);
    }
}
