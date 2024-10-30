import React from "react";
import "./ImageGrid.css";
import ImageCard from "../ImageCard/ImageCard";
import { Image } from "../../types/types";

interface ImageGridProps {
  images: Image[];
  handleLike: (imageId: string) => void;
  handleImageClick: (imageId: string) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  handleLike,
  handleImageClick,
}) => {
  return (
    <div className="ImageGrid">
      {images.map((image, idx) => (
        <ImageCard
          image={image}
          key={image.id + idx.toString()}
          handleLike={handleLike}
          handleImageClick={handleImageClick}
        />
      ))}
    </div>
  );
};

export default ImageGrid;
