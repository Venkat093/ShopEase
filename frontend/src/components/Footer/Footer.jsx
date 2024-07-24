
import React from 'react';
import { Grid, Container, Typography, Link } from '@mui/material';

const Footer = () => {
    const footerStyle = {
        backgroundColor: '#f0f0f0', 
        padding: '4rem 0',
        marginTop: 'auto',
    };

    const footerLinkStyle = {
        margin: '0.5rem 1rem',
        color: '#333', 
        textDecoration: 'none',
        '&:hover': {
            color: '#007BFF', 
            textDecoration: 'underline',
        },
    };

    return (
        <footer style={footerStyle}>
            <Container maxWidth="lg">
                <Grid container spacing={3} justifyContent="space-evenly">
                    {/* Column 1 */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" color="textPrimary" gutterBottom>
                            Company Name
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Providing quality products and services since YYYY.
                        </Typography>
                    </Grid>

                    {/* Column 2 */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" color="textPrimary" gutterBottom>
                            Quick Links
                        </Typography>
                        <div>
                            <Link href="/home" style={footerLinkStyle}>
                                Home
                            </Link>
                            <Link href="/shop" style={footerLinkStyle}>
                                Shop
                            </Link>
                            <Link href="/about" style={footerLinkStyle}>
                                About Us
                            </Link>
                            <Link href="/contact" style={footerLinkStyle}>
                                Contact Us
                            </Link>
                        </div>
                    </Grid>

                    {/* Column 3 */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" color="textPrimary" gutterBottom>
                            Categories
                        </Typography>
                        <div>
                            <Link href="/electronics" style={footerLinkStyle}>
                                Electronics
                            </Link>
                            <Link href="/clothing" style={footerLinkStyle}>
                                Clothing
                            </Link>
                            <Link href="/books" style={footerLinkStyle}>
                                Books
                            </Link>
                            <Link href="/toys" style={footerLinkStyle}>
                                Toys
                            </Link>
                        </div>
                    </Grid>

                    {/* Column 4 */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" color="textPrimary" gutterBottom>
                            Social Media
                        </Typography>
                        <div>
                            <Link href="https://facebook.com" style={footerLinkStyle} target="_blank" rel="noopener noreferrer">
                                Facebook
                            </Link>
                            <Link href="https://twitter.com" style={footerLinkStyle} target="_blank" rel="noopener noreferrer">
                                Twitter
                            </Link>
                            <Link href="https://instagram.com" style={footerLinkStyle} target="_blank" rel="noopener noreferrer">
                                Instagram
                            </Link>
                            <Link href="https://linkedin.com" style={footerLinkStyle} target="_blank" rel="noopener noreferrer">
                                LinkedIn
                            </Link>
                        </div>
                    </Grid>
                </Grid>

                {/* Bottom Footer */}
                <Typography variant="body2" align="center" color="textSecondary" style={{ marginTop: '2rem' }}>
                    &copy; {new Date().getFullYear()} Company Name. All rights reserved.
                </Typography>
            </Container>
        </footer>
    );
};

export default Footer;
