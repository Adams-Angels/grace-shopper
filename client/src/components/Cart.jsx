import { fetchLineItemsById } from "../api/lineItems";
import useAuth from "./Auth/hooks/useAuth";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function Cart() {
  const [cart, setCart] = useState({});
  const [lineItems, setLineItems] = useState();
  const { user } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    getCart();
  }, []);

  async function getCart() {
    try {
      const lineItemsById = await fetchLineItemsById(id);
      setCart(lineItemsById);
      console.log("id", id);
      console.log("cart from cart", cart);
    } catch (error) {
      console.log(error);
    }
  }
  // const lineItemById = await fetchLineItemsById(id);
  // setCart(lineItemById);
  // setLineItems(lineItemById.line_items);
  // console.log("lineItemsById from cart", lineItemById);
  // console.log("cart from cart", cart);

  return (
    <div>
      <h3>Cart</h3>
      <div>
        {cart.line_items &&
          cart.line_items.map((lineItem) => {
            return <p> {lineItem.product_name}</p>;
          })}
      </div>
    </div>
  );
}
