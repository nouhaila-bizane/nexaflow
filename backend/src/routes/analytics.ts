import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { summary } from "../controllers/analyticsController.js";

const r = Router();
r.use(auth);
r.get("/", summary);

export default r;