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
exports.getCurrentDoctor = void 0;
const firebase_1 = __importDefault(require("../firebase/firebase"));
const getCurrentDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const doctorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!doctorId) {
            res.status(401).send({ error: 'Unauthorized: No doctor ID found in token' });
            return;
        }
        const doctorDoc = yield firebase_1.default.collection('doctors').doc(doctorId).get();
        if (!doctorDoc.exists) {
            res.status(404).send({ error: "Doctor not found" });
            return;
        }
        const doctorData = doctorDoc.data();
        res.status(200).send({
            firstname: doctorData === null || doctorData === void 0 ? void 0 : doctorData.firstname,
            lastname: doctorData === null || doctorData === void 0 ? void 0 : doctorData.lastname
        });
    }
    catch (error) {
        res.status(500).send({ error: "Failed to fetch doctor data" });
    }
});
exports.getCurrentDoctor = getCurrentDoctor;
