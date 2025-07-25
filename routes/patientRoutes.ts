import express from 'express';
import { addNewPatient } from '../controllers/patients.js';
import { validatePatient } from '../validators/patientValidator.js';
import { validateRequest } from '../middleware/validator.js';
import { auth } from '../middleware/auth.js';
import { getInfoPatient } from '../controllers/getInfoPatient.js';

const router = express.Router();

router.post('/patients', validatePatient, validateRequest, addNewPatient);

router.get('/patients/me', auth, getInfoPatient)

export default router;