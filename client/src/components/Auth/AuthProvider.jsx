import { createContext, useState, useEffect } from "react";
import { fetchMe } from "../../api/auth";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ id: null, username: "guest" });
  const [loggedIn, setLoggedIn] = useState(false);
  console.log("authprovider mounted");

  async function getMe() {
    // try {
    const user = await fetchMe();
    console.log("user from auth provider", user);
    console.log("id", user.user.id);
    setUser(user);
    if (user.user.id) {
      setLoggedIn(true);
      console.log("logged in auth", user);
      console.log("logged in?: ", loggedIn);
    }
    //else {
    //     setLoggedIn(false);
    //     console.log("logged in failed auth");
    //   }
    // } catch (error) {
    //   setUser({ username: "Guestt" });
    //   setLoggedIn(false);
    //   console.log(error);
    // }
  }
  useEffect(() => {
    console.log("useEffect triggered");
    getMe();
  }, []);

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
