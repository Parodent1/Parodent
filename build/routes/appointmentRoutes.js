"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const createAppointment_1 = require("../controllers/createAppointment");
const getAppointments_1 = require("../controllers/getAppointments");
const router = express_1.default.Router();
// Creates appointment for patient
router.post('/createapp', auth_1.auth, createAppointment_1.createAppointment);
//Fetch all appointments 
router.get('/appointments', auth_1.auth, getAppointments_1.getAppointments);
exports.default = router;
