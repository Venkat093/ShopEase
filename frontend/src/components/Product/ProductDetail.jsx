import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Button,
  Divider,
  TextField,
  List,
  ListItem,
  ListItemText,
  Rating,
  Box,
} from "@mui/material";
import UserContext from "../context/UserContext";
import CartContext from "../context/CartContext"; // Import CartContext

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from URL params
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const { user } = useContext(UserContext);
  const { addToCart } = useContext(CartContext); // Use CartContext
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    fetchProductDetails();
    fetchReviews();
  }, [id]); // Fetch product details and reviews whenever ID changes

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/products/${id}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/reviews/${id}`
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleReviewSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/reviews", {
        userId: user.user._id,
        productId: id,
        comment: reviewText,
        rating: rating,
      });
      console.log("Review submitted:", response.data);
      // Optionally, you can update the reviews state to include the new review
      fetchReviews(); // Refresh reviews after submission
      setReviewText("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart'); // Navigate to the Cart component
  };

  if (!product) {
    return <div>Loading...</div>; // Placeholder for loading state
  }

  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100%",
            }}
          >
            <CardMedia
              component="img"
              image={product.img}
              alt={product.productName}
              style={{
                maxHeight: "400px",
                width: "auto",
                objectFit: "contain",
              }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "2rem" }}>
            <Typography variant="h4" gutterBottom>
              {product.productName}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              By {product.publisher}
            </Typography>
            <Divider style={{ margin: "1rem 0" }} />
            <Typography variant="body1" style={{ marginTop: "1rem" }}>
              {product.description}
            </Typography>
            <Divider style={{ margin: "1rem 0" }} />
            <Typography
              variant="body1"
              style={{ marginTop: "1rem", fontWeight: "bold" }}
            >
              Specifications:
            </Typography>
            <Typography
              variant="body2"
              component="div"
              style={{
                marginLeft: "1rem",
                marginTop: "1rem",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>
                <strong>Brand:</strong> {product.brand}
              </span>
              <span>
                <strong>RAM:</strong> {product.ram}
              </span>
              <span>
                <strong>ROM:</strong> {product.rom}
              </span>
              <span>
                <strong>Weight:</strong> {product.weight}
              </span>
            </Typography>
            <Typography variant="h6" style={{ marginTop: "1rem" }}>
              Price: ${product.listPrice}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "1rem" }}
              onClick={handleAddToCart} // Add to Cart button handler
            >
              Add to Cart
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: "2rem", marginTop: "2rem" }}>
            <Typography variant="h5" gutterBottom>
              Reviews & Ratings
            </Typography>
            {reviews.length === 0 ? (
              <Typography variant="body1" style={{ marginTop: "1rem" }}>
                No reviews yet. Be the first to review this product!
              </Typography>
            ) : (
              <List>
                {reviews.map((review, index) => (
                  <ListItem
                    key={index}
                    alignItems="flex-start"
                    style={{
                      marginBottom: "1rem",
                      paddingBottom: "1rem",
                      borderBottom: "1px solid #ccc",
                    }}
                  >
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Box display="flex" justifyContent="space-between">
                            <Typography
                              variant="body1"
                              component="span"
                              color="textPrimary"
                            >
                              Review Description: {review.comment}
                            </Typography>
                            <Typography
                              variant="body2"
                              component="span"
                              color="textSecondary"
                            >
                              {new Date(review.date).toLocaleDateString()}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="textSecondary">
                            User ID: {review.userId}
                          </Typography>
                        </React.Fragment>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            Rating:
                          </Typography>
                          <Rating
                            name={`review-rating-${index}`}
                            value={review.rating}
                            readOnly
                            precision={0.5}
                          />
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
            <Divider style={{ margin: "1rem 0" }} />
            <TextField
              label="Write a review"
              multiline
              fullWidth
              rows={4}
              variant="outlined"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              style={{ marginBottom: "1rem" }}
            />
            <Rating
              name="product-rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              precision={0.5}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "1rem" }}
              onClick={handleReviewSubmit}
            >
              Submit Review
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
