import React from "react";
import { Typography, Toolbar, IconButton, AppBar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoginNav from "./LoginNav";

const DesktopNav = ({ navItems, onClickHandler }) => {
  return (
    <AppBar component="nav">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onClickHandler}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          Online Lecture Scheduling
        </Typography>
        <LoginNav />
      </Toolbar>
    </AppBar>
  );
};

export default DesktopNav;
