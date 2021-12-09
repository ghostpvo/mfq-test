<template>
  <div
    id="map-main"
    :class="{ 'map-main--contacts-page': contactsPage }"
    class="map-main__wrap"
  >
    <div class="map-main">
      <div class="map-main__info-blocks">
        <div class="map-main__info">
          <span class="blc-title">ПОКЛОННАЯ ГОРА</span>
          <location-blc
            :locationName="'г. Москва, ул. Поклонная, д. 3'"
          />
          <p class="blc-dscr">
            Офисы в деловом квартале Poklonka Place класса А для компаний, которым важна представительность и
            адекватная цена. Офисы MANUFAQTURY расположены расположены в 5-ти минутах от метро Кутузовская в ЗАО вблизи основной деловой активности города и транспортных сетей столицы
          </p>
          <div class="map-main__contact">
            <dl
              v-for="(item, index) in contacts"
              :key="`item-${index}`"
              class="map-main__contact-item"
            >
              <dt class="map-main__contact-title">
                {{ item.title }}
              </dt>
              <dd class="map-main__contact-main clickable-unit">
                <a :href="item.linkTo">{{ item.data }}</a>
              </dd>
            </dl>
          </div>
        </div>
        <div
          v-if="contactsPage"
          class="map-main__contacts"
        >
          <h4 class="blc-title">
            Контакты
          </h4>
          <div class="map-main__contact">
            <dl
              v-for="(item, index) in contacts"
              :key="`item-${index}`"
              class="map-main__contact-item"
            >
              <dt class="map-main__contact-title">
                {{ item.title }}
              </dt>
              <dd class="map-main__contact-main clickable-unit">
                <a :href="item.linkTo">{{ item.data }}</a>
              </dd>
            </dl>
          </div>
          <ul class="map-main__contacts-soc">
            <li
              v-for="item in social"
              :key="`item-${item.name}`"
              class="map-main__contacts-soc-item"
            >
              <a
                :href="item.url"
                :class="`map-main__contacts-soc--${item.name}`"
                class="map-main__contacts-soc-link"
              >{{ item.name }}</a>
            </li>
          </ul>
          <form @submit.prevent="sendForm" action="" class="map-main__contacts-form">
            <h5 class="map-main__contacts-form-title">
              Заказать обратный звонок
            </h5>
            <main-input
              :title="'Телефон'"
              :placeholder="'+7(___)___-__-__'"
              :telInput="true"
              :type="'tel'"
              :error="orderCallError.phone"
              v-model="orderCall.phone"
              class="clickable-unit"
            />
            <button
              type="submit"
              class="btn-blue clickable-unit"
            >
              отправить
            </button>
          </form>
        </div>
      </div>
      <Map />
    </div>
  </div>
</template>

<script>

import Map from '../Map/Map'
import LocationBlc from '../../Elements/LocationBlc/LocationBlc'
import MainInput from '../../Elements/StyledInputs/MainInput/MainInput'

export default {
  name: 'MapMain',
  components: {
    MainInput,
    LocationBlc,
    Map
  },
  props: {
    contactsPage: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      orderCall: {
        phone: ''
      },
      orderCallError: {
        phone: false
      }
    }
  },
  computed: {
    contacts () {
      if (!this.$store.state.fetching.mainPageData) { return [] }
      const contactData = this.$store.state.fetching.mainPageData.manufaqturySite.crud.contacts.element.fullData
      const phone = contactData.phone
      return [
        {
          title: 'Телефон',
          data: phone,
          linkTo: 'tel:+' + phone
        },
        {
          title: 'E-mail',
          data: contactData.email,
          linkTo: 'mailto:' + contactData.email
        }
      ]
    },
    social () {
      if (!this.$store.state.fetching.mainPageData) { return [] }
      const contactData = this.$store.state.fetching.mainPageData.manufaqturySite.crud.contacts.element.fullData
      return [
        {
          name: 'fb',
          url: contactData.facebook
        },
        {
          name: 'inst',
          url: contactData.instagram
        },
        {
          name: 'vk',
          url: contactData.vk
        }
      ]
    }
  },
  methods: {
    async sendForm () {
      await this.$store.dispatch('api/sendForm', {
        'name': 'Со страницы контактов',
        'phone': this.orderCall.phone
      })
      this.orderCall.phone = null
      window.dataLayer.push({ event: 'FORM' })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "map-main";
</style>
