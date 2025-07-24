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
exports.createAppointment = void 0;
const firebase_1 = __importDefault(require("../firebase/firebase"));
const createAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { date, time, patientName, cabinet, comment, doctorName } = req.body;
    const doctorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!doctorId || !doctorName) {
        res.status(400).send("Doctor is required!");
        return;
    }
    const newAppointment = {
        date,
        time,
        patientName,
        cabinet,
        comment,
        doctorId,
        doctorName
    };
    try {
        const docRef = yield firebase_1.default.collection('appointments').add(newAppointment);
        res.status(200).send(Object.assign({ id: docRef.id }, newAppointment));
    }
    catch (error) {
        res.status(500).send("Failed to create appointment");
    }
});
exports.createAppointment = createAppointment;
