const productRouter = require("express").Router();
const {
  getAllProducts,
  getProductById,
  updateProduct,
  createProduct,
  destroyProduct,
} = require("../db/adapters/products");
const { authRequired, checkAdmin } = require("./utils");
// api/products/
productRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
});
// api/products
productRouter.post("/", authRequired && checkAdmin, async (req, res, next) => {
  try {
    const { name, description, price, image, inventory, category } = req.body;
    const newProduct = await createProduct({
      name,
      description,
      price,
      image,
      inventory,
      category,
    });
    res.send(newProduct);
  } catch (error) {
    next(error);
  }
});
// api/products/:id
productRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const productById = await getProductById(id);
    res.send({ productById });
  } catch (error) {
    next(error);
  }
});
// api/products/:id
productRouter.patch(
  "/:id",
  authRequired && checkAdmin,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, description, price, image, inventory, category } = req.body;
      const updatedProduct = await updateProduct(id, {
        name,
        description,
        price,
        image,
        inventory,
        category,
      });
      res.send(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
);
// api/products/:id  admin
// 3 does not want to get deleted
productRouter.delete(
  "/:id",
  authRequired && checkAdmin,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await destroyProduct(id);
      res.send({ message: "product deleted" });
    } catch (error) {
      next(error);
    }
  }
);
module.exports = productRouter;
