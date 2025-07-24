import { AuthenticatedRequest } from "../middleware/auth";
import { Response } from "express";
import db from "../firebase/firebase";
import dayjs from 'dayjs'

export const getAppointments = async(req: AuthenticatedRequest, res: Response) => {
    try {
        const { date } = req.query
        const targetDate = date || dayjs().format('YYYY-MM-DD');

        const snapshot = await db.collection('appointments')
        .where('date', '==', targetDate).get()

        const appointmentsByCabinet: Record<string, any[]> = {};

        snapshot.forEach(doc => {
            const data = doc.data();
            const cabinet = data.cabinet?.toString() || 'unknown';

            if(!appointmentsByCabinet[cabinet]) {
                appointmentsByCabinet[cabinet] = []
            }
        
            appointmentsByCabinet[cabinet].push({
                id: doc.id,
                ...data
            })
        })

        Object.keys(appointmentsByCabinet).forEach(cabinet => {
            appointmentsByCabinet[cabinet].sort((a, b) => {
                return dayjs(b.time, 'HH:mm').unix() - dayjs(a.time, 'HH:mm').unix()
            })
        })
        res.status(200).send(appointmentsByCabinet)
    } catch (error) {
        res.status(500).send('Failed to fetch appointments')
    }
}