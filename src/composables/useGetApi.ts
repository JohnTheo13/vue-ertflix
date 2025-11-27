import { ref } from 'vue';
import { apiFetch, type ParsedError } from '~/api';

export function useGetApi<T>(
  url: string,
  enabled = true,
  options: RequestInit = {},
) {
  const data = ref<T | null>(null);
  const error = ref<ParsedError | null>(null);
  const loading = ref<boolean>(false);
  const fetchData = async () => {
    loading.value = true;
    try {
      const response = await apiFetch(url, options);
      data.value = response;
    } catch (err: unknown) {
      error.value = err as ParsedError;
    } finally {
      loading.value = false;
    }
  };

  if (enabled) {
    fetchData();
  }

  return { data, error, loading, fetchData };
}
