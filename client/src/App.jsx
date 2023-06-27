import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ProductsList } from "../src/components/ProductsList";
import { AuthForm } from "../src/components/AuthForm";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/register" element={<AuthForm />} />
      </Routes>
    </div>
  );
}

export default App;
