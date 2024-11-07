import React from "react";
import "./NoteComponent.css";
import { Note } from "../../types/Note";
import { useNavigate } from "react-router-dom";
import { deleteNote } from "../../store/features/notes/notesSlice";
import { useDispatch } from "react-redux";

interface NoteComponentProps {
  note: Note;
}

const NoteComponent: React.FC<NoteComponentProps> = ({ note }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="NoteComponent">
      <h1>NoteComponent</h1>
      <h2>Title: {note.title}</h2>
      <h2>category: {note.category}</h2>
      <h2>createdAt: {note.createdAt}</h2>
      <h2>content: {note.content}</h2>
      <button onClick={() => navigate(`/notes/edit/${note.id}`)}>Edit</button>
      <button
        className="DelBtn"
        onClick={() => dispatch(deleteNote({ noteId: note.id }))}
      >
        Delete
      </button>
    </div>
  );
};

export default NoteComponent;
