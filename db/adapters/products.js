const client = require("../client");
//left unconstructed to have seperate variables
async function createProduct({
  name,
  description,
  price,
  image,
  inventory,
  category,
}) {
  try {
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

    return createdProduct;
  } catch (error) {
    throw error;
  }
}

async function getProductById(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      SELECT * FROM products
      WHERE id = $1;
    `,
      [id]
    );

    return product;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  try {
    const { rows } = await client.query(`
      SELECT * FROM products;
    `);

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
      SET name = $2,
          description = $3,
          price = $4,
          image = $5,
          inventory = $6,
          category = $7
      WHERE id = $1
      RETURNING *;
    `,
      [
        id,
        product.name,
        product.description,
        product.price,
        product.image,
        product.inventory,
        product.category,
      ]
    );

    return updatedProduct;
  } catch (error) {
    throw error;
  }
}

async function destroyProduct(id) {
  try {
    const { rows } = await client.query(
      `
      DELETE FROM products
      WHERE id = $1
      RETURNING *;
    `,
      [id]
    );

    return rows;
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
