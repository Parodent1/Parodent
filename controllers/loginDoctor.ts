import { Request, Response } from "express";
import db from "../firebase/firebase";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv';
dotenv.config();

export const loginDoctor = async(req: Request, res: Response): Promise<void> => {
    const { email , password } = req.body;

    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}


    try {
        const snapshot = await db.collection('doctors')
        .where('email', '==', email)
        .get()

        if(snapshot.empty) {
            res.status(401).send('Doctor not found');
            return
        }

        const doctorDoc = snapshot.docs[0]
        const doctor = doctorDoc.data()

        const isPasswordValid = await bcrypt.compare(password, doctor.password)
        
        if(!isPasswordValid) {
            res.status(401).send('Invalid credentials');
            return
        }

        const token = jwt.sign(
            {
                id: doctorDoc.id,
                email: doctor.email
            }, JWT_SECRET, {expiresIn: '7h'})

            res.status(200).send({ token, doctor: {
                firstname: doctor.firstname,
                lastname: doctor.lastname,
                email: doctor.email
            } })
    } catch (error) {
        res.status(500).send('Login failed' + error)
    }
}