import axios from "../api/axios";

const useLogout = () => {
  const onLogout = async () => {
    sessionStorage.clear();

    await axios("/auth/logout", { withCredentials: true }).catch((error) =>
      console.log(error)
    );
  };
  return onLogout;
};

export default useLogout;
