const router = require("express").Router();

// GET /api/health
router.get("/health", (req, res, next) => {
  res.send({
    message: "Api is up and healthy!",
  });
});
//GET /api/users
router.use("/users", require(`../db/adapters/users`));
//GET /api/orders
router.use("/orders", require(`../db/adapters/order`));
//GET /api/lineitems
router.use("/lineitems", require(`../db/adapters/lineItems`));
//GET /api/products
router.use("/products", require(`../db/adapters/products`));

module.exports = router;
