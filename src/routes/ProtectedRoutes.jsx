import React, { useRef, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import IdleTimer from "react-idle-timer";
import AlertBox from "../components/UI/AlertBox/AlertBox";
import useLogout from "../hooks/use-logout";
import useRefreshToken from "../hooks/use-refreshToken";
import useAuth from "../hooks/use-auth";

const logoutTimer = 10 * 60 * 1000;
const warningTimer = 15 * 60 * 1000;

const ProtectedRoutes = ({ children, isAllowed, allowedRoles }) => {
  const userData = useAuth();
  const { isLoggedIn } = userData;
  const onLogout = useLogout();
  const refresh = useRefreshToken();
  const location = useLocation();
  const timerRef = useRef(null);
  const sessionTimeout = useRef(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const onIdle = () => {
    setModalOpen(true);
    sessionTimeout.current = setTimeout(onLogout, logoutTimer);
  };

  const handleClose = async () => {
    setModalOpen(false);
    const newAccessToken = await refresh();
    clearTimeout(sessionTimeout.current);
  };

  const onLogoutHandler = () => {
    setModalOpen(false);
    clearTimeout(sessionTimeout.current);
    onLogout();
  };

  // const onAction = () => !isModalOpen && timerRef && timerRef.reset();

  // if (!isAllowed) {
  //   console.log("inside protected routes", isAllowed);
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  return allowedRoles.includes(userData?.role) ? (
    <IdleTimer
      ref={timerRef}
      timeout={warningTimer}
      onIdle={onIdle}
      // onAction={onAction}
      // debounce={250}
    >
      <AlertBox
        open={isModalOpen}
        handleClose={handleClose}
        title="Warning!"
        desc="You were idle for a while ,your session is about to expire."
        leftBtnTitle="Stay Logged In"
        rightBtnTitle="Logout"
        leftBtnAction={handleClose}
        rightBtnAction={onLogoutHandler}
      />
      {children ? children : <Outlet />}
    </IdleTimer>
  ) : isLoggedIn ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
