// Environment variable validation

export const env = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/admin/v1",
  // JWT token should be set by auth system
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("astradesk_token")
}

export function setAuthToken(token: string): void {
  if (typeof window === "undefined") return
  localStorage.setItem("astradesk_token", token)
}

export function clearAuthToken(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("astradesk_token")
}
