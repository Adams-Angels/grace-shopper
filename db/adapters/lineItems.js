const client = require("../client");
const { getProductById } = require("./products");

async function createLineItem(quantity, order_id, product_id) {
  try {
    // Check if the product exists
    const product = await getProductById(product_id);
    if (!product) {
      throw new Error("Product not found");
    }

    const {
      rows: [createdLineItem],
    } = await client.query(
      `INSERT INTO lineitems (quantity, order_id, product_id)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
      [quantity, order_id, product_id]
    );

    return createdLineItem;
  } catch (error) {
    throw error;
  }
}

async function getLineItemById(id) {
  try {
    const {
      rows: [lineItem],
    } = await client.query(
      `
      SELECT 
	
      JSON_BUILD_OBJECT (
           'id', orders.id,
           'is_cart', orders.is_cart,
           'user_id', orders.user_id,
           'line_items',
            COALESCE((
           
          
             SELECT JSON_AGG(
               JSON_BUILD_OBJECT(
                 'lineitem_id', lineitems.id ,
                 'quantity', lineitems.quantity,
                  'product_id', products.id,
                  'total_price', lineitems.quantity * products.price,
                  'product_name', products.name,
                  'products_img', products.image
               )
             )
             From lineitems
             left join products
           on lineitems.product_id = products.id
           where lineitems.order_id = orders.id
          ), '[]')
      )
    
    
    FROM orders
    WHERE orders.id = $1
      `,
      [id]
    );

    return lineItem;
  } catch (error) {
    throw error;
  }
}

async function getAllLineItems() {
  try {
    const { rows } = await client.query(`
    SELECT 
	
    JSON_BUILD_OBJECT (
         'id', orders.id,
         'is_cart', orders.is_cart,
         'user_id', orders.user_id,
         'line_items',
          COALESCE((
         
        
           SELECT JSON_AGG(
             JSON_BUILD_OBJECT(
               'lineitem_id', lineitems.id ,
               'quantity', lineitems.quantity,
                'product_id', products.id,
                'total_price', lineitems.quantity * products.price,
                'product_name', products.name,
                'products_img', products.image
             )
           )
           From lineitems
           left join products
         on lineitems.product_id = products.id
         where lineitems.order_id = orders.id
        ), '[]')
    )
  
  
  FROM orders
      ;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateLineItem(id, { quantity }) {
  try {
    const {
      rows: [updatedlineItem],
    } = await client.query(
      `
      UPDATE lineitems
      SET quantity = $2
      WHERE id = $1
      RETURNING *;
      `,
      [id, quantity]
    );

    return updatedlineItem;
  } catch (error) {
    throw error;
  }
}

async function destroyLineItem(id) {
  try {
    const { rows } = await client.query(
      `
      DELETE FROM lineitems
      WHERE id = $1
      RETURNING *;
      `,
      [id]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createLineItem,
  getLineItemById,
  getAllLineItems,
  updateLineItem,
  destroyLineItem,
};
