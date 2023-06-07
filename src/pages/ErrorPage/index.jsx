import { useRouteError } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);
  let title = "An Error Occured!!";
  let message = "Something went wrong";
  if (error.status === 500) {
    message = error.message;
  }
  if (error.status === 404) {
    title = "Not Found";
    message = "Could not find resource or page.";
  }
  return (
    <>
      <Layout>
        <main id="error-content">
          <h1>{title}</h1>
          <p>{message}</p>
        </main>
      </Layout>
    </>
  );
};

export default ErrorPage;
