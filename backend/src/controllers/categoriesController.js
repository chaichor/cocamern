//array de funciones de la Categoria
const categoriesController = {};
import categoriesModel from "../models/Categories.js";

//--------------------SELECT---------------------

categoriesController.getCategories = async (req, res) => {
    const categories = await categoriesModel.find();
    res.json(categories);
};

// ------------------INSERT------------------------

categoriesController.insertCategories = async (req, res) => {

    const {name, description, status, image} = req.body;
    const newCategories = new categoriesModel({name, 
        description, 
        status, 
        image});
    await newCategories.save();
    res.json({message: "Categories saved"});

};

// ------------------ DELETE -------------------------

categoriesController.deleteCategories = async (req, res) => {
    await categoriesModel.findByIdAndDelete(req.params.id)
    res.json({message: "Categories deleted"});
};

// ------------------- UPDATE ------------------------

categoriesController.updateCategories = async (req, res) => {
    const {name, description, status, image} = req.body;
    const updatedCategories = await categoriesModel.findByIdAndUpdate(req.params.id, 
        {name, description, status, image}, {new: true});
        res.json({message: "Categories updated"});
};

export default categoriesController;