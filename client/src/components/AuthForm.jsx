import { useState } from "react";
import { registerUser, loginUser } from "../api/auth";
import { useNavigate, useLocation } from "react-router-dom";

export default function AuthForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let result;
      if (pathname === "/login") {
        result = await loginUser(username, password);
      } else if (pathname === "/register") {
        result = await registerUser(username, password, email);
      }
      if (result.success) {
        setLoggedIn(true);
        navigate("/me");
      } else {
        setError(result.error);
      }
    } catch (error) {
      next(error);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {pathname === "/login" ? (
          <h2>
            Login or
            <Link to="/register"> Register</Link>
          </h2>
        ) : (
          <h2>
            Register Below or
            <Link to="/login">Login</Link>
          </h2>
        )}
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button>Submit!</button>
      </form>
    </div>
  );
}
