import React from "react";
import { addToCart, Product } from "../redux/cart/cartSlice";
import { useAppDispatch } from "../redux/hooks";
import { motion } from "framer-motion";
import Link from "next/link";
import { MdAddShoppingCart } from "react-icons/md";
import { BsDot } from "react-icons/bs";

const ProductGridItem = ({ item }: { item: Product }) => {
  const dispatch = useAppDispatch();
  return (
    <Link href={`/products/${item.productid}`}>
      <motion.div className="p-2 w-fit h-[100%] outline outline-slate-600 bg-slate-200">
        <img
          className="aspect-square object-cover transition hover:duration-150 hover:object-contain"
          src={item.imageLink[0]}
        />

        <div className="flex justify-between items-center py-2">
          <div className="underline font-bold hover:text-amber-400">
            {item.productName}
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileInView={{ scale: 0.9 }}
            className="w-10 grid justify-items-center aspect-video hover:text-amber-400 text-slate-200 bg-sky-600 cursor-pointer rounded-2xl p-2"
            onClick={(e) => {
              e.preventDefault();
              const itemToCart = {
                product: item,
                count: 1,
              };
              dispatch(addToCart(item));
            }}
          >
            <MdAddShoppingCart className="" />
          </motion.div>
        </div>
        <div className="flex flex-row items-center justify-between text-sm gap-1">
          <div className="text-slate-600 p-1 px-2 -translate-x-2 -translate-y-5 font-bold rounded-xl">
            {item.seller}
          </div>
          {/* <BsDot /> */}
          <div className="bg-sky-800 text-gray-200 text-base px-2 p-1 rounded-xl">{`$${item.price}`}</div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductGridItem;
