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

export async function createProduct(
  name,
  description,
  price,
  image,
  inventory,
  category
) {
  try {
    const response = await fetch(`/api/products/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //might need authorization or may not ?
      body: JSON.stringify({
        name,
        description,
        price,
        image,
        inventory,
        category,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function updateProduct(
  id,
  name,
  description,
  price,
  image,
  inventory,
  category
) {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        price,
        image,
        inventory,
        category,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteProduct(id) {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
  } catch (error) {
    console.error(error);
  }
}
