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
exports.addPhoto = void 0;
const firebase_1 = __importDefault(require("../firebase/firebase"));
const addPhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const doctorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const file = req.file;
    if (!doctorId) {
        res.status(401).send({ error: "Please login" });
        return;
    }
    if (!file || !file.path) {
        res.status(400).send({ error: 'No photo uploaded' });
        return;
    }
    try {
        const photoURL = file.path;
        yield firebase_1.default.collection('doctors').doc(doctorId).update({ photoURL });
        res.status(200).send({ message: "Photo updated successfully", photoURL });
    }
    catch (error) {
        res.status(500).send({ error: "Error uploading photo", details: error });
    }
});
exports.addPhoto = addPhoto;
