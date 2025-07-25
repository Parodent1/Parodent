import express from 'express'
import { auth } from '../middleware/auth'
import { createAppointment } from '../controllers/createAppointment'
import { getAppointments } from '../controllers/getAppointments'


const router = express.Router()

// Creates appointment for patient
router.post('/createapp', auth, createAppointment )

//Fetch all appointments 
router.get('/appointments', auth, getAppointments)

export default router