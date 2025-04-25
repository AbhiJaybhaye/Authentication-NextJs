"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Eye, EyeOff } from 'lucide-react';
import Spinner from "../spinner/page";

export default function LoginPage() {

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [emailCopy, setEmailCopy] = React.useState("");
  const [showVerifyButton, setShowVerifyButton] = useState(false);

  

  const onLogin = async () => {
    try {
      toast.dismiss();
      setLoading(true);
      setEmailCopy(user.email);
      const response = await axios.post("/api/users/login", user);
      if (response.data.data.isVerified === false) {
        setLoading(false);
        setShowVerifyButton(true);
        toast.error("Please verify your email first");
        return;
      }
      setShowVerifyButton(false);
      console.log("Login successful", response.data);
      toast.success("Login successful...!!");
      router.push("/profile");
    } catch (error: any) {
      console.error("Login failed", error.message);
      toast.error("Password is Incorrect");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { email, password } = user;
    setButtonDisabled(!(email && password));
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black">Sign In</h1>
          <p className="text-sm text-gray-800 mt-2">
            Access your account to continue
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLogin();
          }}
          className="space-y-5"
        >
         
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="johnwick@example.com"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
              required
            />
          </div>

        
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="********"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
              required
            />
            <div className="absolute right-3 top-9 text-gray-600">
              {showPassword ? (
                <Eye size={18}
                  className="cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />  
              ) : (
                <EyeOff size={18}
                  className="cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />  
                )
            }
            </div>
          </div>

          
          <button
            type="submit"
            disabled={buttonDisabled || loading}
            className={`w-full py-2 font-semibold text-white rounded-lg transition duration-200 ${
              loading || buttonDisabled
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:cursor-pointer"
            }`}
          >
            {loading ? <div className="flex items-center justify-center space-x-2">
                          <Spinner />
                          <span>Logging in...</span>
                        </div> : "Log in"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-700">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-600 font-medium hover:underline">
            Sign up
          </Link>
          <div className="mt-4">
            <button
              className="w-full py-2 text-white bg-gray-700 hover:bg-gray-800 rounded-lg hover:cursor-pointer"
              onClick={() => router.push("/")}
            >
              Go to Home
            </button>
          </div>
        </div>
        {showVerifyButton && (<div>
                <p className="text-sm text-gray-900 mt-4 text-center">
                  Verify your email by clicking the below button 
                </p>
                <button
                      className="mt-3 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:cursor-pointer"
                      onClick={() => {
                        sessionStorage.setItem("userEmail", emailCopy);
                        router.push("/verifyemail");
                      }}
                    >
                      Email Verification
                </button>
              </div>)
        }
      </div>
    </div>
  );
}
