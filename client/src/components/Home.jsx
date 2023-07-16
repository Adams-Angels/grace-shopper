import React from "react";
import useAuth from "./Auth/hooks/useAuth";

export function Home() {
  const { user } = useAuth();
  return (
    <div className="body">
      <h3 className="welcome-message">Welcome, {user.username}</h3>
      <img
        className="image"
        src="https://i.insider.com/5cb64d6778361d10ab2a6b97?width=1200&format=jpeg&auto=webp"
        alt="frog statue in garden"
      />
    </div>
  );
}
