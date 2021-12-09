<template>
  <div>
    <!--Добавить другие пропорции обрезки, когда фото будет обрезаться на сервере + подогнать под макет
     высоту блока через пропс isMainBanner-->
    <office-demo
      :mainSubtitle="'ЛОКАЦИЯ'"
      :mainTitle="currentLocationInfo.fullData.title"
      :mainDscr="currentLocationInfo.fullData.description"
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
      :offers="offersFetched"
    />
    <workspace-manager :info="currentLocationInfo" v-if="false" />
    <div>
      <offices-for-teams
        :mainTitle="'ОФИСЫ'"
        :items="officesFetched"
        :showShortInfo="true"
        @clicked="showModalPopup"
      />
      <div class="slider-form-wrap">
        <office-demo-slider
          :items="officesFetched"
          :haveForm="true"
        />
        <main-order-form
          v-observe-visibility="{
            callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'form1'),
            once: true
          }"
          :subtitle="'ОФИС'"
          :title="fetched.mainpage_aggregate.element.fullData.promo_offices_title_2"
          :description="fetched.mainpage_aggregate.element.fullData.promo_offices_text_2"
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
        :items="evenWorkspacesFetched"
        :showShortInfo="true"
      />
      <office-demo-slider
        :items="evenWorkspacesFetched"
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
      :slides="offersFetched.map(e => ({pic: e.pic}))"
      @close="$store.commit('layout/SET_STORIES_MODAL_STATE', false)"
    />
  </div>
</template>

<script>
import MapMain from '~/components/Global/MapMain/MapMain'
import OfficeDemo from '~/components/Global/OfficeDemo/OfficeDemo'
import locationInfo from '~/graphql/locationInfo.graphql'
import officesForLocationQuery from '~/graphql/officesForLocations.graphql'
import StoriesPopup from '~/components/Popups/Stories'
import OfficesForTeams from '~/components/Global/OfficesForTeams/OfficesForTeams'
import OfficeDemoSlider from '~/components/Global/OfficeDemoSlider/OfficeDemoSlider'
import MainOrderForm from '~/components/Global/MainOrderForm/MainOrderForm'
import WhatWeOffer from '~/components/Global/WhatWeOffer/WhatWeOffer'
import LoyaltyProgram from '~/components/Global/LoyaltyProgram/LoyaltyProgram'
import WorkspaceManager from '~/components/Global/WorkspaceManager/WorkspaceManager'

export default {
  name: 'Location',
  components: {
    WorkspaceManager,
    LoyaltyProgram,
    WhatWeOffer,
    MainOrderForm,
    OfficeDemoSlider,
    OfficesForTeams,
    StoriesPopup,
    OfficeDemo,
    MapMain
  },
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
        address: 'г.Москва, ул. Поклонная, д. 3',
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
          locationName: 'г.Москва, ул. Поклонная, д. 3',
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
          locationName: 'г.Москва, ул. Поклонная, д. 3',
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
          locationName: 'г.Москва, ул. Поклонная, д. 3',
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
          locationName: 'г.Москва, ул. Поклонная, д. 3',
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
          locationName: 'г.Москва, ул. Поклонная, д. 3',
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
          locationName: 'г.Москва, ул. Поклонная, д. 3',
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
  computed: {
    offersFetched () {
      return this.currentLocationInfo.subEntity.stories_block.map(e => ({
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
      return this.officesData
        .filter(e => e.hide !== '1')
        .map(
          (office) => {
            const newVar = {
              id: office.id,
              pic: office.fullData.photo ? office.fullData.photo.fullUrl : '/img/offices_for_teams_2.jpg',
              mainSubtitle: 'Мини-офис',
              title: office.fullData.title,
              dscr: office.fullData.dscr,
              link: '',
              locationName: 'г.Москва, ул. Поклонная, д. 3',
              capacity: office.fullData.filter_people_number + ' человек',
              meter: office.fullData.area + ' м<sup>2</sup>',
              bestChoiceTitle: 'Офис твоей мечты',
              bestChoicePic: '/img/best_choice_pic.svg'
            }
            if (office.fullData.dream_office !== '1') {
              delete newVar.bestChoiceTitle
              delete newVar.bestChoicePic
            }
            return newVar
          }
        )
    },
    evenWorkspacesFetched () {
      return this.eventsData.map((event) => {
        return {
          id: event.id,
          pic: event.fullData.photo ? event.fullData.photo.fullUrl : '/img/offices_for_teams_2.jpg',
          mainSubtitle: 'Площадки для мероприятий',
          title: event.fullData.title,
          dscr: event.fullData.dscr,
          link: '',
          locationName: 'г.Москва, ул. Поклонная, д. 3',
          capacity: event.fullData.filter_people_number + ' человек',
          meter: event.fullData.area + ' м<sup>2</sup>',
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
      })
    }
  },
  async asyncData (context) {
    const data = await context.store.dispatch('fetching/fetchMainData')
    const locationData = await context.app.apolloProvider.defaultClient
      .query({
        query: locationInfo,
        variables: {
          locationSlug: context.route.params.location
        }
      })

    const locationsTitleList = []
    const currentLocationInfo = locationData.data.manufaqturySite.crud.locations.elements[0]
    // console.log(currentLocationInfo)
    const officesData = await context.app.apolloProvider.defaultClient
      .query({
        query: officesForLocationQuery,
        variables: {
          locationId: currentLocationInfo.id
        }
      })
    data.manufaqturySite.crud.locations && data.manufaqturySite.crud.locations.elements.forEach(({ fullData }) => {
      locationsTitleList.push(fullData.title)
    })
    return {
      fetched: data.manufaqturySite.crud,
      currentLocationInfo,
      officesData: officesData.data.manufaqturySite.crud.offices.elements,
      eventsData: officesData.data.manufaqturySite.crud.event_hall.elements,
      cities: await context.store.dispatch('locations/GET_SITIES'),
      locationsTitleList
    }
  },
  methods: {
    visibilityListener (isVisible, entry, ref) {
      this.blocksVisibility[ref] = isVisible
    },
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
