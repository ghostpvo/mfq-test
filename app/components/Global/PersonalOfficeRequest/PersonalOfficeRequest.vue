<template>
  <div class="office-request__wrap">
    <div class="office-request b-wrap">
      <div class="office-request__txt-side">
        <div class="office-request__txt-side-content">
          <h6
            class="blc-subtitle"
          >
            {{ mainSubtitle }}
          </h6>
          <h3
            v-observe-visibility="{
              callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'title'),
              once: true,
              throttle: 500
            }"
            :class="{ 'animated-mode': blocksVisibility.title }"
            class="blc-title"
          >
            {{ mainTitle }}
          </h3>
          <p
            v-observe-visibility="{
              callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'dscr'),
              once: true,
              throttle: 500
            }"
            :class="{ 'animated-mode': blocksVisibility.dscr }"
            class="blc-dscr"
          >
            {{ mainDscr }}
          </p>
          <form
            v-observe-visibility="{
              callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'form1'),
              once: true,
              throttle: 500
            }"
            @submit.prevent="sendForm"
            :class="{ 'animated-mode': blocksVisibility.form1 }"
            class="office-request__form"
          >
            <div class="office-request__form-group">
              <main-input
                :haveWhiteLabel="true"
                :title="'Метраж'"
                :placeholder="'от 1 до 1300'"
                :type="'number'"
                v-model="officeRequest.footage"
              />
              <main-input
                :haveWhiteLabel="true"
                :title="'Количество человек'"
                :placeholder="'от 1 до 350'"
                :type="'number'"
                v-model="officeRequest.peopleAmount"
              />
            </div>
            <main-select
              v-if="chooseAreas"
              :title="'Площадка'"
              :options="formLocations"
              :placeholder="'Выберите площадку'"
              :haveWhiteLabel="true"
              v-model="officeRequest.chooseArea"
            />
            <main-select
              v-if="chooseMetros"
              :title="'Метро'"
              :options="$store.getters['fetching/mapped/METRO']"
              :placeholder="'Выберите метро'"
              :haveWhiteLabel="true"
              v-model="officeRequest.chooseMetro"
            />
            <main-input
              :haveWhiteLabel="true"
              :title="'E-mail'"
              :type="'email'"
              :placeholder="'E-mail'"
              :error="$v.officeRequest.eMail.$error"
              v-model="officeRequest.eMail"
            />
            <main-input
              :title="'Номер телефона'"
              :placeholder="'+7(___)___-__-__'"
              :haveWhiteLabel="true"
              :error="$v.officeRequest.tel.$error"
              v-model="officeRequest.tel"
            />
            <button
              type="submit"
              class="btn-blue clickable-unit"
            >
              {{ buttonTitle }}
            </button>
          </form>
        </div>
      </div>
      <div
        v-observe-visibility="{
          callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'image'),
          once: true
        }"
        :class="{ 'animated-mode': blocksVisibility.image }"
        class="office-request__pic-side lazy-image lazy-image--left"
      >
        <!--Обрезка 3840х3760 или пропорционально 960х940-->
        <img :src="mainPic" class="office-request__pic">
      </div>
      <div
        v-observe-visibility="{
          callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'addBlock'),
          once: true,
          throttle: 500
        }"
        :class="{ 'animated-mode': blocksVisibility.addBlock }"
        v-if="additionalTitle !== ''"
        class="office-request__additional-txt"
      >
        <h3 class="blc-title">
          {{ additionalTitle }}
        </h3>
        <p
          v-for="text in texts"
          :key="text.id"
          class="blc-dscr"
        >
          {{ text.txt }}
        </p>
        <div class="main-link__wrap">
          <nuxt-link :to="linkTo" class="main-link clickable-unit">
            {{ linkTitle }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import MainInput from '../../Elements/StyledInputs/MainInput/MainInput'
import MainSelect from '../../Elements/StyledInputs/MainSelect/MainSelect'
import mixins from '~/plugins/mixins'

export default {
  name: 'PersonalOfficeRequest',
  components: { MainSelect, MainInput },
  mixins: [mixins.visibility],
  props: {
    mainTitle: {
      type: String,
      default: ''
    },
    mainDscr: {
      type: String,
      default: ''
    },
    mainSubtitle: {
      type: String,
      default: ''
    },
    buttonTitle: {
      type: String,
      default: 'Отправить'
    },
    mainPic: {
      type: String,
      default: '/img/office_placeholder.jpg'
    },
    additionalTitle: {
      type: String,
      default: ''
    },
    texts: {
      type: Array,
      default: () => []
    },
    linkTitle: {
      type: String,
      default: 'ПОДРОБНЕЕ'
    },
    linkTo: {
      type: String,
      default: '/dream-office'
    },
    chooseAreas: {
      type: Boolean,
      default: false
    },
    chooseMetros: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      officeRequest: {},
      blocksVisibility: {
        title: false,
        dscr: false,
        form1: false,
        form2: false,
        form3: false,
        form4: false,
        form5: false,
        form6: false,
        form7: false,
        image: false,
        addBlock: false
      }
    }
  },
  validations: {
    officeRequest: {
      tel: {
        required
      },
      eMail: {
        required, email
      }
    }
  },
  computed: {
    formLocations () {
      return this.$store.getters['fetching/getLocations'].map(e => e.fullData.title)
    }
  },
  methods: {
    async sendForm () {
      this.$v.$touch()
      setTimeout(() => this.$v.$reset(), 3000)
      if (this.$v.$invalid) {
        return
      }
      await this.$store.dispatch('api/sendForm', {
        'name': 'Заявка на офис',
        'phone': this.officeRequest.tel,
        'formData': {
          'location': this.officeRequest.chooseArea,
          'people_number': this.officeRequest.peopleAmount,
          'metro': this.officeRequest.chooseMetro,
          'area': this.officeRequest.footage,
          'email': this.officeRequest.eMail
        }
      })
      this.officeRequest = {}
      window.dataLayer.push({ event: 'FORM' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .office-request {
    position: relative;
    display: flex;
    padding: 0;
    font-size: 0;
    overflow: hidden;

    &__wrap {
      background-color: $dark-blue;
    }

    &__txt-side {
      display: flex;
      flex-direction: column;
      width: 42.5%;
      padding: 50px 20px 50px 112px;
      justify-content: center;

      &-content {
        max-width: 387px;
        margin-left: 4.2vw;

        @include r-min(2000) {
          margin-left: 80px;
        }

        @include r-max(1700) {
          max-width: 22.5vw;
          margin-left: 14px;
        }

        @include r-max(1100) {
          margin-left: 14px;
          max-width: 25vw;
        }

        @include r-max(900) {
          max-width: 100%;
          margin-left: 0;
        }

        @include r-max(700) {
        }

        @include r-max(480) {
          max-width: 100%;
        }
      }

      .blc-subtitle {
        color: #FFF;
      }

      .blc-title {
        padding-left: 0;
        color: #FFF;
        letter-spacing: -1.5px;
        opacity: 0;
        transform: translateY(15px);
        transition: all .5s ease-out;

        @include r-max(1700) {
          font-size: 30px;
        }

        @include r-max(480) {
          line-height: 140%;
        }
      }

      .blc-dscr {
        color: #FFF;
        margin-top: 24px;
        opacity: 0;
        transform: translateY(15px);
        transition: all .5s ease-out;

        @include r-max(1700) {
          margin-top: 22px;
        }

        @include r-max(900) {
          margin-top: 9px;
        }

        @include r-max(480) {
          margin-top: 24px;
        }
      }

      @include r-max(1700) {
        width: 41.5%;
        padding-left: 6.4vw;
      }

      @include r-max(900) {
        width: 45%;
        padding: 30px 4.5vw;
      }

      @include r-max(700) {
        order: 2;
        width: 100%;
        padding: 4.5vw;
      }

      @include r-max(480) {
        padding: 40px 16px;
      }
    }

    &__form {
      padding-top: 29px;
      opacity: 0;
      transition: all .5s ease-out;

      &-group {
        display: flex;
        align-items: flex-start;

        .main-input {
          width: 50%;
          margin-left: 16.5px;
          margin-right: 16.5px;

          &:first-child {
            margin-left: 0;
          }

          &:last-child {
            margin-right: 0;
          }

          @include r-max(1700) {
            width: 100%;
            margin-left: 0;
            margin-right: 0;
          }
        }

        @include r-max(1700) {
          display: block;
        }
      }

      .main-input,
      .main-select {
        margin-bottom: 38px;

        @include r-max(1700) {
          margin-bottom: 17px;
        }
      }

      &.animated-mode {
        @include show-it();
      }

      @include r-max(1700) {
        padding-top: 18px;
      }
    }

    .animated-mode {
      @include show-it();
    }

    &__pic-side {
      width: 57.5%;

      @include r-max(1700) {
        width: 58.5%;
      }

      @include r-max(900) {
        width: 55%;
      }

      @include r-max(700) {
        order: 1;
        width: 100%;
        padding: 4.5vw 4.5vw 0;
      }

      @include r-max(480) {
        padding: 25px 16px 0;
      }
    }

    &__pic {
      max-width: 100%;
      width: 100%;
      height: 49vw;
      object-fit: cover;

      @include r-min(2000) {
        height: 940px;
      }

      @include r-max(1700) {
        height: 100%;
        min-height: 56.8vw;
      }

      @include r-max(1100) {
        min-height: 76.8vw;
      }

      @include r-max(480) {
        min-height: 93.8vw;
      }
    }

    &__additional-txt {
      position: absolute;
      top: 50%;
      right: 112px;
      max-height: 780px;
      max-width: 688px;
      padding: 75px 80px;
      background-color: #FFF;
      opacity: 0;
      transform: translateY(-50%) scale(1.5);
      overflow: hidden;
      transition: all .5s ease-out;

      &.animated-mode {
        @include r-min(701) {
          transform: translateY(-50%) scale(1) !important;
        }
      }

      .blc-title {
        padding-left: 0;
        padding-bottom: 27px;

        @include r-max(1700) {
          padding-bottom: 21px;
          font-size: 30px;
        }

        @include r-max(1100) {
          padding-bottom: 10px;
        }

        @include r-max(480) {
          padding-bottom: 25px;
        }
      }

      .blc-dscr {
        padding-bottom: 10px;

        @include r-max(1100) {
          padding-bottom: 5px;
        }

        @include r-max(480) {
          padding-bottom: 11px;
        }
      }

      .main-link {
        margin-top: 26px;

        @include r-max(1700) {
          margin-top: 24px;
        }

        @include r-max(1100) {
          margin-top: 10px;
        }

        @include r-max(480) {
          margin-top: 23px;
        }
      }

      @include r-max(1700) {
        right: 6.4vw;
        max-width: 42.5vw;
        max-height: 727px;
        padding: 58px 48px 57px;
      }

      @include r-max(1100) {
        right: 4.5vw;
        padding: 30px;
      }

      @include r-max(700) {
        position: static;
        order: 3;
        max-height: none;
        max-width: 100%;
        transform: none;
      }

      @include r-max(480) {
        padding: 40px 16px;
      }
    }

    @include r-max(700) {
      flex-direction: column;
    }
  }
</style>
