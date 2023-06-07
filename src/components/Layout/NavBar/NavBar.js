import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";

const navItems = ["Home", "About", "Contact"];

const NavBar = ({ window }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <DesktopNav navItems={navItems} onClickHandler={handleDrawerToggle} />
      {/* <MobileNav
        navItems={navItems}
        onClickHandler={handleDrawerToggle}
        open={mobileOpen}
      /> */}
    </Box>
  );
};

export default NavBar;
