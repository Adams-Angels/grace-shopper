import { createContext, useState, useEffect } from "react";
// import {} from "../../api/auth";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ id: null, username: "Guest" });
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function getMe() {
      try {
        const { user } = await fetchMe();
        setUser(user);
        if (Object.keys(user).length > 0) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        setUser({ username: "Guest" });
        setLoggedIn(false);
      }
    }
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
