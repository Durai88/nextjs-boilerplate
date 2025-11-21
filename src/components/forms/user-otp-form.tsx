"use client";

import { useState, useEffect } from "react";
import { triggerOtp, resendOtp, StatusCallback } from "@/lib/utils/api";
import { userOtpSchema } from "@/lib/schemas/user-otp.schema";

export default function UserOtpPage() {
  const [phone, setPhone] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [isError, setIsError] = useState(false); // ✅ FIXED for red messages
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  // -------------------------------
  // Restore timer on page load
  // -------------------------------
  useEffect(() => {
    const storedExpiry = localStorage.getItem("resend_expires_at");

    if (storedExpiry) {
      const expiry = parseInt(storedExpiry, 10);
      const now = Date.now();

      if (expiry > now) {
        const remaining = Math.floor((expiry - now) / 1000);
        setResendTimer(remaining);
      } else {
        localStorage.removeItem("resend_expires_at");
      }
    }
  }, []);

  // -------------------------------
  // Timer countdown effect
  // -------------------------------
  useEffect(() => {
    if (resendTimer === 0) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  // -------------------------------
  // API status callback
  // -------------------------------
  const statusCallback: StatusCallback = (value) => {
    setStatus(value);
  };

  // -------------------------------
  // SEND OTP
  // -------------------------------
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setResultMessage("");

    // Validate phone
    const validation = userOtpSchema.safeParse({ phone });

    if (!validation.success) {
      const firstError =
        validation.error?.issues?.[0]?.message || "Invalid phone number";

      setIsError(true);           // ❌ error message = red
      setResultMessage(firstError);
      return;
    }

    setLoading(true);

    const res = await triggerOtp(phone, statusCallback);

    if (res.success) {
      setIsError(false);          // ✅ success = green
      setResultMessage(res.message);

      // Start & store cooldown timer
      const expiry = Date.now() + 30000; // 30 sec
      localStorage.setItem("resend_expires_at", expiry.toString());
      setResendTimer(30);
    } else {
      setIsError(true);
      setResultMessage(res.message);
    }

    setLoading(false);
  };

  // -------------------------------
  // RESEND OTP
  // -------------------------------
  const handleResend = async () => {
    if (!phone) return;

    setLoading(true);
    setResultMessage("");

    const res = await resendOtp(phone, statusCallback);

    if (res.success) {
      setIsError(false);
      setResultMessage(res.message);

      const expiry = Date.now() + 30000; // 30 sec
      localStorage.setItem("resend_expires_at", expiry.toString());
      setResendTimer(30);
    } else {
      setIsError(true);
      setResultMessage(res.message);
    }

    setLoading(false);
  };

  // -------------------------------
  // UI
  // -------------------------------
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Enter Mobile Number</h1>

      {/* PHONE INPUT */}
      <form onSubmit={handleSendOtp}>
        <input
          type="number"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>

    

      {/* RESULT MESSAGE */}
      {resultMessage && (
        <p
          className={`mt-3 font-medium ${
            isError ? "text-red-600" : "text-green-600"
          }`}
        >
          {resultMessage}
        </p>
      )}
    </div>
  );
}
