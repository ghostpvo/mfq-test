<template>
  <div class="dev-coop">
    <div
      class="dev-coop__pic"
    >
      <img src="~/static/developers.jpg">
    </div>
    <div class="dev-coop__main">
      <div class="dev-coop__info">
        <div
          v-observe-visibility="{
            callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'info'),
            once: true,
            throttle: 700
          }"
          :class="{ 'animated-mode': blocksVisibility.info }"
          class="dev-coop__info-content"
        >
          <img src="~static/img/manufaqtory_txt_title.svg" class="dev-coop__info-pic-title">
          <!--Надпись MANUFAQTURY картинкой-->
          <h3 class="blc-title">
            {{ title }}
          </h3>
          <p class="blc-dscr">
            {{ text }}
          </p>
          <div class="main-link__wrap clickable-unit">
            <span
              @click="$store.commit('layout/SET_FEEDBACK_MODAL_STATE', true)"
              class="main-link"
            >
              Получить презентацию
            </span>
          </div>
        </div>
      </div>
      <div class="dev-coop__request">
        <div class="dev-coop__request-content">
          <span class="blc-title">{{ formTitle }}</span>
          <p
            v-observe-visibility="{
              callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'requestDscr'),
              once: true,
              throttle: 400
            }"
            :class="{ 'animated-mode': blocksVisibility.requestDscr }"
            class="blc-dscr"
          >
            {{ formDscr }}
          </p>
          <form
            @submit.prevent="sendForm"
            v-observe-visibility="{
              callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'form'),
              once: true,
              throttle: 700
            }"
            :class="{ 'animated-mode': blocksVisibility.form }"
            class="dev-coop__form"
          >
            <main-input
              :title="'ФИО'"
              :placeholder="'ФИО'"
              :error="$v.devCoop.name.$error"
              v-model="devCoop.name"
            />
            <main-input
              :title="'Телефон'"
              :placeholder="'+7(___)___-__-__'"
              :type="'tel'"
              :error="$v.devCoop.phone.$error"
              v-model="devCoop.phone"
            />
            <main-input
              :title="'E-mail'"
              :placeholder="'E-mail'"
              :type="'email'"
              :error="$v.devCoop.mail.$error"
              v-model="devCoop.mail"
            />
            <main-input
              :title="'Адрес пространства'"
              :placeholder="'Адрес пространства'"
              v-model="devCoop.spaceAddress"
            />
            <main-select
              :title="'Тип здания'"
              :options="[
                'Общественные здания и сооружения',
                'Жилые дома',
                'Промышленные здания и сооружения',
                'Иное',
              ]"
              :placeholder="'Тип здания'"
              v-model="devCoop.buildingType"
            />
            <main-select
              :title="'Ремонт'"
              :options="['Да', 'Нет']"
              :placeholder="'Ремонт'"
              v-model="devCoop.repairs"
            />
            <main-select
              :title="'Характер прав'"
              :options="[
                'Собственник',
                'В доверительном управлении',
                'На основании долгосрочного договора аренды',
                'Иное',
              ]"
              :placeholder="'Характер прав'"
              v-model="devCoop.rightsNature"
            />
            <styled-textarea
              :title="'Дополнительная информация'"
              :placeholder="'Дополнительная информация'"
              v-model="devCoop.AdditionalInformation"
            />
            <button
              type="submit"
              class="btn-blue clickable-unit"
            >
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import MainInput from '../../Elements/StyledInputs/MainInput/MainInput'
import MainSelect from '../../Elements/StyledInputs/MainSelect/MainSelect'
import StyledTextarea from '../../Elements/StyledInputs/StyledTextarea/StyledTextarea'
import mixins from '~/plugins/mixins'

export default {
  name: 'DevelopersCooperation',
  components: { StyledTextarea, MainSelect, MainInput },
  mixins: [mixins.visibility],
  data () {
    return {
      devCoop: {},
      title: 'ДЛЯ ДЕВЕЛОПЕРОВ',
      text: 'MANUFAQTURY работает с владельцами недвижимости и девелоперами. На базе БЦ и МФК команда создает востребованные пространства для технологических компаний. Это становится источником дохода, привлекает новую аудиторию и заполняет клиентами всю сервисную инфраструктуру. ',
      formTitle: 'Подать заявку на сотрудничество',
      formDscr: 'Заполните, пожалуйста, несколько полей. Спасибо!',
      blocksVisibility: {
        info: false,
        requestDscr: false,
        form: false
      }
    }
  },
  validations: {
    devCoop: {
      name: {
        required
      },
      phone: {
        required
      },
      mail: {
        required, email
      }
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
        'name': this.devCoop.name,
        'phone': this.devCoop.phone,
        'formData': {
          spaceAddress: this.devCoop.spaceAddress,
          buildingType: this.devCoop.buildingType,
          repairs: this.devCoop.repairs,
          rightsNature: this.devCoop.rightsNature,
          AdditionalInformation: this.devCoop.AdditionalInformation,
          'email': this.devCoop.mail
        }
      })
      this.devCoop = {}
      window.dataLayer.push({ event: 'FORM' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .dev-coop {
    display: flex;
    margin: 0 auto;

    &__pic {
      width: 50%;
      font-size: 0;

      img {
        position: sticky;
        top: 75px;
        object-fit: cover;
        height: 100vh;
        width: 100%;

        @include r-max(1500) {
          top: 55px;
        }

        @include r-max(700) {
          position: static;
          height: 100%;
        }

      }

      @include r-max(700) {
        width: 100%;
        height: 98.55vw;
        background-size: cover;
      }
    }

    .blc-title {
      display: block;
      padding-left: 0;
      letter-spacing: -1.5px;

      @include r-max(1700) {
        font-size: 30px;
      }
    }

    &__main {
      width: 50%;

      @include r-max(700) {
        width: 100%;
      }
    }

    &__info,
    &__request {
      padding-left: 12.7vw;
      padding-right: 10vw;

      @include r-min(2000) {
        padding-left: 243px;
        padding-right: 192px;
      }

      @include r-max(1700) {
        padding-left: 64px;
        padding-right: 128px;
      }

      @include r-max(1100) {
        padding-left: 50px;
        padding-right: 50px;
      }

      @include r-max(700) {
        padding-right: 4.5vw;
        padding-left: 4.5vw;
      }

      @include r-max(480) {
        padding-left: 16px;
        padding-right: 16px;
      }
    }

    &__info {
      background-color: #F2F2F2;

      &-content {
        max-width: 528px;
        padding-top: 280px;
        padding-bottom: 252px;
        opacity: 0;
        transform: translateY(25px);
        transition: all .3s ease-out;

        &.animated-mode {
          @include show-it;
        }

        @include r-max(1700) {
          padding-top: 153px;
          padding-bottom: 143px;
        }

        @include r-max(900) {
          padding-top: 105px;
          padding-bottom: 105px;
        }

        @include r-max(480) {
          padding-top: 40px;
          padding-bottom: 40px;
        }
      }

      .blc-title {
        padding-bottom: 25px;

        @include r-max(1700) {
          padding-bottom: 21px;
        }
      }

      &-pic-title {
        display: block;
        padding-bottom: 13px;

        @include r-max(1700) {
          max-width: 218px;
        }
      }

      .main-link {
        &__wrap {
          margin-top: 39px;

          @include r-max(1700) {
            margin-top: 35px;
          }
        }
      }
    }

    &__request {
      padding-top: 97px;
      padding-bottom: 100px;

      &-content {
        max-width: 528px;

        .blc-dscr {
          opacity: 0;
          transition: all .5s ease-out;

          &.animated-mode {
            opacity: 1;
          }
        }

        @include r-max(700) {
          margin: 0 auto;
        }
      }

      .blc-title {
        padding-bottom: 25px;

        @include r-max(1700) {
          padding-bottom: 22px;
        }

        @include r-max(480) {
          padding-bottom: 27px;
        }
      }

      .main-input,
      .main-select,
      .styled-textarea {
        margin-bottom: 38px;

        @include r-max(1700) {
          margin-bottom: 17px;
        }

        @include r-max(480) {
          margin-bottom: 16px;
        }
      }

      @include r-max(1700) {
        padding-top: 77px;
        padding-bottom: 80px;
      }

      @include r-max(480) {
        padding-top: 44px;
        padding-bottom: 46px;
      }
    }

    &__form {
      padding-top: 26px;
      opacity: 0;
      transform: translateY(15px);
      transition: all .5s ease-out;

      &.animated-mode {
        opacity: 1;
        transform: translateY(0);
      }

      @include r-max(1700) {
        padding-top: 19px;
      }
    }

    @include r-max(700) {
      display: block;
    }
  }
</style>
