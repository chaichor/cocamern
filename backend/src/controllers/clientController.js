//array de funciones del Cliento
const clientController = {};
import clientModel from "../models/Client.js";

//--------------------SELECT---------------------

clientController.getClient = async (req, res) => {
    const client = await clientModel.find();
    res.json(client);
};

// ------------------INSERT------------------------

clientController.insertClient = async (req, res) => {

    const {name, lastName, birthDay, email, password, telephone, dui, isVerified} = req.body;
    const newClient = new clientModel({name, 
        lastName, 
        birthDay, 
        email,
        password,
        telephone,
        dui,
        isVerified});
    await newClient.save();
    res.json({message: "Client saved"});
};

// ------------------ DELETE -------------------------

clientController.deleteClient = async (req, res) => {
    await clientModel.findByIdAndDelete(req.params.id)
    res.json({message: "Client deleted"});
};

// ------------------- UPDATE ------------------------

clientController.updateClient = async (req, res) => {
    const {name, lastName, birthDay, email, password, telephone, dui, isVerified} = req.body;
    const updatedClient = await clientModel.findByIdAndUpdate(req.params.id, 
        {name, lastName, birthDay, email, password, telephone, dui, isVerified}, {new: true});
        res.json({message: "Client updated"});
};

export default clientController;