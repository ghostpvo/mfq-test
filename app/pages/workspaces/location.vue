<template>
  <div>
    <!--Добавить другие пропорции обрезки, когда фото будет обрезаться на сервере + подогнать под макет
     высоту блока через пропс isMainBanner-->
    <office-demo
      :mainSubtitle="'ЛОКАЦИЯ'"
      :mainTitle="currentLocation.title"
      :mainDscr="currentLocation.description"
      :haveButton="false"
      :buttonTitle="'ПОДРОБНЕЕ'"
      :linkTo="'/img/office_placeholder.jpg'"
      :mainTextColor="'#1D1D1D'"
      :backgroundColor="'#FFF'"
      :flexDirection="'row-reverse'"
      :showLocation="true"
      :locationName="currentLocation.address"
      :isMainBlc="true"
      :isMainBanner="true"
      :offers="offers"
    />
    <workspace-manager />
    <div>
      <offices-for-teams
        :mainTitle="'ОФИСЫ'"
        :items="offices"
        :showShortInfo="true"
        @clicked="showModalPopup"
      />
      <div class="slider-form-wrap">
        <office-demo-slider
          :items="offices"
          :haveForm="true"
        />
        <main-order-form
          v-observe-visibility="{
            callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'form1'),
            once: true
          }"
          :subtitle="'ОФИС'"
          :title="'Выберите идеальное место для своего офиса'"
          :description="'Выберите город, локацию, метро, и мы обязательно пришлем Вам индивидуальное предложение. Но мы не будем спамить и бомбить ненужными предложениями '"
          :class="{ 'animated-mode': blocksVisibility.form1 }"
          :options="locationsTitleList"
          :forOfficeDemoSliderBlc="true"
          :mailInputLeft="true"
          :btnLeft="true"
        />
      </div>
    </div>
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
        :mainSubtitle="'ПЕРЕГОВОРНЫЕ КОМНАТЫ'"
        :mainTitle="fetched.mainpage_aggregate.element.fullData.talks_room_title_1"
        :mainDscr="fetched.mainpage_aggregate.element.fullData.talks_room_text_1"
        :haveButton="false"
        :buttonTitle="'ПОДРОБНЕЕ'"
        :linkTo="'/img/office_placeholder.jpg'"
        :mainTextColor="'#F2F2F2'"
        :backgroundColor="'#093049'"
        :haveForm="false"
      />
      <main-order-form
        v-observe-visibility="{
          callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'form2'),
          once: true
        }"
        :class="{ 'animated-mode': blocksVisibility.form2 }"
        :subtitle="'ПЕРЕГОВОРНАЯ КОМНАТА'"
        :title="fetched.mainpage_aggregate.element.fullData.talks_room_title_2"
        :description="fetched.mainpage_aggregate.element.fullData.talks_room_text_2"
        :haveDatepicker="true"
        :telInputLeft="false"
        :chooseAreaSelect="false"
        :haveTimeInput="true"
      />
    </div>
    <div>
      <offices-for-teams
        :mainTitle="'Площадки для мероприятий'"
        :items="evenWorkspaces"
        :showShortInfo="true"
      />
      <office-demo-slider
        :items="evenWorkspaces"
      />
    </div>
    <offices-for-teams
      v-if="false"
      :blcId="'boutique-blc'"
      :isBoutiqueBlc="true"
      :mainTitle="fetched.mainpage_aggregate.element.fullData.boutique_title"
      :mainDescr="fetched.mainpage_aggregate.element.fullData.boutique_text"
      :items="boutiques"
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
    <stories-popup
      :state="$store.state.layout.storiesModalState"
      @close="$store.commit('layout/SET_STORIES_MODAL_STATE', false)"
    />
  </div>
</template>

<script>
import MapMain from '~/components/Global/MapMain/MapMain'
import OfficeDemo from '~/components/Global/OfficeDemo/OfficeDemo'
import mainPage from '~/graphql/mainPage.graphql'
import StoriesPopup from '~/components/Popups/Stories'
import OfficesForTeams from '~/components/Global/OfficesForTeams/OfficesForTeams'
import OfficeDemoSlider from '~/components/Global/OfficeDemoSlider/OfficeDemoSlider'
import MainOrderForm from '~/components/Global/MainOrderForm/MainOrderForm'
import WhatWeOffer from '~/components/Global/WhatWeOffer/WhatWeOffer'
import LoyaltyProgram from '~/components/Global/LoyaltyProgram/LoyaltyProgram'
import WorkspaceManager from '~/components/Global/WorkspaceManager/WorkspaceManager'
import mixins from '~/plugins/mixins'

export default {
  name: 'Location',
  components: { WorkspaceManager, LoyaltyProgram, WhatWeOffer, MainOrderForm, OfficeDemoSlider, OfficesForTeams, StoriesPopup, OfficeDemo, MapMain },
  mixins: [ mixins.visibility ],
  data () {
    return {
      blocksVisibility: {
        form1: false,
        whatWeOffer: false,
        form2: false,
        loyaltyProgram: false,
        workspaceManager: false
      },
      currentLocation: {
        title: 'ПОКЛОННАЯ ГОРА',
        address: 'ул. Поклонная, д. 3',
        description: 'Многофункциональная площадка для среднего и крупного бизнеса. \n' +
          'Современные готовые офисы для корпораций и среднего бизнеса в деловом квартале poklonkaplace в 5 минутах ' +
          'от метро кутузовская. Больше не нужно думать об организации офиса — мы подумали обо всем, что вам потребуется'
      },
      offers: [
        {
          id: 1,
          linkTo: '/img/office_placeholder.jpg',
          pic: '/img/office_demo_offer_1.png',
          title: 'Офисы от 15 м<sup>2</sup> до 3000 м<sup>2</sup>',
          instStory: true,
          subtitles: [
            {
              id: 1,
              title: 'от 2 человек до 400 человек'
            }
          ]
        },
        {
          id: 2,
          linkTo: '/img/office_placeholder.jpg',
          pic: '/img/office_demo_offer_2.png',
          title: 'Конференц-зал 430 м<sup>2</sup>',
          subtitles: [
            {
              id: 1,
              title: '400 человек театром'
            },
            {
              id: 2,
              title: '210 человек в банкетной рассадке'
            }
          ]
        }
      ],
      offices: [
        {
          id: 1,
          pic: '/img/offices_for_teams_1.jpg',
          mainSubtitle: 'Мини-офис',
          title: 'Офис с отдельным входом',
          dscr: 'Офис для 14 человек с отдельным входом и собственной переговорной комнатой и x-Box зоной. Вход в офис осуществляется на основе автоматизированной системы доступа и управления офисом ASOM',
          link: '',
          locationName: 'ул. Поклонная, д. 3',
          capacity: '14 человек',
          meter: '62 м<sup>2</sup>',
          bestChoiceTitle: 'Офис твоей мечты',
          bestChoicePic: '/img/best_choice_pic.svg'
        },
        {
          id: 2,
          pic: '/img/offices_for_teams_2.jpg',
          mainSubtitle: 'Мини-офис',
          title: 'Офис для небольшой команды',
          dscr: 'Мебель, интернет, ежедневный клининг, охрана, автоматизированная система доступа ASOM уже включены в стоимость',
          link: '',
          locationName: 'ул. Поклонная, д. 3',
          capacity: '6 человек',
          meter: '27 м<sup>2</sup>',
          bestChoiceTitle: 'Офис твоей мечты',
          bestChoicePic: '/img/best_choice_pic.svg'
        },
        {
          id: 3,
          pic: '/img/offices_for_teams_3.jpg',
          mainSubtitle: 'Мини-офис',
          title: 'Офис с серверной',
          dscr: 'Мебель, интернет, ежедневный клининг, охрана, автоматизированная система доступа ASOM уже включены в стоимость',
          link: '',
          locationName: 'ул. Поклонная, д. 3',
          capacity: '7 человек',
          meter: '29 м<sup>2</sup>',
          bestChoiceTitle: 'Офис твоей мечты',
          bestChoicePic: '/img/best_choice_pic.svg'
        }
      ],
      evenWorkspaces: [
        {
          id: 1,
          pic: '/img/offices_for_teams_1.jpg',
          mainSubtitle: 'Площадки для мероприятий',
          title: 'Конференц-зал',
          dscr: 'Офис для 14 человек с отдельным входом и собственной переговорной комнатой и x-Box зоной. Вход в офис осуществляется на основе автоматизированной системы доступа и управления офисом ASOM',
          link: '',
          locationName: 'ул. Поклонная, д. 3',
          capacity: '350 человек',
          meter: '420 м<sup>2</sup>',
          benefitTitle: 'Оборудование',
          benefits: [
            {
              point: 'Большой светодиодный экран 5 м Х  2,5 м'
            },
            {
              point: 'Мобильные мультимедийные поверхности'
            },
            {
              point: 'Системы звукоусиления'
            },
            {
              point: 'Беспроводная сеть WI-Fi, 200 мб/с'
            }
          ]
        },
        {
          id: 2,
          pic: '/img/offices_for_teams_2.jpg',
          mainSubtitle: 'Площадки для мероприятий',
          title: 'Конференц-зал',
          dscr: 'Мебель, интернет, ежедневный клининг, охрана, автоматизированная система доступа ASOM уже включены в стоимость',
          link: '',
          locationName: 'ул. Поклонная, д. 3',
          capacity: '6 человек',
          meter: '27 м<sup>2</sup>',
          benefitTitle: 'Оборудование',
          benefits: [
            {
              point: 'Большой светодиодный экран 5 м Х  2,5 м'
            },
            {
              point: 'Мобильные мультимедийные поверхности'
            },
            {
              point: 'Системы звукоусиления'
            },
            {
              point: 'Беспроводная сеть WI-Fi, 200 мб/с'
            }
          ]
        },
        {
          id: 3,
          pic: '/img/offices_for_teams_3.jpg',
          mainSubtitle: 'Площадки для мероприятий',
          title: 'Конференц-зал',
          dscr: 'Мебель, интернет, ежедневный клининг, охрана, автоматизированная система доступа ASOM уже включены в стоимость',
          link: '',
          locationName: 'ул. Поклонная, д. 3',
          capacity: '7 человек',
          meter: '29 м<sup>2</sup>',
          benefitTitle: 'Оборудование',
          benefits: [
            {
              point: 'Большой светодиодный экран 5 м Х  2,5 м'
            },
            {
              point: 'Мобильные мультимедийные поверхности'
            },
            {
              point: 'Системы звукоусиления'
            },
            {
              point: 'Беспроводная сеть WI-Fi, 200 мб/с'
            }
          ]
        }
      ],
      boutiques: [
        {
          id: 1,
          pic: '/img/offices_for_teams_1.jpg',
          title: 'Студия Артемия Лебедева',
          dscr: 'Сфера: Промышленный дизайн, городской дизайн, графический дизайн, дизайн среды, системы навигации, создание сайтов, проектирование интерфейсов, создание шрифтов, дизайн паттернов, архитектура и книгоиздание.',
          link: '',
          logo: '/img/lebedev_logo.png'
        },
        {
          id: 2,
          pic: '/img/offices_for_teams_2.jpg',
          title: 'Студия Артемия Лебедева',
          dscr: 'Сфера: Промышленный дизайн, городской дизайн, графический дизайн, дизайн среды, системы навигации, создание сайтов, проектирование интерфейсов, создание шрифтов, дизайн паттернов, архитектура и книгоиздание.',
          link: '',
          logo: '/img/lebedev_logo.png'
        },
        {
          id: 3,
          pic: '/img/offices_for_teams_3.jpg',
          title: 'Студия Артемия Лебедева',
          dscr: 'Сфера: Промышленный дизайн, городской дизайн, графический дизайн, дизайн среды, системы навигации, создание сайтов, проектирование интерфейсов, создание шрифтов, дизайн паттернов, архитектура и книгоиздание.',
          link: '',
          logo: '/img/lebedev_logo.png'
        }
      ]
    }
  },
  async asyncData (context) {
    const { data } = await context.app.apolloProvider.defaultClient.query({ query: mainPage })

    const locationsTitleList = []
    data.manufaqturySite.crud.locations.elements.forEach(({ fullData }) => {
      locationsTitleList.push(fullData.title)
    })
    return {
      fetched: data.manufaqturySite.crud,
      cities: await context.store.dispatch('locations/GET_SITIES'),
      locationsTitleList
    }
  },
  methods: {
    showModalPopup () {
      this.$store.commit('layout/SET_FEEDBACK_MODAL_STATE', true)
    }
  },
  head () {
    return {
      title: 'MANUFAQTURY Площадка',
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

<style lang="scss" scoped>
  .slider-form-wrap {
    background-color: #F2F2F2;
  }
</style>
