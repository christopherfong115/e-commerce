import Link from "next/link";
import React from "react";
import { Product, removeFromCart } from "../redux/cart/cartSlice";
import { useAppDispatch } from "../redux/hooks";

const CartItem = ({ item }: { item: Product }) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <div
        className="w-fit cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          dispatch(removeFromCart(item));
        }}
      >
        X
      </div>
      <div className="flex justify-between">
        <a className="underline">
          <Link href={`/products/${item.productid}`}>{item.productName}</Link>
        </a>
        <div>{`$${item.price}`}</div>
      </div>
      <img src={item.imageLink[0]} />
      <div>{item.description}</div>
      <div>{item.seller}</div>
    </>
  );
};

export default CartItem;
