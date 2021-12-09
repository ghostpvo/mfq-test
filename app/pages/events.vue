<template>
  <div>
    <main-banner
      :haveTitle="true"
      :bannerTitle="'Площадки для мероприятий'"
      :haveArrowDown="false"
      :slides="bannerData"
    />
    <office-demo
      :officeId="'event-areas'"
      :mainPic="fetched.mainpage_aggregate.element.fullData.events_locations_photo ? fetched.mainpage_aggregate.element.fullData.events_locations_photo.fullUrl : '/img/office_placeholder_5.jpg'"
      :mainSubtitle="'ПЛОЩАДКИ ДЛЯ МЕРОПРИЯТИЙ'"
      :mainTitle="'Q-HALL'"
      :mainDscr="'Многофункциональная площадка для деловых и образовательных мероприятий'"
      :buttonTitle="'Оставить заявку'"
      :isPopupButton="true"
      :mainTextColor="'#1D1D1D'"
      :backgroundColor="'#F2F2F2'"
      :flexDirection="'row-reverse'"
      :qHallBlc="true"
      :showLocation="true"
      :locationName="'ул. Поклонная, д. 3'"
      :lists="lists"
    />
    <find-offices
      :showFilter="false"
      :mainTitle="'Найти площадку для мероприятия'"
      :peopleAmountFilter="true"
      :eventType="true"
      :choseWorkspace="true"
      :items="searchResults"
      v-on:search="searchHall"
    />
    <office-demo-slider
      :items="searchResults"
    />
    <what-we-offer
      v-if="false"
      v-observe-visibility="{
        callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'whatWeOffer'),
        once: true
      }"
      :class="{ 'animated-mode': blocksVisibility.whatWeOffer }"
      :items="fetched.squares_info_block.elements"
    />
    <event-in-manufaqtury
      v-observe-visibility="{
        callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'mfEvent'),
        once: true
      }"
      :class="{ 'animated-mode': blocksVisibility.mfEvent }"
    />
    <map-main />
  </div>
</template>

<script>
import MainBanner from '../components/Global/MainBanner/MainBanner'
import MapMain from '../components/Global/MapMain/MapMain'
import FindOffices from '../components/Global/FindOffices/FindOffices'
import OfficeDemoSlider from '../components/Global/OfficeDemoSlider/OfficeDemoSlider'
import WhatWeOffer from '../components/Global/WhatWeOffer/WhatWeOffer'
import mainPage from '../graphql/mainPage.graphql'
import eventPage from '../graphql/eventsPage.graphql'
import EventInManufaqtury from '../components/Global/EventInManufaqtury/EventInManufaqtury'
import OfficeDemo from '../components/Global/OfficeDemo/OfficeDemo'
import mixins from '~/plugins/mixins'

export default {
  name: 'Events',
  components: { OfficeDemo, EventInManufaqtury, WhatWeOffer, OfficeDemoSlider, FindOffices, MapMain, MainBanner },
  mixins: [ mixins.visibility ],
  data () {
    return {
      blocksVisibility: {
        mainBanner: false,
        whatWeOffer: false,
        mfEvent: false
      },
      lists: [
        {
          id: 1,
          title: '4 зала для мероприятий',
          points: [
            {
              id: 1,
              txt: 'Конференц-зал на 250 человек'
            },
            {
              id: 2,
              txt: 'Большой зал на 160 человек'
            },
            {
              id: 3,
              txt: 'Малый зал на 30 человек'
            },
            {
              id: 4,
              txt: 'Библиотека на 25 человек'
            }
          ]
        },
        {
          id: 2,
          title: 'Оборудование',
          points: [
            {
              id: 1,
              txt: 'Большой светодиодный экран 4.5 м х 2.8 м'
            },
            {
              id: 2,
              txt: 'Конференц-оборудование'
            },
            {
              id: 3,
              txt: 'Системы звукоусиления'
            },
            {
              id: 4,
              txt: 'Специальные зоны для синхронного оборудования'
            }
          ]
        }
      ]
    }
  },
  async asyncData (context) {
    await context.store.dispatch('fetching/fetchMainData')
    const { data } = await context.app.apolloProvider.defaultClient.query({ query: mainPage })
    const eventPageData = await context.app.apolloProvider.defaultClient.query({ query: eventPage })
    const bannerData = []
    let i = 0
    eventPageData.data.manufaqturySite.crud.event_hall_aggregate.element.subEntity.banner_block.forEach((el) => {
      if (el.fullData.image) {
        bannerData.push({
          id: ++i,
          pic: el.fullData.image.fullUrl,
          alt: el.fullData.alt
        })
      }
    })
    const locationsTitleList = []
    data.manufaqturySite.crud.locations_aggregate.elements.forEach(({ fullData }) => {
      locationsTitleList.push(fullData.title)
    })
    return {
      fetched: data.manufaqturySite.crud,
      cities: await context.store.dispatch('locations/GET_SITIES'),
      searchResults: await context.store.dispatch('events/GET_HALLS'),
      locationsTitleList,
      bannerData
    }
  },
  methods: {
    async searchHall (options) {
      this.searchResults = await this.$store.dispatch('events/GET_HALLS', options)
    }
  },
  head () {
    return {
      title: 'MANUFAQTURY Мероприятия',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Manufaqtury'
        },
        { hid: 'keywords', name: 'keywords', content: 'manufaqtury' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Manufaqtury' },
        { property: 'og:description', content: 'Manufaqtury' },
        { property: 'og:url', content: '' },
        { property: 'og:image', content: '' },
        { property: 'fb:app_id', content: '' },
        { property: 'og:locale', content: 'ru_RU' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
