"use client";

import { useEffect, useState } from "react";
import { getCookie } from "@/lib/utils/cookies";
import { logout } from "@/lib/utils/api";

export default function UserProfile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const accessToken = getCookie("access_token");
    const name = getCookie("user_name");
    const mobile = getCookie("user_mobile");

    if (!accessToken || !name || !mobile) {
      window.location.href = "/en";
      return;
    }

    setUser({ name, mobile });
  }, []);

  const handleLogout = async () => {
    await logout();
    // Force a hard reload to clear any cached state
    window.location.replace("/en/user-otp");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
      <p className="mt-2 text-gray-700">📱 Mobile: {user.mobile}</p>

      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
