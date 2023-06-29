import { useState, useEffect } from "react";
import { createProduct } from "../api/products";

export function AdminDashboard() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [inventory, setInventory] = useState("");
  const [category, setCategory] = useState("");

  return (
    <div className="admin-page">
      <h1>Create Product</h1>
      <form>
        <label>Name</label>
        <input />
        <label>Description</label>
        <input />
        <label>Price</label>
        <input />
        <label>inventory</label>
        <input />
        <label>category</label>
        <input />
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}
