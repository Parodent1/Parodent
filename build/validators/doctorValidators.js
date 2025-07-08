"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDoctor = void 0;
const express_validator_1 = require("express-validator");
exports.validateDoctor = [
    (0, express_validator_1.body)('email')
        .isEmail().withMessage('Invalid email address')
        .notEmpty().withMessage('Email is required'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .notEmpty().withMessage('Password is required'),
    (0, express_validator_1.body)('firstname')
        .notEmpty().withMessage('First name is required'),
    (0, express_validator_1.body)('lastname')
        .notEmpty().withMessage('Last name is required')
];
