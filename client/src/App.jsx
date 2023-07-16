import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, Link, useNavigate, NavLink } from "react-router-dom";
import { ProductsList } from "../src/components/ProductsList";
import { AuthForm } from "../src/components/AuthForm";
import { ProductItem } from "../src/components/ProductItem";
import { Home } from "../src/components/Home";
import { AdminDashboard } from "./components/AdminDashboard";
import useAuth from "./components/Auth/hooks/useAuth";
import { logOut } from "./api/auth";
import { MyProfile } from "./components/MyProfile";
import { EditProduct } from "./components/EditProduct";
import { Cart } from "./components/Cart";
import { Confirmation } from "./components/Confirmation";

function App() {
  const { user, loggedIn, setLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logOut();
    setLoggedIn(false);
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <div>
      <header className="header">
        <h1 className="title">
          All Things Frog
          <img
            className="frog-image"
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTVjanNxZGVxN3FyNDVxc2x0b3kybGE2d3hnYm5jbXY0YzA4MDl4byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/110PcbFiaJOHsjGkSS/giphy.gif"
            alt="frog icon"
          />
        </h1>

        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          {/* {loggedIn && <Link to="/my-profile">My Profile</Link>} */}
          <Link to="/products">All Products</Link>
          {user.is_admin && <Link to="/create-product">Admin Dashboard</Link>}
          {user.id !== null && (
            <NavLink to="/my-cart/:id" className="nav-link">
              <i className="material-icons">shopping_cart</i>
            </NavLink>
          )}
        </div>
        {user.id !== null && (
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
        {user.is_admin && (
          <Route path="/create-product" element={<AdminDashboard />} />
        )}
        {user.is_admin && (
          <Route path="/edit-product/:id" element={<EditProduct />} />
        )}
        <Route path="/confirmation" element={<Confirmation />} />
        {/* <Route path="/my-profile" element={<MyProfile />} /> */}
        <Route path="/my-cart/:id" element={<Cart />} />
      </Routes>
      <footer>
        <div className="facebook">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4494/4494464.png"
            alt="facebook logo"
          />
        </div>

        <div className="instagram">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3670/3670274.png"
            alt="instagram logo"
          />
        </div>
        <div className="twitter">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4902/4902532.png"
            alt="twitter logo"
          />
        </div>
      </footer>
    </div>
  );
}

export default App;
