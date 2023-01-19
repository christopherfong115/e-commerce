import Head from "next/head";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import {
  auth,
  EmailPasswordLogin,
  signInWithGoogle,
} from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import Link from "next/link";

const login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState<any>();
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (user) {
    router.push("/");
  }
  return (
    <>
      <Head>
        <title>Sign Up | Store</title>
      </Head>
      <Navbar />
      <div className="grid place-items-center min-h-[calc(100vh_-_8rem)]">
        <div className="w-1/3">
          <div className="w-fit mb-3">
            <div className="text-2xl font-bold">Login to Store</div>
            <motion.div className="w-full h-1 bg-indigo-500"></motion.div>
          </div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!email || !password) {
                setLoginErr("Missing password or email.");
                return;
              } else {
                const res = await EmailPasswordLogin(email, password);
                // dispatch(userLoggedIn())
                if (res) {
                  setLoginErr(res);
                  console.log(res);
                }
              }
            }}
            className="flex flex-col gap-4"
          >
            <label>Email:</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="py-1 pl-1 outline outline-slate-200"
              type="text"
              placeholder="email@gmail.com"
            />
            <label>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="py-1 pl-1 outline outline-slate-200"
              type="password"
              placeholder="******"
            />
            <button className="hover:shadow-lg font-bold text-white uppercase bg-indigo-400 py-3">
              Login
            </button>
            <button
              onClick={async (e) => {
                e.preventDefault();
                const res = await signInWithGoogle();
              }}
              className="outline outline-gray-100 hover:shadow-lg py-2"
            >
              <img
                className="aspect-square w-7 mx-auto"
                src={"/GoogleImg.png"}
              />
            </button>
          </form>
          <div className="mt-2 flex justify-between text-gray-400">
            <div className="">
              Forgot your password?{" "}
              <a className="text-blue-600 hover:text-blue-400 underline">
                <Link href="/passwordReset">Reset Password</Link>
              </a>
            </div>
            <div className="">
              Don't have an account?{" "}
              <a className="text-blue-600 hover:text-blue-400 underline">
                <Link href="/register">Register</Link>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default login;
