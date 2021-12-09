import mainPage from '~/graphql/mainPage.graphql'

export const state = () => ({
  globalData: null,
  locations: null,
  mainPageData: null
})

export const actions = {
  async fetchMainData (context) {
    const { data } = await this.app.apolloProvider.defaultClient.query({ query: mainPage })
    context.commit('setMainData', data)

    return data
  }
}

export const mutations = {
  setMainData (state, data) {
    state.mainPageData = data
  }
}

export const getters = {
  getLocations (state) {
    return state.mainPageData.manufaqturySite.crud.locations_aggregate.elements
  }
}
