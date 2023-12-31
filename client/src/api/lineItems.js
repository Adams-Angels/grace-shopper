export async function addLineItem(product_id) {
  try {
    const response = await fetch(`/api/lineitems/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //may need authorization??
      body: JSON.stringify({
        product_id,
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
      return data;
    }
    throw error("Failed to update line item");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteLineItem(lineItemId) {
  try {
    const response = await fetch(`/api/lineitems/${lineItemId}`, {
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
