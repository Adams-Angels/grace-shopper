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

//Get cart for current user
//or create cart for user if no cart
//Check if lineitem exists
//If it exists, update quantity
//if it doesn't exist create a new lineitem
//send lineitem as response

async function findOrCreateCartForUser(userId) {
  let {
    rows: [foundCart],
  } = await client.query(
    `select * from orders where user_id = $1 and is_cart = true`,
    [userId]
  );
  if (foundCart) {
    return foundCart;
  }
  // //if there is no order create order

  let {
    rows: [createdCart],
  } = await client.query(
    `INSERT INTO orders (user_id)
           VALUES ($1)
           RETURNING * `,
    [userId]
  );
  return createdCart;
}

async function updateOrCreateLineItem(orderId, productId) {
  let {
    rows: [foundLineItem],
  } = await client.query(
    `SELECT * FROM lineitems WHERE order_id = $1 AND product_id = $2`,
    [orderId, productId]
  );
  console.log("line item", foundLineItem);
  if (foundLineItem) {
    // Update the quantity of the existing line item
    const updatedLineItem = {
      ...foundLineItem,
      quantity: foundLineItem.quantity + 1,
    };
    console.log("updated lineitem", updatedLineItem);
    return await updateLineItem(foundLineItem.id, updatedLineItem);
  }
  // Create a new line item

  console.log("starting to create lineitem");

  let {
    rows: [createdLineItem],
  } = await client.query(
    `INSERT INTO lineitems (quantity, order_id, product_id)
          VALUES ($1, $2, $3)
          RETURNING *`,
    [1, orderId, productId]
  );
  console.log("new line item", createdLineItem);
  return createdLineItem;
}

lineItemRouter.post("/", authRequired, async (req, res, next) => {
  try {
    const { product_id } = req.body;
    const currCart = await findOrCreateCartForUser(req.user.id);
    const currLineItem = await updateOrCreateLineItem(currCart.id, product_id);
    console.log("Current Cart: ", currCart);
    console.log("Current Line Item", currLineItem);
    // find lineitems if it exists update qty

    res.send(currLineItem);
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
