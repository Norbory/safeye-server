"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReports = exports.createReport = void 0;
const report_1 = __importDefault(require("../models/report"));
// Funcion para crear un reporte
const createReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.place || !req.body.epp || !req.body.time) {
        return res
            .status(400)
            .json({ msg: "Please. Send the place, epp and time" });
    }
    const newReport = new report_1.default(req.body);
    yield newReport.save();
    return res.status(201).json(newReport);
});
exports.createReport = createReport;
// Funcion para obtener todos los reportes de una empresa
const getReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reports = yield report_1.default.find({ company_id: req.params.company_id });
    return res.json(reports);
});
exports.getReports = getReports;
//# sourceMappingURL=reports.controller.js.map