
import dotenv from "dotenv";
dotenv.config();

function required(key: string): string {
    const value = process.env[key];
    if (!value) throw new Error(`Missing env var: ${key}`);
    return value;
}

export const env = {
    port: Number(process.env.PORT ?? 5000),
    mongoUri: required("MONGO_URI"),
    jwtSecret: required("JWT_SECRET"),
    jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
    frontendUrl: process.env.FRONTEND_URL ?? "http://localhost:5173",
    nodeEnv: process.env.NODE_ENV ?? "development",

    // One-time secret used to bootstrap the first Super Admin.
    adminSetupSecret: process.env.ADMIN_SETUP_SECRET ?? "",
};
