import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { sendPasswordReset } from "../firebase/clientApp";

const passwordReset = () => {
  const [email, setEmail] = useState("");
  return (
    <>
      <Head>
        <title>Reset Password | Store</title>
      </Head>
      <div className="grid place-items-center min-h-screen">
        <div className="w-1/3 bg-pink-300 p-6">
          <a className="text-white font-semibold">
            <Link href="/login">Back</Link>
          </a>
          <h1 className="font-bold text-white text-2xl py-2">Reset Password</h1>
          <div>
            If you have forgotten your password reset it here by entering your
            email address. You will receive an email, follow the instructions.
            Check spam folder if it doesn't appear in your inbox.
          </div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await sendPasswordReset(email);
            }}
            className="flex flex-col gap-4"
          >
            <label>Email Address:</label>
            <input
              className="outline outline-slate-300 pl-2"
              type="text"
              placeholder="johndoe@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="text-white w-fit py-2 px-3 bg-black font-bold rounded-2xl">
              Send Reset
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default passwordReset;
