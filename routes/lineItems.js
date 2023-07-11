const client = require("../db/client");
const { authRequired } = require("./utils");
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

lineItemRouter.post("/", authRequired, async (req, res, next) => {
  try {
    const { product_id } = req.body;
    const { id } = req.user;
    // find order if it exists
    let currCart;
    let {
      rows: [cart],
    } = await client.query(
      `select * from orders where user_id = $1 and is_cart = true`,
      [id]
    );
    if (cart) {
      currCart = cart;
    }
    // //if there is no order create order
    if (!cart) {
      try {
        let {
          rows: [cart],
        } = await client.query(
          `INSERT INTO orders (user_id)
           VALUES ($1)
           RETURNING * `,
          [id]
        );
        currCart = cart;
      } catch (error) {
        next(error);
        return;
      }
    }

    console.log("Current Cart: ", currCart);
    // find lineitems if it exists update qty
    let currLineItem;
    // let {
    //   rows: [lineItem],
    // } = await client.query(
    //   `select * from lineitems where order_id=$1 and product_id =$2`,
    //   [currCart.id, product_id],
    //   console.log("line item", lineItem)
    // );
    // if (lineItem) {
    //   currLineItem = lineItem;
    // }
    // // if line items doesnt exist, create lineitem
    if (!lineItem) {
      let {
        rows: [lineItem],
      } = await client.query(
        `
      INSERT INTO lineitems (quantity, order_id, product_id)
      VALUES ($1, $2, $3)
      RETURNING *`,
        [quantity, currCart.id, product_id]
      );
      // res.send(lineItems);
      console.log("lineitems", lineItem);
      currLineItem = lineItem;
      console.log("Current line item", currLineItem);
    }
    // // decide what we want to return to client
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
