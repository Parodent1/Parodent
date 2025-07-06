"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginDoctor = void 0;
const firebase_1 = __importDefault(require("../firebase/firebase"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const loginDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    try {
        const snapshot = yield firebase_1.default.collection('doctors')
            .where('email', '==', email)
            .get();
        if (snapshot.empty) {
            res.status(401).send('Doctor not found');
            return;
        }
        const doctorDoc = snapshot.docs[0];
        const doctor = doctorDoc.data();
        const isPasswordValid = yield bcryptjs_1.default.compare(password, doctor.password);
        if (!isPasswordValid) {
            res.status(401).send('Invalid credentials');
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            id: doctorDoc.id,
            email: doctor.email
        }, JWT_SECRET, { expiresIn: '7h' });
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).send('Login failed' + error);
    }
});
exports.loginDoctor = loginDoctor;
