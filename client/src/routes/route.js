import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register"
import PrivateRoute from "./privateRoute";
import Profile from "../pages/profile";


const Routing = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />}/>
        <Route path="/home" element={<PrivateRoute component={Home}/>}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/profile" element={<Profile />}/>

      </Routes>

    </BrowserRouter>
  );
};

export default Routing;
