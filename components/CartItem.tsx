import Link from "next/link";
import React from "react";
import {
  Product,
  removeFromCart,
  ShoppingCartItem,
} from "../redux/cart/cartSlice";
import { useAppDispatch } from "../redux/hooks";

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
        <div>{`$${item.product.price}`}</div>
        <div>{`In Cart: ${item.count}`}</div>
      </div>
      <img src={item.product.imageLink[0]} />
      <div>{item.product.description}</div>
      <div>{item.product.seller}</div>
    </>
  );
};

export default CartItem;
