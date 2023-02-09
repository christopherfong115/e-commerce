import Link from "next/link";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../firebase/clientApp";
import { FiShoppingCart } from "react-icons/fi";
import ShoppingCart from "./ShoppingCart";
import { RxTriangleDown } from "react-icons/rx";
import LoginDropDown from "./LoginDropDown";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const paths = [
  ["Mens", "/mens"],
  ["Women", "/women"],
  ["Children", "/children"],
];

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginDrop, setLoginDrop] = useState(false);
  return (
    <>
      <div>
        {cartOpen ? (
          <ShoppingCart menuStatus={cartOpen} setStatus={setCartOpen} />
        ) : null}
        <nav className="relative justify-between flex px-10 items-center font-bold p-5">
          <div className="relative tracking-widest hover:text-red-400">
            <Link href="/">STORE</Link>
          </div>
          <ul className="flex gap-8">
            {paths.map((path) => (
              <li className="hover:text-blue-400" key={path[1]}>
                <Link href={path[1]}>{path[0]}</Link>
              </li>
            ))}
            <li className="hover:text-violet-500">
              <Link href="/featured">Featured</Link>
            </li>
            {user ? (
              <li
                title={user.email!}
                onClick={(e) => {
                  e.preventDefault();
                  setCartOpen(false);
                  setLoginDrop(!loginDrop);
                }}
                className="cursor-pointer relative"
              >
                <div className="hover:text-emerald-500 flex">
                  <div>Logout</div>
                  <RxTriangleDown className="translate-y-1" />
                </div>
                {loginDrop ? <LoginDropDown user={user.email!} /> : null}
              </li>
            ) : (
              <li className="hover:text-emerald-500">
                <Link href="/login">Login</Link>
              </li>
            )}
            <li className="relative">
              <FiShoppingCart
                onClick={(e) => {
                  setLoginDrop(false);
                  setCartOpen(!cartOpen);
                  console.log(cartOpen);
                }}
                className="translate-y-1 cursor-pointer text-xl hover:text-amber-700"
              />
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
