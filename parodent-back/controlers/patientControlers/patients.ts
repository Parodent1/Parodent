import { Request, Response } from 'express';
import db from '../../firebase/firebase';

export const addNewPatient = async (req: Request, res: Response): Promise<void> => {
    const { firstname, lastname, phone, birth, email } = req.body;

    const patientData = {
    firstname,
    lastname,
    phone,
    birth,
    email,
    createdAt: new Date(),
    };

    try {
    const existingPatient = await db
        .collection('patients')
        .where('email', '==', email)
        .get();

    if (!existingPatient.empty) {
        res.status(400).send({ message: 'Email already in use' });
        return;
    }

    const docRef = await db.collection('patients').add(patientData);
    res.status(200).send(`Patient stored with ID ${docRef.id}`);
    } catch (error) {
    res.status(500).send('Error adding patient: ' + error);
    }
    };