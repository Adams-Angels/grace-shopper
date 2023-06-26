const ordersRouter = require("express").Router();
const {
  createOrders,
  getOrderById,
  getAllOrders,
  destroyOrder,
  updateOrders,
} = require("../db/adapters/order");
const { authRequired } = require("./utils");

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
    const { user_id, status } = req.body;
    const newOrder = await createOrders(user_id, status);
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

ordersRouter.patch("/:id", authRequired, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id, status } = req.body;
    const updatedOrders = await updateOrders(id, {
      user_id,
      status,
    });
    res.send(updatedOrders);
  } catch (error) {
    next(error);
  }
});

// api/orders/id
//this one works!! -
ordersRouter.delete("/:id", authRequired, async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await destroyOrder(id);
    res.send({ message: "Deleted order!" });
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;
