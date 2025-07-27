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
exports.addNewPatient = void 0;
const firebase_1 = __importDefault(require("../firebase/firebase"));
const addNewPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, phone, birth, email } = req.body;
    const patientData = {
        firstname,
        lastname,
        phone,
        birth,
        email,
        createdAt: new Date(),
    };
    try {
        const existingPatient = yield firebase_1.default
            .collection('patients')
            .where('email', '==', email)
            .get();
        if (!existingPatient.empty) {
            res.status(400).send({ message: 'Email already in use' });
            return;
        }
        const docRef = yield firebase_1.default.collection('patients').add(patientData);
        res.status(200).send(`Patient stored with ID ${docRef.id}`);
    }
    catch (error) {
        res.status(500).send('Error adding patient: ' + error);
    }
});
exports.addNewPatient = addNewPatient;
