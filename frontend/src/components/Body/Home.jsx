import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import axios from 'axios';
import { PRODUCTS_LIST_API } from '../constants'; 
import { Link } from 'react-router-dom';
import {shoppingImage} from '../Assets/images/shoppingcart.jpg'
const styles = {
    hero: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(https://media.istockphoto.com/id/1437990859/photo/abandoned-shopping-cart-with-groceries.jpg?s=1024x1024&w=is&k=20&c=Dd-5mPVUVrqvXj6j5xDZhny3hUJ7tVyF6dEr_wMlzhA=)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '60vh',
        color: '#fff',
        textAlign: 'center',
    },
    heroText: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '2rem',
    },
    section: {
        padding: '2rem 0',
    },
    card: {
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        },
    },
    media: {
        height: 140,
    },
    button: {
        marginTop: '1rem',
    },
};

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(PRODUCTS_LIST_API);
            setProducts(response.data); 
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <div>
            <div style={styles.hero}>
                <div style={styles.heroText}>
                    <Typography variant="h2" gutterBottom>
                        Welcome to ShopEase
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Your one-stop shop for all your needs
                    </Typography>
                    <Button variant="contained" color="primary" size="large" component={Link} to="/Products" >
                        Shop Now
                    </Button>
                </div>
            </div>

            <Container style={styles.section}>
                <Typography variant="h4" gutterBottom>
                    Featured Products
                </Typography>
                <Grid container spacing={3}>
                    {products.slice(0, 6).map((product) => (
                        <Grid item key={product._id} xs={12} sm={6} md={4}>
                            <Card style={styles.card}>
                                <Link to={`/products/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <CardMedia
                                        style={styles.media}
                                        image={product.img}
                                        title={product.productName}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {product.productName}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {product.description}
                                        </Typography>
                                        <Typography variant="h6" style={{ marginTop: '1rem' }}>
                                            ${product.listPrice}
                                        </Typography>
                                    </CardContent>
                                </Link>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Container style={styles.section}>
                <Typography variant="h4" gutterBottom>
                    Categories
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <Card style={styles.card}>
                            <CardMedia
                                style={styles.media}
                                image="https://via.placeholder.com/400"
                                title="Category 1"
                            />
                            <CardContent>
                                <Typography variant="h6">Category 1</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card style={styles.card}>
                            <CardMedia
                                style={styles.media}
                                image="https://via.placeholder.com/400" 
                                title="Category 2"
                            />
                            <CardContent>
                                <Typography variant="h6">Category 2</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card style={styles.card}>
                            <CardMedia
                                style={styles.media}
                                image="https://via.placeholder.com/400" 
                                title="Category 3"
                            />
                            <CardContent>
                                <Typography variant="h6">Category 3</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>

            <Container style={{ ...styles.section, backgroundColor: '#f5f5f5', textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Limited Time Offer
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Get 50% off on selected items!
                </Typography>
                <Button variant="contained" color="secondary" size="large" style={styles.button}>
                    Shop Now
                </Button>
            </Container>
        </div>
    );
};

export default Home;
