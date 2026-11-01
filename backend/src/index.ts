
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

import authRoutes from "./routes/auth.js";
import workflowRoutes from "./routes/workflows.js";
import agentRoutes from "./routes/agents.js";
import analyticsRoutes from "./routes/analytics.js";
import integrationRoutes from "./routes/integrations.js";
import teamRoutes from "./routes/team.js";
import adminRoutes from "./routes/admin.js";

async function main() {
    await connectDB();

    const app = express();

    app.use(helmet());
    app.use(
        cors({
            origin: env.frontendUrl,
            credentials: true,
        })
    );

    app.use(express.json({ limit: "1mb" }));
    app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

    app.get("/api/health", (_req, res) => res.json({ ok: true }));

    app.use("/api/auth", authRoutes);
    app.use("/api/workflows", workflowRoutes);
    app.use("/api/agents", agentRoutes);
    app.use("/api/analytics", analyticsRoutes);
    app.use("/api/integrations", integrationRoutes);
    app.use("/api/team", teamRoutes);
    app.use("/api/admin", adminRoutes);

    app.use(notFound);
    app.use(errorHandler);

    app.listen(env.port, () => {
        console.log(`🚀 NexaFlow API listening on port ${env.port}`);
    });
}

main();
