import express from 'express'
import { auth } from '../middleware/auth'
import { createAppointment } from '../controlers/appointmentControlers/createAppointment'
import { getAppointments } from '../controlers/appointmentControlers/getAppointments'
import { deleteAppointment } from '../controlers/appointmentControlers/deleteAppointment'
import { updateAppointment } from '../controlers/appointmentControlers/updateAppointment'


const router = express.Router()

//Creates appointment for patient
router.post('/createapp', auth, createAppointment)

//Fetch all appointments 
router.get('/appointments', auth, getAppointments)

//Delete appointment by ID
router.delete('/appointment/:id', auth, deleteAppointment)

// Update appointment by ID
router.put('/appointment/:id', auth, updateAppointment)

export default router