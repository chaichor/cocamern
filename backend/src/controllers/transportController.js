// Array de funciones para Transport
const transportController = {};
import TransportModel from "../models/Transport.js";

// -------------------- SELECT ---------------------

transportController.getTransports = async (req, res) => {
    try {
        const transports = await TransportModel.find();
        res.json(transports);
    } catch (error) {
        res.status(500).json({ message: "Error fetching transports", error });
    }
};

// ------------------ INSERT ------------------------

transportController.insertTransport = async (req, res) => {
    try {
        const { name, num } = req.body;
        const newTransport = new TransportModel({
            name,
            num
        });
        await newTransport.save();
        res.json({ message: "Transport saved" });
    } catch (error) {
        res.status(500).json({ message: "Error saving transport", error });
    }
};

// ------------------ DELETE -------------------------

transportController.deleteTransport = async (req, res) => {
    try {
        await TransportModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Transport deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting transport", error });
    }
};

// ------------------- UPDATE ------------------------

transportController.updateTransport = async (req, res) => {
    try {
        const { name, num } = req.body;
        const updatedTransport = await TransportModel.findByIdAndUpdate(
            req.params.id,
            { name, num },
            { new: true }
        );
        res.json({ message: "Transport updated", updatedTransport });
    } catch (error) {
        res.status(500).json({ message: "Error updating transport", error });
    }
};

export default transportController;
