// PrivateRoute.js
import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import  UserContext  from "../context/UserContext";

const PrivateRoute = ({ children  }) => {
    const { user } = useContext(UserContext);

    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
