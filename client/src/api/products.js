export async function fetchAllProducts() {
  try {
    const response = await fetch("/api/products/");
    const result = await response.json();
    console.log("result in fetch all products", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
export async function fetchProductById(id) {
  try {
    const response = await fetch(`/api/products/${id}`);
    const result = await response.json();
    console.log("product by id from api", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
