import { Router } from "express";
const router = Router();

import { createReport, getReports } from "../controllers/reports.controller";

router.post("/create-report", createReport);
router.get("/reports/:company_id", getReports);

export default router;
