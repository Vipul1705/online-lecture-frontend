import { useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Box,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import Logout from "@mui/icons-material/Logout";
import NavList from "./NavList";
// import NameAvatar from "../../UI/Avatar/NameAvatar";
import useLogout from "../../../hooks/use-logout";
import useAuth from "../../../hooks/use-auth";

const LoginNav = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const { isLoggedIn } = userData;
  const onLogout = useLogout();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const logoutHandler = useCallback(async () => {
    await onLogout();
    navigate("/");
  }, [navigate, onLogout]);

  return (
    <>
      {isLoggedIn ? (
        <>
          <NavList />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Tooltip title="Account settings">
              <Button
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Typography
                  sx={{ color: "white", ml: "5px" }}
                  variant="h5"
                  component="h5"
                >
                  {userData?.name}
                </Typography>
              </Button>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem sx={{ display: "flex", flexDirection: "column" }}>
              {userData?.name}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "10px",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="span"
                  sx={{ fontFamily: "pfhandbookpro-bold,sans-serif" }}
                >
                  {userData?.user_id}
                </Typography>
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => logoutHandler()}
              sx={{ justifyContent: "center" }}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </>
      ) : (
        <NavLink
          style={{ textDecoration: "none", color: "white", fontSize: "1.2rem" }}
          to="/"
        >
          <Button color="inherit">
            <LoginIcon /> Login
          </Button>
        </NavLink>
      )}
    </>
  );
};

export default LoginNav;
