const ordersRouter = require("express").Router();
const {
  createOrders,
  getOrderById,
  getAllOrders,
  destroyOrder,
  updateOrders,
} = require("../db/adapters/order");

// api/orders/
ordersRouter.get("/", async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

// api/orders/create-order
ordersRouter.post("/create-order", async (req, res, next) => {
  try {
    const { user_id, totalPrice, status } = req.body;
    const newOrder = await createOrders(user_id, totalPrice, status);
    res.send(newOrder);
  } catch (error) {
    next(error);
  }
});

// api/orders/id
ordersRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const orderById = await getOrderById(id);
    res.send({
      orderById,
    });
  } catch (error) {
    next(error);
  }
});

// api/orders/id
ordersRouter.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id, totalPrice, status } = req.body;
    const updatedOrders = await updateOrders(user_id, totalPrice, status);
    res.send(updateOrders);
  } catch (error) {
    next(error);
  }
});

// api/orders/id
ordersRouter.delete("/:id", async (res, res, next) => {
  try {
    const { id } = req.params;
    const order = await destroyOrder(id);
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;
