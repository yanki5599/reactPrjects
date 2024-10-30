import React, { useEffect, useState } from "react";
import "./GalleryApp.css";
import ImageGrid from "../ImageGrid/ImageGrid";
import { fetchImages } from "../../unsplash";
import { Image } from "../../types/types";
import ErrorMsgModal from "../ErrorMsgModal/ErrorMsgModal";

interface GalleryAppProps {}

const GalleryApp: React.FC<GalleryAppProps> = ({}) => {
  const [images, setImages] = useState<Image[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [currPage, setCurrPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    setIsLoading(true);
    fetchImages(currPage)
      .then((images) => {
        setImages((prev) => [...prev, ...images]);
        setIsLoading(false);
      })
      .catch((err) => setErrorMsg(err.message || "failed to load images"));
  }, [currPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop <
      document.documentElement.offsetHeight - 100
    ) {
      return;
    }
    nextPage();
  };

  const handleLike = (imageId: string) => {
    const tempImages = [...images];
    const changeObj = tempImages.find((img) => img.id === imageId);
    if (changeObj) changeObj.likes += 1;
    setImages(tempImages);
  };

  function nextPage() {
    setCurrPage((prev) => prev + 1);
  }

  function prevPage() {
    setCurrPage((prev) => (prev > 1 ? prev - 1 : 1));
  }

  function handleImageClick(imageId: string) {
    setSelectedImage(images.find((i) => i.id === imageId) || null);
  }

  return (
    <div className="GalleryApp">
      <header className="GalleryHeader">
        <h1>GalleryApp Component</h1>
      </header>
      <main className="GalleryMain">
        {errorMsg && <ErrorMsgModal errorMsg={errorMsg} />}
        <ImageGrid
          images={images}
          handleLike={handleLike}
          handleImageClick={handleImageClick}
        />
        <button onClick={prevPage}>⏪</button>
        <label>{currPage}</label>
        <button onClick={nextPage}>⏩</button>
      </main>
    </div>
  );
};

export default GalleryApp;
