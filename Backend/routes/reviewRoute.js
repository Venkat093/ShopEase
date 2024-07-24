const express = require('express');

const {createReview,getReviewsByProductId} = require('../controllers/reviewController');
const router = express.Router();
// Route for creating a review
router.post('/', createReview);
router.get('/:productId', getReviewsByProductId);

module.exports = router;
