const assessmentController = {};

import assessmentModel from "../models/Assessment.js";

//--------------------SELECT---------------------

assessmentController.getAssessment = async (req, res) => {
    const assessment = await assessmentModel.find().populate("IdEmployee");
    res.json(assessment);
};

// ------------------INSERT------------------------

assessmentController.insertAssessment = async (req, res) => {

    const {comment, grade, role, IdEmployee} = req.body;
    const newAssessment = new assessmentModel({
        comment, 
        grade, 
        role, IdEmployee, 
});
    await newAssessment.save();
    res.json({message: "Assessment saved"});

};

// ------------------ DELETE -------------------------

assessmentController.deleteAssessment = async (req, res) => {
    await assessmentModel.findByIdAndDelete(req.params.id)
    res.json({message: "Assessment deleted"});
};

// ------------------- UPDATE ------------------------

assessmentController.updateAssessment = async (req, res) => {
    const {comment, grade, role, IdEmployee} = req.body;
    await assessmentModel.findByIdAndDelete(req.params.id,
        {comment, grade, role, IdEmployee}, 
        {new: true})

        res.json({message: "Assessment updated"});
};

export default assessmentController;
