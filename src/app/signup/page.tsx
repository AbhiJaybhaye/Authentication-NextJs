"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Eye, EyeOff } from 'lucide-react';
import Spinner from "../spinner/page";

export default function SignupPage() {

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [showConfirmPasswordField, setShowConfirmPasswordField] = React.useState(false);
  

  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [confirmPassword, setConfirmPassword] = React.useState(""); 
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [accountCreated, setAccountCreated] = React.useState(false);
  const [emailCopy, setEmailCopy] = React.useState("");

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isValidEmail(e.target.value)) {
      setButtonDisabled(true); 
    } else if (!user.password || !user.username) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };

  const onSignup = async () => {
    try {
      toast.dismiss();
      if (!user.email || !user.password || !user.username || !confirmPassword ) {
        toast.error("Please fill in all the fields");
        return;
      }

      if (user.password !== confirmPassword) {
        toast.error("Passwords do not match");  
        return;
      };

      setLoading(true);

      const response = await axios.post("/api/users/signup", user);
      console.log("Account created successfully", response.data);

      toast.success("Account created successfully...!!");
      setAccountCreated(true);

      setEmailCopy(user.email);
      setUser({ email: "", password: "", username: "" });
      setConfirmPassword("");

    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error("Signup failed, User already exists");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { email, password, username } = user;
    setButtonDisabled(!(email && password && username));
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black">Sign Up</h1>
          <p className="text-sm text-gray-800 mt-2">
            Create a new account to get started
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSignup();
          }}
          className="space-y-5"
        >
         
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="John Wick"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
              required
            />
          </div>

          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => {setUser({ ...user, email: e.target.value });
                                 handleEmailChange(e)}}
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
              onChange={(e) => {setUser({ ...user, password: e.target.value });
                                {
                                  if (e.target.value.length > 0) {
                                    setShowConfirmPasswordField(true);
                                  }
                                }
                               }}
              placeholder="Password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
              required
            />
            <div className="absolute right-2 top-6 text-gray-600">
              {showPassword ? (
                <Eye size={18}
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <EyeOff size={18}  
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={()=> setShowPassword(!showPassword)}
                  />
              )}   
            </div>
          </div>

          {showConfirmPasswordField && <div className="relative">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
                  required
                />
                <div className="absolute right-2 top-6 text-gray-600">
                  {showConfirmPassword ? (
                    <Eye size={18}
                      className="absolute right-3 top-3 cursor-pointer"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                  ) : (
                    <EyeOff size={18}  
                      className="absolute right-3 top-3 cursor-pointer"
                      onClick={()=> setShowConfirmPassword(!showConfirmPassword)} 
                      />
                  )}   
                </div>
              </div>
          }

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
                          <span>Creating Account...</span>
                        </div> : "Sign up"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-700">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-medium hover:underline">
            Log in
          </Link>
          <br />
          <Link href="/forgot-password" className="text-blue-600 font-medium hover:underline">
              Forgot Password?
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

        {accountCreated && !loading && (
          <div className="mt-6 text-center">
            <p className="text-green-700 font-medium">
              Account created successfully, please verify your email.
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
          </div>
        )}
      </div>
    </div>
  );
}
