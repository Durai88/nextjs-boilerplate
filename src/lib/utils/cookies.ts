// Set cookie
export function setCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return;

  const date = new Date();
  date.setTime(date.getTime() + days * 86400000);

  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";

  document.cookie =
    `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/; SameSite=Strict${secure}`;
}

// Get cookie
export function getCookie(name: string) {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(
    new RegExp("(^| )" + name + "=([^;]+)")
  );

  return match ? decodeURIComponent(match[2]) : null;
}

export function deleteClientCookie(name: string) {
  if (typeof document === "undefined") return;

  // Always include Secure if it was used in setCookie
  const secureFlag = process.env.NODE_ENV === "production" ? "; Secure" : "; Secure";

  // Must be a SINGLE LINE
  document.cookie =
    `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Strict${secureFlag}`;
}

