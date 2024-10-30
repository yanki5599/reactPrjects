import React from "react";
import "./ImageCard.css";
import { Image } from "../../types/types";

interface ImageCardProps {
  image: Image;
  handleLike: (imageId: string) => void;
  handleImageClick: (imageId: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  image,
  handleLike,
  handleImageClick,
}) => {
  return (
    <div className="ImageCard">
      <h2>{image.user.name}</h2>

      <img
        onClick={() => handleImageClick(image.id)}
        className="image"
        src={image.urls.regular}
        alt={image.alt_description}
        title={image.alt_description}
      ></img>

      <div className="ImageDetailsDiv">
        <h4>{image.alt_description}</h4>
        <button onClick={() => handleLike(image.id)} className="LikeBtn">
          <span>❤️</span>
          <span>{image.likes}</span>
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
