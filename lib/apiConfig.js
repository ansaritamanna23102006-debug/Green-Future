/**
 * Green Future Tech (GFT) — Centralized API Configuration & Client
 */

/**
 * Resolve base API URL depending on client vs server runtime:
 * - In browser: uses NEXT_PUBLIC_API_URL or defaults to http://localhost:5000/api/v1
 * - In SSR/Node: uses INTERNAL_API_URL or NEXT_PUBLIC_API_URL (must be absolute)
 */
export const getBaseApiUrl = () => {
  if (typeof window === "undefined") {
    return (
      process.env.INTERNAL_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:5000/api/v1"
    );
  }
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
};

export const API_URL = getBaseApiUrl();

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
 * Silently refresh access token using refresh token stored in browser.
 */
export async function refreshAccessToken() {
  if (typeof window === "undefined") return null;
  const refreshToken = localStorage.getItem("gft_refresh");
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    const data = await res.json();
    if (data.status === "success" && data.data?.accessToken) {
      localStorage.setItem("gft_token", data.data.accessToken);
      if (data.data.refreshToken) {
        localStorage.setItem("gft_refresh", data.data.refreshToken);
      }
      return data.data.accessToken;
    }
    return null;
  } catch (err) {
    return null;
  }
}

/**
 * Fetch wrapper that attaches authentication headers and handles API errors and token refresh.
 */
export async function apiFetch(endpoint, options = {}, isRetry = false) {
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  const headers = getAuthHeaders(options.headers);

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401 && !isRetry) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        return await apiFetch(endpoint, options, true);
      }
    }

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
