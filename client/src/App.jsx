import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { ProductsList } from "../src/components/ProductsList";
import { AuthForm } from "../src/components/AuthForm";
import { ProductItem } from "../src/components/ProductItem";
import { Home } from "../src/components/Home";
import { AdminDashboard } from "./components/AdminDashboard";

function App() {
  return (
    <div>
      <header>
        <h1>All Things Frog</h1>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/products">All Products</Link>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/register" element={<AuthForm />} />
        <Route path="/products/:id" element={<ProductItem />} />
        <Route path="/create-product" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
