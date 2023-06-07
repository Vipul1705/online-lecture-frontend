import React from "react";
import NavBar from "./NavBar/NavBar";
import "./Layout.css";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className="main-content">
        {children}
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
