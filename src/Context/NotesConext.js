import axios from "axios";
import React, { createContext, useEffect, useReducer, useState } from "react";

export const NotesConext = createContext();

const base = "/notes/";
function notesReducer(state, action) {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: false,
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

    case "ADD_INIT":
      return {
        ...state,
        // data: action.payload,
        isLoading: true,
        isError: false,
      };
    case "ADD_NOTE": {
      return {
        ...state,

        isLoading: false,
        // title: action.title,
        // usnote: action.usnote,
      };
    }

    case "CHANGE_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "CHANGE_NOTE": {
      return {
        ...state,
        // ...state.data.map((t) => {
        //   if (t._id === action.payload._id) {
        //     return action.payload;
        //   } else {
        //     return t;
        //   }
        // }),
        isLoading: false,
      };
    }

    case "DELETE_NOTE":
      return {
        data: state.data.filter((t) => t._id !== action.payload._id),
      };

    default:
      return state;
  }
}
const NotesConextProvider = ({ children }) => {
  //   const [url] = useState(base);
  const url = base;
  const [notes, dispatch] = useReducer(notesReducer, {
    isLoading: false,
    isError: false,
    data: [],
  });

  return (
    <NotesConext.Provider value={{ notes, dispatch, url }}>
      {children}
    </NotesConext.Provider>
  );
};

export default NotesConextProvider;
