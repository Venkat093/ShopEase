// PrivateRoute.js
import React, { useContext, useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import  UserContext  from "../context/UserContext";

const AdminPrivateRoute = ({ children  }) => {
    const { user } = useContext(UserContext);
useEffect(() => {

    console.log(user)
},[])
    return user?.user.role === "Admin" ? children : <Navigate to="/unAuthorized" />;
};

export default AdminPrivateRoute;
