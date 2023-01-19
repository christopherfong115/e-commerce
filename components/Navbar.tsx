import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../firebase/clientApp";

const paths = [
  ["Mens", "/mens"],
  ["Women", "/women"],
  ["Children", "/children"],
];

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <nav className="relative justify-between flex px-10 items-center font-bold p-5">
      <div className="relative hover:text-red-400">
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
            title={user.displayName!}
            onClick={(e) => logout()}
            className="hover:text-emerald-500 cursor-pointer"
          >
            Logout
          </li>
        ) : (
          <li className="hover:text-emerald-500">
            <Link href="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
