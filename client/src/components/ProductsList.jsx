import react, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllProducts } from "../../src/api/products";

export function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts = await fetchAllProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products List</h2>
      {console.log(products)}
      {/* {products.length > 0 &&
        products.map((product) => {
          return (
            <div key={product.id}>
              <p>{product.name}</p>
            </div>
          );
        })} */}
    </div>
  );
}
