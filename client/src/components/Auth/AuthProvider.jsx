import { createContext, useState, useEffect } from "react";
import { fetchMe } from "../../api/auth";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ id: null, username: "guest" });
  const [loggedIn, setLoggedIn] = useState(false);
  console.log("authprovider mounted");

  useEffect(() => {
    console.log("useEffect triggered");
    async function getMe() {
      try {
        const { success, message, user } = await fetchMe();
        console.log("User in Use Effect: ", user);
        setUser(user);
      } catch (error) {
        setLoggedIn(false);
        console.log(error);
      }
    }
    getMe();
  }, [loggedIn]);

  const contextValue = {
    user,
    setUser,
    loggedIn,
    setLoggedIn,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
