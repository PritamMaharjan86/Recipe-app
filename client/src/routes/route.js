import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/home";
import Login from "../pages/login";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />}/>
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
