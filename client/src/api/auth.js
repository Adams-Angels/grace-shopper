export async function registerUser(username, password, email, is_admin) {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email,
        is_admin,
      }),
    });
    const result = await response.json();
    console.log("registration successful");
    return result;
  } catch (error) {
    console.log(error);
  }
}
export async function loginUser(username, password) {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const result = await response.json();
    console.log("logged in successful");
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchMe() {
  console.log("hello from auth provider");
  try {
    const response = await fetch("/api/auth/me");
    const { success, message, user } = await response.json();
    if (!success) {
      throw {
        message,
      };
    }
    console.log("fetch me user: ", user);
    return {
      success,
      message,
      user,
    };
  } catch (error) {
    console.log(error);
  }
}
export async function logOut() {
  try {
    const response = await fetch("/api/auth/logout");
    const { success, message } = await response.json();
    if (!success) {
      throw {
        message,
      };
    }
    return {
      success,
      message,
    };
  } catch (error) {
    console.log(error);
  }
}
