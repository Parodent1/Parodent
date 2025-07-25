import { Response, Request } from "express";
import db from "../firebase/firebase";
import { AuthenticatedRequest } from "../middleware/auth";

export const createAppointment = async(req: AuthenticatedRequest, res: Response) => {
    const { date, time, patientName, cabinet, comment, doctorName } = req.body;

    const doctorId = req.user?.id

    if(!doctorId || !doctorName) {
        res.status(400).send("Doctor is required!")
        return
    }

    const newAppointment = {
        date,
        time,
        patientName,
        cabinet,
        comment,
        doctorId,
        doctorName
    }

    try {
        const docRef = await db.collection('appointments').add(newAppointment);
        res.status(200).send({id: docRef.id , ...newAppointment})
    } catch (error) {
        res.status(500).send("Failed to create appointment")
    }
}