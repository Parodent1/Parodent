import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/auth";
import db from '../../firebase/firebase';


export const getInfoDoctor = async(req: AuthenticatedRequest, res: Response) => {

    try {
    const doctorId = req.user?.id

    if(!doctorId) {
        res.status(401).send({error: 'Unauthorized: No doctor ID found in token'})
        return
    }

    const doctorDoc = await db.collection("doctors").doc(doctorId).get()

    if(!doctorDoc.exists) {
        res.status(404).send({error: "Doctor not found"})
        return
    }

    const doctorData = doctorDoc.data()

    if(!doctorData) {
        res.status(500).send({error: "Doctor data is empty"})
        return
    }

    const { password , ...safeData } = doctorData

    res.status(200).send(safeData)
} catch (error) {
    res.status(500).send({error: "Failed to fetch doctor data"})
}
}