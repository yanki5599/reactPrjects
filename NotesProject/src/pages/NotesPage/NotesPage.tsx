import React from "react";
import "./NotesPage.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import NoteComponent from "../../components/NoteComponent/NoteComponent";

interface NotesPageProps {}

const NotesPage: React.FC<NotesPageProps> = ({}) => {
  const { notes, activeCategory } = useSelector(
    (state: RootState) => state.notes
  );

  return (
    <div className="NotesPage Page">
      <h1>NotesPage</h1>
      <ul>
        {notes.map((note) => (
          <NoteComponent key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
};

export default NotesPage;
