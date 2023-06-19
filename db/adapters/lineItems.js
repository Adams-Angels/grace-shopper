const client = require("../client");

async function createLineItem(quantity, orderId, productId, price) {
  try {
    console.log("Starting to create LineItems");
    const {
      rows: [createdLineItem],
    } = await client.query(
      `INSERT INTO lineItems (quantity, order_id, product_id, price)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `,
      [quantity, orderId, productId, price]
    );
    console.log("Created LineItem:", createdLineItem);
    return createdLineItem;
  } catch (error) {
    throw error;
  }
}

async function getLineItemById(id) {
  try {
    console.log("getting lineItems by id");
    const {
      rows: [lineItem],
    } = await client.query(
      `
      SELECT * FROM lineItems
      WHERE id = $1
      `,
      [id]
    );
    console.log("LineItem:", lineItem);
    return lineItem;
  } catch (error) {
    throw error;
  }
}

async function getAllLineItems() {
  try {
    console.log("getting all lineItems");
    const { rows } = await client.query(`
      SELECT * FROM lineItems;
    `);
    console.log("All lineItems:", rows);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateLineItem(id, quantity, orderId, productId, price) {
  try {
    const {
      rows: [updatedlineItem],
    } = await client.query(
      `
      UPDATE lineItems
      SET quantity = $2,
          order_id = $3,
          product_id = $4,
          price = $5
      WHERE id = $1
      RETURNING *;
      `,
      [id, quantity, orderId, productId, price]
    );
    console.log("Updated lineItem:", updatedlineItem);
    return updatedlineItem;
  } catch (error) {
    throw error;
  }
}

async function destroyLineItem(id) {
  try {
    const { rows } = await client.query(
      `
      DELETE FROM lineItems
      WHERE id = $1
      RETURNING *;
      `,
      [id]
    );
    console.log("Destroyed lineItems:", rows);
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createLineItem,
  getLineItemById,
  getAllLineItems,
  updateLineItem,
  destroyLineItem,
};
