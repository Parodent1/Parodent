import express from 'express';
import { addNewPatient } from '../controllers/patients.js';

const router = express.Router();

router.post('/patients', addNewPatient) ;

export default router;