"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const createAppointment_1 = require("../controlers/appointmentControlers/createAppointment");
const getAppointments_1 = require("../controlers/appointmentControlers/getAppointments");
const deleteAppointment_1 = require("../controlers/appointmentControlers/deleteAppointment");
const updateAppointment_1 = require("../controlers/appointmentControlers/updateAppointment");
const router = express_1.default.Router();
//Creates appointment for patient
router.post('/createapp', auth_1.auth, createAppointment_1.createAppointment);
//Fetch all appointments 
router.get('/appointments', auth_1.auth, getAppointments_1.getAppointments);
//Delete appointment by ID
router.delete('/appointment/:id', auth_1.auth, deleteAppointment_1.deleteAppointment);
// Update appointment by ID
router.put('/appointment/:id', auth_1.auth, updateAppointment_1.updateAppointment);
exports.default = router;
