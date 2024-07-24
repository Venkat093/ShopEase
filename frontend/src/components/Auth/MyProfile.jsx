import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from "../context/UserContext";
import { Container, Box, Typography, TextField, Button, Paper, Grid, Avatar, Drawer, List, ListItem, ListItemText, CssBaseline, AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const MyProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    address: '',
    mobile: ''
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/auth/${user?.user._id}`);
        setProfileData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/api/user/${user.id}`, profileData);
      setUser(response.data);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {['Home', 'productss', 'AddProduct', 'AdminOrders', 'cart'].map((text, index) => (
          <ListItem button key={text} onClick={() => navigate(`/${text}`)}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            My Profile
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Container maxWidth="sm">
          <Paper sx={{ p: 3, mt: 5, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar src="user_image_url" sx={{ width: 100, height: 100, mb: 2 }} />
              <Typography variant="h4" gutterBottom>
                My Profile
              </Typography>
            </Box>
            <Box component="form" sx={{ mt: 3 }}>
              <TextField
                label="Username"
                name="username"
                value={profileData.username}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="email"
              />
              <TextField
                label="Address"
                name="address"
                value={profileData.address}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Mobile"
                name="mobile"
                value={profileData.mobile}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="tel"
              />
              <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ mt: 3 }}>
                Update Profile
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default MyProfile;
