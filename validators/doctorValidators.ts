import { body } from "express-validator";

export const validateDoctor = [
    body('email')
    .isEmail().withMessage('Invalid email address')
    .notEmpty().withMessage('Email is required'),
    
    body('password')
    .isLength({min: 8}).withMessage('Password must be at least 8 characters')
    .notEmpty().withMessage('Password is required'),

    body('firstname')
    .notEmpty().withMessage('First name is required'),

    body('lastname')
    .notEmpty().withMessage('Last name is required')
]