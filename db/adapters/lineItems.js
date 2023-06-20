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
      SELECT 
      orders.id as id,
      orders.user_id as user_id,
      lineitems.quantity as quantity,
      lineitems.price as price,
      products.id as product_id,
      CASE WHEN products.id IS NULL THEN '[]'::json
      ELSE
      JSON_AGG(
        JSON_BUILD_OBJECT (
          'id', products.id,
          'name', products.name,
          'description', products.description,
          'price', products.price,
          'image', products.image,
          'inventory', products.inventory,
          'category', products.category
        )
      ) END AS products
      
      FROM orders
      FULL OUTER JOIN lineitems 
      ON orders.id = lineitems.order_id
      FULL OUTER JOIN products
      ON products.id = lineitems.product_id
      WHERE products.id =1 
      GROUP BY lineitems.id, lineitems.order_id, orders.id, products.id
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
    SELECT 
      orders.id as id,
      orders.user_id as user_id,
      lineitems.quantity as quantity,
      lineitems.price as price,
      products.id as product_id,
      CASE WHEN products.id IS NULL THEN '[]'::json
      ELSE
      JSON_AGG(
        JSON_BUILD_OBJECT (
          'id', products.id,
          'name', products.name,
          'description', products.description,
          'price', products.price,
          'image', products.image,
          'inventory', products.inventory,
          'category', products.category
        )
      ) END AS products
      
      FROM orders
      FULL OUTER JOIN lineitems 
      ON orders.id = lineitems.order_id
      FULL OUTER JOIN products
      ON products.id = lineitems.product_id
      GROUP BY lineitems.id, lineitems.order_id, orders.id, products.id
      ;
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
