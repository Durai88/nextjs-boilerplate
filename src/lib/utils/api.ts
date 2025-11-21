import axios, { AxiosError } from "axios";
import { setCookie, getCookie, deleteClientCookie } from "./cookies";


const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export type StatusCallback = (
  status: "started" | "sending_otp" | "otp_sent" | "error"
) => void;

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}
// Trigger otp api call
export async function triggerOtp(
  phone: string,
  onStatus?: StatusCallback
): Promise<ApiResponse> {
  try {
    onStatus?.("started");
    onStatus?.("sending_otp");

    // const response = await axios.post(`${API_BASE}/user/generate-otp`, {
    //   mobile_number,
    // });
     const response = await axios.post(`${API_BASE}/otp/send`, {
      phone,
    });

    onStatus?.("otp_sent");

    // Only proceed if API indicates success
    if (response.data?.success === true) {
      // store OTP session - valid for 5 minutes
      setCookie("otp_session", "true", 5 / (60 * 24));
      setCookie("otp_phone", phone, 5 / (60 * 24)); // 5 minutes
      
      // Also store in localStorage as backup
      localStorage.setItem("otp_phone", phone);
      localStorage.setItem("otp_session", "true");
      
      console.log("Setting cookies - phone:", phone);
      console.log("Cookies after setting:", document.cookie);
      
      // Redirect to verify page
      window.location.href = "/en/user-otp/verify";
    }
    
    return {
      success: true,
      message: response.data?.message || "OTP sent successfully",
      data: response.data,
    };
  } catch (err) {
    onStatus?.("error");

    let message = "Failed to send OTP";
    if (axios.isAxiosError(err)) {
      message = err.response?.data?.message || message;
    }

    return {
      success: false,
      message,
    };
  }
}

// RESEND OTP
export async function resendOtp(
  phone: string,
  onStatus?: StatusCallback
): Promise<ApiResponse> {
  try {
    onStatus?.("started");
    onStatus?.("sending_otp");

    const response = await axios.post(`${API_BASE}/otp/send`, { phone });

    onStatus?.("otp_sent");

    return {
      success: true,
      message: response.data?.message || "OTP resent successfully",
      data: response.data,
    };
  } catch (err: unknown) {
    onStatus?.("error");

    let message = "Failed to resend OTP";
    if (axios.isAxiosError(err)) {
      message = err.response?.data?.message || message;
    }

    return { success: false, message };
  }
}

// VERIFY OTP
// export async function verifyOtp(
//   mobile_number: string,
//   otp: string,
//   onStatus?: StatusCallback
// ): Promise<ApiResponse> {
//   try {
//     onStatus?.("started");

//     const response = await axios.post(`${API_BASE}/user/verify-otp`, {
//       mobile_number,
//       otp,
//     });

//     onStatus?.("otp_sent"); // Means verified successfully
//      const token = response.data?.token;
//      // Set login token for auth pages
//     setCookie("auth_token", token, { maxAge: 60 * 60 * 24 }); // 1 day

//     // OTP step done
//     setCookie("otp_session", "", { maxAge: 0 }); // remove

//     setTimeout(() => {
//   window.location.href = "/en/user/profile";
// }, 1000);

//     return {
//       success: true,
//       message: response.data?.message || "OTP verified successfully",
//       data: response.data,
//     };
//   } catch (err: unknown) {
//     onStatus?.("error");

//     let message = "Failed to verify OTP";
//     if (axios.isAxiosError(err)) {
//       message = err.response?.data?.message || message;
//     }

//     return { success: false, message };
//   }
// }

// VERIFY OTP
export async function verifyOtp(
  phone: string | null,
  otp_code: string,
  onStatus?: StatusCallback
): Promise<ApiResponse> {
  try {
    onStatus?.("started");

    // Get phone from cookie or localStorage if not provided
    const phoneNumber = phone || getCookie("otp_phone") || localStorage.getItem("otp_phone");
    
    if (!phoneNumber) {
      return {
        success: false,
        message: "Phone number not found"
      };
    }

    const response = await axios.post(`${API_BASE}/otp/verify`, {
      phone: phoneNumber,
      otp_code,
    });

    // If OTP is correct
    if (response.data?.success === true) {
      onStatus?.("otp_sent");

      const access_token       = response.data?.data?.access_token;
      const expires_in         = response.data?.data?.expires_in;
      const refresh_expires_in = response.data?.data?.refresh_expires_in;
      const refresh_token      = response.data?.data?.refresh_token;
      const name               = response.data?.data?.name || phoneNumber;

      // Store auth tokens
      setCookie("access_token", access_token, 1);
      setCookie("expires_in", expires_in, 1);
      setCookie("refresh_expires_in", refresh_expires_in, 1);
      setCookie("refresh_token", refresh_token, 1);

      // Store user basic info
      setCookie("user_name", name, 1);
      setCookie("user_mobile", phoneNumber, 1);

      // Clear OTP session
      setCookie("otp_session", "", 0);

      // Redirect only on success
      window.location.href = "/en/user-profile";

      return {
        success: true,
        message: response.data?.message || "OTP verified successfully",
        data: response.data,
      };
    }

    // If OTP fails
    return {
      success: false,
      message: response.data?.message || "Invalid OTP",
    };

  } catch (err: unknown) {
    onStatus?.("error");

    let message = "Failed to verify OTP";
    if (axios.isAxiosError(err)) {
      message = err.response?.data?.message || message;
    }

    return { success: false, message };
  }
}
export async function logout(): Promise<void> {
  const refresh_token = getCookie("refresh_token");

  try {
    if (refresh_token) {
      await axios.post(`${API_BASE}/logout`, { refresh_token });
    }
  } catch (error) {
    console.error("Logout API error:", error);
  }

  // Delete cookies EXACTLY matching how they were set
  deleteClientCookie("access_token");
  deleteClientCookie("refresh_token");
  deleteClientCookie("expires_in");
  deleteClientCookie("refresh_expires_in");
  deleteClientCookie("user_name");
  deleteClientCookie("user_mobile");
  deleteClientCookie("otp_session");
  deleteClientCookie("otp_phone");

  // Clear localStorage
  localStorage.removeItem("otp_phone");
  localStorage.removeItem("otp_session");

  // Delay before redirect so cookies fully clear
  setTimeout(() => {
    window.location.href = "/en";
  }, 50);
}




