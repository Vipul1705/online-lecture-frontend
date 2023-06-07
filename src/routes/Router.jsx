import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ErrorPage from "../pages/ErrorPage";
import Layout from "../components/Layout/Layout";
import NewCoursePage from "../pages/AdminPage/NewCoursePage";
import AdminPage from "../pages/AdminPage";
import ProtectedRoutes from "../routes/ProtectedRoutes";
import InstructorPage from "../pages/InstructorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "instructor",
        element: <InstructorPage />,
      },
      {
        path: "admin",
        element: <ProtectedRoutes allowedRoles={["admin"]} />,
        children: [
          {
            index: true,
            element: <AdminPage />,
          },
          {
            path: "add-course",
            element: <NewCoursePage />,
          },
          {
            path: "courses",
            element: <NewCoursePage />,
          },
        ],
      },
    ],
  },
]);
