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

export async function createOrder(user_id, is_cart) {
  try {
    const response = await fetch("/api/orders/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, is_cart }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
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
export async function fetchCart() {
  try {
    const response = await fetch("/api/orders/cart");
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}
export async function updateOrder(orderId, is_cart) {
  try {
    const response = await fetch(`/api/orders/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(is_cart),
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
