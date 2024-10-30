import React, { useEffect, useRef, useState } from "react";
import "./GalleryApp.css";
import ImageGrid from "../ImageGrid/ImageGrid";
import { fetchImages } from "../../unsplash";
import { Image } from "../../types/types";
import ErrorMsgModal from "../ErrorMsgModal/ErrorMsgModal";
import Loader from "../Loader/Loader";
import Paginator from "../Paginator/Paginator";
import ImageDetails from "../ImageDetails/ImageDetails";
import AddImage from "../AddImage/AddImage";

interface GalleryAppProps {}

const GalleryApp: React.FC<GalleryAppProps> = ({}) => {
  const [images, setImages] = useState<Image[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [currPage, setCurrPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // const selectedImageShowing = useRef<boolean>(false);

  useEffect(() => {
    if (isLoading) return;
    setIsLoading(true);

    fetchImages(currPage)
      .then((images) => setImages((prev) => [...prev, ...images]))
      .catch((err) => {
        setErrorMsg(err.message || "failed to load images");
      })
      .finally(() => {
        setIsLoading(false);
      });
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

  function nextPage(): void {
    setCurrPage((prev) => prev + 1);
  }

  function prevPage(): void {
    setCurrPage((prev) => (prev > 1 ? prev - 1 : 1));
  }

  function handleImageClick(imageId: string) {
    setSelectedImage(images.find((i) => i.id === imageId) || null);
  }

  function closeImageDetails() {
    setSelectedImage(null);
  }

  function shiftSelectedImage(step: number) {
    const idx = images.findIndex((img) => img.id === selectedImage?.id);

    if (idx == null || idx + step >= images.length || idx + step < 0) {
      return;
    }

    setSelectedImage(images[idx + step]);
  }

  function addImage(img: Image): void {
    setImages((prev) => [...prev, img]);
  }
  return (
    <div className="GalleryApp">
      <header className="GalleryHeader">
        <h1>GalleryApp Component</h1>
      </header>
      {
        <main className="GalleryMain">
          <AddImage addImageFunc={addImage} />
          {errorMsg && <ErrorMsgModal errorMsg={errorMsg} />}
          {!errorMsg && (
            <ImageGrid
              images={images}
              handleLike={handleLike}
              handleImageClick={handleImageClick}
            />
          )}
          {isLoading && <Loader />}
          <Paginator
            currPage={currPage}
            nextPageFunc={nextPage}
            prevPageFunc={prevPage}
          />
        </main>
      }
      {selectedImage && (
        <ImageDetails
          handleLike={handleLike}
          image={selectedImage}
          handleClose={closeImageDetails}
          nextImage={() => shiftSelectedImage(1)}
          prevImage={() => shiftSelectedImage(-1)}
        />
      )}
    </div>
  );
};

export default GalleryApp;
