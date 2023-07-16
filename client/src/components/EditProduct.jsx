import { useState, useEffect } from "react";
import { updateProduct, fetchProductById } from "../api/products";
import { useNavigate, useParams } from "react-router-dom";
import "../components/components css/AdminDashboard.css";
export function EditProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [inventory, setInventory] = useState("");
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function getProduct() {
      const product = await fetchProductById(id);
      setProduct(product.productById);
    }
    getProduct();
  }, [id]);

  async function handleSubmit() {
    try {
      const newProduct = await updateProduct(
        id,
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
      <h1 className="edit-product">Edit Product</h1>
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
          min="0"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />

        <label>inventory</label>
        <input
          type="number"
          min="0"
          value={inventory}
          onChange={(e) => {
            setInventory(e.target.value);
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

        <button type="submit">Edit Product</button>
      </form>
    </div>
  );
}
