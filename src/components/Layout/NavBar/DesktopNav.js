import React from "react";
import {
  Button,
  Typography,
  Toolbar,
  IconButton,
  Box,
  AppBar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

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
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {navItems.map((item) => (
            <Button key={item} sx={{ color: "#fff" }}>
              {item}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DesktopNav;
