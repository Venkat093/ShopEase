
const reviewService = require('../services/reviewService');

const createReview = async (req, res) => {
    const { userId, productId, rating, comment } = req.body;

    try {
        const savedReview = await reviewService.createReview(userId, productId, rating, comment);
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getReviewsByProductId = async (req, res) => {
    const { productId } = req.params;

    try {
        const reviews = await reviewService.getReviewsByProductId(productId);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createReview,
    getReviewsByProductId
};
