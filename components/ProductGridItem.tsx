import React from "react";
import { addToCart, Product } from "../redux/cart/cartSlice";
import { useAppDispatch } from "../redux/hooks";
import { motion } from "framer-motion";

const ProductGridItem = ({ item }: { item: Product }) => {
  const dispatch = useAppDispatch();
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="p-2 text-center w-fit h-[100%] outline outline-slate-600"
    >
      <img
        className="aspect-square object-cover transition hover:duration-150 hover:object-contain"
        src={item.imageLink[0]}
      />
      <div
        className="w-fit cursor-pointer mx-auto"
        onClick={(e) => {
          e.preventDefault();
          dispatch(addToCart(item));
        }}
      >
        +
      </div>
      <div>{item.productName}</div>
      <div>{item.seller}</div>
      <div>{`$${item.price}`}</div>
    </motion.div>
  );
};

export default ProductGridItem;
