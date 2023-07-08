const client = require("../client");

async function createOrders(user_id, is_cart) {
  console.log("starting to create order");
  try {
    const {
      rows: [order],
    } = await client.query(
      ` INSERT INTO orders (user_id, is_cart)
        VALUES ($1, $2)
        RETURNING *; 
        `,
      [user_id, is_cart]
    );
    console.log("order from db:", order);
    return order;
  } catch (error) {
    throw error;
  }
}

// if we get error on front end - revisit this function
async function getOrderById(id) {
  try {
    console.log("get order by id");
    const row = await client.query(
      `
    SELECT * FROM orders 
    WHERE id=$1
    `,
      [id]
    );
    console.log("order id:,");
    return row.rows;
  } catch (error) {
    throw error;
  }
}

async function getAllOrders() {
  try {
    console.log("getting all orders");
    const { rows } = await client.query(`
        SELECT * FROM orders; 
        `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateOrders(user_id, is_cart) {
  try {
    console.log("updating order");
    const {
      rows: [order],
    } = await client.query(
      `
        UPDATE orders 
        SET is_cart = $2
        WHERE id=$1
        `,
      [user_id, is_cart]
    );
    return order;
  } catch (error) {
    throw error;
  }
}

async function destroyOrder(id) {
  try {
    const { rows } = await client.query(
      `
        DELETE FROM orders
        WHERE id=$1
        RETURNING *
        `,
      [id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createOrders,
  getOrderById,
  getAllOrders,
  updateOrders,
  destroyOrder,
};
