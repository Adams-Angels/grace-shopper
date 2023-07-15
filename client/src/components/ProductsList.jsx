import react, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteProduct, fetchAllProducts } from "../../src/api/products";
import { addLineItem } from "../../src/api/lineItems";
import { createOrder } from "../../src/api/orders";
import useAuth from "../../src/components/Auth/hooks/useAuth";
import "../components/components css/ProductsList.css";
// import { response } from "express";

export function ProductsList() {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState("");
  const { loggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [searchProducts, setSearchProducts] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const fetchedProducts = await fetchAllProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(productId) {
    try {
      const deleted = await deleteProduct(productId);
      console.log(deleted);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  }

  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchProducts) ||
      product.price.toLowerCase().includes(searchProducts) ||
      product.category.toLowerCase().includes(searchProducts)
    );
  });
  console.log("filtered products", filteredProducts);

  return (
    <div className="products-list">
      <h2>Products List</h2>
      <input
        type="text"
        style={{ width: "95%", margin: "10px" }}
        placeholder="search froggy products"
        onChange={(e) => {
          setSearchProducts(e.target.value.toLowerCase());
          console.log(searchProducts);
        }}
      />
      <div className="product-grid">
        {console.log(products)}
        {products.length > 0 &&
          !searchProducts &&
          products.map((product) => {
            return (
              <div className="product-item" key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                </Link>
                <h3>{product.name}</h3>
                <div className="product-info">
                  <p>${product.price}</p>
                  <Link to={`/products/${product.id}`}>
                    <button>See Details</button>
                  </Link>
                  {user.is_admin && (
                    <div>
                      <button
                        onClick={() => {
                          handleDelete(product.id);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          handleEdit(product.id);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        {products.length > 0 &&
          searchProducts &&
          filteredProducts.map((product) => {
            return (
              <div className="product-item" key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                </Link>
                <h3>{product.name}</h3>
                <div className="product-info">
                  <p>${product.price}</p>
                  <Link to={`/products/${product.id}`}>
                    <button>See Details</button>
                  </Link>
                  {user.is_admin && (
                    <div>
                      <button
                        onClick={() => {
                          handleDelete(product.id);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          handleEdit(product.id);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
