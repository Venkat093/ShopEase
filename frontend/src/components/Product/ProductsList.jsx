import React, { useState, useEffect } from 'react';
import { Grid, Container, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import axios from 'axios';
import { PRODUCTS_LIST_API } from '../constants'; // Assuming you have a constants file for API URLs
import { Link } from 'react-router-dom';

const styles = {
    card: {
        transition: 'transform 0.2s, box-shadow 0.2s',
        border: '1px solid transparent',
        '&:hover': {
            transform: 'scale(5.05)',
            boxShadow: '0 8px 16px rgba(0, 0, 255, 0.2)',
            borderColor: '#3f51b5',
        },
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: '4px 4px 0 0',
    },
    price: {
        marginTop: '1rem',
        fontWeight: 'bold',
    },
    actions: {
        justifyContent: 'center',
    },
};

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(PRODUCTS_LIST_API);
            setProducts(response.data); // Assuming response.data is an array of products
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item key={product._id} xs={12} sm={6} md={4}>
                        <Card style={styles.card}>
                            <Link to={`/products/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                {/* Product Image */}
                                <img src={product.img} alt={product.productName} style={styles.image} />

                                <CardContent>
                                    {/* Product Title */}
                                    <Typography variant="h6" gutterBottom>
                                        {product.productName}
                                    </Typography>
                                    {/* Product Description */}
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {product.description}
                                    </Typography>
                                    {/* Product Price */}
                                    <Typography variant="h6" style={styles.price}>
                                        ${product.listPrice}
                                    </Typography>
                                </CardContent>

                                <CardActions style={styles.actions}>
                                    {/* Add to Cart Button (you can add functionality here) */}
                                    <Button variant="contained" color="primary">
                                        Add to Cart
                                    </Button>
                                </CardActions>
                            </Link>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Products;
