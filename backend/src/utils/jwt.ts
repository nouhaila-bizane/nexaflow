import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";

export type TokenPayload = { sub: string; email: string };

export function signToken(payload: TokenPayload): string {
    const opts: SignOptions = { expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"] };
    return jwt.sign(payload, env.jwtSecret, opts);
}

export function verifyToken(token: string): TokenPayload {
    return jwt.verify(token, env.jwtSecret) as TokenPayload;
}