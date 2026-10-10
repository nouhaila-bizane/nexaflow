import { Router } from "express";
import { body } from "express-validator";
import { auth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { list, invite, remove } from "../controllers/teamController.js";

const r = Router();
r.use(auth);

r.get("/", list);
r.post(
    "/invite",
    validate([body("email").isEmail(), body("role").optional().isIn(["admin", "member"])]),
    invite
);
r.delete("/:id", remove);

export default r;