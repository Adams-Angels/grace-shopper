const client = require("../client");

async function createOrders(user_id, status) {
  console.log("starting to create order");
  try {
    const {
      rows: [order],
    } = await client.query(
      ` INSERT INTO orders (user_id, status)
        VALUES ($1, $2, $3)
        RETURNING *; 
        `,
      [user_id, status]
    );
    console.log("order from db:", order);
    return order;
  } catch (error) {
    throw error;
  }
}

async function getOrderById(id) {
  try {
    console.log("get order by id");
    const {
      row: [order],
    } = await client.query(
      `
    SELECT * FROM orders 
    WHERE id=$1
    `,
      [id]
    );
    console.log("order id:,", order);
    return order;
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

async function updateOrders(user_id, status) {
  try {
    console.log("updating order");
    const {
      rows: [order],
    } = await client.query(
      `
        UPDATE orders 
        SET status = $2
        WHERE id=$1
        `,
      [user_id, status]
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
