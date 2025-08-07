import { Response, Request } from "express";
import db from '../../firebase/firebase';
import { AuthenticatedRequest } from "../../middleware/auth";
import dayjs from "dayjs";

export const createAppointment = async(req: AuthenticatedRequest, res: Response) => {
    const { date, time, duration,  patientName, cabinet, comment, doctorName } = req.body;

    const doctorId = req.user?.id

    if (!doctorId || !doctorName || !date || !time || !duration || !cabinet || !patientName) {
        return res.status(400).send("Missing required fields");
    }

    const startTime = dayjs(`${date} ${time}`, "YYYY-MM-DD HH:mm");
    const endTime = startTime.add(duration, "minute");
    const startMinutes = startTime.hour() * 60 + startTime.minute();
    const endMinutes = endTime.hour() * 60 + endTime.minute();

    try {
        const snapshot = await db.collection('appointments')
        .where("date", "==", date)
        .where("cabinet", "==", cabinet)
        .get();

        for(const doc of snapshot.docs) {
            const appt = doc.data();

            const apptStart = dayjs(`${date} ${appt.time}`, "YYYY-MM-DD HH:mm");
            const apptEnd = dayjs(`${date} ${appt.endTime}`, "YYYY-MM-DD HH:mm");

            const apptStartMin = apptStart.hour() * 60 + apptStart.minute();
            const apptEndMin = apptEnd.hour() * 60 + apptEnd.minute();

            const overlaps = startMinutes < apptEndMin && endMinutes > apptStartMin
            if(overlaps) {
                res.status(401).send("Appointment overlaps with existing one !")
                return
            }
        }

        const newAppointment = {
            date,
            time: time, 
            endTime: endTime.format("HH:mm"),
            duration,
            patientName,
            cabinet,
            comment,
            doctorId,
            doctorName,
        };

        const docRef = await db.collection('appointments').add(newAppointment);
        res.status(200).send({id: docRef.id , ...newAppointment})
    } catch (error) {
        res.status(500).send("Failed to create appointment")
    }
}