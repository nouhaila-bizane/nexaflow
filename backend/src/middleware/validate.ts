import { validationResult, ValidationChain } from "express-validator";
import type { Request, Response, NextFunction } from "express";

export function validate(validations: ValidationChain[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        for (const v of validations) await v.run(req);
        const errors = validationResult(req);
        if (errors.isEmpty()) return next();
        res.status(400).json({ error: "Validation failed", details: errors.array() });
    };
}