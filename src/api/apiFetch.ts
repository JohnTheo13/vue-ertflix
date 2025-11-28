import { parseError } from './errorParser'

const API_URL = import.meta.env.VITE_API_URL

/**
 * @async
 * @description A wrapper around fetch to make API calls using async/await.
 * @param {string} endpoint - The endpoint to call.
 * @param {RequestInit} [options={}] - The options for the fetch call.
 * @returns {Promise<T>} The response from the API.
 */
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_URL}${endpoint}`

  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      // Try to parse error response, otherwise throw a generic error
      const errorBody = await response.json().catch(() => {
        throw new Error(`HTTP error! status: ${response.status}`)
      })
      throw new Error(
        errorBody.message || `HTTP error! status: ${response.status}`,
      )
    }

    return (await response.json()) as T
  } catch (error: unknown) {
    throw parseError(error)
  }
}
