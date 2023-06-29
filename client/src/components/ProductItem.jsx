import { useState, useEffect } from "react";
import { fetchProductById } from "../api/products";
import { useParams } from "react-router-dom";

export function ProductItem() {
  const [singleProduct, setSingleProduct] = useState(null);
  const { id } = useParams();

  const handleAddToCart = () => {
    addToCart(product);
  };

  useEffect(() => {
    async function getProduct() {
      const product = await fetchProductById(id);
      setSingleProduct(product.productById);
    }
    getProduct();
  }, [id]);

  return (
    <div>
      <h2>Product Details</h2>
      {singleProduct && (
        <div>
          <p>Name: {singleProduct.name}</p>
          <p>Description: {singleProduct.description}</p>
          <p>Price: ${singleProduct.price}</p>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      )}
    </div>
  );
}
