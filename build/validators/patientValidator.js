"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePatient = void 0;
const express_validator_1 = require("express-validator");
exports.validatePatient = [
    (0, express_validator_1.body)('firstname')
        .notEmpty().withMessage('First name is required'),
    (0, express_validator_1.body)('lastname')
        .notEmpty().withMessage('Last name is required'),
    (0, express_validator_1.body)('phone')
        .matches(/^\+380\d{9}$/).withMessage('Phone number must start with +380 and contain 9 digits after it'),
    (0, express_validator_1.body)('birth')
        .isISO8601().toDate().withMessage('Birth date must be a valid date'),
    (0, express_validator_1.body)('email')
        .isEmail().withMessage('Invalid email address')
        .notEmpty().withMessage('Email is required'),
];
