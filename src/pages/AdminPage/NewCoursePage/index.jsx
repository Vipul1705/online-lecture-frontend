import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ControllerInput from "../../../components/UI/FormController/ControllerInput";
import { Row } from "react-bootstrap";
import ControllerDropDown from "../../../components/UI/FormController/ControllerDropDown";
import DeleteIcon from "@mui/icons-material/Delete";
import useHttp from "../../../hooks/use-http";
import AlertBox from "../../../components/UI/AlertBox/AlertBox";
import { useNavigate } from "react-router-dom";
const CourseSchema = Yup.object().shape({
  courseId: Yup.string().required("Course ID should not be empty"),
  courseName: Yup.string().required("Course Name should not be empty"),
  courseLevel: Yup.string().required("Course Level should not be empty"),
  courseDescription: Yup.string().required(
    "Course Description should not be empty"
  ),
  // courseImage: Yup.string().required("Course Image should not be empty"),
});
const NewCoursePage = () => {
  const navigate = useNavigate();
  const {
    sendRequest: sendRequestInstructor,
    data: instructors,
    isLoading: isLoadingInstructors,
    error: errorInstructors,
  } = useHttp();
  const { sendRequest, data: responseData, isLoading, error } = useHttp();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(CourseSchema),
    lectures: [
      {
        name: "",
        date: "",
        time: "",
        instructor: "",
      },
    ],
  });
  const {
    fields: fieldsLecture,
    append: appendLecture,
    remove: removeLecture,
  } = useFieldArray({
    control,
    name: "lectures",
  });

  const [openAlert, setOpenAlert] = useState(false);

  const handleOpenAlert = () => {
    setOpenAlert(true);
    navigate("/");
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
    navigate("/admin/courses");
  };

  useEffect(() => {
    sendRequestInstructor("/instructor/getAllInstructorsName", "get", {
      "Content-Type": "application/json",
    });
  }, [sendRequestInstructor]);
  console.log(instructors);
  const handleSubmition = async (fieldValues) => {
    console.log("fieldValues", fieldValues);
    sendRequest(
      "/course/addCourse",
      "post",
      {
        "Content-Type": "application/json",
      },
      JSON.stringify({
        courseId: fieldValues.courseId,
        courseName: fieldValues.courseName,
        courseLevel: fieldValues.courseLevel,
        courseDescription: fieldValues.courseDescription,
        courseImage: fieldValues.courseImage,
        lectures: fieldValues.lectures,
      })
    );
  };
  console.log("responseData", responseData);
  console.log("error", error);
  return (
    <>
      <AlertBox
        open={openAlert}
        handleClose={handleCloseAlert}
        desc={
          error
            ? error?.data
            : error?.message
            ? error?.message
            : responseData
            ? responseData
            : responseData?.message
            ? responseData?.message
            : "Something went wrong!"
        }
        rightBtnTitle="Ok"
        rightBtnAction={handleCloseAlert}
        title={error ? "Error" : "Success"}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h2">Add Course</Typography>
        <Box sx={{ m: 2 }}>
          <Box component="form" onSubmit={handleSubmit(handleSubmition)}>
            <Card>
              <CardContent>
                <Row className="mb-3">
                  <ControllerInput
                    name="courseId"
                    type="text"
                    label="Course ID"
                    placeholder="Enter the course ID"
                    control={control}
                    mandatory={true}
                  />
                  <ControllerInput
                    name="courseName"
                    type="text"
                    label="Course Name"
                    placeholder="Enter the course name"
                    control={control}
                    mandatory={true}
                  />
                  <ControllerInput
                    name="courseLevel"
                    type="text"
                    label="Course Level"
                    placeholder="Enter the course level"
                    control={control}
                    mandatory={true}
                  />
                </Row>
                <Row className="mb-3">
                  <ControllerInput
                    name="courseDescription"
                    type="text"
                    label="Course Description"
                    placeholder="Enter the course Description"
                    as="textarea"
                    rows="4"
                    control={control}
                    mandatory={true}
                  />
                </Row>
                <Row className="mb-3">
                  <ControllerInput
                    name="courseImage"
                    type="text"
                    label="Course Image"
                    placeholder="Enter the course Image url"
                    control={control}
                  />
                </Row>
                <Typography>Lectures Details</Typography>
                <Row className="mb-3">
                  <Button
                    sx={{ width: "20%", ml: 2 }}
                    variant="outlined"
                    onClick={() => {
                      appendLecture({
                        name: "",
                        date: "",
                        time: "",
                        instructor: "",
                      });
                    }}
                  >
                    + Add
                  </Button>
                </Row>
                {fieldsLecture.map((item, index) => {
                  return (
                    <Row key={item.id}>
                      <ControllerInput
                        control={control}
                        name={`lectures.${index}.name`}
                        column="name"
                        label="Lecture Name"
                      />
                      <ControllerInput
                        name={`lectures.${index}.date`}
                        type="text"
                        label="Date"
                        placeholder="YYYY/mm/dd"
                        control={control}
                      />
                      <ControllerInput
                        name={`lectures.${index}.time`}
                        type="text"
                        label="Time"
                        placeholder="Enter timing"
                        control={control}
                      />
                      <ControllerDropDown
                        style={{ width: "25%" }}
                        name={`lectures.${index}.instructor`}
                        type="text"
                        label="Instructor"
                        control={control}
                        options={instructors}
                      />
                      <IconButton
                        sx={{
                          width: "5%",
                          mt: "auto",
                          mb: "auto",
                          height: "10%",
                        }}
                        variant="outlined"
                        onClick={() => {
                          removeLecture(index);
                        }}
                      >
                        <DeleteIcon color="primary" />
                      </IconButton>
                    </Row>
                  );
                })}
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ ml: "auto", mr: "auto", mb: 2 }}
                >
                  Add Course
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NewCoursePage;
