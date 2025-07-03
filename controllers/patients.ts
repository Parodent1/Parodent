import { Request, Response } from 'express';
import db from '../firebase/firebase';

export const addNewPatient = async (req: Request, res: Response): Promise<void> => {
    const patientData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        birth: req.body.birth,
        createdAt: new Date()
    };


    try {
        const docRef = await db.collection('patients').add(patientData)
        res.status(200).send(`Patient stored with ID ${docRef.id}`)
    } catch(error) {
        res.status(500).send("Error adding patient" + error)
    }
}
