"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const reports_controller_1 = require("../controllers/reports.controller");
router.post("/reports", reports_controller_1.createReport);
router.get("/reports/:company_id", reports_controller_1.getReports);
exports.default = router;
//# sourceMappingURL=reports.routes.js.map