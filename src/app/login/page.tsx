"use client";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 space-y-6 border border-white/20">
        <h1 className="text-3xl font-semibold text-white text-center">
          Welcome Back
        </h1>
        <p className="text-gray-300 text-center">
          Sign in with your GitHub or UAE Pass <br></br>
          account to continue
        </p>
        <button
          className="w-full bg-white text-black hover:cursor-pointer py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          onClick={() =>
            signIn("github", {
              callbackUrl: "http://localhost:3001/dashboard",
            })
          }
        >
          Login with GitHub
        </button>
        <button
          className="w-full bg-blue-500 text-white py-3 hover:cursor-pointer rounded-lg font-semibold hover:bg-blue-600 transition"
          onClick={() =>
            signIn("uaepass", {
              callbackUrl: "http://localhost:3001/dashboard",
            })
          }
        >
          Login with UAE Pass
        </button>
      </div>
    </div>
  );
}
