import { Router } from "express";
import { body } from "express-validator";
import { auth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { list, toggle } from "../controllers/integrationController.js";

const r = Router();
r.use(auth);

r.get("/", list);
r.post("/toggle", validate([body("provider").isString()]), toggle);

export default r;