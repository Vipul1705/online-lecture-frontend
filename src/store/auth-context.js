import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext({
  userData: {},
});

const AuthContextProvider = (props) => {
  const [userData, setUserData] = useState({
    user_id: null,
    name: null,
    role: null,
    accessToken: null,
    isLoggedIn: false,
    error: null,
  });

  useEffect(() => {
    if (sessionStorage.getItem("isLoggedIn")) {
      setUserData({
        name: sessionStorage.getItem("name"),
        user_id: sessionStorage.getItem("user_id"),
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
