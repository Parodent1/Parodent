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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInfoPatient = void 0;
const firebase_1 = __importDefault(require("../firebase/firebase"));
const getInfoPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const patientId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!patientId) {
            res.status(401).send({ error: 'Unauthorized: No patient ID found in token' });
            return;
        }
        const patientDoc = yield firebase_1.default.collection("patients").doc(patientId).get();
        if (!patientDoc.exists) {
            res.status(404).send({ error: "Patient not found" });
            return;
        }
        const patientData = patientDoc.data();
        if (!patientData) {
            res.status(500).send({ error: "Patient data is empty" });
            return;
        }
        const { password } = patientData, safeData = __rest(patientData, ["password"]);
        res.status(200).send(safeData);
    }
    catch (error) {
        res.status(500).send({ error: "Failed to fetch patient data" });
    }
});
exports.getInfoPatient = getInfoPatient;
