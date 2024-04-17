import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/home";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
