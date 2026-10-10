import { Router } from "express";
import { body } from "express-validator";
import { auth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import * as c from "../controllers/workflowController.js";

const r = Router();
r.use(auth);

r.get("/", c.list);
r.get("/:id", c.get);
r.post(
    "/",
    validate([body("name").trim().isLength({ min: 1, max: 120 })]),
    c.create
);
r.put("/:id", c.update);
r.delete("/:id", c.remove);

export default r;