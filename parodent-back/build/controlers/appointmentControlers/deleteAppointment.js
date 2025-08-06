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
exports.deleteAppointment = void 0;
const firebase_1 = __importDefault(require("../../firebase/firebase"));
const deleteAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!id || !userId) {
        return res.status(400).json({ error: "Missing appointment ID or unauthorized" });
    }
    try {
        const docRef = firebase_1.default.collection("appointments").doc(id);
        const doc = yield docRef.get();
        if (!doc.exists) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        yield docRef.delete();
        return res.status(200).json({ message: "Appointment deleted successfully", id });
    }
    catch (error) {
        console.error("Error deleting appointment:", error);
        return res.status(500).json({ error: "Failed to delete appointment" });
    }
});
exports.deleteAppointment = deleteAppointment;
