import axios from "../api/axios";
import useAuth from "../hooks/use-auth";

const useRefreshToken = () => {
  const { setUserData } = useAuth();

  const refresh = async () => {
    await axios
      .get("/refreshToken/", { withCredentials: true })
      .then((response) => {
        sessionStorage.setItem("accessToken", response.data.accessToken);

        setUserData((prevData) => {
          return { ...prevData, accessToken: response.data.accessToken };
        });

        console.log("refreshed", response.data);
        return response.data.accessToken;
      })
      .catch((error) => console.log("refreshed error", error));
  };
  return refresh;
};

export default useRefreshToken;
