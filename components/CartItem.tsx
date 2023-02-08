import Link from "next/link";
import React from "react";
import {
  Product,
  removeFromCart,
  ShoppingCartItem,
} from "../redux/cart/cartSlice";
import { useAppDispatch } from "../redux/hooks";
import { BsDot } from "react-icons/bs";

const CartItem = ({ item }: { item: ShoppingCartItem }) => {
  const dispatch = useAppDispatch();
  console.log(item);
  return (
    <>
      <div
        className="w-fit cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          dispatch(removeFromCart(item.product));
        }}
      >
        X
      </div>
      <div className="flex justify-between">
        <a className="underline">
          <Link href={`/products/${item.product.productid}`}>
            {item.product.productName}
          </Link>
        </a>
        <div className="flex">
          <div>{`$${item.product.price}`}</div>
          <div className="text-xs translate-y-1">{"/item"}</div>
        </div>
      </div>
      <div className="flex gap-2 align-middle">
        <div>{`In Cart: ${item.count}`}</div>
        <BsDot className="translate-y-1" />
        <div className="text-blue-600 font-semibold text-xs translate-y-1">
          {item.product.seller}
        </div>
      </div>
      <div className="flex gap-5">
        <img
          className="aspect-square object-cover w-[30%]"
          src={item.product.imageLink[0]}
        />
        <div>
          <div>{item.product.description}</div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
