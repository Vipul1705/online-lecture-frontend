import React from "react";
import {
  Drawer,
  Typography,
  ListItemText,
  ListItemButton,
  ListItem,
  List,
  Divider,
  Box,
} from "@mui/material";

const drawerWidth = 240;

const MobileNav = ({ navItems, onClickHandler, open }) => {
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box component="nav">
      <Drawer
        container={container}
        variant="temporary"
        open={open}
        onClose={onClickHandler}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <Box onClick={onClickHandler} sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            Online Lecture Scheduling
          </Typography>
          <Divider />
          <List>
            {navItems.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default MobileNav;
