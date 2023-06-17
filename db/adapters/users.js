const client = require("../client");

async function createUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
          INSERT INTO  users(username, password)
          VALUES($1, $2)
          ON CONFLICT (username) DO NOTHING
          RETURNING *;`,
      [username, password]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser() {
  try {
    const {
      row: [user],
    } = await client.query(
      `
      SELECT * FROM users
      WHERE username=$1
      `,
      [username]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(`
          SELECT id, username
          FROM users
          WHERE id=${userId}
        `);

    if (!user) {
      throw {
        name: "UserNotFoundError",
        message: "A user with that id does not exist",
      };
    }

    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  const { rows } = await client.query(`
    SELECT * FROM users;
    `);
  return rows;
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getAllUsers,
};