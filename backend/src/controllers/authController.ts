
import type { Request, Response, NextFunction } from "express";
import { User } from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { signToken } from "../utils/jwt.js";
import { AppError } from "../middleware/errorHandler.js";
import { Activity } from "../models/Activity.js";
import type { AuthRequest } from "../middleware/auth.js";

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, email, password } = req.body;

        const exists = await User.findOne({ email: email.toLowerCase() });
        if (exists) throw new AppError("Email already registered", 409);

        const hashed = await hashPassword(password);

        // Public registration always creates a normal user.
        const user = await User.create({
            name,
            email,
            password: hashed,
            role: "user",
        });

        const token = signToken({
            sub: user._id.toString(),
            email: user.email,
        });

        await Activity.create({
            user: user._id,
            type: "auth",
            message: "Account created",
        });

        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                workspace: user.workspace,
                role: user.role,
            },
        });
    } catch (err) {
        next(err);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            email: email.toLowerCase(),
        }).select("+password");

        if (!user) throw new AppError("Invalid credentials", 401);

        const ok = await comparePassword(password, user.password);
        if (!ok) throw new AppError("Invalid credentials", 401);

        const token = signToken({
            sub: user._id.toString(),
            email: user.email,
        });

        await Activity.create({
            user: user._id,
            type: "auth",
            message: "Signed in",
        });

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                workspace: user.workspace,
                role: user.role,
            },
        });
    } catch (err) {
        next(err);
    }
}

export async function me(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const user = await User.findById(req.user!.sub);

        if (!user) throw new AppError("User not found", 404);

        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            workspace: user.workspace,
            role: user.role,
        });
    } catch (err) {
        next(err);
    }
}
