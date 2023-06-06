import React from "react";
import { Product } from "../redux/cart/cartSlice";
import ProductGridItem from "./ProductGridItem";

const ProductGrid = ({ items }: { items: Product[] }) => {
  return (
    <>
      <div className="grid grid-cols-5 p-5 gap-4 overflow-y-hidden">
        {items.map((item) => (
          <ProductGridItem item={item} />
        ))}
      </div>
    </>
  );
};

export default ProductGrid;
