"use client";

import { useState, useEffect } from "react";
import { verifyOtp, resendOtp, StatusCallback } from "@/lib/utils/api";
import { getCookie } from "@/lib/utils/cookies";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [isError, setIsError] = useState(false); // ⭐ ADDED for error color control
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [phone, setPhone] = useState<string | null>(null);

  // Get phone from cookie or localStorage
  useEffect(() => {
    const p = getCookie("otp_phone") || localStorage.getItem("otp_phone");
    console.log("Cookie otp_phone:", getCookie("otp_phone"));
    console.log("LocalStorage otp_phone:", localStorage.getItem("otp_phone"));
    console.log("All cookies:", document.cookie);
    setPhone(p);
  }, []);

  // Restore timer
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

  // Countdown timer
  useEffect(() => {
    if (resendTimer === 0) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  // Verify OTP
  const handleVerify = async () => {
    setLoading(true);
    setResultMessage("");

    const onStatus: StatusCallback = (s) => setStatus(s);

    const res = await verifyOtp(phone, otp, onStatus);

    if (res.success) {
      setIsError(false); // green
      setResultMessage(res.message);

      setTimeout(() => {
        window.location.href = "/en/user/profile";
      }, 1000);
    } else {
      setIsError(true); // red
      setResultMessage(res.message);
    }

    setLoading(false);
  };

  // Resend OTP
  const handleResend = async () => {
    if (!phone) return;

    setLoading(true);
    setResultMessage("");

    const onStatus: StatusCallback = (s) => setStatus(s);
    const res = await resendOtp(phone, onStatus);

    if (res.success) {
      setIsError(false);
      setResultMessage(res.message);

      const expiry = Date.now() + 30000;
      localStorage.setItem("resend_expires_at", expiry.toString());
      setResendTimer(30);
    } else {
      setIsError(true);
      setResultMessage(res.message);
    }

    setLoading(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-3">Verify OTP</h1>

      {phone ? (
        <p className="text-gray-600 mb-4">
          OTP sent to <strong>{phone}</strong>
        </p>
      ) : (
        <p className="text-red-600 mb-4">Phone number not found</p>
      )}

      <p className="text-sm text-gray-600 mb-2">Status: {status}</p>

      <input
        type="number"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />

      <button
        onClick={handleVerify}
        disabled={loading || !otp}
        className="w-full px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-400"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      <button
        onClick={handleResend}
        disabled={loading || resendTimer > 0}
        className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
      >
        {resendTimer > 0
          ? `Resend OTP in ${resendTimer}s`
          : "Resend OTP"}
      </button>

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
