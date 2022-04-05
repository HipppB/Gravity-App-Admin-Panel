import React, { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
const AuthContext = createContext({
  isAuthentificated: false,
  login: (userInfos) => {},
  logout: (cb) => {},
  autoLogin: () => {},
  apiToken: "",
});

// create context
function AuthProvider({ children }) {
  const [isAuthentificated, setisAuthentificated] = useState(false);
  const [apiToken, setApiToken] = useState(false);
  const { data, loading, error, newRequest } = useFetch();
  async function login(userInfos) {
    // setisAuthentificated(true);
    newRequest("auth/login", "POST", userInfos);
    // setApiToken();
  }
  useEffect(() => {
    if (!loading) {
      if (data?.access_token) {
        setApiToken(data?.access_token);
        newRequest("user/profile", "GET", {}, data?.access_token);
      }
      if (apiToken) {
        if (data?.role?.length > 3) {
          console.log("AUTHORZED");
          console.log(data);
          setisAuthentificated(true);
        } else {
          console.error(
            "Une connexion non autorisée à été détéctée. En cas de récidive l'utilisateur",
            data?.email,
            "sera signalé."
          );
        }
      }
    }
  }, [data, loading]);

  const logout = (cb) => {
    setisAuthentificated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthentificated,
        login,
        logout,
        apiToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
const useAuthentification = () => useContext(AuthContext);

export { AuthProvider, useAuthentification };
