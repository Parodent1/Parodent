import express from 'express';
import { addNewDoctor } from '../controlers/doctorControlers/doctors';
import { loginDoctor } from '../controlers/doctorControlers/loginDoctor';
import { auth, AuthenticatedRequest } from '../middleware/auth';
import { Request, Response } from 'express';
import { validateDoctor } from '../validators/doctorValidators';
import { validateRequest } from '../middleware/validator';
import { getCurrentDoctor } from '../controlers/doctorControlers/currentDoctorLogo';
import { getInfoDoctor } from '../controlers/doctorControlers/currentDoctorAll';
import { addPhoto } from '../controlers/doctorControlers/addDoctorPhoto';
import upload from '../middleware/upload';
import { getDoctorPhoto } from '../controlers/doctorControlers/getDoctorPhoto';
import { getAllDoctors } from '../controlers/doctorControlers/getAllDoctors';

const router = express.Router()

router.post('/doctors', validateDoctor, validateRequest, addNewDoctor);
router.post('/login', loginDoctor)
router.post('/logout', auth, (req: AuthenticatedRequest, res: Response) => {
    res.status(200).send({message: 'Logout succesful'})
})

//Returns only firstname and lastname for front
router.get('/doctor/logo', auth, getCurrentDoctor)

//Returns all information about the doctor 
router.get('/doctor/me', auth, getInfoDoctor)

//Sets photo for doctor
router.post('/doctor/photo' , auth, upload.single('photo'), addPhoto)

//Return all doctor names for appointments
router.get('/allDoctors', getAllDoctors)

//Return photo of the doctor 
router.get('/doctor/photo/me', auth, getDoctorPhoto)
export default router