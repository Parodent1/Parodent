"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patients_js_1 = require("../controllers/patients.js");
const patientValidator_js_1 = require("../validators/patientValidator.js");
const validator_js_1 = require("../middleware/validator.js");
const auth_js_1 = require("../middleware/auth.js");
const getInfoPatient_js_1 = require("../controllers/getInfoPatient.js");
const router = express_1.default.Router();
router.post('/patients', patientValidator_js_1.validatePatient, validator_js_1.validateRequest, patients_js_1.addNewPatient);
router.get('/patients/me', auth_js_1.auth, getInfoPatient_js_1.getInfoPatient);
exports.default = router;
