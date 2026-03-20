// Environment variable validation

export const env = {
  API_BASE_URL: (() => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL
    
    // Don't provide a default localhost URL in production, require explicit configuration
    if (!url || url.trim() === "") {
      // If MOCK_API is enabled, we don't need a real API_BASE_URL
      if (process.env.NEXT_PUBLIC_MOCK_API === "true" || 
          process.env.NEXT_PUBLIC_MOCK_API === "1" || 
          process.env.NEXT_PUBLIC_MOCK_API === "yes") {
        return "" // Empty string since mock mode doesn't use it
      }
      
      // For development purposes only, provide a default
      if (process.env.NODE_ENV !== 'production') {
        console.warn("[v0] API_BASE_URL not configured, using default development URL. For production deployments, set NEXT_PUBLIC_API_BASE_URL environment variable.")
        return "http://localhost:8080/api/admin/v1"
      } else {
        // In production, we require an explicit configuration
        console.error("[v0] Production environment requires NEXT_PUBLIC_API_BASE_URL to be set!")
        return ""
      }
    }
    
    // Validate URL format
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      console.error("[v0] Invalid API_BASE_URL format:", url)
      // If MOCK_API is enabled, return empty string instead of invalid URL
      if (process.env.NEXT_PUBLIC_MOCK_API === "true" || 
          process.env.NEXT_PUBLIC_MOCK_API === "1" || 
          process.env.NEXT_PUBLIC_MOCK_API === "yes") {
        return ""
      }
      
      if (process.env.NODE_ENV !== 'production') {
        console.warn("[v0] Invalid API_BASE_URL format, using default development URL.")
        return "http://localhost:8080/api/admin/v1"
      } else {
        console.error("[v0] Production environment requires valid NEXT_PUBLIC_API_BASE_URL to be set!")
        return ""
      }
    }
    return url
  })(),
  MOCK_API: (() => {
    const mockEnv = process.env.NEXT_PUBLIC_MOCK_API
    const isMock = mockEnv === "true" || mockEnv === "1" || mockEnv === "yes"
    if (isMock) {
      console.log("[v0] Mock API mode enabled")
    }
    return isMock
  })(),
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