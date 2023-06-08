import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import CustomizedTables from "../../components/UI/Table/CustomizedTables";
import useHttp from "../../hooks/use-http";
const AdminPage = () => {
  const { sendRequest, data: instructorsData, isLoading, error } = useHttp();
  useEffect(() => {
    sendRequest("/instructor/getAllInstructors", "get", {
      "Content-Type": "application/json",
    });
  }, [sendRequest]);

  console.log(instructorsData);
  console.log(error);

  const col = instructorsData.map((instructor) => {
    return Object.keys(instructor);
  });
  console.log(col);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h2">List Of Instructors</Typography>
        <Box sx={{ m: 2 }}>
          <CustomizedTables rows={instructorsData} columns={col} />
        </Box>
      </Box>
    </>
  );
};

export default AdminPage;
