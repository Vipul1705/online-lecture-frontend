import React from "react";
import { NavLink } from "react-router-dom";
import "./NavList.css";
import useAuth from "../../../hooks/use-auth";
import { Box } from "@mui/material";

const NavList = () => {
  const { userData } = useAuth();
  const navLinks = [];
  if (userData.role === "instructor") {
    navLinks.push(
      <NavLink key="worklist" to="/">
        Home
      </NavLink>
    );
  }

  if (userData.role === "admin") {
    navLinks.push(
      <NavLink key="home" to="/admin">
        Instructors
      </NavLink>
    );
    navLinks.push(
      <NavLink key="home" to="/admin/courses">
        Courses
      </NavLink>
    );
    navLinks.push(
      <NavLink key="add-course" to="/admin/add-course">
        New Course
      </NavLink>
    );
  }
  return <Box className="nav-menu">{navLinks}</Box>;
};

export default NavList;
