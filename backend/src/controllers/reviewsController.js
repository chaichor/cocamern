const reviewsController = {};

import reviewsModel from "../models/Reviews.js";

//--------------------SELECT---------------------

reviewsController.getReviews = async (req, res) => {
    const reviews = await reviewsModel.find().populate("idClient");
    res.json(reviews);
};

// ------------------INSERT------------------------

reviewsController.insertReviews = async (req, res) => {

    const {comment, rating, idClient} = req.body;
    const newReview = new reviewsModel({
        comment, 
        rating, 
        idClient, 
});
    await newReview.save();
    res.json({message: "review saved"});

};

// ------------------ DELETE -------------------------

reviewsController.deleteReviews = async (req, res) => {
    await reviewsModel.findByIdAndDelete(req.params.id)
    res.json({message: "review deleted"});
};

// ------------------- UPDATE ------------------------

reviewsController.updateReviews = async (req, res) => {
    const {comment, rating, idClient} = req.body;
    await reviewsModel.findByIdAndDelete(req.params.id,
        {comment, rating, idClient}, 
        {new: true})

        res.json({message: "review updated"});
};

export default reviewsController;
