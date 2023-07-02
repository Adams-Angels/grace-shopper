import { useState } from "react";
import { registerUser, loginUser } from "../api/auth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../components/Auth/hooks/useAuth";

export function AuthForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const { pathname } = useLocation();
  const { setUser, setLoggedIn } = useAuth();
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
        navigate("/");
        console.log("You're logged in auth form");
      } else {
        setError(result.error);
      }
    } catch (error) {
      console.log(error);
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
        <label>
          Username:
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="text"
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button>Submit!</button>
      </form>
    </div>
  );
}
