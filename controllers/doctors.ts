import { Request, Response } from "express";
import db from '../firebase/firebase'
import bcrypt from 'bcryptjs'

export const addNewDoctor = async (req: Request, res: Response): Promise<void> => {

    const { email, password , firstname, lastname, phoneNumber, cabinetNumber } = req.body

    try {
        const existingDoctor = await db.collection('doctors')
        .where('email', '==', email)
        .get();

        if(!existingDoctor.empty) {
            res.status(400).send({ message: 'Email already in use' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10)


        const doctorData = {
            email,
            password: hashedPassword,
            firstname,
            lastname,
            phoneNumber,
            cabinetNumber,
            createdAt: new Date()
        }

        const docRef = await db.collection('doctors').add(doctorData)
        res.status(200).send(`Doctor stored with ID ${docRef.id}`)
    } catch (error) {
        res.status(500).send("Error adding doctor" + error)
    }
}