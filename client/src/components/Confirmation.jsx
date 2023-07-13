import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrderById } from "../../../db/adapters/order";
import { getLineItemById } from "../../../db/adapters/lineItems";

export function confirmationPage() {
  navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [lineItems, setLineItems] = useState([]);

  useEffect(()=> {
    async function 
  })
}