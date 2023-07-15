import { useState, useEffect } from "react";
import { fetchProductById } from "../api/products";
import { addLineItem } from "../api/lineItems";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "./Auth/hooks/useAuth";
import "../components/components css/ProductItem.css";

export function ProductItem() {
  const [singleProduct, setSingleProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

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
      navigate(`/my-cart/${singleProduct.id}`);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="product-item-container">
      {singleProduct && (
        <>
          <div className="product-image-container">
            {singleProduct.image && (
              <img src={singleProduct.image} alt={singleProduct.name} />
            )}
          </div>
          <div className="product-details">
            <p>{singleProduct.name}</p>
            <p>{singleProduct.description}</p>
            <p>${singleProduct.price}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </>
      )}
    </div>
  );
}
