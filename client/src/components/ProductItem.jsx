import { useState, useEffect } from "react";
import { fetchProductById } from "../api/products";
import { useParams } from "react-router-dom";

export function ProductItem() {
  const [singleProduct, setSingleProduct] = useState("");
  const { id } = useParams();

  useEffect(() => {
    async function getProduct() {
      const product = await fetchProductById(id);
      console.log("single product from react", product);
      setSingleProduct(product);
    }
    getProduct();
  }, []);
  return (
    <div>
      <h2>products</h2>
    </div>
  );
}
