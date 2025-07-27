import { AuthenticatedRequest } from "../middleware/auth";
import { Response } from "express";
import db from "../firebase/firebase";

export const getDoctorPhoto = async(req: AuthenticatedRequest, res: Response) => {
    const doctorId = req.user?.id

    if(!doctorId) {
        res.status(400).send({message : "Please login"})
        return
    }

    try {
        const doctorDoc = await db.collection('doctors').doc(doctorId).get()

        if(!doctorDoc.exists) {
            res.status(404).send({message: "Doctor not found"})
            return
        }

        const doctorData = doctorDoc.data()

        if(!doctorData) {
            res.status(500).send({error: "Doctor data is empty"})
            return
        }

        const { photoURL , password , ...safeData} = doctorData

        res.status(200).send(photoURL)

    } catch (error) {
        res.status(500).send({error: "Failed to fetch doctor photo"})
    }
}