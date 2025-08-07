import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/auth";
import db from "../../firebase/firebase";

export const deleteAppointment = async(req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.id

    if (!id || !userId) {
        return res.status(400).json({ error: "Missing appointment ID or unauthorized" });
    }

    try {
        const docRef = db.collection("appointments").doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        await docRef.delete();
        return res.status(200).json({ message: "Appointment deleted successfully", id });
    } catch (error) {
        console.error("Error deleting appointment:", error);
        return res.status(500).json({ error: "Failed to delete appointment" });
    }
}