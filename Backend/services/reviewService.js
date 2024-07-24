const Review = require('../models/Review');

const createReview = async (userId, productId, rating, comment) => {
    try {
        const review = new Review({
            userId,
            productId,
            rating,
            comment
        });

        const savedReview = await review.save();
        return savedReview;
    } catch (error) {
        throw new Error(error.message);
    }
};
const getReviewsByProductId = async (productId) => {
    try {
        const reviews = await Review.find({ productId }).exec();
        return reviews;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createReview,
    getReviewsByProductId
};
