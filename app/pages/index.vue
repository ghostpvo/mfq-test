<template>
  <div>
    <main-banner
      v-observe-visibility="{
        callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'mainBanner'),
        once: true
      }"
      :class="{ 'animated-mode': blocksVisibility.mainBanner }"
    />
    <div class="locations">
      <all-locations
        v-observe-visibility="{
          callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'allLocations'),
          once: true
        }"
        :class="{ 'animated-mode': blocksVisibility.allLocations }"
        :cities="cities"
        v-model="currentLocation"
      />
      <template v-if="currentLocation.fullData">
        <office-demo
          :have-button="true"
          :mainSubtitle="'ЛОКАЦИЯ'"
          :mainTitle="currentLocation.fullData.title"
          :mainDscr="currentLocation.fullData.description"
          :buttonTitle="'ПОДРОБНЕЕ'"
          :main-pic="'/poklon.jpeg'"
          :linkTo="'/locations/poklonnaya-gora'"
          :mainTextColor="'#1D1D1D'"
          :backgroundColor="'#FFF'"
          :flexDirection="'row-reverse'"
          :showLocation="true"
          :locationName="currentLocation.fullData.address"
          :isMainBlc="true"
          :offers="offersFetched"
        />
        <stories-popup
          :state="$store.state.layout.storiesModalState"
          @close="$store.commit('layout/SET_STORIES_MODAL_STATE', false)"
          :slides="offersFetched.map(e => ({pic: e.pic}))"
        />
      </template>
    </div>
    <div class="office-form-wrap">
      <office-demo
        :have-button="true"
        :officeId="'premium-offices'"
        :mainPic="'/img/office_placeholder_3.jpg'"
        :mainSubtitle="'ОФИСЫ'"
        :mainTitle="fetched.mainpage_aggregate.element.fullData.promo_offices_title_1"
        :mainDscr="fetched.mainpage_aggregate.element.fullData.promo_offices_text_1"
        :buttonTitle="'подробнее'"
        :linkTo="'/offices'"
        :mainTextColor="'#F2F2F2'"
        :backgroundColor="'#093049'"
      />
      <main-order-form
        v-observe-visibility="{
          callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'form1'),
          once: true
        }"
        :title="fetched.mainpage_aggregate.element.fullData.promo_offices_title_2"
        :description="fetched.mainpage_aggregate.element.fullData.promo_offices_text_2"
        :class="{ 'animated-mode': blocksVisibility.form1 }"
        :options="locationsTitleList"
        :mailInputLeft="true"
        :btnLeft="true"
      />
    </div>
    <offices-for-teams
      :isTeamsOfficesBlc="true"
      :mainTitle="'ОФИСЫ И КОВОРКИНГ ДЛЯ ЛЮБОЙ КОМАНДЫ'"
      :items="officesFetched"
      @clicked="linkTo"
    />
    <what-we-offer
      v-observe-visibility="{
        callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'whatWeOffer'),
        once: true
      }"
      :class="{ 'animated-mode': blocksVisibility.whatWeOffer }"
      :items="fetched.squares_info_block.elements"
    />
    <div
      class="office-form-wrap"
    >
      <office-demo
        :officeId="'talkrooms'"
        :mainPic="'/img/office_placeholder_4.jpg'"
        :mainSubtitle="'ПЕРЕГОВОРНЫЕ КОМНАТЫ'"
        :mainTitle="fetched.mainpage_aggregate.element.fullData.talks_room_title_1"
        :mainDscr="fetched.mainpage_aggregate.element.fullData.talks_room_text_1"
        :buttonTitle="'ПОДРОБНЕЕ'"
        :haveButton="false"
        :linkTo="'/img/office_placeholder.jpg'"
        :mainTextColor="'#F2F2F2'"
        :backgroundColor="'#093049'"
      />
      <!--<main-order-form
        v-observe-visibility="{
          callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'form2'),
          once: true
        }"
        :class="{ 'animated-mode': blocksVisibility.form2 }"
        :title="fetched.mainpage_aggregate.element.fullData.talks_room_title_2"
        :description="fetched.mainpage_aggregate.element.fullData.talks_room_text_2"
        :haveDatepicker="true"
        :telInputLeft="false"
        :chooseAreaSelect="false"
        :haveTimeInput="true"
      />-->
      <book-an-office
        v-observe-visibility="{
          callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'bookAnOffice'),
          once: true
        }"
        :class="{ 'animated-mode': blocksVisibility.bookAnOffice }"
        :title="'У вас встреча, мастер-класс или переговоры с партнерами?'"
        :txt="'Бронируйте переговорную комнату, и мы встретим вас и ваших гостей, предложим кофе. Уверены, ваша встреча пройдет продуктивно!'"
        @clicked="bookOfficeClicked()"
      />
    </div>
    <our-mission
      v-observe-visibility="{
        callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'ourMission'),
        once: true
      }"
      :class="{ 'animated-mode': blocksVisibility.ourMission }"
      :text="fetched.mainpage_aggregate.element.fullData.our_mission"
    />
    <office-demo
      :officeId="'event-areas'"
      :mainPic="fetched.mainpage_aggregate.element.fullData.events_locations_photo ? fetched.mainpage_aggregate.element.fullData.events_locations_photo.fullUrl : '/img/office_placeholder_5.jpg'"
      :mainSubtitle="'ПЛОЩАДКИ ДЛЯ МЕРОПРИЯТИЙ'"
      :mainTitle="'Q-HALL'"
      :mainDscr="'Многофункциональная площадка для деловых и образовательных мероприятий'"
      :buttonTitle="'Забронировать'"
      :isPopupButton="true"
      :mainTextColor="'#1D1D1D'"
      :backgroundColor="'#F2F2F2'"
      :flexDirection="'row-reverse'"
      :qHallBlc="true"
      :showLocation="true"
      :locationName="'ул. Поклонная, д. 3'"
      :lists="lists"
    />
    <event-calendar v-if="false"/>
    <for-developers
      :title="fetched.mainpage_aggregate.element.fullData.for_developers_title"
      :text="fetched.mainpage_aggregate.element.fullData.for_developers_text"
      :link="fetched.mainpage_aggregate.element.fullData.for_developers_link"
    />
    <offices-for-teams
      v-if="false"
      :blcId="'boutique-blc'"
      :isBoutiqueBlc="true"
      :mainTitle="fetched.mainpage_aggregate.element.fullData.boutique_title"
      :mainDescr="fetched.mainpage_aggregate.element.fullData.boutique_text"
      :items="$store.getters['fetching/mapped/BOUTIQUE']"
    />
    <loyalty-program
      v-observe-visibility="{
        callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'loyaltyProgram'),
        once: true
      }"
      :class="{ 'animated-mode': blocksVisibility.loyaltyProgram }"
      :title="fetched.mainpage_aggregate.element.fullData.loyalty_title"
      :text="fetched.mainpage_aggregate.element.fullData.loyalty_text"
      :link="fetched.mainpage_aggregate.element.fullData.loyalty_link"
    />
    <map-main/>
  </div>
</template>

<script>

import WhatWeOffer from '../components/Global/WhatWeOffer/WhatWeOffer'
import AllLocations from '../components/Global/AllLocations/AllLocations'
import OfficeDemo from '../components/Global/OfficeDemo/OfficeDemo'
import MainOrderForm from '../components/Global/MainOrderForm/MainOrderForm'
import LoyaltyProgram from '../components/Global/LoyaltyProgram/LoyaltyProgram'
import MainBanner from '../components/Global/MainBanner/MainBanner'
import OurMission from '../components/Global/OurMission/OurMission'
import OfficesForTeams from '../components/Global/OfficesForTeams/OfficesForTeams'
import MapMain from '../components/Global/MapMain/MapMain'
import EventCalendar from '../components/Global/EventCalendar/EventCalendar'
import ForDevelopers from '../components/Global/ForDevelopers/ForDevelopers'
import StoriesPopup from '../components/Popups/Stories'
import BookAnOffice from '../components/Global/BookAnOffice/BookAnOffice'
import mixins from '~/plugins/mixins'

export default {
  components: {
    BookAnOffice,
    ForDevelopers,
    EventCalendar,
    MapMain,
    OfficesForTeams,
    OurMission,
    MainBanner,
    AllLocations,
    LoyaltyProgram,
    MainOrderForm,
    OfficeDemo,
    WhatWeOffer,
    StoriesPopup
  },
  mixins: [mixins.visibility],
  data () {
    return {
      currentLocation: {},
      blocksVisibility: {
        mainBanner: false,
        allLocations: false,
        bookAnOffice: false,
        form1: false,
        whatWeOffer: false,
        form2: false,
        ourMission: false,
        loyaltyProgram: false
      },
      lists: [
        {
          id: 1,
          title: '2 зала для мероприятий',
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
  computed: {
    offersFetched () {
      return this.currentLocation.subEntity.stories_block.map(e => ({
        id: e.id,
        linkTo: e.fullData.photo.fullUrl,
        pic: e.fullData.photo.fullUrl,
        title: e.fullData.title,
        instStory: true,
        subtitles: [
          {
            id: 1,
            title: e.fullData.description
          }
        ]
      }))
    },
    officesFetched () {
      return this.fetched.offices_info_block.elements.map(office => ({
        id: office.id,
        pic: this.$handlers.fileStorage.cFile(office.fullData.photo, 410, 238, { fm: 'jpg', fit: 'crop' }),
        title: office.fullData.title,
        dscr: office.fullData.text,
        link: office.fullData.link
      }))
    }
  },
  async asyncData (context) {
    const data = await context.store.dispatch('fetching/fetchMainData')

    const locationsTitleList = []
    data.manufaqturySite.crud.locations_aggregate.elements.forEach(({ fullData }) => {
      locationsTitleList.push(fullData.title)
    })
    return {
      fetched: data.manufaqturySite.crud,
      cities: await context.store.dispatch('locations/GET_SITIES'),
      locationsTitleList
    }
  },
  async fetch (app) {
    // await app.store.commit('header/header/SET_MENU_TYPE', 'main-menu')
  },
  head () {
    return {
      title: 'MANUFAQTURY',
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
  },
  methods: {
    linkTo () {
      window.location.href = '/offices'
    },
    bookOfficeClicked () {
      window.SpaceinWidget.run('a94060f6-3f07-47d4-b4af-cf60b4eb6f1e')
    }
  }
}
</script>

<style lang="scss" scoped>
  /*.office-form-wrap {
    position: relative;
    margin-bottom: 100px; // высота частки выступающей формы

    @include r-max(1700) {
      margin-bottom: 82px;
    }

    @include r-max(1100) {
      margin-bottom: 0;
    }
  }*/
</style>
