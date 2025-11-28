import { createShowsStore } from './useShowsStore'

describe('useShowsStore', () => {
  it('initializes with empty state', () => {
    const store = createShowsStore()

    expect(store.shows.value).toEqual({})
    expect(store.storeReady.value).toBe(false)
  })

  it('sets shows correctly', () => {
    const store = createShowsStore()
    const mockShows = [
      { id: 1, name: 'Show 1', genres: ['Drama'] },
      { id: 2, name: 'Show 2', genres: ['Comedy'] },
    ]

    store.setShows(mockShows as any[])

    expect(store.shows.value).toEqual({
      '1': mockShows[0],
      '2': mockShows[1],
    })
    expect(store.storeReady.value).toBe(true)
  })

  it('filters shows by genre correctly', () => {
    const store = createShowsStore()
    const mockShows = [
      { id: 1, name: 'Drama Show', genres: ['Drama'] },
      { id: 2, name: 'Thriller Show', genres: ['Thriller'] },
      { id: 3, name: 'Sci-Fi Show', genres: ['Science-Fiction'] },
      { id: 4, name: 'Mixed Show', genres: ['Drama', 'Thriller'] },
    ]

    store.setShows(mockShows as any[])

    expect(store.dramaShows.value).toHaveLength(2)
    expect(store.dramaShows.value.map((s) => s.id)).toContain(1)
    expect(store.dramaShows.value.map((s) => s.id)).toContain(4)

    expect(store.thrillerShows.value).toHaveLength(2)
    expect(store.thrillerShows.value.map((s) => s.id)).toContain(2)
    expect(store.thrillerShows.value.map((s) => s.id)).toContain(4)

    expect(store.fictionShows.value).toHaveLength(1)
    expect(store?.fictionShows?.value[0]?.id).toBe(3)
  })
})
