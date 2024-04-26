import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import PrivateRoute from "./privateRoute";
const Routing = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />}/>
        <Route path="/home" element={<PrivateRoute component={Home}/>}/>
      </Routes>

    </BrowserRouter>
  );
};

export default Routing;
