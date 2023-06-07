import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext({
  userData: {},
});

const AuthContextProvider = (props) => {
  const [userData, setUserData] = useState({
    userId: null,
    username: null,
    role: null,
    accessToken: null,
    isLoggedIn: false,
    error: null,
  });

  useEffect(() => {
    if (sessionStorage.getItem("isLoggedIn")) {
      setUserData({
        username: sessionStorage.getItem("username"),
        userId: sessionStorage.getItem("userId"),
        role: sessionStorage.getItem("role"),
        isLoggedIn: sessionStorage.getItem("isLoggedIn"),
        accessToken: sessionStorage.getItem("accessToken"),
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
