<template>
  <div>
    <main-banner
      :haveTitle="true"
      :bannerTitle="'ОФИСЫ ДЛЯ КОМПАНИЙ БУДУЩЕГО'"
    />
    <find-offices
      :mainTitle="'Выбрать площадку'"
      :roomTypes="true"
      :choseWorkspace="true"
      :items="searchResults"
      :showShortInfo="false"
      :showLocationInItem="true"
      :haveBiggerTitle="true"
      :btnTitle="'найти'"
    />
    <map-main />
  </div>
</template>

<script>
import MainBanner from '~/components/Global/MainBanner/MainBanner'
import MapMain from '~/components/Global/MapMain/MapMain'
import FindOffices from '~/components/Global/FindOffices/FindOffices'
export default {
  name: 'Workspaces',
  components: { FindOffices, MapMain, MainBanner },
  data () {
    return {
      searchResults: [
        {
          id: 1,
          pic: '/img/offices_for_teams_1.jpg',
          title: 'Поклонная гора',
          locationName: 'г.Москва, ул. Поклонная, д. 3',
          link: '/workspaces/location',
          offers: [
            {
              pic: '/img/office_demo_offer_1.png',
              title: 'Офисы от 15 м<sup>2</sup> до 3000 м<sup>2</sup>',
              subtitles: [
                {
                  title: 'от 2 человек до 400 человек'
                }
              ]
            },
            {
              pic: '/img/office_demo_offer_2.png',
              title: 'Конференц-зал 430 м<sup>2</sup>',
              subtitles: [
                {
                  title: '400 человек театром'
                },
                {
                  title: '210 человек в банкетной рассадке'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          pic: '/img/offices_for_teams_2.jpg',
          title: 'Поклонная гора',
          locationName: 'г.Москва, ул. Поклонная, д. 3',
          link: '/workspaces/location',
          offers: [
            {
              pic: '/img/office_demo_offer_1.png',
              title: 'Офисы от 15 м<sup>2</sup> до 3000 м<sup>2</sup>',
              subtitles: [
                {
                  title: 'от 2 человек до 400 человек'
                }
              ]
            },
            {
              pic: '/img/office_demo_offer_2.png',
              title: 'Конференц-зал 430 м<sup>2</sup>',
              subtitles: [
                {
                  title: '400 человек театром'
                },
                {
                  title: '210 человек в банкетной рассадке'
                }
              ]
            }
          ]
        },
        {
          id: 3,
          pic: '/img/offices_for_teams_3.jpg',
          title: 'Поклонная гора',
          locationName: 'г.Москва, ул. Поклонная, д. 3',
          link: '/workspaces/location',
          offers: [
            {
              pic: '/img/office_demo_offer_1.png',
              title: 'Офисы от 15 м<sup>2</sup> до 3000 м<sup>2</sup>',
              subtitles: [
                {
                  title: 'от 2 человек до 400 человек'
                }
              ]
            },
            {
              pic: '/img/office_demo_offer_2.png',
              title: 'Конференц-зал 430 м<sup>2</sup>',
              subtitles: [
                {
                  title: '400 человек театром'
                },
                {
                  title: '210 человек в банкетной рассадке'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  async asyncData (context) {
    await context.store.dispatch('fetching/fetchMainData')
  },
  head () {
    return {
      title: 'MANUFAQTURY Площадки',
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
