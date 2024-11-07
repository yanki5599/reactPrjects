import React from "react";
import "./NoteComponent.css";
import { Note } from "../../types/Note";
import { useNavigate } from "react-router-dom";

interface NoteComponentProps {
  note: Note;
}

const NoteComponent: React.FC<NoteComponentProps> = ({ note }) => {
  const navigate = useNavigate();
  return (
    <div className="NoteComponent">
      <h1>NoteComponent</h1>
      <h2>Title: {note.title}</h2>
      <h2>category: {note.category}</h2>
      <h2>createdAt: {note.createdAt}</h2>
      <h2>content: {note.content}</h2>
      <button onClick={() => navigate(`/notes/edit/${note.id}`)}>Edit</button>
    </div>
  );
};

export default NoteComponent;
