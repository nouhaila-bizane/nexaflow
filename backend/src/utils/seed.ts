import mongoose from "mongoose";
import { env } from "../config/env.js";
import { User } from "../models/User.js";
import { Workflow } from "../models/Workflow.js";
import { AIAgent } from "../models/AIAgent.js";
import { Activity } from "../models/Activity.js";
import { hashPassword } from "./password.js";

async function seed() {
    await mongoose.connect(env.mongoUri);
    await Promise.all([
        User.deleteMany({}),
        Workflow.deleteMany({}),
        AIAgent.deleteMany({}),
        Activity.deleteMany({}),
    ]);

    const pw = await hashPassword("password123");
    const user = await User.create({
        name: "Noha Ahon",
        email: "noha@nexaflow.app",
        password: pw,
        workspace: "Acme Growth",
    });
    await Workflow.insertMany([
        {
            user: user._id,
            name: "Lead Qualification Pipeline",
            description: "Analyzes inbound leads, classifies intent, and routes to sales.",
            status: "active",
            trigger: "New lead submitted",
            executions: 248,
            lastExecution: new Date(),
            steps: [
                { id: "s1", type: "trigger", title: "New lead submitted", description: "Form submission" },
                { id: "s2", type: "ai", title: "Analyze lead with AI", description: "Extract intent & context" },
                { id: "s3", type: "decision", title: "Classify lead", description: "Hot / Warm / Cold" },
                { id: "s4", type: "action", title: "Send personalized response", description: "Email via Gmail" },
                { id: "s5", type: "action", title: "Add to CRM", description: "HubSpot" },
            ],
        },
        {
            user: user._id,
            name: "Weekly Report Generator",
            description: "Pulls metrics from Sheets and emails a summary every Monday.",
            status: "active",
            trigger: "Schedule: every Monday 9:00",
            executions: 42,
            lastExecution: new Date(Date.now() - 86400000),
            steps: [
                { id: "s1", type: "trigger", title: "Scheduled trigger" },
                { id: "s2", type: "action", title: "Read Google Sheet" },
                { id: "s3", type: "ai", title: "Summarize insights" },
                { id: "s4", type: "action", title: "Send email to team" },
            ],
        },
        {
            user: user._id,
            name: "Support Ticket Triage",
            description: "Categorizes incoming support tickets and assigns priority.",
            status: "paused",
            trigger: "New ticket in Slack",
            executions: 112,
            steps: [
                { id: "s1", type: "trigger", title: "New ticket in Slack" },
                { id: "s2", type: "ai", title: "Classify priority" },
                { id: "s3", type: "action", title: "Assign to agent" },
            ],
        },
    ]);

    await AIAgent.insertMany([
        {
            user: user._id,
            name: "Sales Assistant",
            description: "Drafts personalized outreach based on lead context.",
            goal: "Increase reply rate",
            instructions: "Be concise, reference the lead's company, propose a 15-min call.",
            tone: "professional",
            model: "nexaflow-v1",
            status: "active",
        },
        {
            user: user._id,
            name: "Customer Support Agent",
            description: "Handles Tier-1 support questions with empathy and accuracy.",
            goal: "Resolve common issues without human escalation",
            instructions: "Use the knowledge base first. If unsure, hand off to a human.",
            tone: "friendly",
            model: "nexaflow-v1",
            status: "active",
        },
    ]);

    await Activity.insertMany([
        { user: user._id, type: "workflow_run", message: "Lead Qualification Pipeline ran successfully" },
        { user: user._id, type: "agent_run", message: "Sales Assistant processed 12 leads" },
        { user: user._id, type: "integration", message: "Slack connected" },
        { user: user._id, type: "auth", message: "Signed in" },
    ]);

    console.log("✅ Seed complete. Demo login: noha@nexaflow.app / password123");
    await mongoose.disconnect();
}

seed().catch((e) => {
    console.error(e);
    process.exit(1);
});