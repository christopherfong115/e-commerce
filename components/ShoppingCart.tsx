import React from "react";
import { removeFromCart } from "../redux/cart/cartSlice";
import { useAppSelector } from "../redux/hooks";
import CartItem from "./CartItem";

const ShoppingCart = () => {
  const { cart } = useAppSelector((state) => state.cart);
  return (
    <>
      <div className="absolute bg-indigo-500 max-h-[600px] overflow-y-scroll w-[450px] p-5 right-0 translate-y-3 z-50">
        {cart.length != 0 ? (
          <ul>
            {cart.map((product) => (
              <li
                className="bg-amber-100 mb-4 p-4"
                key={product.product.productid}
              >
                <CartItem item={product} />
              </li>
            ))}
          </ul>
        ) : (
          <div>Empty Cart.</div>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;
