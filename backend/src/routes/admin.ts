
import { Router } from "express";
import { body } from "express-validator";
import { setupSuperAdmin } from "../controllers/adminController.js";
import { validate } from "../middleware/validate.js";

const r = Router();

r.post(
    "/setup",
    validate([
        body("name").isString().trim().isLength({ min: 2, max: 60 }),
        body("email").isEmail().normalizeEmail(),
        body("password").isString().isLength({ min: 12 }),
    ]),
    setupSuperAdmin
);

export default r;
