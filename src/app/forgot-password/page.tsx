"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";


export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();


  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      toast.dismiss();
      if (!email) 
        return toast.error("Please enter your email");
      await axios.post("/api/users/send-otp", { email });
      console.log("OTP sent to your email");
      toast.success("OTP sent to your email");
      setStep("otp");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      toast.dismiss();
      if (!otp) 
        return toast.error("Enter the OTP");
      await axios.post("/api/users/verify-otp", { email, otp });
      toast.success("OTP verified");
      setStep("reset");
    } catch (error: any) {
      toast.error("Invalid OTP");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    toast.dismiss();
    if (!password || !confirmPassword) {
      toast.error("Please fill in both password fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await axios.post("/api/users/reset-password", { email, password });
      toast.success("Password reset successfully!");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error: any) {
      toast.error("Password reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-black">Forgot Password</h1>

        {step === "email" && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johnwick@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
            />
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 hover:cursor-pointer">
              Send OTP
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
            />
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 hover:cursor-pointer">
              Verify OTP
            </button>
          </form>
        )}

        {step === "reset" && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
              />
              <div className="absolute top-3 right-3 cursor-pointer text-gray-600" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </div>
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
              />
              <div className="absolute top-3 right-3 cursor-pointer text-gray-600" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </div>
            </div>
            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 hover:cursor-pointer">
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
