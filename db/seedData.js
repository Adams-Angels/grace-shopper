const users = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
  { username: "user3", password: "password3" },
];

const products = [
  {
    name: "Frog Figurine 1",
    description: "A cute frog figurine",
    price: 10.99,
    image: "frog_figurine_1.jpeg",
    inventory: 10,
    category: "Figurines",
  },
  {
    name: "Frog Figurine 2",
    description: "A small frog figurine",
    price: 8.99,
    image: "frog_figurine_2.jpeg",
    inventory: 5,
    category: "Figurines",
  },
  {
    name: "Frog Art 1",
    description: "Artwork featuring a frog",
    price: 29.99,
    image: "frog_art_1.jpeg",
    inventory: 3,
    category: "Artwork",
  },
  {
    name: "Frog Art 2",
    description: "Abstract frog art",
    price: 39.99,
    image: "frog_art_2.jpeg",
    inventory: 2,
    category: "Artwork",
  },
  // Add more products as needed
];

const orders = [
  { user_id: 1, totalPrice: 30, status: true },
  { user_id: 2, totalPrice: 15, status: false },
  // can add more
];

const lineItems = [
  { order_id: 1, product_id: 1, quantity: 2 },
  { order_id: 1, product_id: 2, quantity: 1 },
  { order_id: 2, product_id: 2, quantity: 3 },
  // we can adjust as we want of course
];

module.exports = { users, products, orders, lineItems };
