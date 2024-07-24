import React,{useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext'; // Import UserContext
import CartContext from '../context/CartContext';
export const NavigationBar = () => {
  const { user,setUser } = useContext(UserContext);
  const {  clearCart } = useContext(CartContext);
  const handleLogOut = () =>{
    setUser(null);
    clearCart();
  }
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
        <Button component={Link} to="/" color="inherit" variant="h6" style={{ flexGrow: 1 }}>
        Shopease
          </Button>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            
          </Typography>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/AddProduct" color="inherit">
            Add
          </Button>
          <Button component={Link} to={`/MyOrders/${user?.user._id}`}  color="inherit">
            My Orders
          </Button>
          
          {user?.token ? (
          <Button onClick={handleLogOut} color="inherit">
            Log out
          </Button>): (<Button component={Link} to="/Login" color="inherit">
          Login
        </Button>)}

         {user?.token && 
           <Button component={Link} to="/profile" color="inherit">
          My profile
        </Button>}
        
          <Button component={Link} to="/cart" color="inherit">
            <ShoppingCartIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
