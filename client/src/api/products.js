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
