export async function fetchOrders() {
  try {
    const response = await fetch("/api/orders");
    if (response.ok) {
      const data = await response.json();
      return data.orders;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createOrder(order) {
  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Constent-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    if (response.ok) {
      const data = await response.json();
      return data.order;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchOrderById(orderId) {
  try {
    const response = await fetch(`/api/orders/${orderId}`);
    if (response.ok) {
      const data = await response.json();
      return data.order;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function updateOrder(orderId, updatedOrder) {
  try {
    const response = await fetch(`/api/orders/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedOrder),
    });
    if (response.ok) {
      const data = await response.json();
      return data.order;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteOrder(orderId) {
  try {
    const response = await fetch(`/api/orders/${orderId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      const data = await response.json();
      return data.orderId;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
