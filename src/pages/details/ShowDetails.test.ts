import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { showsStoreKey } from '../../store/useShowsStore'
import ShowDetails from './ShowDetails.vue'

// Mock useRoute
const mockRouteParams = { id: '1' }
vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: mockRouteParams,
  }),
}))

// Mock useGetApi
const mockUseGetApi = vi.fn()
vi.mock('~/composables/useGetApi', () => ({
  useGetApi: (url: string) => mockUseGetApi(url),
}))

describe('ShowDetails.vue', () => {
  const mockShow = {
    id: 1,
    name: 'Test Show',
    image: { original: 'test.jpg' },
    rating: { average: 8.5 },
    premiered: '2023-01-01',
    runtime: 60,
    status: 'Ended',
    genres: ['Drama'],
    summary: '<p>Test summary</p>',
    language: 'English',
    type: 'Scripted',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders details from store without API call', () => {
    const mockStore = {
      shows: ref({
        '1': mockShow,
      }),
      setShows: vi.fn(),
      storeReady: ref(true),
    }

    const wrapper = mount(ShowDetails, {
      global: {
        provide: {
          [showsStoreKey as symbol]: mockStore,
        },
      },
    })

    // Should not call API because data is in store
    expect(mockUseGetApi).not.toHaveBeenCalled()

    // Should render content
    expect(wrapper.text()).toContain('Test Show')
    expect(wrapper.find('img').attributes('src')).toBe('test.jpg')
    expect(wrapper.text()).toContain('Drama')
  })

  it('fetches details from API when not in store', () => {
    const mockStore = {
      shows: ref({}),
      setShows: vi.fn(),
      storeReady: ref(true),
    }

    // Mock API response
    mockUseGetApi.mockReturnValue({
      data: ref(mockShow),
      error: ref(null),
      loading: ref(false),
    })

    const wrapper = mount(ShowDetails, {
      global: {
        provide: {
          [showsStoreKey as symbol]: mockStore,
        },
      },
    })

    // Should call API because data is NOT in store
    expect(mockUseGetApi).toHaveBeenCalledWith('shows/1')

    // Should render content
    expect(wrapper.text()).toContain('Test Show')
  })

  it('shows loading state', () => {
    const mockStore = {
      shows: ref({}),
      setShows: vi.fn(),
      storeReady: ref(true),
    }

    mockUseGetApi.mockReturnValue({
      data: ref(null),
      error: ref(null),
      loading: ref(true),
    })

    const wrapper = mount(ShowDetails, {
      global: {
        provide: {
          [showsStoreKey as symbol]: mockStore,
        },
      },
    })

    expect(wrapper.text()).toContain('Loading...')
  })

  it('shows error state', () => {
    const mockStore = {
      shows: ref({}),
      setShows: vi.fn(),
      storeReady: ref(true),
    }

    mockUseGetApi.mockReturnValue({
      data: ref(null),
      error: ref({ message: 'Failed to fetch' }),
      loading: ref(false),
    })

    const wrapper = mount(ShowDetails, {
      global: {
        provide: {
          [showsStoreKey as symbol]: mockStore,
        },
      },
    })

    expect(wrapper.text()).toContain('Error loading show details')
    expect(wrapper.text()).toContain('Failed to fetch')
  })
})
