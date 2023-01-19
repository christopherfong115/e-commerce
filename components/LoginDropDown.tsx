import React from "react";
import { logout } from "../firebase/clientApp";

const LoginDropDown = ({ user }: { user: string }) => {
  return (
    <div className="flex flex-col max-w-10 bg-gray-500 absolute z-50 p-2 right-0">
      <div className="hover:text-violet-400">You are logged in as, {user}</div>
      <div className="h-1 bg-black w-full"></div>
      <div className="hover:text-amber-200" onClick={(e) => logout()}>
        Logout
      </div>
    </div>
  );
};

export default LoginDropDown;
