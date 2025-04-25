"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ShieldCheck } from "lucide-react";

export default function VerifyEmail() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      router.push("/");
    }
  }, [router]);

  const handleSendOtp = async () => {
    toast.dismiss();
    setErrorMessage("");

    try {
      setIsLoading(true);
      const res = await axios.post("/api/users/send-otp", { email });

      if (res.data.success) {
        toast.success("OTP sent to your email.");
        setIsOtpSent(true);
      } else {
        toast.error("Failed to send OTP.");
        setErrorMessage("Failed to send OTP. Try again.");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error =
        err.response?.data?.error ||
        "Failed to send OTP. Please try again later.";
      setErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    toast.dismiss();
    if (!otp.trim()) {
      setErrorMessage("Please enter the OTP sent to your email.");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");

      const res = await axios.post("/api/users/verifyemail", { email, otp });

      if (res.data.success) {
        toast.success("Email verified successfully!");
        setIsVerified(true);
        sessionStorage.removeItem("userEmail");
        setOtp("");
      } else {
        toast.error("Invalid OTP. Please try again.");
        setErrorMessage("Invalid OTP. Please try again.");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error =
        err.response?.data?.error ||
        "Verification failed. Please try again later.";
      setErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Email Verification
        </h1>

        <p className="text-gray-600 text-center mb-4">
          We&apos;ll send a One-Time Password (OTP) to: <br />
          <span className="font-semibold underline">{email}</span>
        </p>

        {!isVerified ? (
          <>
            {!isOtpSent ? (
              <button
                onClick={handleSendOtp}
                disabled={isLoading}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300 ${
                  isLoading
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:cursor-pointer"
                }`}
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </button>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="text-black w-full p-3 border-2 border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={isLoading}
                  maxLength={6}
                />

                <button
                  onClick={handleVerify}
                  disabled={isLoading}
                  className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition duration-300 ${
                    isLoading
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:cursor-pointer"
                  }`}
                >
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </button>
              </>
            )}

            {errorMessage && (
              <p className="mt-4 text-semibold text-center text-red-600">
                {errorMessage}
              </p>
            )}
          </>
        ) : (
          <div className="mt-6 text-center flex flex-col items-center justify-center">
            <p className="text-lg text-green-700 font-medium mb-2">
              Your email has been successfully verified!
            </p>
            <ShieldCheck size={32} className="text-green-700" />
            <button
              onClick={() => router.push("/login")}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition duration-300 hover:cursor-pointer"
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
