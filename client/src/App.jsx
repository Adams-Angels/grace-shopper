import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { ProductsList } from "../src/components/ProductsList";
import { AuthForm } from "../src/components/AuthForm";
import { ProductItem } from "../src/components/ProductItem";
import { Home } from "../src/components/Home";
import { AdminDashboard } from "./components/AdminDashboard";
import useAuth from "./components/Auth/hooks/useAuth";
import { logOut } from "./api/auth";

function App() {
  const { loggedIn, setLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logOut();
    setLoggedIn(false);
    navigate("/");
  };
  return (
    <div>
      <header className="header">
        <h1 className="title">All Things Frog</h1>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/products">All Products</Link>
        </div>
        {loggedIn && (
          <button className="button" onClick={handleLogout}>
            Logout
          </button>
        )}
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
