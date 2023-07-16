import { useState, useEffect } from "react";
import { createProduct } from "../api/products";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../api/auth";
import "../components/components css/AdminDashboard.css";

export function AdminDashboard() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [inventory, setInventory] = useState("");
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    async function getUsers() {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    }
    getUsers();
  }, []);
  console.log(users);

  async function handleSubmit() {
    try {
      const newProduct = await createProduct(
        name,
        description,
        price,
        image,
        inventory,
        category
      );
      setProduct(newProduct);
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="admin-page">
      <h1>Create Product</h1>
      <form
        className="create-product"
        onSubmit={(e) => {
          e.preventDefault(), handleSubmit();
        }}
      >
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <label>Price: $</label>
        <input
          type="number"
          value={price}
          onChange={(e) => {
            if (price > 0) {
              setPrice(e.target.value);
            }
          }}
        />

        <label>inventory</label>
        <input
          type="number"
          value={inventory}
          onChange={(e) => {
            if (inventory > 0) {
              setInventory(e.target.value);
            }
          }}
        />

        <label>category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />

        <label>image </label>
        <input
          type="url"
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />

        <button type="submit">Create Product</button>
      </form>
      <div>
        <h1>User information</h1>
        {users.length > 0 &&
          users.map((user) => {
            return (
              <div className="user-div" key={user.id}>
                <h2 className="username">Username: {user.username}</h2>
                <p className="id">Id: {user.id}</p>
                <p className="email">Email: {user.email}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
