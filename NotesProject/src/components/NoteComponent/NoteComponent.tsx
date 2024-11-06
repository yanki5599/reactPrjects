import React from "react";
import "./NoteComponent.css";
import { Note } from "../../types/Note";

interface NoteComponentProps {
  note: Note;
}

const NoteComponent: React.FC<NoteComponentProps> = ({ note }) => {
  return (
    <div className="NoteComponent">
      <h1>NoteComponent</h1>
      <h2>Title: {note.title}</h2>
      <h2>category: {note.category}</h2>
      <h2>createdAt: {note.createdAt}</h2>
      <h2>content: {note.content}</h2>
      <a href={`/notes/edit/${note.id}`}>Edit</a>
    </div>
  );
};

export default NoteComponent;
