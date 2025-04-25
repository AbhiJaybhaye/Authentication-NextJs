"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState<{
    email: string; username: string; _id: string 
  } | "nothing">("nothing");
  const [Details, setDetails] = useState(false);

  const logout = async () => {
    try {
      toast.dismiss();
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      toast.dismiss();
      const res = await axios.get("/api/users/me");
      if (!Details) {
        setData(res.data.data);
        setDetails(true);
      } else {
        setDetails(false);
        setData("nothing");
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-10 px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          {data === "nothing" ? "Profile Page" : "User Details"}
        </h1>
        <hr className="border-gray-300" />
        
        {data !== "nothing" && (
          <div className="bg-yellow-100 p-4 rounded-xl space-y-2 text-gray-800">
            <p><span className="font-semibold">Name:</span> {data.username}</p>
            <p><span className="font-semibold">Email:</span> {data.email}</p>
            <p><span className="font-semibold">User ID:</span> {data._id}</p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <button
            onClick={logout}
            className="hover:cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition-all duration-200"
          >
            Log out
          </button>

          <button
            onClick={getUserDetails}
            className=" hover:cursor-pointer w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-xl transition-all duration-200"
          >
            {Details ? "Hide my Details" : "Get my Details"}
          </button>
        </div>
      </div>
    </div>
  );
}
