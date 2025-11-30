// src/store/useShowsStore.ts
import { computed, type InjectionKey, readonly, ref } from 'vue'
import type { Show } from '~/types/Show'

// Define the return type of our provider function for better type inference
export type ShowsStore = ReturnType<typeof createShowsStore>

// Create a unique Symbol to use as the InjectionKey.
export const showsStoreKey: InjectionKey<ShowsStore> = Symbol('ShowsStore')

export function createShowsStore() {
  // State - Simplified to just the data
  const allShows = ref<Show[]>([])

  // Getters (Computed properties)
  const showsByGenre = computed(() => {
    const dramaShows: Show[] = []
    const thrillerShows: Show[] = []
    const fictionShows: Show[] = []
    const comedyShows: Show[] = []
    const actionShows: Show[] = []

    // Build a lookup map of shows by ID for efficient retrieval (avoid fetching details)
    const shows: Record<string, Show> = {}

    for (const show of allShows.value) {
      if (!shows[show.id]) {
        shows[show.id] = show
      }
      if (show.genres.includes('Drama')) {
        dramaShows.push(show)
      }
      if (show.genres.includes('Thriller')) {
        thrillerShows.push(show)
      }
      if (show.genres.includes('Science-Fiction')) {
        fictionShows.push(show)
      }
      if (show.genres.includes('Comedy')) {
        comedyShows.push(show)
      }
      if (show.genres.includes('Action')) {
        actionShows.push(show)
      }
    }

    return {
      dramaShows,
      thrillerShows,
      fictionShows,
      comedyShows,
      actionShows,
      shows,
    }
  })

  /**
   * * Action - A simple setter function to update the state
   * * This function also sorts the shows by rating in descending order first so all the getters return sorted shows.
   * @param {Show[]} data - Array of shows to set in the store
   */
  function setShows(data: Show[]) {
    // sort shows by rating descending
    data.sort((a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0))
    allShows.value = data
  }

  // Return the public API of the store
  return {
    // Getters
    dramaShows: computed(() => showsByGenre.value.dramaShows),
    thrillerShows: computed(() => showsByGenre.value.thrillerShows),
    fictionShows: computed(() => showsByGenre.value.fictionShows),
    shows: computed(() => showsByGenre.value.shows),
    comedyShows: computed(() => showsByGenre.value.comedyShows),
    actionShows: computed(() => showsByGenre.value.actionShows),
    storeReady: readonly(computed(() => allShows.value.length > 0)),
    allShows: computed(() => allShows.value),
    // Action
    setShows,
  }
}
