// CreateProduct.js

import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid,Paper } from '@mui/material';
import { ADD_PRODUCT_API } from '../constants';
import axios from 'axios';
const CreateProduct = ({ onSubmit }) => {
    const [productName, setProductName] = useState('');
    const [brand, setBrand] = useState('');
    const [ram, setRam] = useState('');
    const [rom, setRom] = useState('');
    const [weight, setWeight] = useState('');
    const [publisher, setPublisher] = useState('');
    const [listPrice, setListPrice] = useState('');
    const [img, setImg] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Form validation can be added here

        // Create product object
        const newProduct = {
            productName,
            brand,
            ram,
            rom,
            weight,
            publisher,
            listPrice: parseFloat(listPrice),
            img,
            description
        };
        try {
            const response = await axios.post(ADD_PRODUCT_API, newProduct);
            //setUser(response.data);
            console.log(response.data);
           // navigate('/Home');
          } catch (error) {
            console.error('There was an error signing up!', error);
          }

        // Pass the new product object to the onSubmit function
       // onSubmit(newProduct);

        // Clear form fields after submission (optional)
        setProductName('');
        setBrand('');
        setRam('');
        setRom('');
        setWeight('');
        setPublisher('');
        setListPrice('');
        setImg('');
        setDescription('');
    };

    return (
        <Container maxWidth="sm" style={{ padding: '20px', marginBottom: '50px' }}>
        <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Add Product
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Product Name"
                            fullWidth
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Brand"
                            fullWidth
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="RAM"
                            fullWidth
                            value={ram}
                            onChange={(e) => setRam(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="ROM"
                            fullWidth
                            value={rom}
                            onChange={(e) => setRom(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Weight"
                            fullWidth
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Publisher"
                            fullWidth
                            value={publisher}
                            onChange={(e) => setPublisher(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="List Price"
                            fullWidth
                            type="number"
                            value={listPrice}
                            onChange={(e) => setListPrice(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Image URL"
                            fullWidth
                            value={img}
                            onChange={(e) => setImg(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            fullWidth
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '1rem' }}
                >
                    Add Product
                </Button>
            </form>
            </Paper>
        </Container>
    );
};

export default CreateProduct;
