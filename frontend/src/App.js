import logo from "./logo.svg";
import "./App.css";
import { NavigationBar } from "./components/Header/NavigationBar";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./components/Body/Home";
import CreateProduct from "./components/Product/CreateProduct";
import Footer from "./components/Footer/Footer";
import Products from "./components/Product/ProductsList";
import ProductDetail from "./components/Product/ProductDetail";
import Cart from "./components/Body/Cart";
import Checkout from "./components/Body/Checkout";
import OrderConfirmation from "./components/Body/OrderConfermation";
import MyOrders from "./components/Body/Myorders";
import AdminProducts from "./components/Auth/Admin/products";
import PrivateRoute from "./components/Route/PrivateRoute";
import MyProfile from "./components/Auth/MyProfile.jsx";
import NotAuthorized from "./components/common/NotAuthorized.jsx";
import AdminPrivateRoute from "./components/Route/AdminRoute.jsx";
import OrdersTable from "./components/Auth/Admin/Totalorders.jsx";
function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          <Routes>
            <Route path="*" element={<Navigate to="/Home" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/Home" element={<Home />} />
            <Route patgh="/a" element={<PrivateRoute><MyProfile /></PrivateRoute>} />
            <Route path="/AddProduct" element={<AdminPrivateRoute><CreateProduct /></AdminPrivateRoute>} />
            <Route path="/AdminOrders" element={<AdminPrivateRoute><OrdersTable /></AdminPrivateRoute>} />
            <Route path="/Products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/MyOrders/:id" element={<PrivateRoute><MyOrders /></PrivateRoute>} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/productss" element= {<AdminPrivateRoute><AdminProducts/></AdminPrivateRoute>} />
           <Route path="/profile" element={<MyProfile/>} />
           <Route path="/unAuthorized" element={<NotAuthorized/>} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
