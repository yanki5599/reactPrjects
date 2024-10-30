import React, { FormEvent } from "react";
import "./AddImage.css";
import { Image } from "../../types/types";
import { generateId } from "../../utils";

interface AddImageProps {
  addImageFunc: (img: Image) => void;
}

const AddImage: React.FC<AddImageProps> = ({ addImageFunc }) => {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form: HTMLFormElement = e.target as HTMLFormElement;

    const newImage: Image = {
      id: generateId(),
      alt_description: form["alt_description"].value,
      user: { name: form["username"].value },
      description: "",
      likes: 0,
      urls: {
        small: form["small"].value,
        regular: form["regular"].value,
      },
    };

    addImageFunc(newImage);
  }
  return (
    <form className="AddImage" onSubmit={handleSubmit}>
      <h1>AddImage</h1>
      <input
        required
        type="text"
        name="alt_description"
        placeholder="alt description"
      />
      <input required type="text" name="small" placeholder="url for small" />
      <input
        required
        type="text"
        name="regular"
        placeholder="url for regular"
      />
      <input required type="text" name="username" placeholder="username" />
      <button type="submit">AddImage</button>
    </form>
  );
};

export default AddImage;
