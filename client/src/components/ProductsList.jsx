import react, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchAllProducts } from "../../src/api/products";
import { addLineItem } from "../../src/api/lineItems";
import { createOrder } from "../../src/api/orders";
import "./productsList.css";

export function ProductsList() {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState();
  const [orderId, setOrderId] = useState();
  const { user } = useParams();

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

  // useEffect(() => {
  //   async function findOrderId() {
  //     try {
  //       if (user.order.status === false) {
  //         setOrderId(order.id);
  //       } else if (user.order.status === true) {
  //         createOrder()
  //       }
  //     } catch (error) {}
  //   }
  // });

  // async function handleClick(e) {
  //   e.preventDefault();
  //   try {
  //     const result = await addLineItem();
  //   } catch (error) {}
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
                  <h3>{product.name}</h3>
                </Link>
                <div className="product-info">
                  <p>{product.description}</p>
                  <p>${product.price}</p>
                  {/* <label>Quantity:</label>
              <input type="number" /> */}
                  {/* <button onClick={handleClick}>Add to cart</button> */}
                  <button onClick={() => handleAddToCart(product.id)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
