"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctors_1 = require("../controllers/doctors");
const loginDoctor_1 = require("../controllers/loginDoctor");
const auth_1 = require("../middleware/auth");
const doctorValidators_1 = require("../validators/doctorValidators");
const validator_1 = require("../middleware/validator");
const currentDoctorLogo_1 = require("../controllers/currentDoctorLogo");
const currentDoctorAll_1 = require("../controllers/currentDoctorAll");
const router = express_1.default.Router();
router.post('/doctors', doctorValidators_1.validateDoctor, validator_1.validateRequest, doctors_1.addNewDoctor);
router.post('/login', loginDoctor_1.loginDoctor);
router.post('/logout', auth_1.auth, (req, res) => {
    res.status(200).send({ message: 'Logout succesful' });
});
//Returns only firstname and lastname for front
router.get('/doctor/logo', auth_1.auth, currentDoctorLogo_1.getCurrentDoctor);
//Returns all information about the doctor 
router.get('/doctor/me', auth_1.auth, currentDoctorAll_1.getInfoDoctor);
exports.default = router;
