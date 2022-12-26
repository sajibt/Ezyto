import { useContext } from "react";
import { NotesConext } from "../Context/NotesConext";

const useNotesContext = () => {
  const context = useContext(NotesConext);

  if (context === undefined) {
    throw new Error("useNotes must be used within NoteContext");
  }

  return context;
};

export default useNotesContext;
