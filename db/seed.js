const client = require("./client");

const { createUser } = require("./adapters/users");
const { createOrders } = require("./adapters/order");
const { createProduct } = require("./adapters/products");
const { createLineItem } = require("./adapters/lineItems");

const { users, orders, products, lineItems } = require("./seedData");

async function dropTables() {
  console.log("Dropping tables...");
  try {
    await client.query(`
 
    
    DROP TABLE IF EXISTS lineitems;  
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    `);
  } catch (error) {
    console.error(error);
  }
}

async function createTables() {
  console.log("Creating tables...");
  try {
    await client.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      is_admin BOOLEAN DEFAULT FALSE
    );
    CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      status BOOLEAN DEFAULT FALSE
    );
     CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price NUMERIC(10, 2),
      image TEXT,
      inventory INTEGER,
      category VARCHAR(255)
    );
      CREATE TABLE lineitems (
      id SERIAL PRIMARY KEY,
      quantity INTEGER,
      order_id INTEGER REFERENCES orders(id) NOT NULL,
      product_id INTEGER REFERENCES products(id) NOT NULL,
      price NUMERIC(10, 2)
    );
   
   

  `);
  } catch (error) {
    console.log(error);
  }
}

async function populateTables() {
  console.log("Populating tables...");
  try {
    await Promise.all([
      Promise.all(users.map(createUser)),
      Promise.all(products.map(createProduct)),
      Promise.all(
        orders.map((order) => createOrders(order.user_id, order.status))
      ),
      Promise.all(
        lineItems.map((lineItem) =>
          createLineItem(
            lineItem.order_id,
            lineItem.product_id,
            lineItem.quantity
          )
        )
      ),
    ]);
    console.log("...users, products, orders, and line items created");
  } catch (error) {
    console.error(error);
  }
}

async function rebuildDb() {
  client.connect();
  try {
    await dropTables();
    await createTables();
    await populateTables();
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}

rebuildDb();
