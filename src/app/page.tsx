import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white px-4">
      <h1 className="text-3xl sm:text-6xl font-extrabold text-center mb-6 bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-300 text-transparent bg-clip-text">
        Welcome to Authentication System
      </h1>
      
      <p className="text-lg sm:text-2xl text-center text-white/80 font-medium max-w-2xl mb-10">
        &quot;Securely login or create a new account to access personalized features and services&quot;
      </p>

      <div className="flex flex-col sm:flex-row gap-6">
        <Link href="/login">
          <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-indigo-700 transition duration-300 hover:cursor-pointer">
            Log in
          </button>
        </Link>
        
        <Link href="/signup">
          <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-indigo-700 transition duration-300 hover:cursor-pointer">
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
}
