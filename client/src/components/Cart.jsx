import useAuth from "./Auth/hooks/useAuth";
import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { fetchCart } from "../api/orders";
import { deleteLineItem, updateLineItem } from "../api/lineItems";
import "../components/components css/Cart.css";

export function Cart() {
  const [cart, setCart] = useState({});
  const [lineItems, setLineItems] = useState([]);
  const [quantity, setQuantity] = useState();
  const { user } = useAuth() || null;
  const { id } = useParams();
  const navigate = useNavigate();

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

  async function handleRemoveFromCart(lineItemId) {
    try {
      await deleteLineItem(lineItemId);
      setCart((prevCart) => ({
        ...prevCart,
        line_items: prevCart.line_items.filter(
          (lineItem) => lineItem.lineitem_id !== lineItemId
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleQuantityChange(lineItemId, quantityDelta) {
    if (quantityDelta > 0) {
      try {
        const updatedLineItem = await updateLineItem(lineItemId, {
          quantity: quantityDelta,
        });
        // Fetch the updated cart data
        const updatedCart = await fetchCart();

        // Update the cart and line items in the state
        setCart(updatedCart);
        setLineItems(updatedCart.line_items);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div>
      <h3>Welcome, {user.username}</h3>
      <h3>Cart</h3>
      {cart.line_items && cart.line_items.length > 0 ? (
        <ul>
          {cart.line_items.map((lineItem) => (
            <li className="cart-item" key={lineItem.lineitem_id}>
              <div className="cart-item-details">
                <div className="cart-item-quantity">
                  <button
                    className="quantity-button"
                    onClick={() =>
                      handleQuantityChange(
                        lineItem.lineitem_id,
                        lineItem.quantity - 1
                      )
                    }
                  >
                    -
                  </button>
                  <span className="quantity">{lineItem.quantity}</span>
                  <button
                    className="quantity-button"
                    onClick={() =>
                      handleQuantityChange(
                        lineItem.lineitem_id,
                        lineItem.quantity + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-name">{lineItem.product_name}</div>
                <div className="cart-item-total-price">
                  ${lineItem.total_price}
                </div>
              </div>
              <button
                className="cart-item-remove-button"
                onClick={() => handleRemoveFromCart(lineItem.lineitem_id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <button
        className="cart-item-placeOrder-button"
        onClick={() => {
          navigate("/confirmation");
        }}
      >
        Place your order{" "}
      </button>
    </div>
  );
}
