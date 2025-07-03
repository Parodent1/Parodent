"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctors_1 = require("../controllers/doctors");
const loginDoctor_1 = require("../controllers/loginDoctor");
const router = express_1.default.Router();
router.post('/doctors', doctors_1.addNewDoctor);
router.post('/login', loginDoctor_1.loginDoctor);
exports.default = router;
