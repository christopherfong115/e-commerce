import React, { useState } from "react";

const PhotoCarousel = ({ images }: { images: string[] }) => {
  const [imageIndex, setImageIndex] = useState(0);
  return (
    <>
      <div>
        <div className="min-w-[300px] h-[500px] grid items-center justify-items-center aspect-square bg-slate-200 pb-2">
          <img className="max-h-[500px]" src={images[imageIndex]} />
        </div>
        <div className="grid grid-cols-5 gap-2 pt-2 max-w-[300px]">
          {images.map((image, ind) => (
            <div
              data-index={ind}
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setImageIndex(ind);
              }}
            >
              <img src={image} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PhotoCarousel;
