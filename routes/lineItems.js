const lineItemRouter = require("express").Router();
const {
  getLineItemById,
  createLineItem,
  updateLineItem,
  destroyLineItem,
  getAllLineItems,
} = require("../db/adapters/lineItems");

lineItemRouter.get("/", async (req, res, next) => {
  try {
    const lineItems = await getAllLineItems();
    res.send(lineItems);
  } catch (error) {
    next(error);
  }
});

lineItemRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const lineItem = await getLineItemById(id);
    res.send(lineItem);
  } catch (error) {
    next(error);
  }
});

lineItemRouter.post("/", async (req, res, next) => {
  try {
    const { quantity, orderId, productId } = req.body;
    const newLineItem = await createLineItem(quantity, orderId, productId);
    res.send(newLineItem);
  } catch (error) {
    next(error);
  }
});

lineItemRouter.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const updatedlineItem = await updateLineItem(id, {
      quantity,
    });
    res.send(updatedlineItem);
  } catch (error) {
    next(error);
  }
});

lineItemRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedLineItem = await destroyLineItem(id);
    res.send({ message: "lineItem deleted", deletedLineItem });
  } catch (error) {
    next(error);
  }
});

module.exports = lineItemRouter;
