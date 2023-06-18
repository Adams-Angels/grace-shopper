const client = require("../client");

async function createProduct({
  name,
  description,
  price,
  image,
  inventory,
  category,
}) {
  try {
    console.log("Starting to create Products");
    const {
      rows: [createdProduct],
    } = await client.query(
      `
      INSERT INTO products (name, description, price, image, inventory, category)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `,
      [name, description, price, image, inventory, category]
    );
    console.log("Created product:", createdProduct);
    return createdProduct;
  } catch (error) {
    throw error;
  }
}

async function getProductById(id) {
  try {
    console.log("getting products by id");
    const {
      rows: [product],
    } = await client.query(
      `
      SELECT * FROM products
      WHERE id = $1;
    `,
      [id]
    );
    console.log("Product:", product);
    return product;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  try {
    console.log("getting all orders");
    const { rows } = await client.query(`
      SELECT * FROM products;
    `);
    console.log("All products:", rows);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateProduct(id, product) {
  try {
    const {
      rows: [updatedProduct],
    } = await client.query(
      `
      UPDATE products
      SET name = $1,
          description = $2,
          price = $3,
          image = $4,
          inventory = $5,
          category = $6
      WHERE id = $7
      RETURNING *;
    `,
      [
        product.name,
        product.description,
        product.price,
        product.image,
        product.inventory,
        product.category,
        id,
      ]
    );
    console.log("Updated product:", updatedProduct);
    return updatedProduct;
  } catch (error) {
    throw error;
  }
}

async function destroyProduct(id) {
  try {
    const {
      rows: [destroyedProduct],
    } = await client.query(
      `
      DELETE FROM products
      WHERE id = $1
      RETURNING *;
    `,
      [id]
    );
    console.log("Destroyed product:", destroyedProduct);
    return destroyedProduct;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  destroyProduct,
};
