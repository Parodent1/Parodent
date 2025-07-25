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
    .notEmpty().withMessage('Last name is required'),

    body('phoneNumber')
    .matches(/^\+380\d{9}$/).withMessage('Phone number must start with +380 and contain 9 digits after it'),

    body('cabinetNumber')
    .isInt({ min: 1, max: 8 }).withMessage('Cabinet number must be a number between 1 and 49')
]