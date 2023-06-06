import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import CartItem from "./CartItem";
import { motion } from "framer-motion";

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

  // Framer motion
  const cartAnimate = {
    hidden: { x: 500 },
    show: {
      x: 0,
      transition: {
        staggerChildren: 0.1,
        ease: "easeIn",
        when: "beforeChildren",
        duration: 0.5,
      },
    },
  };

  const cartItemsAnimate = {
    hidden: { filter: "blur(3px)", y: 50 },
    show: {
      filter: "blur(0px)",
      y: 0,
    },
  };

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
          <motion.div
            variants={cartAnimate}
            animate="show"
            initial="hidden"
            transition={{ ease: "easeIn", duration: 1 }}
            className="fixed bg-white h-full overflow-y-scroll w-[700px] p-5 right-0 z-50 "
          >
            {cart.length != 0 ? (
              <motion.div>
                <ul className="flex flex-col gap-2">
                  {cart.map((product) => (
                    <motion.li
                      variants={cartItemsAnimate}
                      className=""
                      key={product.product.productid}
                    >
                      <CartItem item={product} />
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-2 flex justify-between">
                  <div className="font-bold">{`Cart Total: $${total}`}</div>
                  <button className="bg-purple-300 py-1 px-2 rounded-2xl font-bold text-white">
                    Pay now
                  </button>
                </div>
              </motion.div>
            ) : (
              <div>Empty Cart.</div>
            )}
          </motion.div>
        </>
      ) : null}
    </>
  );
};

export default ShoppingCart;
