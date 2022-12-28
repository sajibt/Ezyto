import axios from "axios";
import React, { useEffect, useState } from "react";
import List from "../components/List/List";
import AddNotes from "../components/Notes/AddNotes";
import Search from "../components/Search/Search";
import useNotesContext from "../Hooks/useNotesContext";
import "./Home.scss";
import Bars from "../components/List/Bars.tsx";
import useAuthContext from "../Hooks/useAuthContext";
import { IoIosAddCircle, IoIosCloseCircle } from "react-icons/io";

const base = "https://api-dot-ezoto-372816.uc.r.appspot.com/notes/";
const Home = () => {
  const { notes, dispatch } = useNotesContext();
  const { user } = useAuthContext();
  const [add, setAdd] = useState(false);

  const url = base;
  const [term, setTerm] = useState("");

  function handleAdd() {
    setAdd((prev) => !prev);
  }

  const handleSearchTerm = (event) => {
    // setTerm(event.target.value);
    // setUrl(`${base}${term}`);

    let query = event.target.value.toLowerCase();
    setTerm(query);
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch({
        type: "FETCH_INIT",
      });

      try {
        const result = await axios(url, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await result.data;
        dispatch({
          type: "FETCH_SUCCESS",
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: "FATCH_FAILURE",
        });
      }
    };

    if (user) {
      fetchData();
    }
  }, [dispatch, user, url]);

  // const searchedNotes = notes.data.filter(function (note) {
  //   return note.title.includes(term);
  // });

  // async function handleAddTask(title, usnote) {
  //   dispatch({
  //     type: "ADD_INIT",
  //   });
  //   const newNote = {
  //     title: title,
  //     usnote: usnote,
  //   };
  //   try {
  //     const result = await axios.post(url, newNote);
  //     const data = await result.data;

  //     dispatch({
  //       type: "ADD_NOTE",
  //       payload: data,
  //     });
  //   } catch (error) {
  //     dispatch({
  //       type: "FATCH_FAILURE",
  //     });
  //   }
  // }

  return (
    <>
      <section>
        <div className="home_section">
          <div className="notes_container">
            <Search onSearch={handleSearchTerm} value={term} />
            <div className="main_content">
              {notes.isLoading ? (
                <div className="bar-icon">
                  <Bars />
                  <p className="loading"> Loading...</p>
                </div>
              ) : (
                notes && (
                  <div className="main_section">
                    <List term={term} />
                    {add && <AddNotes add={handleAdd} />}
                    <span className="add_icon" onClick={handleAdd}>
                      {add ? (
                        <IoIosCloseCircle className="svg" />
                      ) : (
                        <IoIosAddCircle className="svg" />
                      )}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
