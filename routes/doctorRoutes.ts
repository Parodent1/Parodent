import express from 'express';
import { addNewDoctor } from '../controllers/doctors';
import { loginDoctor } from '../controllers/loginDoctor';

const router = express.Router()

router.post('/doctors', addNewDoctor);
router.post('/login', loginDoctor)

export default router