import type { Response, NextFunction } from "express";
import { TeamMember } from "../models/TeamMember.js";
import { User } from "../models/User.js";
import { AppError } from "../middleware/errorHandler.js";
import type { AuthRequest } from "../middleware/auth.js";

export async function list(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        // 1. Trouver l'utilisateur connecté
        const me = await User.findById(req.user!.sub);
        if (!me) throw new AppError("Utilisateur non trouvé", 404);

        // 2. Trouver les membres de l'espace de travail de cet utilisateur
        // On utilise le modèle TeamMember importé ci-dessus
        const members = await TeamMember.find({ workspace: me._id }).populate("user", "name email avatar");

        // 3. Retourner le propriétaire (l'utilisateur connecté) + les autres membres
        res.json({
            members: [
                {
                    _id: me._id,
                    user: { name: me.name, email: me.email, avatar: me.avatar },
                    role: "owner" as const,
                    status: "active" as const
                },
                ...members,
            ],
        });
    } catch (err) {
        next(err);
    }
}

export async function invite(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const me = await User.findById(req.user!.sub);
        if (!me) throw new AppError("Utilisateur non trouvé", 404);

        const { email, role } = req.body;
        const member = await TeamMember.create({
            workspace: me._id,
            invitedEmail: email,
            role: role ?? "member",
            status: "invited",
        });

        res.status(201).json({ member });
    } catch (err) {
        next(err);
    }
}

export async function remove(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const me = await User.findById(req.user!.sub);
        if (!me) throw new AppError("Utilisateur non trouvé", 404);

        await TeamMember.findOneAndDelete({ _id: req.params.id, workspace: me._id });
        res.json({ success: true });
    } catch (err) {
        next(err);
    }
}