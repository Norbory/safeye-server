"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reportSchema = new mongoose_1.Schema({
    company_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },
    place: {
        type: String,
        required: true,
    },
    epp: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    },
    admonished: {
        type: Boolean,
        required: true,
    },
});
exports.default = (0, mongoose_1.model)("Report", reportSchema);
//# sourceMappingURL=report.js.map