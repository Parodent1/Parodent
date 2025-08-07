import { Response } from "express";
import db from "../../firebase/firebase";
import { AuthenticatedRequest } from "../../middleware/auth";
import dayjs from "dayjs";

export const updateAppointment = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const { date, time, duration, patientName, cabinet, comment, doctorName } = req.body;

    const doctorId = req.user?.id;
    if (!doctorId || !id) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const docRef = db.collection("appointments").doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        const existing = doc.data();
        
        const startTime = dayjs(`${date} ${time}`, "YYYY-MM-DD HH:mm");
        const endTime = startTime.add(duration, "minute");
        const startMinutes = startTime.hour() * 60 + startTime.minute();
        const endMinutes = endTime.hour() * 60 + endTime.minute();

        // Check overlap in the same cabinet
        const snapshot = await db.collection('appointments')
            .where("date", "==", date)
            .where("cabinet", "==", cabinet)
            .get();

        for (const other of snapshot.docs) {
            if (other.id === id) continue; // skip the same appointment being updated

            const appt = other.data();
            const apptStart = dayjs(`${date} ${appt.time}`, "YYYY-MM-DD HH:mm");
            const apptEnd = dayjs(`${date} ${appt.endTime}`, "YYYY-MM-DD HH:mm");

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

        await docRef.update(updatedAppointment);

        return res.status(200).json({ message: "Appointment updated", id, ...updatedAppointment });
    } catch (err) {
        console.error("Update failed:", err);
        return res.status(500).json({ error: "Failed to update appointment" });
    }
};