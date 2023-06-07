import "./App.css";
import LoginPage from "./pages/LoginPage";
import InstructorPage from "./pages/InstructorPage";
import AdminPage from "./pages/AdminPage";
import NewCoursePage from "./pages/AdminPage/NewCoursePage";
import ErrorPage from "./pages/ErrorPage";
import CoursePage from "./pages/AdminPage/CoursePage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import Layout from "./components/Layout/Layout";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router";
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
