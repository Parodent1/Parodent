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
exports.updateAppointment = void 0;
const firebase_1 = __importDefault(require("../../firebase/firebase"));
const dayjs_1 = __importDefault(require("dayjs"));
const updateAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const { date, time, duration, patientName, cabinet, comment, doctorName } = req.body;
    const doctorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!doctorId || !id) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {
        const docRef = firebase_1.default.collection("appointments").doc(id);
        const doc = yield docRef.get();
        if (!doc.exists) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        const existing = doc.data();
        const startTime = (0, dayjs_1.default)(`${date} ${time}`, "YYYY-MM-DD HH:mm");
        const endTime = startTime.add(duration, "minute");
        const startMinutes = startTime.hour() * 60 + startTime.minute();
        const endMinutes = endTime.hour() * 60 + endTime.minute();
        // Check overlap in the same cabinet
        const snapshot = yield firebase_1.default.collection('appointments')
            .where("date", "==", date)
            .where("cabinet", "==", cabinet)
            .get();
        for (const other of snapshot.docs) {
            if (other.id === id)
                continue; // skip the same appointment being updated
            const appt = other.data();
            const apptStart = (0, dayjs_1.default)(`${date} ${appt.time}`, "YYYY-MM-DD HH:mm");
            const apptEnd = (0, dayjs_1.default)(`${date} ${appt.endTime}`, "YYYY-MM-DD HH:mm");
            const apptStartMin = apptStart.hour() * 60 + apptStart.minute();
            const apptEndMin = apptEnd.hour() * 60 + apptEnd.minute();
            const overlaps = startMinutes < apptEndMin && endMinutes > apptStartMin;
            if (overlaps) {
                return res.status(409).json({ error: "Updated time overlaps with another appointment" });
            }
        }
        const updatedAppointment = {
            date,
            time,
            endTime: endTime.format("HH:mm"),
            duration,
            patientName,
            cabinet,
            comment,
            doctorId,
            doctorName,
        };
        yield docRef.update(updatedAppointment);
        return res.status(200).json(Object.assign({ message: "Appointment updated", id }, updatedAppointment));
    }
    catch (err) {
        console.error("Update failed:", err);
        return res.status(500).json({ error: "Failed to update appointment" });
    }
});
exports.updateAppointment = updateAppointment;
