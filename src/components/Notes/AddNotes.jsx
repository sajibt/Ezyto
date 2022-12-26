import axios from "axios";
import React, { useState } from "react";
import useAuthContext from "../../Hooks/useAuthContext";
import useNotesContext from "../../Hooks/useNotesContext";
import "./AddNotes.scss";

const AddNotes = ({ add }) => {
  //   const [usnote, setNote] = useState("");
  //   const [title, setTitle] = useState("");
  //   console.log("sajib");
  //   console.log(usnote, title);
  //   console.log("mow");

  const { url, notes, dispatch } = useNotesContext();

  const [note, setNote] = useState(notes);
  const { user } = useAuthContext();
  console.log(note, "this is note add");

  //   const emailRef = useRef(null);
  //   const passwordRef = useRef(null);

  //clear on unmount

  //   const onSubmit = useCallback(
  //     async (event) => {
  //       event.preventDefault();
  //       // Your logic/code
  //       // For value do:
  //       const title = emailRef.current.value;
  //       const usnote = emailRef.current.value;

  //       onAdd(title, usnote);
  //     },
  //     [onAdd]
  //   );

  function handleInput(event) {
    setNote({
      ...note,
      [event.target.name]: event.target.value,
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (!user) {
      return;
    }

    dispatch({
      type: "ADD_INIT",
    });
    // onAdd(title, usnote);

    try {
      const response = await axios.post(url, note, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.data;
      dispatch({
        type: "ADD_NOTE",
        payload: data,
      });
      add(false);
    } catch (error) {
      dispatch({
        type: "FETCH_FAILURE",
      });
    }
  }

  return (
    <section>
      <div className="form_section">
        <form className="form_container" onSubmit={onSubmit}>
          <h3 className="add-note">Add a New Note</h3>

          <div className="form_input">
            <div className="form_title">
              {/* <label htmlFor="title">Title:</label>
            <br /> */}
              <input
                className="form_title__input"
                type="text"
                name="title"
                onChange={handleInput}
                placeholder="Title..."
                value={note.data.title}
              />
            </div>

            <div className="form_note">
              {/* <label htmlFor="usnote">Description:</label>
            <br /> */}
              <textarea
                type="text"
                className="textarea"
                name="description"
                onChange={handleInput}
                value={note.data.description}
                placeholder="Write Here.."
              />
            </div>
          </div>

          <button className="add_btn" type="submit">
            Add
          </button>
        </form>
      </div>
    </section>
  );
};
export default AddNotes;
