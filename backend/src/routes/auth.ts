
import { Router } from "express";
import { body } from "express-validator";
import { register, login, me } from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";
import { auth } from "../middleware/auth.js";

const r = Router();

// Public registration: all new accounts receive the default "user" role.
r.post(
    "/register",
    validate([
        body("name").trim().isLength({ min: 2, max: 60 }),
        body("email").isEmail().normalizeEmail(),
        body("password").isLength({ min: 8 }),
    ]),
    register
);

// User login
r.post(
    "/login",
    validate([
        body("email").isEmail().normalizeEmail(),
        body("password").notEmpty(),
    ]),
    login
);

// Get the currently authenticated user
r.get("/me", auth, me);

export default r;
