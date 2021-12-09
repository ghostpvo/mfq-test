<template>
  <div>
    <office-demo
      :officeId="'premium-offices'"
      :mainSubtitle="'Офис мечты'"
      :haveButton="false"
      :isPopupButton="true"
      :buttonTitle="$store.getters['fetching/mapped/GET_DREAM_OFFICE_INFO'].button_title"
      :main-pic="$store.getters['fetching/mapped/GET_DREAM_OFFICE_INFO'].photo_1.fullUrl"
      :mainTextColor="'#1D1D1D'"
      :backgroundColor="'#F2F2F2'"
      :flexDirection="'row-reverse'"
      :haveForm="false"
      :mainTitle="$store.getters['fetching/mapped/GET_DREAM_OFFICE_INFO'].title"
      :mainDscr="$store.getters['fetching/mapped/GET_DREAM_OFFICE_INFO'].text"
    />
    <our-benefits />
    <new-economy
      v-observe-visibility="{
        callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'newEconomy'),
        once: true,
        throttle: 700
      }"
      :class="{ 'animated-mode': blocksVisibility.newEconomy }"
    />
    <flexible-offices
      v-observe-visibility="{
        callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'flexibleOffices'),
        once: true,
        throttle: 700
      }"
      :class="{ 'animated-mode': blocksVisibility.flexibleOffices }"
    />
    <our-mission
      v-observe-visibility="{
        callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'ourMission'),
        once: true,
        throttle: 700
      }"
      :class="{ 'animated-mode': blocksVisibility.ourMission }"
      :text="'Представьте, прямо в вашем офисе сотрудники имеют возможность бесплатно посещать мероприятия, знакомиться с партнерами и клиентами, изучать новые языки...'"
      :haveLogoListCaption="true"
      :items="missionLogoDscr"
    />
    <care-of-details
      v-observe-visibility="{
        callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'careOfDetails'),
        once: true,
        throttle: 700
      }"
      :class="{ 'animated-mode': blocksVisibility.careOfDetails }"
    />
    <why-profitability />
    <realized-projects
      v-if="false"
      :dreamOfficePage="true"
      :items="realizedProjects"
    />
    <offices-for-teams
      :mainTitle="'Сейчас доступны'"
      :items="freeNow"
      :showShortInfo="true"
    />
    <our-cooperation
      v-if="false"
      v-observe-visibility="{
        callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'ourCooperation'),
        once: true,
        throttle: 700
      }"
      :class="{ 'animated-mode': blocksVisibility.ourCooperation }"
    />
    <personal-office-request
      :chooseMetros="false"
      :mainSubtitle="'Офис мечты'"
      :mainTitle="'Осуществите мечты сейчас'"
      :mainDscr="'Спроектируем офис для команды. Сэкономим время на поиск и создание офиса, поможем наполнить необходимым, учтем корпоративные ценности'"
    />
    <map-main />
  </div>
</template>

<script>
import OfficeDemo from '../components/Global/OfficeDemo/OfficeDemo'
import NewEconomy from '../components/Global/NewEconomy/NewEconomy'
import MapMain from '../components/Global/MapMain/MapMain'
import WhyProfitability from '../components/Global/WhyProfitably/WhyProfitably'
import OurBenefits from '../components/Global/OurBenefits/OurBenefits'
import FlexibleOffices from '../components/Global/FlexibleOffices/FlexibleOffices'
import OurMission from '../components/Global/OurMission/OurMission'
import CareOfDetails from '../components/Global/CareOfDetails/CareOfDetails'
import OfficesForTeams from '../components/Global/OfficesForTeams/OfficesForTeams'
import PersonalOfficeRequest from '../components/Global/PersonalOfficeRequest/PersonalOfficeRequest'
import RealizedProjects from '../components/Global/RealizedProjects/RealizedProjects'
import OurCooperation from '../components/Global/OurCooperation/OurCooperation'
import mixins from '~/plugins/mixins'

export default {
  name: 'DreamOffice',
  components: {
    OurCooperation,
    RealizedProjects,
    PersonalOfficeRequest,
    OfficesForTeams,
    CareOfDetails,
    OurMission,
    FlexibleOffices,
    OurBenefits,
    WhyProfitability,
    OfficeDemo,
    NewEconomy,
    MapMain
  },
  mixins: [mixins.visibility],
  data () {
    return {
      blocksVisibility: {
        ourMission: false,
        newEconomy: false,
        flexibleOffices: false,
        careOfDetails: false,
        ourCooperation: false
      },
      missionLogoDscr: [
        {
          txt: 'Программы подбираются индивидуально.'
        },
        {
          txt: 'И это уже включено в контракт!'
        }
      ],
      realizedProjects: [
        {
          pic: '/img/realized_projects_pic.png',
          title: 'Поклонная гора',
          dscr: 'Для начинающих команд у нас есть недорогие оборудованные рабочие места с WiFi и всем необходимым для старта',
          authorPosition: 'Дизайнер',
          authorName: 'pokraslampas'
        }
        /* {
          pic: '/img/event_calendar_pic_1.jpg',
          title: 'Офис №1',
          dscr: 'Для начинающих команд у нас есть недорогие оборудованные рабочие места с WiFi и всем необходимым для старта',
          authorPosition: 'Дизайнер',
          authorName: 'pokraslampas'
        },
        {
          pic: '/img/realized_projects_pic.png',
          title: 'Офис №1',
          dscr: 'Для начинающих команд у нас есть недорогие оборудованные рабочие места с WiFi и всем необходимым для старта',
          authorPosition: 'Дизайнер',
          authorName: 'pokraslampas'
        },
        {
          pic: '/img/realized_projects_pic_1.png',
          title: 'Офис №1',
          dscr: 'Для начинающих команд у нас есть недорогие оборудованные рабочие места с WiFi и всем необходимым для старта',
          authorPosition: 'Дизайнер',
          authorName: 'pokraslampas'
        },
        {
          pic: '/img/realized_projects_pic.png',
          title: 'Офис №1',
          dscr: 'Для начинающих команд у нас есть недорогие оборудованные рабочие места с WiFi и всем необходимым для старта',
          authorPosition: 'Дизайнер',
          authorName: 'pokraslampas'
        },
        {
          pic: '/img/realized_projects_pic_1.png',
          title: 'Офис №1',
          dscr: 'Для начинающих команд у нас есть недорогие оборудованные рабочие места с WiFi и всем необходимым для старта',
          authorPosition: 'Дизайнер',
          authorName: 'pokraslampas'
        } */
      ]
    }
  },
  async asyncData (context) {
    await context.store.dispatch('fetching/fetchMainData')
    return {
      freeNow: await context.store.dispatch('offices/GET_OFFICES')
    }
  },
  head () {
    return {
      title: 'MANUFAQTURY Офис мечты',
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
