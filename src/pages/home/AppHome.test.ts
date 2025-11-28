import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { showsStoreKey } from '../../store/useShowsStore'
import AppHome from './AppHome.vue'

// Mock ShowRow component
vi.mock('~/components/ShowRow.vue', () => ({
  default: {
    template: '<div data-testid="show-row" :title="title"></div>',
    props: ['title', 'items'],
  },
}))

// Mock ShowRecommendations component
vi.mock('~/components/ShowRecommendations.vue', () => ({
  default: {
    template: '<div data-testid="show-recommendations"></div>',
    props: ['shows'],
  },
}))

// Mock useGetApi
const mockUseGetApi = vi.fn()
vi.mock('~/composables/useGetApi', () => ({
  useGetApi: (url: string, enabled: boolean) => mockUseGetApi(url, enabled),
}))

describe('AppHome.vue', () => {
  const mockShows = [
    { id: 1, name: 'Drama Show', genres: ['Drama'] },
    { id: 2, name: 'Comedy Show', genres: ['Comedy'] },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches shows when store is not ready', async () => {
    const mockSetShows = vi.fn()
    const mockStore = {
      dramaShows: ref([]),
      thrillerShows: ref([]),
      fictionShows: ref([]),
      comedyShows: ref([]),
      actionShows: ref([]),
      allShows: ref([]),
      setShows: mockSetShows,
      storeReady: ref(false),
    }

    // Mock API response
    const fetchedShows = ref(mockShows)
    mockUseGetApi.mockReturnValue({
      data: fetchedShows,
      error: ref(null),
      loading: ref(false),
    })

    mount(AppHome, {
      global: {
        provide: {
          [showsStoreKey as symbol]: mockStore,
        },
      },
    })

    // Should call API with enabled = true
    expect(mockUseGetApi).toHaveBeenCalledWith('shows', true)

    // Watcher should trigger setShows
    // We need to wait for the watcher to fire. Since we passed a ref that already has value,
    // the watch might fire immediately or we might need nextTick.
    // However, in setup(), watch(ref) fires if ref has value?
    // Actually, watch sources are lazy by default unless immediate: true.
    // But here we are watching the return value of useGetApi.

    // Let's simulate the data arriving if it wasn't immediate,
    // but here we mocked it to return a ref with value.
    // The component does: watch(fetchedShows, (newShows) => { ... })
    // If fetchedShows changes, it triggers.

    // To ensure watch triggers, we can update the ref value if needed,
    // but let's check if it works with initial value or if we need to trigger it.
    // Usually watch doesn't fire immediately unless immediate: true.
    // So we might need to update the value.

    fetchedShows.value = [...mockShows] // Trigger watch
    await new Promise((resolve) => setTimeout(resolve, 0)) // Wait for watch

    expect(mockSetShows).toHaveBeenCalledWith(mockShows)
  })

  it('does not fetch shows when store is ready', () => {
    const mockStore = {
      dramaShows: ref(mockShows),
      thrillerShows: ref([]),
      fictionShows: ref([]),
      comedyShows: ref([]),
      actionShows: ref([]),
      allShows: ref([]),
      setShows: vi.fn(),
      storeReady: ref(true),
    }

    mockUseGetApi.mockReturnValue({
      data: ref(null),
      error: ref(null),
      loading: ref(false),
    })

    const wrapper = mount(AppHome, {
      global: {
        provide: {
          [showsStoreKey as symbol]: mockStore,
        },
      },
    })

    // Should call API with enabled = false
    expect(mockUseGetApi).toHaveBeenCalledWith('shows', false)

    // Should render rows
    expect(wrapper.findAll('[data-testid="show-row"]')).toHaveLength(5)
  })

  it('shows loading state', () => {
    const mockStore = {
      dramaShows: ref([]),
      thrillerShows: ref([]),
      fictionShows: ref([]),
      comedyShows: ref([]),
      actionShows: ref([]),
      allShows: ref([]),
      setShows: vi.fn(),
      storeReady: ref(false),
    }

    mockUseGetApi.mockReturnValue({
      data: ref(null),
      error: ref(null),
      loading: ref(true),
    })

    const wrapper = mount(AppHome, {
      global: {
        provide: {
          [showsStoreKey as symbol]: mockStore,
        },
      },
    })

    expect(wrapper.text()).toContain('Loading shows...')
  })

  it('shows error state', () => {
    const mockStore = {
      dramaShows: ref([]),
      thrillerShows: ref([]),
      fictionShows: ref([]),
      comedyShows: ref([]),
      actionShows: ref([]),
      allShows: ref([]),
      setShows: vi.fn(),
      storeReady: ref(false),
    }

    mockUseGetApi.mockReturnValue({
      data: ref(null),
      error: ref({ message: 'Failed' }),
      loading: ref(false),
    })

    const wrapper = mount(AppHome, {
      global: {
        provide: {
          [showsStoreKey as symbol]: mockStore,
        },
      },
    })

    expect(wrapper.text()).toContain('Could not load shows')
  })
})
