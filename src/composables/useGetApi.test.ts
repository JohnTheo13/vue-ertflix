import { useGetApi } from './useGetApi'

// Mock apiFetch
const apiFetchMock = vi.fn()
vi.mock('~/api', () => ({
  apiFetch: (...args: any[]) => apiFetchMock(...args),
}))

describe('useGetApi', () => {
  it('fetches data successfully', async () => {
    const mockData = { id: 1, name: 'Test Show' }
    apiFetchMock.mockResolvedValueOnce(mockData)

    const { data, loading, error, fetchData } = useGetApi(
      'test-endpoint',
      false,
    )

    expect(data.value).toBeNull()
    expect(loading.value).toBe(false)

    await fetchData()

    expect(loading.value).toBe(false)
    expect(data.value).toEqual(mockData)
    expect(error.value).toBeNull()
    expect(apiFetchMock).toHaveBeenCalledWith('test-endpoint', {})
  })

  it('handles fetch errors', async () => {
    const mockError = { message: 'Error: Not Found', name: 'ParsedError' }
    apiFetchMock.mockRejectedValueOnce(mockError)

    const { data, loading, error, fetchData } = useGetApi(
      'error-endpoint',
      false,
    )

    await fetchData()

    expect(loading.value).toBe(false)
    expect(data.value).toBeNull()
    expect(error.value).toEqual(mockError)
  })
})
