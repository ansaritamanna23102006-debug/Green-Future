/**
 * Green Future Tech (GFT) — Centralized API Configuration & Client
 * 
 * Features:
 * - Environment-aware base API URL resolution
 * - Centralized auth token storage & retrieval
 * - Single-flight refresh mutex preventing concurrent refresh races
 * - Automatic single-retry on 401 Unauthorized using single-use token rotation
 * - Event dispatching for seamless AppContext state synchronization
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
 * Active tokens from browser storage
 */
export function getAuthToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("gft_token");
}

export function getRefreshToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("gft_refresh");
}

export function setAuthTokens(accessToken, refreshToken) {
  if (typeof window === "undefined") return;
  if (accessToken) localStorage.setItem("gft_token", accessToken);
  if (refreshToken) localStorage.setItem("gft_refresh", refreshToken);
  
  window.dispatchEvent(
    new CustomEvent("gft:auth-tokens-updated", {
      detail: { accessToken, refreshToken },
    })
  );
}

export function clearAuthSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("gft_token");
  localStorage.removeItem("gft_refresh");
  localStorage.removeItem("gft_auth");
  localStorage.removeItem("gft_user");
  localStorage.removeItem("gft_tickets");
  localStorage.removeItem("gft_packages");

  window.dispatchEvent(new CustomEvent("gft:auth-session-expired"));
}

export function getAuthHeaders(customHeaders = {}) {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...customHeaders,
  };
}

/**
 * Concurrency Mutex for Refresh Token
 * Prevents multiple parallel 401s from racing to rotate the single-use refresh token.
 */
let refreshPromise = null;

export async function refreshAccessToken() {
  // If a refresh is already in flight, all callers await that same promise
  if (refreshPromise) {
    return refreshPromise;
  }

  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    clearAuthSession();
    throw new Error("No refresh token available in storage");
  }

  refreshPromise = (async () => {
    try {
      const response = await fetch(`${API_URL}/auth/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        clearAuthSession();
        throw new Error(`Refresh token rejected with status ${response.status}`);
      }

      const data = await response.json();
      if (data.status === "success" && data.data?.accessToken) {
        const newAccess = data.data.accessToken;
        const newRefresh = data.data.refreshToken || refreshToken;
        setAuthTokens(newAccess, newRefresh);
        return newAccess;
      } else {
        clearAuthSession();
        throw new Error(data.message || "Failed to parse refreshed token payload");
      }
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

/**
 * Authenticated Fetch wrapper with automatic token refresh on 401.
 * Retries original request exactly once upon successful token rotation.
 */
export async function authFetch(endpoint, options = {}, isRetry = false) {
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  const initialToken = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...(initialToken ? { Authorization: `Bearer ${initialToken}` } : {}),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Handle 401 Unauthorized with token refresh if not already a retried attempt
  if (response.status === 401 && !isRetry && !options.skipAuthRefresh && !url.includes("/auth/")) {
    try {
      const newAccessToken = await refreshAccessToken();
      const retryHeaders = {
        ...headers,
        Authorization: `Bearer ${newAccessToken}`,
      };
      return await fetch(url, {
        ...options,
        headers: retryHeaders,
      });
    } catch (refreshErr) {
      // Refresh failed or revoked; session cleared
      return response;
    }
  }

  return response;
}

/**
 * Standard API Fetch wrapper returning parsed JSON or error payload
 */
export async function apiFetch(endpoint, options = {}) {
  try {
    const response = await authFetch(endpoint, options);
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
