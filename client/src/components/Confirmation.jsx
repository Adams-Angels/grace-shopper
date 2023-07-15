import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Confirmation() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [lineItems, setLineItems] = useState([]);

  return (
    <div className="confirmation-page">
      <h1>Order Confirmed!</h1>
      <hr />
      <h5>
        Please note orders are normally delivered within 5 - 7 business days.{" "}
      </h5>
      <p>Order No. 765765</p>
      <button
        onClick={() => {
          navigate("/products");
        }}
      >
        continue hopping?
      </button>
    </div>
  );
}
