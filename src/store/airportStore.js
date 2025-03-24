import { create } from 'zustand'

const API_KEY = process.env.NEXT_PUBLIC_REACT_APP_AIRPORTS_API_KEY
const ITEMS_PER_PAGE = 10

/**
 * @typedef {Object} AirportStore
 * @property {Array<Airport>} airports
 * @property {boolean} isLoading
 * @property {string|null} error
 * @property {number} currentPage
 * @property {number} totalPages
 * @property {string} searchQuery
 * @property {Array<string>} searchHistory
 */

/**
 * @typedef {Object} Airport
 * @property {string} airport_name
 * @property {string} iata_code
 * @property {string} icao_code
 * @property {string} city_name
 * @property {string} country_name
 * @property {string} timezone
 * @property {number} latitude
 * @property {number} longitude
 */

const baseUrl = 'https://api.aviationstack.com/v1/airports'

export const useAirportStore = create((set, get) => ({
  airports: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  searchQuery: '',
  searchHistory: [],

  resetStore: () => {
    set({
      airports: [],
      isLoading: false,
      error: null,
      currentPage: 1,
      totalPages: 1,
      searchQuery: '',
    })
  },

  /**
   * Obtener aeropuertos desde la API
   * @param {string} searchTerm
   * @returns {Promise<void>}
   */
  fetchAirports: async (searchTerm = '') => {
    const { currentPage, searchHistory } = get()

    // Actualizar el historial de búsqueda
    if (searchTerm && !searchHistory.includes(searchTerm)) {
      set((state) => ({
        searchHistory: [searchTerm, ...state.searchHistory].slice(0, 5),
      }))
    }

    set({ isLoading: true, error: null, searchQuery: searchTerm })

    const url = `${baseUrl}?access_key=${API_KEY}`
    /**
     * La url de debajo se puede usar si se paga la suscripcion al plan basic
     * de lo contrario se puede usar la url de arriba
     */
    // const url = `${baseUrl}?access_key=${API_KEY}&offset=${
    //   (currentPage - 1) * ITEMS_PER_PAGE
    // }&limit=${ITEMS_PER_PAGE}${
    //   searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ''
    // }`

    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      set({
        airports: data.data,
        isLoading: false,
        totalPages: Math.ceil(data.pagination.total / ITEMS_PER_PAGE) || 1,
      })
    } catch (error) {
      set({
        isLoading: false,
        error:
          'Error al cargar aeropuertos. Por favor, inténtalo de nuevo más tarde.',
      })
      console.error('Error fetching airports:', error)
    }
  },

  getAirportById: async (id) => {
    set({ isLoading: true, error: null })

    try {
      const response = await fetch(
        `${baseUrl}?access_key=${API_KEY}&airport_id=${id}`
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      set({ isLoading: false })
      return data.data[0] || null
    } catch (error) {
      set({
        isLoading: false,
        error:
          'Error al cargar detalles del aeropuerto. Por favor, inténtalo de nuevo más tarde.',
      })
      console.error('Error fetching airport details:', error)
      return null
    }
  },

  /**
   * Establecer la página actual y obtener nuevos datos
   * @param {number} page
   */
  setCurrentPage: (page) => {
    set({ currentPage: page })
    get().fetchAirports(get().searchQuery)
  },

  /**
   * Establecer una consulta de búsqueda y obtener resultados
   * @param {string} query
   */
  setSearchQuery: (query) => {
    set({ searchQuery: query })
    get().fetchAirports(query)
  },

  /**
   * Borrar el estado de error actual
   */
  clearError: () => set({ error: null }),

  /**
   * Eliminar término de búsqueda del historial
   * @param {number} index
   */
  removeFromSearchHistory: (index) => {
    set((state) => ({
      searchHistory: state.searchHistory.filter((_, i) => i !== index),
    }))
  },

  /**
   * Borrar todo el historial de búsqueda
   */
  clearSearchHistory: () => {
    set({ searchHistory: [] })
  },
  nextPage: () => {
    set((state) => ({
      currentPage: Math.min(state.currentPage + 1, state.totalPages),
    }))
    get().fetchAirports(get().searchQuery)
  },
  previousPage: () => {
    set((state) => ({
      currentPage: Math.max(state.currentPage - 1, 1),
    }))
    get().fetchAirports(get().searchQuery)
  },
}))
