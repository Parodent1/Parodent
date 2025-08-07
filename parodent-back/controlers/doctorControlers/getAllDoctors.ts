import { Request, Response } from "express";
import db from "../../firebase/firebase";

export const getAllDoctors = async(req: Request, res: Response) => {
    try {
        const doctorsSnapshot = await db.collection('doctors').get();

        const doctors = doctorsSnapshot.docs.map(doc => {
            const data = doc.data();
            const name = `${data.lastname} ${data.firstname[0]}`;

            return {
                id: doc.id,
                name,
                cabinetNumber: data.cabinetNumber
            };
        });

        res.status(200).send(doctors);
    } catch (error) {
        console.error('Error fetching doctors' , error);
        res.status(500).send({error: "Failed to fetch doctors"})
    }
}