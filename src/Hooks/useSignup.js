import axios from "axios";
import { useState } from "react";
import useAuthContext from "./useAuthContext";

const url = "/users/signup";

export const useSignup = () => {
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const signup = async (email, password, username) => {
    setLoading(true);
    setIsError(false);

    //if we use this we don't need any header
    const UserData = {
      email: email,
      password: password,
      username: username,
    };

    // use this for dpecific headre

    const ud = JSON.stringify(UserData);

    try {
      const response = await axios.post(url, ud, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      const data = await response.data;

      localStorage.setItem("user", JSON.stringify(data));

      dispatch({
        type: "LOG_IN",
        payload: data,
      });
      setLoading(false);
      setIsError(false);
    } catch (error) {
      setLoading(false);
      setIsError(true);
    }
  };

  return { signup, loading, isError };
};
