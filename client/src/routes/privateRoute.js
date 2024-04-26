import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const PrivateRoute = ({ component: Component, ...rest }) => {
   
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (token) {
            navigate("/home");
         
            
        } else {
            navigate("/");
        }
    }, [token]);
    return (
        <>
            <Component></Component>
        </>
    );
};
export default PrivateRoute;