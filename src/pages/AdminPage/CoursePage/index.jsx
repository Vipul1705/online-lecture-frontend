import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CardMedia,
} from "@mui/material";
import useHttp from "../../../hooks/use-http";
const CoursePage = () => {
  const { sendRequest, data: coursesData, isLoading, error } = useHttp();
  useEffect(() => {
    sendRequest("/course/getAllCourses", "get", {
      "Content-Type": "application/json",
    });
  }, [sendRequest]);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h2">List Courses</Typography>
      <Box sx={{ m: 2 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {coursesData.map((course) => (
            <Grid item xs={6} key={course._id}>
              <Card>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {course.level}
                  </Typography>
                  <CardMedia
                    component="img"
                    height="194"
                    image={course.image}
                    alt={course.name}
                  />
                  <Typography variant="h5" component="div">
                    {course.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {course.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Add Lectures</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default CoursePage;
