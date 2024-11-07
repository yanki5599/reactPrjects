import React, { useEffect, useState } from "react";
import "./EditNotePage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { updateNote } from "../../store/features/notes/notesSlice";
import { Category, Note } from "../../types/Note";
import useForm from "../../hooks/useForm";

const EditNotePage: React.FC = () => {
  const { id } = useParams();
  const { notes } = useSelector((state: RootState) => state.notes);

  const [currNote, setCurrNote] = useState<Note | undefined>(
    notes.find((n) => n.id === id)
  );
  const navigate = useNavigate();

  useEffect(() => {
    const curr = notes.find((n) => n.id === id);
    if (!curr) navigate("/notfound");
    else {
      setCurrNote(curr);
    }
  }, []);

  const dispatch = useDispatch();

  function onSubmit(note: { [key: string]: string }) {
    dispatch(
      updateNote({
        note: {
          ...note,
          id: currNote?.id,
          createdAt: currNote?.createdAt,
        } as Note,
      })
    );
    resetForm();
    navigate("/notes");
  }

  const initialValue = { ...currNote };
  const { formValues, handleChange, handleSubmit, resetForm } = useForm(
    initialValue,
    onSubmit
  );

  return (
    <div className="EditNotePage Page">
      <h1>EditNotePage Component</h1>

      <form onSubmit={handleSubmit}>
        <input
          required
          placeholder="title"
          onChange={handleChange}
          value={formValues.title}
          type="text"
          name="title"
        />
        <input
          required
          placeholder="content"
          onChange={handleChange}
          value={formValues.content}
          type="text"
          name="content"
        />
        <select
          required
          onChange={handleChange}
          value={formValues.category}
          name="category"
        >
          {Object.keys(Category).map((k) => (
            <option value={k}>{k}</option>
          ))}
        </select>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditNotePage;
