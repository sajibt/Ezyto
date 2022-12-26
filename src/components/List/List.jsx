import axios from "axios";
import React, { useEffect } from "react";
import useAuthContext from "../../Hooks/useAuthContext";
import useNotesContext from "../../Hooks/useNotesContext";
import Item from "./Item";
import "./list.scss";

const List = ({ term }) => {
  const { notes, dispatch } = useNotesContext();
  const { user } = useAuthContext();

  const Notesdata = notes || [];

  useEffect(() => {
    const fetchNotes = async () => {
      if (!user) {
        return;
      }
      const response = await axios(
        "/notes",

        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = response.data;
      dispatch({
        type: "FETCH_SUCCESS",
        payload: data,
      });
    };

    fetchNotes();
  }, [dispatch]);

  const searchedNotes = Notesdata.data.filter((note) => {
    return note.title.toLowerCase().includes(term.toLowerCase());
  });
  return (
    <section>
      <div className="item_card">
        {searchedNotes.map((note) => {
          return <Item key={note._id} note={note} />;
        })}
      </div>
    </section>
  );
};

export default List;
