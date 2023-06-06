import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { EmailPasswordRegister } from "../firebase/clientApp";

const register = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <>
      <Head>
        <title>Register for Store</title>
      </Head>
      <Navbar />
      <div className="grid place-items-center min-h-screen">
        <div className="w-1/3">
          <h1 className="text-2xl font-bold">Register for Store</h1>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (password != confirmPassword) {
                alert("Mismatching passwords!");
              }
              await EmailPasswordRegister(name, email, password);
              router.push("/login");
            }}
            className="flex flex-col gap-4"
          >
            <label>Name</label>
            <input
              className="outline outline-slate-400 pl-1"
              type="text"
              required
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
            />
            <label>Email</label>
            <input
              className="outline outline-slate-400 pl-1"
              type="text"
              placeholder="johndoe@email.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="outline outline-slate-400 pl-1"
              type="password"
              required
              placeholder="********"
            />
            <label>Confirm Password</label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="outline outline-slate-400 pl-1"
              type="password"
              required
              placeholder="********"
            />
            <button className="bg-violet-500 font-bold text-white py-2 hover:bg-violet-500/90 hover:shadow-xl">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default register;
