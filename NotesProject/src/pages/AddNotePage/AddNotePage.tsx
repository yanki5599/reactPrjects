import React from "react";
import "./AddNotePage.css";
import useForm, { FormValues } from "../../hooks/useForm";
import { addNote } from "../../store/features/notes/notesSlice";
import { Category, Note } from "../../types/Note";
import { useDispatch } from "react-redux";

const AddNotePage: React.FC = () => {
  const dispatch = useDispatch();

  function onSubmit(note: { [key: string]: string }) {
    dispatch(
      addNote({
        note: {
          ...note,
          id: Date.now().toString(),
          createdAt: new Date().toLocaleString(),
        } as Note,
      })
    );
    resetForm();
  }

  const initialValue = {
    category: Category.Personal,
    content: "",
    title: "",
  };
  const { formValues, handleChange, handleSubmit, resetForm } = useForm(
    initialValue,
    onSubmit
  );

  return (
    <div className="AddNotePage Page">
      <h1>AddNotePage Component</h1>

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
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddNotePage;
