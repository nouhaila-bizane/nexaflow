
import { Router } from "express";
import { body } from "express-validator";

import {
    setupSuperAdmin,
    getAdminStats,
} from "../controllers/adminController.js";

import { validate } from "../middleware/validate.js";
import {
    auth,
    requireSuperAdmin,
} from "../middleware/auth.js";

const r = Router();

// Initial Super Admin setup
r.post(
    "/setup",
    validate([
        body("name").isString().trim().isLength({ min: 2, max: 60 }),
        body("email").isEmail().normalizeEmail(),
        body("password").isString().isLength({ min: 12 }),
    ]),
    setupSuperAdmin
);

// All routes below require Super Admin authentication
r.use(auth, requireSuperAdmin);

// Global platform statistics
r.get("/stats", getAdminStats);

export default r;
