import React from 'react';
import logo from './logo.svg';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// css
import './App.css';


// pages
import Home from "./pages/Home.js"
import NoPage from "./pages/NoPage.js"
import SignUp from './pages/SignUp.js';
import SignIn from './pages/SignIn.js';
import ProductPage from "./pages/ProductPage.js"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;