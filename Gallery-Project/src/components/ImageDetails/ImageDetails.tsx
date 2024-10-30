import React, { useEffect, useRef } from "react";
import "./ImageDetails.css";
import { Image } from "../../types/types";

interface ImageDetailsProps {
  image: Image;
  handleClose: () => void;
  nextImage: () => void;
  prevImage: () => void;
  handleLike: (id: string) => void;
}

const ImageDetails: React.FC<ImageDetailsProps> = ({
  image,
  handleClose,
  handleLike,
  nextImage,
  prevImage,
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") handleClose();
    else if (e.key === "ArrowLeft") prevImage();
    else if (e.key === "ArrowRight") nextImage();
  };

  function handleClick(e: MouseEvent) {
    if (divRef.current && !divRef.current.contains(e.target as Node))
      handleClose();
  }

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClick);
    };
  });

  return (
    <div className="ImageDetails" ref={divRef}>
      <h2>{image.user.name}</h2>

      <img
        className="image"
        src={image.urls.regular}
        alt={image.alt_description}
        title={image.alt_description}
      ></img>
      <h2>{image.alt_description}</h2>
      <button onClick={() => handleLike(image.id)} className="LikeBtn">
        <span>❤️</span>
        <span>{image.likes}</span>
      </button>
      <button onClick={handleClose}>Close Details</button>
    </div>
  );
};

export default ImageDetails;
