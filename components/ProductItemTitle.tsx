import React from "react";

const ProductItemTitle = ({ productName }: { productName: string }) => {
  return (
    <>
      <div className="w-full mx-auto h-1 bg-black" />
      <h1 className="text-2xl font-extrabold text-center">{productName}</h1>
      <div className="w-full mx-auto h-1 bg-black" />
    </>
  );
};

export default ProductItemTitle;
