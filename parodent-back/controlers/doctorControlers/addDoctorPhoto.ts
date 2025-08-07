import { AuthenticatedRequest } from "../../middleware/auth";
import { Response } from "express";
import db from '../../firebase/firebase';

export const addPhoto = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const doctorId = req.user?.id;
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
        const photoURL = file.path

        await db.collection('doctors').doc(doctorId).update({ photoURL });

        res.status(200).send({ message: "Photo updated successfully", photoURL });
    } catch (error) {
        res.status(500).send({ error: "Error uploading photo", details: error });
    }
};
