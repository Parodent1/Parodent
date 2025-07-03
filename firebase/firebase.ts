import admin from 'firebase-admin';
import serviceAccount from '../parodent-bd5b2-firebase-adminsdk-fbsvc-fe77982253.json';
import { ServiceAccount } from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount)
});

const db = admin.firestore()

export default db;