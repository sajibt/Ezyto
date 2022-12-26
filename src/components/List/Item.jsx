import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useState } from "react";
import useAuthContext from "../../Hooks/useAuthContext";
import useNotesContext from "../../Hooks/useNotesContext";
import { AiOutlineRead } from "react-icons/ai";
import { BiCommentEdit } from "react-icons/bi";
import { MdReadMore, MdDeleteOutline } from "react-icons/md";

const Item = ({ note }) => {
  const { url, dispatch } = useNotesContext();
  const [isEdit, setisEdit] = useState(false);
  const [upnote, setupNote] = useState(note);
  const [read, setRead] = useState(false);
  const [see, setSee] = useState(false);

  function handleRead() {
    if (note.description.length > 300) {
      return setRead((p) => !p);
    }
  }

  useEffect(() => {
    function handleSee() {
      const nt = note.description.length;
      if (nt > 300) {
        setSee(true);
      }
    }

    handleSee();
  }, [note.description.length]);

  const { user } = useAuthContext();

  // const headers = {
  //   Authorization: `Bearer ${user.token}`,
  //   "My-Custom-Header": "foobar",
  // };
  async function handleDelete() {
    if (!user) {
      return;
    }

    const response = await axios.delete(url + note._id, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const data = await response.data;
    dispatch({
      type: "DELETE_NOTE",
      payload: data,
    });
  }

  function handleChange(e) {
    const { id, value } = e.target;
    setupNote({
      ...upnote,

      [id]: value,
    });
  }

  //   useEffect(() => {
  //     setupNote(upnote);
  // }, [upnote]);
  const id = upnote._id;

  async function handleSubmit(event) {
    if (!user) {
      return;
    }

    event.preventDefault();
    setisEdit(false);
    dispatch({
      type: "CHANGE_INIT",
    });

    try {
      const response = await axios.patch(
        url + `${id}`,
        upnote,

        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.data;
      dispatch({
        type: "CHANGE_NOTE",
        payload: data._id,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_FAILURE",
      });
    }
  }

  let NotesContent;

  if (isEdit) {
    NotesContent = (
      <>
        <form onSubmit={handleSubmit}>
          <div className="notes_content">
            <div className="edit-notes">
              <h3>Edit</h3>
              <input
                className="inputarea"
                type="text"
                id="title"
                value={upnote.title}
                onChange={handleChange}
              />
              <textarea
                type="text"
                className="textarea"
                id="description"
                rows="5"
                cols="33"
                value={upnote.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="inner-btn">
            <button className="ms-button" type="submit">
              Save{" "}
            </button>
            <button
              className="ms-button"
              onClick={() => {
                setisEdit(false);
              }}>
              cancel
            </button>
          </div>
        </form>
      </>
    );
  } else {
    NotesContent = (
      <>
        <div className="notes_content">
          <h4>{note.title}</h4>
          <p>{note.description.slice(0, 200)} </p>
          <div className="read_sec" onClick={handleRead}>
            {" "}
            {read ? (
              <div className="full_read"> {note.description}</div>
            ) : (
              <>{see ? <MdReadMore className="read_icon" /> : null}</>
            )}
          </div>
          {/* <p>{note.description}</p> */}
        </div>
        <div className="inner-btn">
          <button
            className="ms-button"
            onClick={() => {
              setisEdit(true);
            }}>
            <BiCommentEdit />
          </button>

          <span className="note_time">
            {formatDistanceToNow(new Date(note.createdAt), {
              addSuffix: true,
            })}
          </span>
          <button className="ms-button" onClick={handleDelete}>
            <span>
              <MdDeleteOutline />
            </span>
          </button>
        </div>
      </>
    );
  }

  return <div className="item_card__details">{NotesContent}</div>;
};

export default Item;
