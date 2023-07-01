export async function addLineItem(quantity, orderId, productId, price) {
  try {
    const response = await fetch(`/api/lineitems/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //may need authorization??
      body: JSON.stringify({
        quantity,
        orderId,
        productId,
        price,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchAllLineItems() {
  try {
    const response = await fetch("/api/lineitems/");
    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchLineItemsById(id) {
  try {
    const response = await fetch(`/api/lineitems/${id}`);
    const result = await response.json();
    console.log("LineItems by id from api", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function updateLineItem(id, updatedLineItem) {
  try {
    const response = await fetch(`/api/lineitems/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedLineItem),
    });
    if (response.ok) {
      const data = await response.json();
      //need to bring data.lineItem??
      return data, console.log("data from updated line item: ", data);
    }
    throw error("Failed to update line item");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteLineItem(id) {
  try {
    const response = await fetch(`/api/lineitems/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
  } catch (error) {
    console.error(error);
  }
}
