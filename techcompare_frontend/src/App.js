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
import Search from "./pages/Search.js"
import TechCompare from "./pages/techCompare.js"
import WishListPage from './pages/WishListPage.js';
import ComparePage from './pages/ComparePage.js';

function App() {
  return (
    //<BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/search" element={<Search />} />
        <Route path="/wishlistpage" element={<WishListPage />} />
        <Route path="*" element={<NoPage />} />
        <Route path="/product/compare/:id" element={<TechCompare />}/>
        <Route path="/product/compare/:id1/:id2" element={<ComparePage />} />
      </Routes>
    //</BrowserRouter>
  );
}

export default App;
// serviceWorker.unregister();
