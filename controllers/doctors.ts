import { Request, Response } from "express";
import db from '../firebase/firebase'
import bcrypt from 'bcryptjs'

export const addNewDoctor = async (req: Request, res: Response): Promise<void> => {

    const { email, password , firstname, lastname } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const doctorData = {
        email,
        password: hashedPassword,
        firstname,
        lastname,
        createdAt: new Date()
    }

    try {
        const docRef = await db.collection('doctors').add(doctorData)
        res.status(200).send(`Doctor stored with ID ${docRef.id}`)
    } catch (error) {
        res.status(500).send("Error adding doctor" + error)
    }
}