import React, { useEffect } from "react";
import useAuthContext from "./useAuthContext";
import useNotesContext from "./useNotesContext";

const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: noteDispatch } = useNotesContext();
  const logout = () => {
    // 1. make null and 2. delete cookies from local storage

    // remove user from storage
    localStorage.removeItem("user");

    // make payload null
    dispatch({
      type: "LOG_OUT",
    });

    noteDispatch({
      type: "FETCH_INIT",
      payload: null,
    });
  };

  return { logout };
};

export default useLogout;
