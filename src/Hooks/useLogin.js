import axios from "axios";
import React, { useState } from "react";
import useAuthContext from "./useAuthContext";

const url = "https://api-dot-ezoto-372816.uc.r.appspot.com/users/login";

const useLogin = () => {
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setLoading(true);
    setIsError(false);

    const dt = {
      email: email,
      password: password,
    };
    const UserData = JSON.stringify(dt);

    try {
      const response = await axios.post(url, UserData, {
        headers: {
          "Content-Type": "application/json",
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

  return { login, isError, loading };
};

export default useLogin;
