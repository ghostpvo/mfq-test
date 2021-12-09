<template>
  <div>
    <main-banner
      :haveTitle="true"
      :haveSubtitle="true"
      :bannerTitle="'ОФИСЫ БУДУЩЕГО ДЛЯ КОМПАНИЙ'"
      :bannerSubtitle="'Мы уже создали готовые офисы, в которых может разместиться ваша компания. Заезжать можно сегодня. Представьте, прямо в вашем офисе сотрудники имеют возможность, знакомиться с партнерами и клиентами, изучать новые языки, бесплатно посещать мероприятия.'"
      :slides="bannerData"
      :haveArrowDown="false"
    />
    <find-offices
      :peopleAmountFilter="true"
      :meterFilter="true"
      :metroFilter="true"
      :specialOffer="false"
      :items="searchResults"
      v-on:search="searchOffices"
      @clicked="showModalPopup"
    />
    <office-demo-slider
      ref="findOffices"
      :items="searchResults"
    />
    <what-we-offer
      v-observe-visibility="{
        callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'whatWeOffer'),
        once: true
      }"
      :class="{ 'animated-mode': blocksVisibility.whatWeOffer }"
      :items="fetched.squares_info_block.elements"
    />
    <personal-office-request
      v-observe-visibility="{
        callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'officeRequest'),
        once: true
      }"
      :class="{ 'animated-mode': blocksVisibility.officeRequest }"
      :main-pic="misc.fullData.form_photo && misc.fullData.form_photo.fullUrl"
      :mainSubtitle="'Офисы'"
      :mainTitle="'Не нашли то, что искали?'"
      :mainDscr="'Спроектируем офис для команды. Сэкономим время на поиск и создание офиса, поможем наполнить необходимым, учтем корпоративные ценности'"
      :chooseAreas="false"
      :additionalTitle="'Офис мечты'"
      :texts="texts"
    />
    <services-for-residents
      :right-photo="misc.fullData.residents_photo && misc.fullData.residents_photo.fullUrl"
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
    <map-main />
  </div>
</template>

<script>
import MainBanner from '../components/Global/MainBanner/MainBanner'
import ServicesForResidents from '../components/Global/ServicesForResidents/ServicesForResidents'
import MapMain from '../components/Global/MapMain/MapMain'
import FindOffices from '../components/Global/FindOffices/FindOffices'
import OfficeDemoSlider from '../components/Global/OfficeDemoSlider/OfficeDemoSlider'
import WhatWeOffer from '../components/Global/WhatWeOffer/WhatWeOffer'
import PersonalOfficeRequest from '../components/Global/PersonalOfficeRequest/PersonalOfficeRequest'
import OfficesForTeams from '../components/Global/OfficesForTeams/OfficesForTeams'
import LoyaltyProgram from '../components/Global/LoyaltyProgram/LoyaltyProgram'
import officePage from '../graphql/officesPage.graphql'

import mixins from '~/plugins/mixins'

export default {
  name: 'Offices',
  components: { LoyaltyProgram, OfficesForTeams, PersonalOfficeRequest, WhatWeOffer, OfficeDemoSlider, FindOffices, MapMain, ServicesForResidents, MainBanner },
  mixins: [ mixins.visibility ],
  data () {
    return {
      searchResults: [],
      blocksVisibility: {
        mainBanner: false,
        whatWeOffer: false,
        loyaltyProgram: false,
        findOffices: false,
        officeRequest: false
      },
      texts: [
        {
          id: 1,
          txt: 'Для компаний от 100 человек мы создаем индивидуальные офисы с ценностями бренда. Мы учтем любое пожелание по локации, метражу, наполнению офисов, отражению бренд-платформы и корпоративной культуры компании.'
        },
        {
          id: 2,
          txt: 'Архитектурный стиль MANUFAQTURY создан на базе исследований потребностей офисных сотрудников и отвечает современным требованиям. Над созданием офисов MANUFAQTURY трудится целая  лаборатория, которая учитывает потребности работников с точки зрения психологии, социологии, антропологии и архитектурной специфики.'
        },
        {
          id: 3,
          txt: 'Тренажерный зал, оборудованная кухня, кинотеатр по пятницам, StarBucks и кафе Prime внутри офиса, премиальные библиотеки с камином, которые вдохновляют.'
        }
      ]
    }
  },
  async asyncData (context) {
    const data = await context.store.dispatch('fetching/fetchMainData')

    const locationsTitleList = []
    data.manufaqturySite.crud.locations_aggregate.elements.forEach(({ fullData }) => {
      locationsTitleList.push(fullData.title)
    })
    const officePageData = await context.app.apolloProvider.defaultClient.query({ query: officePage })
    const bannerData = []
    let i = 0
    officePageData.data.manufaqturySite.crud.offices_aggregate.element.subEntity.banner_block.forEach((el) => {
      if (el.fullData.image) {
        bannerData.push({
          id: ++i,
          pic: el.fullData.image.fullUrl,
          alt: el.fullData.alt
        })
      }
    })
    return {
      fetched: data.manufaqturySite.crud,
      cities: await context.store.dispatch('locations/GET_SITIES'),
      searchResults: await context.store.dispatch('offices/GET_OFFICES'),
      locationsTitleList,
      bannerData,
      misc: officePageData.data.manufaqturySite.crud.offices_aggregate.element
    }
  },
  methods: {
    searchOffices (options) {
      this.searchResults = []
      this.$nextTick(async () => {
        this.searchResults = await this.$store.dispatch('offices/GET_OFFICES', options)
      })
    },
    showModalPopup () {
      this.$store.commit('layout/SET_FEEDBACK_MODAL_STATE', true)
    }
  },
  head () {
    return {
      title: 'MANUFAQTURY Офисы',
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
