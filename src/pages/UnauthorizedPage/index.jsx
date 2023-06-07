import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  let navigate = useNavigate();
  const goBackHandler = () => {
    navigate(-1);
  };
  return (
    <>
      <Box
        sx={{
          mt: 4,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h2">Unauthorized</Typography>
        <Typography variant="body1">
          You don't have access for requested page. Please Go back to authorized
          page.
        </Typography>
        <Button onClick={goBackHandler} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    </>
  );
};

export default UnauthorizedPage;
