import react, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteProduct, fetchAllProducts } from "../../src/api/products";
import { addLineItem } from "../../src/api/lineItems";
import { createOrder } from "../../src/api/orders";
import useAuth from "../../src/components/Auth/hooks/useAuth";
import "../components/ProductsList.css";
// import { response } from "express";

export function ProductsList() {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState("");
  const { user } = useParams();
  // const { loggedIn } = useAuth();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts = await fetchAllProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, []);

  // async function handleDelete(productId) {
  //   try {
  //     const deleted = await deleteProduct(productId);
  //     console.log(deleted);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  return (
    <div className="products-list">
      <h2>Products List</h2>
      <div className="product-grid">
        {console.log(products)}
        {products.length > 0 &&
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
                  {/* logged in should be is admin*/}
                  {loggedIn && (
                    <button
                      onClick={async () => {
                        const deleted = await deleteProduct(product.id);
                        console.log(deleted);
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
