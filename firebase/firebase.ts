import admin from 'firebase-admin';
import dotenv from 'dotenv'
import path from 'path'

dotenv.config();

const serviceAccountPath = path.resolve(__dirname, '..', process.env.FIREBASE_KEY || '')



admin.initializeApp({
    credential: admin.credential.cert(require(serviceAccountPath)),
});

const db = admin.firestore()

export default db;