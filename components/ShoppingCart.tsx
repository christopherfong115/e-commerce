import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import CartItem from "./CartItem";

const ShoppingCart = ({
  menuStatus,
  setStatus,
}: {
  menuStatus: boolean;
  setStatus: Dispatch<SetStateAction<boolean>>;
}) => {
  const { cart } = useAppSelector((state) => state.cart);
  console.log(menuStatus);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let temp = 0;
    for (let i = 0; i < cart.length; i++) {
      let sumItem = cart[i].count * cart[i].product.price;
      temp += sumItem;
    }
    setTotal(temp);
  }, [cart]);

  return (
    <>
      {menuStatus ? (
        <>
          <div
            onClick={(e) => {
              e.preventDefault();
              setStatus(!menuStatus);
            }}
            className="fixed overflow-hidden bg-black/75 bg-opacity-75 z-30 h-screen w-screen"
          ></div>
          <div className="absolute bg-white h-full overflow-y-scroll w-[700px] p-5 right-0 z-50 ">
            {cart.length != 0 ? (
              <div>
                <ul className="flex flex-col gap-2">
                  {cart.map((product) => (
                    <li className="" key={product.product.productid}>
                      <CartItem item={product} />
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex justify-between">
                  <div className="font-bold">{`Cart Total: $${total}`}</div>
                  <button className="bg-purple-300 py-1 px-2 rounded-2xl font-bold text-white">
                    Pay now
                  </button>
                </div>
              </div>
            ) : (
              <div>Empty Cart.</div>
            )}
          </div>
        </>
      ) : null}
    </>
  );
};

export default ShoppingCart;
