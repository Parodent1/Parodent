import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
import db from "../firebase/firebase";


export const getInfoPatient = async(req: AuthenticatedRequest, res: Response) => {

    try {
    const patientId = req.user?.id

    if(!patientId) {
        res.status(401).send({error: 'Unauthorized: No patient ID found in token'})
        return
    }

    const patientDoc = await db.collection("patients").doc(patientId).get()

    if(!patientDoc.exists) {
        res.status(404).send({error: "Patient not found"})
        return
    }

    const patientData = patientDoc.data()

    if(!patientData) {
        res.status(500).send({error: "Patient data is empty"})
        return
    }

    const { password , ...safeData } = patientData

    res.status(200).send(safeData)
} catch (error) {
    res.status(500).send({error: "Failed to fetch patient data"})
}
}