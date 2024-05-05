// ref: https://dev.to/stephengade/build-custom-middleware-for-a-reactnextjs-app-with-context-api-2ed3
import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const hasAccess = sessionStorage['Authorization']

    if (hasAccess) {
      setIsAuthenticated(true);
    }
  }, [])

  const loginUser = (token, username, firstName, numOfActions, maxActions, permissions) => {
    sessionStorage['Authorization'] = token
    sessionStorage['username'] = username
    sessionStorage['firstName'] = firstName
    sessionStorage['numOfActions'] = numOfActions
    sessionStorage['maxActions'] = maxActions
    sessionStorage['permissions'] = permissions
    setIsAuthenticated(true)
  }

  const logoutUser = () => {
    sessionStorage.clear()
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };