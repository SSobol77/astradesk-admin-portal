// Type-safe API client with Bearer auth and error handling

import { env, getAuthToken } from "./env"
import type { ErrorResponse } from "@/openapi/openapi-types"

export class ApiError extends Error {
  constructor(
    public status: number,
    public detail: string,
  ) {
    super(detail)
    this.name = "ApiError"
  }
}

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>
}

export async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, ...fetchOptions } = options

  // Build URL with query params
  let url = `${env.API_BASE_URL}${endpoint}`
  if (params) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value))
      }
    })
    const queryString = searchParams.toString()
    if (queryString) {
      url += `?${queryString}`
    }
  }

  // Add auth header
  const token = getAuthToken()
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...fetchOptions.headers,
  }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  })

  // Handle errors
  if (!response.ok) {
    const contentType = response.headers.get("content-type")
    if (contentType?.includes("application/problem+json")) {
      const error: ErrorResponse = await response.json()
      throw new ApiError(response.status, error.detail)
    }
    throw new ApiError(response.status, `HTTP ${response.status}: ${response.statusText}`)
  }

  // Handle empty responses
  if (response.status === 204 || response.headers.get("content-length") === "0") {
    return {} as T
  }

  // Handle binary responses
  const contentType = response.headers.get("content-type")
  if (contentType?.includes("application/octet-stream")) {
    const blob = await response.blob()
    return blob as unknown as T
  }

  return response.json()
}
