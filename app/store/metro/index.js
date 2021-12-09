import metroQuery from './metro.graphql'

export const state = () => ({
  metro: []
})
export const actions = {
  async GET_METRO (context) {
    const { data } = await this.app.apolloProvider.defaultClient.query({
      query: metroQuery
    })
    const metro = []
    data.manufaqturySite.crud.metro.elements.forEach(({ id, fullData }) => {
      metro.push({
        id,
        ...fullData
      })
    })
    return metro
  }
}
