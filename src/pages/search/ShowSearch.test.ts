import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import ShowSearch from './ShowSearch.vue'

// Mock ShowCard
vi.mock('~/components/ShowCard.vue', () => ({
  default: {
    template: '<div data-testid="show-card" :title="title"></div>',
    props: ['title', 'id'],
  },
}))

// Mock vue-router
const mockPush = vi.fn()
const mockReplace = vi.fn()
const mockRouteQuery = ref({})

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
  }),
  useRoute: () => ({
    query: mockRouteQuery.value,
  }),
}))

// Mock useGetApi
const mockFetchData = vi.fn()
const mockResults = ref([])
const mockLoading = ref(false)
const mockError = ref(null)

vi.mock('~/composables/useGetApi', () => ({
  useGetApi: (_url: string, _enabled: boolean) => ({
    data: mockResults,
    fetchData: mockFetchData,
    loading: mockLoading,
    error: mockError,
  }),
}))

describe('ShowSearch.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
    mockRouteQuery.value = {}
    mockResults.value = []
    mockLoading.value = false
    mockError.value = null
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('initializes with empty query if no route param', () => {
    const wrapper = mount(ShowSearch)
    const input = wrapper.find('input')

    expect(input.element.value).toBe('')
    expect(mockFetchData).not.toHaveBeenCalled()
  })

  it('initializes with query from route and fetches data', () => {
    mockRouteQuery.value = { q: 'batman' }

    const wrapper = mount(ShowSearch)
    const input = wrapper.find('input')

    expect(input.element.value).toBe('batman')
    expect(mockFetchData).toHaveBeenCalledWith('search/shows?q=batman')
  })

  it('updates url and fetches data on input change (debounced)', async () => {
    const wrapper = mount(ShowSearch)
    const input = wrapper.find('input')

    await input.setValue('superman')

    // Should update URL immediately
    expect(mockReplace).toHaveBeenCalledWith({ query: { q: 'superman' } })

    // Should NOT fetch immediately (debounce)
    expect(mockFetchData).not.toHaveBeenCalled()

    // Fast forward time
    vi.advanceTimersByTime(500)

    expect(mockFetchData).toHaveBeenCalledWith('search/shows?q=superman')
  })

  it('clears results when input is empty', async () => {
    mockRouteQuery.value = { q: 'initial' }
    mockResults.value = [
      { show: { id: 1, name: 'Test', genres: ['Drama'] } },
    ] as any

    const wrapper = mount(ShowSearch)
    const input = wrapper.find('input')

    // Clear the input
    await input.setValue('')

    vi.advanceTimersByTime(500)

    expect(mockResults.value).toEqual([])
  })

  it('shows loading state', () => {
    mockLoading.value = true
    const wrapper = mount(ShowSearch)

    expect(wrapper.text()).toContain('Searching...')
  })

  it('renders results correctly', () => {
    mockResults.value = [
      {
        score: 1,
        show: {
          id: 1,
          name: 'Show 1',
          genres: ['Drama'],
          rating: { average: 8 },
          image: { medium: 'img.jpg' },
        },
      },
      {
        score: 0.9,
        show: {
          id: 2,
          name: 'Show 2',
          genres: ['Comedy'],
          rating: { average: 7 },
          image: { medium: 'img2.jpg' },
        },
      },
    ] as any

    const wrapper = mount(ShowSearch)

    const cards = wrapper.findAll('[data-testid="show-card"]')
    expect(cards).toHaveLength(2)
  })

  it('shows empty state when no results found', async () => {
    const wrapper = mount(ShowSearch)
    const input = wrapper.find('input')

    await input.setValue('unknown show')
    mockResults.value = []
    mockLoading.value = false

    expect(wrapper.text()).toContain('No results found for "unknown show"')
  })
})
