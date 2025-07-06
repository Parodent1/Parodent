import express from 'express';
import { addNewDoctor } from '../controllers/doctors';
import { loginDoctor } from '../controllers/loginDoctor';
import { auth, AuthenticatedRequest } from '../middleware/auth';
import { Request, Response } from 'express';
import { validateDoctor } from '../validators/doctorValidators';
import { validateRequest } from '../middleware/validator';

const router = express.Router()

router.post('/doctors', addNewDoctor);
router.post('/login', loginDoctor)
router.post('/logout', auth, (req: AuthenticatedRequest, res: Response) => {
    res.status(200).send({message: 'Logout succesful'})
})


export default router