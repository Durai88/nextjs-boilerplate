"use client";

import { useState } from "react";
import { triggerOtp } from "@/lib/utils/api";

export default function AboutPage() {
  const [status, setStatus] = useState("");

  const handleSendOtp = async () => {
    await triggerOtp("+911234567890", (s) => setStatus(s));
  };

  return (
     <div className="p-10">
     

      <div className="alert alert-warning mt-5">
        About Us
      </div>
    </div>
    
    
  );
}

