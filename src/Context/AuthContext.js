import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  isAuthentificated: false,
  login: (userInfos) => {},
  logout: (cb) => {},
  getApiToken: () => {},
  autoLogin: () => {},
});

// create context
function AuthProvider({ children }) {
  const [isAuthentificated, setisAuthentificated] = useState(false);
  const [apiToken, setApiToken] = useState(false);

  async function login(userInfos) {
    setisAuthentificated(true);
  }

  const logout = (cb) => {
    setisAuthentificated(false);
  };
  const getApiToken = () => {
    return apiToken;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthentificated,
        login,
        logout,
        getApiToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
const useAuthentification = () => useContext(AuthContext);

export { AuthProvider, useAuthentification };
