import { useState, useEffect } from "react";
import { fetchProductById } from "../api/products";
import { addLineItem } from "../api/lineItems";

import { useParams } from "react-router-dom";
import useAuth from "./Auth/hooks/useAuth";

export function ProductItem() {
  const [singleProduct, setSingleProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);

  const { id } = useParams();
  const { user } = useAuth();

  console.log(singleProduct);

  useEffect(() => {
    async function getProduct() {
      const product = await fetchProductById(id);
      setSingleProduct(product.productById);
    }
    getProduct();
  }, [id]);

  async function handleAddToCart() {
    try {
      // Set the singleProduct.id, a quantity to our endpoint
      await addLineItem(singleProduct.id);
    } catch (err) {
      console.error(err);
    }
  }

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
