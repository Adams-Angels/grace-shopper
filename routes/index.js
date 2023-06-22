const router = require("express").Router();

// GET /api/health
router.get("/health", (req, res, next) => {
  res.send({
    message: "Api is up and healthy!",
  });
});
//GET /api/users
router.use("/users", require("./users"));
// GET / api / orders;
router.use("/orders", require(`./order`));
// //GET /api/lineitems
router.use("/lineitems", require("./lineItems"));
// //GET /api/products
router.use("/products", require("./products"));
router.use("/auth", require("./auth"));

module.exports = router;
