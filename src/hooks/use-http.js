import axios from "../api/axios";
import { useCallback, useReducer } from "react";
import useAxiosPrivate from "./use-axiosPrivate";
const initialState = {
  isLoading: false,
  error: null,
  data: [],
};
const requestReducer = (state, action) => {
  switch (action.type) {
    case "SEND":
      return { data: [], isLoading: true, error: null };
    case "SUCCESS":
      return { data: action.data, isLoading: false, error: null };
    case "ERROR":
      return { data: [], isLoading: false, error: action.errorMessage };
    case "CLEAR":
      return initialState;
    default:
      throw new Error("Could not be reached!");
  }
};

const useHttp = () => {
  const [httpState, dispatch] = useReducer(requestReducer, initialState);
  const axiosPrivate = useAxiosPrivate();
  const sendRequest = useCallback(async (endpoint, method, headers, body) => {
    dispatch({ type: "SEND" });
    await axios({
      url: endpoint,
      method,
      data: body,
      headers,
    })
      .then((response) => {
        // console.log(response.data);
        dispatch({ type: "SUCCESS", data: response.data });
      })
      .catch((err) => {
        dispatch({ type: "ERROR", errorMessage: err });
      });
  }, []);

  const sendRequestPrivate = useCallback(
    async (endpoint, method, headers, body) => {
      dispatch({ type: "SEND" });
      await axiosPrivate({
        url: endpoint,
        method,
        headers,
        data: body,
      })
        .then((response) => {
          console.log(response?.data);
          dispatch({ type: "SUCCESS", data: response?.data });
        })
        .catch((err) => {
          console.log("error in private", err);
          dispatch({ type: "ERROR", errorMessage: err });
        });
    },
    [axiosPrivate]
  );

  // console.log(httpState);
  return {
    ...httpState,
    sendRequest,
    sendRequestPrivate,
  };
};

export default useHttp;
