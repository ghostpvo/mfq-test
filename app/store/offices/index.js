import officesQuery from './offices.graphql'

export const state = () => ({
  offices: []
})
export const actions = {
  async GET_OFFICES (context, options) {
    const { data } = await this.app.apolloProvider.defaultClient.query({
      query: officesQuery
    })
    const offices = []
    const elements = data.manufaqturySite.crud.offices.elements
    elements.forEach(({ id, fullData }) => {
      if (fullData.hide === '1') { return }
      let location = ''
      data.manufaqturySite.crud.locations.elements.forEach((el) => {
        if (fullData.location === el.id) {
          location = el.fullData.address
        }
      })
      let flag = true
      if (options) {
        if (options.meter && Number(fullData.area) < options.meter) {
          flag = false
        }
        if (options.peopleAmount && Number(fullData.filter_people_number) < options.peopleAmount) {
          flag = false
        }
        if (options.metro && fullData.metro !== options.metro.value) {
          flag = false
        }
        if (options.specialOffers && options.specialOffers === true) {
          if (fullData.special === false) {
            flag = false
          }
        }
      }
      if (flag) {
        offices.push({
          id,
          pic: fullData.photo ? fullData.photo.fullUrl : '',
          mainSubtitle: 'Мини-офис',
          title: fullData.title,
          dscr: fullData.dscr,
          link: '',
          locationName: location,
          bestChoiceTitle: fullData.dream_office === '1' ? 'Офис твоей мечты' : undefined,
          bestChoicePic: fullData.dream_office === '1' ? '/img/best_choice_pic.svg' : undefined,
          capacity: fullData.filter_people_number + 'человек',
          meter: fullData.area + 'м<sup>2</sup>'
        })
      }
    })
    return offices
  }
}
