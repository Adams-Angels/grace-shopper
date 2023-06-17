const client = require("./client");

const { createUser } = require("./adapters/users");
const { createOrders } = require("./adapters/order");

const { users, orders } = require("./seedData");

async function dropTables() {
  console.log("Dropping tables...");
  try {
    await client.query(`
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS orders;
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
      password VARCHAR(255) NOT NULL
    );
    CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      totalPrice INTEGER,
      status BOOLEAN DEFAULT FALSE
    )
  `);
  } catch (error) {
    console.log(error);
  }
}

async function populateTables() {
  console.log("Populating tables...");
  try {
    for (const user of users) {
      await createUser(user);
    }
    console.log("...users created");

    for (const order of orders) {
      console.log("orders:", order);
      await createOrders(order);
    }
    console.log("...orders created");
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
