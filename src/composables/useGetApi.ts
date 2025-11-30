import { ref } from 'vue'
import { apiFetch, type ParsedError } from '~/api'

/**
 * A composable for making GET requests to an API.
 *
 * @template T - The expected type of the response data.
 * @param {string} url - The URL endpoint to fetch data from.
 * @param {boolean} [enabled=true] - Whether to execute the request immediately upon initialization. Defaults to `true`.
 * @param {RequestInit} [options={}] - Optional configuration for the fetch request (e.g., headers, method).
 * @returns {object} An object containing:
 * - `data`: A reactive reference to the fetched data (or null if not yet fetched).
 * - `error`: A reactive reference to any error that occurred during the fetch.
 * - `loading`: A reactive reference indicating if the request is currently in progress.
 * - `fetchData`: A function to manually trigger the fetch, optionally with a new URL.
 */
export function useGetApi<T>(
  url: string,
  enabled = true,
  options: RequestInit = {},
) {
  const data = ref<T | null>(null)
  const error = ref<ParsedError | null>(null)
  const loading = ref<boolean>(false)
  const fetchData = async (newUrl?: string) => {
    loading.value = true
    try {
      const response = await apiFetch(newUrl || url, options)
      data.value = response
    } catch (err: unknown) {
      error.value = err as ParsedError
    } finally {
      loading.value = false
    }
  }

  if (enabled) {
    fetchData()
  }

  return { data, error, loading, fetchData }
}
