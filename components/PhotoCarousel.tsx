import React, { useState } from "react";

const PhotoCarousel = ({ images }: { images: string[] }) => {
  const [imageIndex, setImageIndex] = useState(0);
  return (
    <>
      <div>
        <div>
          <img src={images[imageIndex]} />
        </div>
        <div className="grid grid-cols-5 gap-2">
          {images.map((image) => (
            <img src={image} />
          ))}
        </div>
      </div>
    </>
  );
};

export default PhotoCarousel;
