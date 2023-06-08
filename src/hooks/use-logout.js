import axios from "../api/axios";
import useAuth from "../hooks/use-auth";
const useLogout = () => {
  const { setUserData } = useAuth();
  const onLogout = async () => {
    sessionStorage.clear();

    await axios("/auth/logout", { withCredentials: true })
      .then((data) => {
        setUserData({});
      })
      .catch((error) => console.log(error));
  };
  return onLogout;
};

export default useLogout;
