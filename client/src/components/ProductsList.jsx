import react, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchAllProducts } from "../../src/api/products";
import { addLineItem } from "../../src/api/lineItems";
import { createOrder } from "../../src/api/orders";

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
    <div>
      <h2>Products List</h2>
      {console.log(products)}
      {products.length > 0 &&
        products.map((product) => {
          return (
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>
                <p>{product.name}</p>
              </Link>
              <p>{product.description}</p>
              <p>${product.price}</p>
              {/* <label>Quantity:</label>
              <input type="number" /> */}
              {/* <button onClick={handleClick}>Add to cart</button> */}
            </div>
          );
        })}
    </div>
  );
}
