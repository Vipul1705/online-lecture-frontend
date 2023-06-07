import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";
import AlertBox from "../../components/UI/AlertBox/AlertBox";
import ControllerTextField from "../../components/UI/FormController/ControllerTextField";
import "./index.css";

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "../../hooks/use-auth";
import useHttp from "../../hooks/use-http";
const LoginSchema = Yup.object().shape({
  userid: Yup.string().required("User ID should not be empty"),
  pass: Yup.string().required("Password should not be empty"),
});

const LoginPage = () => {
  const { setUserData } = useAuth();
  let navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { sendRequest, data: responseData, isLoading, error } = useHttp();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const [openAlert, setOpenAlert] = useState(false);

  const handleOpenAlert = () => {
    setOpenAlert(true);
    navigate("/");
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
    navigate("/");
  };

  const handleSubmition = async (fieldValues) => {
    try {
      await sendRequest(
        "/auth/login",
        "post",
        { "Content-Type": "application/json" },
        JSON.stringify({
          userid: fieldValues.userid,
          pass: fieldValues.pass,
        })
      );
    } catch (err) {
      handleOpenAlert();
      console.log(err);
    }
  };

  useEffect(() => {
    if (responseData && responseData.accessToken && responseData.userData) {
      console.log(responseData.userData.role);
      sessionStorage.setItem("accessToken", responseData.accessToken);
      sessionStorage.setItem("isLoggedIn", !!responseData.accessToken);
      sessionStorage.setItem("user_id", responseData.userData.user_id);
      sessionStorage.setItem("name", responseData.userData.name);
      sessionStorage.setItem("role", responseData.userData.role);
      setUserData((prev) => {
        return {
          name: sessionStorage.getItem("name"),
          user_id: sessionStorage.getItem("user_id"),
          role: sessionStorage.getItem("role"),
          isLoggedIn: sessionStorage.getItem("isLoggedIn"),
          accessToken: sessionStorage.getItem("accessToken"),
        };
      });
      if (responseData.userData.role === "instructor") {
        navigate("/instructor", { replace: true });
      } else if (responseData.userData.role === "admin") {
        console.log("admin navigate");
        navigate("/admin", { replace: true });
      } else {
        navigate("/admin");
      }
    }
  }, [from, navigate, responseData, setUserData]);
  return (
    <>
      <AlertBox
        open={openAlert}
        handleClose={handleCloseAlert}
        desc={error ? error?.data : "Something went wrong!"}
        rightBtnTitle="Ok"
        rightBtnAction={handleCloseAlert}
        title="Login Failed"
      />
      <Card sx={{ width: "40%", ml: "auto", mr: "auto" }}>
        <Typography
          variant="h3"
          component="h3"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            m: 2,
            fontFamily: "pfhandbookpro-bold,sans-serif",
          }}
        >
          Login
        </Typography>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
          noValidate
          onSubmit={handleSubmit(handleSubmition)}
        >
          <ControllerTextField
            control={control}
            name="userid"
            type="text"
            label="User ID"
          />
          <ControllerTextField
            control={control}
            name="pass"
            type="password"
            label="Password"
          />
          {/* <CardActions sx={{ display: "flex", justifyContent: "center" }}> */}
          <Button
            variant="contained"
            type="submit"
            sx={{
              mb: "16px",
            }}
            disabled={isLoading}
          >
            Login
          </Button>
          {/* </CardActions> */}
        </Box>
      </Card>
    </>
  );
};

export default LoginPage;
