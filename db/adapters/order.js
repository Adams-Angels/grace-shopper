const client = require("../client");

async function createOrders(user_id, totalPrice, status) {
  console.log("starting to create order");
  try {
    const {
      rows: [order],
    } = await client.query(
      ` INSERT INTO orders (user_id, totalPrice, status)
        VALUES ($1, $2, $3)
        ON CONFLICT (user_id) DO NOTHING 
        RETURNING *; 
        `,
      [user_id, totalPrice, status]
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

async function updateOrders(user_id, totalPrice, status) {
  try {
    console.log("updating order");
    const {
      rows: [order],
    } = await client.query(
      `
        UPDATE orders 
        SET totalPrice = $2 ,
        SET status = $3
        WHERE id=$1
        `,
      [user_id, totalPrice, status]
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
