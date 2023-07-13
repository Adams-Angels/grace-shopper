import { fetchLineItemsById } from "../api/lineItems";
import useAuth from "./Auth/hooks/useAuth";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function Cart() {
  const [cart, setCart] = useState();
  const { user } = useAuth();
  const { id } = useParams();
  useEffect(() => {
    async function getCart() {
      const lineitem = await fetchLineItemsById(id);
      setCart(lineitem);
    }
  });
  return (
    <div>
      <h3>Cart</h3>
    </div>
  );
}
