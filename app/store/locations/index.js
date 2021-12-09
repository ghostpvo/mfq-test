import citiesQuery from './cities.graphql'
import locationsQuery from '~/graphql/locations.graphql'

export const state = () => ({
  cities: [],
  allLocations: null
})
export const actions = {
  async GET_SITIES (context) {
    const citiesResponse = await this.app.apolloProvider.defaultClient.query({
      query: citiesQuery
    })
    const cities = []
    await context.dispatch('FETCH_LOCATIONS')
    const locationsById = context.getters.GET_LOCATIONS_BY_CITY_ID
    for (const i in citiesResponse.data.manufaqturySite.crud.cities.elements) {
      const el = citiesResponse.data.manufaqturySite.crud.cities.elements[i]
      cities.push({
        id: el.id,
        title: el.fullData.title,
        locations: locationsById[el.id]
      })
    }
    return cities
  },
  async FETCH_LOCATIONS (context, options) {
    if (!context.state.allLocations) {
      const q = {
        query: locationsQuery
      }
      if (options) {
        q.variables = { cityId: options.id }
      }
      const locationsResponse = await this.app.apolloProvider.defaultClient.query(q)
      const locations = []
      locationsResponse.data.manufaqturySite.crud.locations.elements.forEach((el) => {
        locations.push(el)
      })
      context.commit('SAVE_ALL_LOCATIONS', locations)
    }

    return context.state.allLocations
  }
}

export const mutations = {
  SAVE_CITIES (state, payload) {
    state.cities = payload
  },
  SAVE_ALL_LOCATIONS (state, locations) {
    state.allLocations = locations
  }
}

export const getters = {
  GET_CITIES (state) {
    return state.cities
  },
  GET_LOCATIONS_BY_ID (state) {
    const result = {}
    state.allLocations.forEach(a => (result[a.id] = a))
    return result
  },
  GET_LOCATIONS_BY_CITY_ID (state) {
    const result = {}
    state.allLocations.forEach((a) => {
      result[a.fullData.cities] = result[a.fullData.cities] || []
      result[a.fullData.cities].push(a)
    })
    return result
  }
}
