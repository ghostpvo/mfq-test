import hallsQuery from './halls.graphql'

export const state = () => ({
  halls: []
})
export const actions = {
  async GET_HALLS (context, options) {
    const { data } = await this.app.apolloProvider.defaultClient.query({
      query: hallsQuery
    })
    const halls = []
    data.manufaqturySite.crud.event_hall.elements.forEach(({ id, fullData }) => {
      let location = ''
      data.manufaqturySite.crud.locations.elements.forEach((el) => {
        if (fullData.location === el.id) {
          location = el.fullData.address
        }
      })
      const benefits = []
      data.manufaqturySite.crud.equipment.elements.forEach((el) => {
        fullData.equipment.forEach((id) => {
          if (id === el.id) {
            benefits.push({ point: el.fullData.title })
          }
        })
      })
      let flag = true
      if (options) {
        if (options.eventTypes && !fullData.filter_event_type.includes(options.eventTypes.value)) {
          flag = false
        }
        if (options.peopleAmount && Number(fullData.filter_people_number) < options.peopleAmount) {
          flag = false
        }
        if (options.workspace && fullData.location !== options.workspace.value) {
          flag = false
        }
      }
      if (flag) {
        halls.push({
          id,
          pic: fullData.photo ? fullData.photo.fullUrl : '',
          mainSubtitle: fullData.mainSubtitle,
          title: fullData.title,
          dscr: fullData.dscr,
          link: fullData.link,
          locationName: location,
          capacity: fullData.filter_people_number + 'человек',
          meter: fullData.area + 'м<sup>2</sup>',
          benefitTitle: 'Оборудование',
          benefits
        })
      }
    })
    return halls
  }
}
