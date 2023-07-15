import { fetchLineItemsById, updateLineItem } from "../api/lineItems";
import useAuth from "./Auth/hooks/useAuth";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCart } from "../api/orders";

export function Cart() {
  const [cart, setCart] = useState({});
  const [lineItems, setLineItems] = useState();
  const [quantity, setQuantity] = useState();
  const { user } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    async function getCart() {
      try {
        const cart = await fetchCart();
        setCart(cart);
      } catch (error) {
        console.log(error);
      }
    }
    getCart();
  }, []);

  // async function updateCart() {
  //   const updatedCart = await updateLineItem(lineItems.quantity);
  // }

  return (
    <div>
      <h3>Cart</h3>
      {cart.line_items && cart.line_items.length > 0 ? (
        <ul>
          {cart.line_items.map((lineItem) => (
            <li key={lineItem.lineitem_id}>
              {lineItem.quantity} x {lineItem.product_name} x{" "}
              {lineItem.total_price}
              <button
                value={quantity}
                onClick={async (e) => {
                  e.preventDefault();
                  const updateCart = await updateLineItem(
                    user.id,
                    lineItem.quantity
                  );
                  setQuantity(updateCart);
                }}
              >
                remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}
