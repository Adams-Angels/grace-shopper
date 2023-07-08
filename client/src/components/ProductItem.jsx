import { useState, useEffect } from "react";
import { fetchProductById } from "../api/products";
import {
  addLineItem,
  fetchLineItemsById,
  updateLineItem,
} from "../api/lineItems";
import { createOrder, fetchOrders } from "../api/orders";
import { useParams } from "react-router-dom";
import { fetchOrderById } from "../api/orders";

export function ProductItem() {
  const [singleProduct, setSingleProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const { id } = useParams();

  console.log(singleProduct);

  useEffect(() => {
    async function getProduct() {
      const product = await fetchProductById(id);
      setSingleProduct(product.productById);
    }
    getProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const orderId = await fetchOrderById();
      const lineItem = await fetchLineItemsById(orderId);
      if (lineItem) {
        //ine item already exsists, update the quantity
        const updatedLineItem = {
          ...lineItem,
          quantity: lineItem.quantity + 1,
        };
        await updateLineItem(lineItem.id, updatedLineItem);
      } else {
        //Line item doesn't exist, create a new one
        await addLineItem(1, orderId, id);
        console.log("Product added to cart successfully!");
      }

      // Success! Show a message or error
    } catch (error) {
      //handle error
      console.error("Error adding a product to cart:", error);
    }
  };

  const getOrderId = async () => {
    try {
      //check if the user already has a cart order
      const orders = await fetchOrders();
      const cartOrder = orders.find(
        (order) => order.user_id === user.id && order.is_cart === true
      );
      if (cartOrder) {
        return cartOrder.id;
      } else {
        //create a new cart order for the user
        const newOrder = await createOrder(user_id, is_cart);
        return newOrder.id;
      }
    } catch (error) {
      //handle error
      console.error("Error getting order ID:", error);
    }
  };

  return (
    <div>
      <h2>Product Details</h2>
      {singleProduct && (
        <div>
          <p>Name: {singleProduct.name}</p>
          <p>Description: {singleProduct.description}</p>
          <p>Price: ${singleProduct.price}</p>

          {singleProduct.image && <img src={singleProduct.image} />}

          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      )}
    </div>
  );
}
