import { Router } from "express";
import { body } from "express-validator";
import { register, login, me } from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";
import { auth } from "../middleware/auth.js";

const r = Router();

r.post(
    "/register",
    validate([
        body("name").trim().isLength({ min: 2, max: 60 }),
        body("email").isEmail().normalizeEmail(),
        body("password").isLength({ min: 8 }),
    ]),
    register
);

r.post(
    "/login",
    validate([
        body("email").isEmail().normalizeEmail(),
        body("password").notEmpty(),
    ]),
    login
);

r.get("/me", auth, me);

export default r;