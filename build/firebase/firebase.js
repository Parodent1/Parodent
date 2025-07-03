"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const parodent_bd5b2_firebase_adminsdk_fbsvc_fe77982253_json_1 = __importDefault(require("../parodent-bd5b2-firebase-adminsdk-fbsvc-fe77982253.json"));
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(parodent_bd5b2_firebase_adminsdk_fbsvc_fe77982253_json_1.default)
});
const db = firebase_admin_1.default.firestore();
exports.default = db;
