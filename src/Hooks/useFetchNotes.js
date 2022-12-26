import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import useAuthContext from "./useAuthContext";

function notesReducer(state, action) {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    default:
      throw new Error();
  }
}

const useFetchNotes = (initialData, initialUrl) => {
  const { user } = useAuthContext();
  const [url, setUrl] = useState(initialUrl);
  console.log(url);
  const [notes, dispatch] = useReducer(notesReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });
  console.log(notes);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({
        type: "FETCH_INIT",
      });

      try {
        const result = await axios(
          url,

          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = result.data;
        dispatch({
          type: "FETCH_SUCCESS",
          payload: data,
        });
        console.log(data);
      } catch (error) {
        dispatch({
          type: "FATCH_FAILURE",
        });
      }
    };

    if (user) {
      fetchData();
    }
  }, []);

  return [{ notes }, setUrl];
};

export default useFetchNotes;
