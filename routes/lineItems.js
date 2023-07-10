const client = require("../db/client");
const lineItemRouter = require("express").Router();

const { createOrders } = require("../db/adapters/order");
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
    const { quantity, order_id, product_id, is_cart } = req.body;
    const { user_id } = req.params;
    // find order if it exists
    let {
      rows: [cart],
    } = await client.query(
      `select * from orders where user_id = $1 and is_cart = true`,
      [req.params.id]
    );
    //if there is no order create order
    if (!cart) {
      let {
        rows: [cart],
      } = await client.query(
        ` INSERT INTO orders (user_id, is_cart)
        VALUES ($1, $2)
        RETURNING *`,
        [user_id, is_cart]
      );
      res.send(cart);
    }
    // find lineitems if it exists
    let {
      rows: [lineItem],
    } = await client.query(
      `select * from lineitems where order_id=$2 and product_id =$3`,
      [req.lineitems.id]
    );
    // if line items doesnt exist, create lineitem
    if (!lineItem) {
      let {
        rows: [lineItems],
      } = await createLineItem(quantity, order_id, product_id);
      res.send(lineItems);
    }
    // decide what we want to return to client
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
