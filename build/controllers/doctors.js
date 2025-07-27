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
exports.addNewDoctor = void 0;
const firebase_1 = __importDefault(require("../firebase/firebase"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const addNewDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstname, lastname, phoneNumber, cabinetNumber } = req.body;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const doctorData = {
        email,
        password: hashedPassword,
        firstname,
        lastname,
        phoneNumber,
        cabinetNumber,
        createdAt: new Date()
    };
    try {
        const existingDoctor = yield firebase_1.default.collection('doctors')
            .where('email', '==', email)
            .get();
        if (!existingDoctor.empty) {
            res.status(400).send({ message: 'Email already in use' });
            return;
        }
        const docRef = yield firebase_1.default.collection('doctors').add(doctorData);
        res.status(200).send(`Doctor stored with ID ${docRef.id}`);
    }
    catch (error) {
        res.status(500).send("Error adding doctor" + error);
    }
});
exports.addNewDoctor = addNewDoctor;
