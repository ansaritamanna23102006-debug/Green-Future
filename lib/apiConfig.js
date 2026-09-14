/**
 * Green Future Tech (GFT) — Centralized API Configuration & Client
 */

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

/**
 * Retrieve the active authorization token from browser storage.
 */
export function getAuthToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("gft_token");
}

/**
 * Get headers with Bearer token if present.
 */
export function getAuthHeaders(customHeaders = {}) {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...customHeaders,
  };
}

/**
 * Fetch wrapper that attaches authentication headers and handles API errors.
 */
export async function apiFetch(endpoint, options = {}) {
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  const headers = getAuthHeaders(options.headers);

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API Fetch Error [${endpoint}]:`, error);
    return {
      status: "error",
      message: error.message || "Network request failed. Please check backend connection.",
    };
  }
}
