import { body } from 'express-validator';

export const validatePatient = [
body('firstname')
    .notEmpty().withMessage('First name is required'),

body('lastname')
    .notEmpty().withMessage('Last name is required'),

body('phone')
    .matches(/^\+380\d{9}$/).withMessage('Phone number must start with +380 and contain 9 digits after it'),

body('birth')
    .isISO8601().toDate().withMessage('Birth date must be a valid date'),

body('email')
    .isEmail().withMessage('Invalid email address')
    .notEmpty().withMessage('Email is required'),
];