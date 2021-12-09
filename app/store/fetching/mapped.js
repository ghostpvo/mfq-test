export const state = () => ({
  phone: '+7 926 653 60 80',
  email: 'dm@manufaqtury.com'
})

export const actions = {}

export const mutations = {}

export const getters = {
  BOUTIQUE (state, getters, rootState, rootGetters) {
    return rootState.fetching.mainPageData.manufaqturySite.crud.boutique_block.elements.map(el => ({
      id: el.id,
      pic: el.fullData.photo.fullUrl,
      logo: el.fullData.logo.fullUrl,
      title: el.fullData.title,
      dscr: el.fullData.text,
      link: el.fullData.link
    }))
  },
  METRO (state, getters, rootState, rootGetters) {
    return rootState.fetching.mainPageData.manufaqturySite.crud.metro.elements.map(el => el.fullData.title)
  },
  GET_CONTACTS (a, b, rootState) {
    const contactData = rootState.fetching.mainPageData.manufaqturySite.crud.contacts.element.fullData

    const phone = contactData.phone
    const phoneNormalized = phone && phone.replace(/[^0-9]/g, '')
    const email = contactData.email

    return {
      phone,
      phoneNormalized,
      email
    }
  },
  GET_DREAM_OFFICE_INFO (a, b, rootState) {
    return rootState.fetching.mainPageData.manufaqturySite.crud.dream_office_aggregate && rootState.fetching.mainPageData.manufaqturySite.crud.dream_office_aggregate.element.fullData
  }
}
