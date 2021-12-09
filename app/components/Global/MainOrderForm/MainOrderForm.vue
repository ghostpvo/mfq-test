<template>
  <div
    :class="{'new-style': forOfficeDemoSliderBlc}"
    class="main-order-form b-wrap"
  >
    <!--forOfficeDemoSliderBlc - изменения позиционирования под блок OfficeDemoSlider страница конкретной площадки-->
    <div class="main-order-form__left">
      <h6 class="blc-subtitle">
        {{ subtitle }}
      </h6>
      <h3 class="blc-title">
        {{ title }}
      </h3>
      <p class="blc-dscr">
        {{ description }}
      </p>
    </div>
    <div class="main-order-form__right">
      <form @submit.prevent="sendForm" class="main-order-form__main">
        <div class="main-order-form__input-wrap">
          <main-datepicker
            v-if="haveDatepicker"
            v-model="office.date"
            :title="'Дата'"
            :haveWhiteLabel="true"
            :placeholder="'Выберите дату'"
          />
          <main-input
            :title="'Количество человек'"
            :placeholder="'от 1 до 1200'"
            :haveWhiteLabel="true"
            v-model="office.peopleAmount"
          />
          <main-input
            v-if="telInputLeft"
            :title="'Номер телефона'"
            :placeholder="'+7(___)___-__-__'"
            :type="'tel'"
            :haveWhiteLabel="true"
            :error="$v.office.tel.$error"
            v-model="office.tel"
          />
          <main-input
            v-if="!mailInputLeft"
            :title="'E-mail'"
            :placeholder="'E-mail'"
            :type="'email'"
            :error="$v.office.email.$error"
            :haveWhiteLabel="true"
            v-model="office.email"
          />
          <!--telInputLeft - поле инпута находится слева-->
          <div v-if="btnLeft" class="btn-blue__wrap">
            <button type="submit" class="btn-blue left-btn clickable-unit">
              Забронировать
            </button>
          </div>
          <!--btnLeft - кнопка находится слева-->
        </div>
        <div class="main-order-form__input-wrap">
          <main-select
            v-if="chooseAreaSelect"
            :title="'Площадка'"
            :options="options"
            :placeholder="'Выберите площадку'"
            :haveWhiteLabel="true"
            v-model="office.chooseArea"
          />
          <!--chooseAreaSelect - есть селект Выбора площадки-->
          <div v-if="haveTimeInput" class="time-input">
            <label class="input-label">
              Время
            </label>
            <div class="time-input__main">
              <div class="time-input__wrap">
                <span class="time-input__subtitle-from">с</span>
                <main-input
                  :title="''"
                  :placeholder="'10:00'"
                  v-mask="'##:##'"
                  :centerTxt="true"
                  :haveWhiteLabel="true"
                  v-model="office.fromTime"
                />
              </div>
              <div class="time-input__wrap">
                <span class="time-input__subtitle-to">до</span>
                <main-input
                  :title="''"
                  :placeholder="'21:00'"
                  v-mask="'##:##'"
                  :centerTxt="true"
                  :haveWhiteLabel="true"
                  v-model="office.toTime"
                />
              </div>
            </div>
          </div>
          <main-input
            v-if="!telInputLeft"
            :title="'Номер телефона'"
            :placeholder="'+7(___)___-__-__'"
            :error="$v.office.tel.$error"
            :haveWhiteLabel="true"
            v-model="office.tel"
          />
          <main-input
            v-if="mailInputLeft"
            :error="$v.office.email.$error"
            :title="'E-mail'"
            :placeholder="'E-mail'"
            :type="'email'"
            :haveWhiteLabel="true"
            v-model="office.email"
          />
          <div v-if="!btnLeft" class="btn-blue__wrap">
            <button @click.prevent="sendForm" class="btn-blue clickable-unit">
              Получить предложение
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import MainInput from '../../Elements/StyledInputs/MainInput/MainInput'
import MainSelect from '../../Elements/StyledInputs/MainSelect/MainSelect'
import MainDatepicker from '../../Elements/StyledInputs/MainDatepicker/MainDatepicker'

export default {
  name: 'MainOrderForm',
  components: { MainDatepicker, MainSelect, MainInput },
  props: {
    options: {
      type: Array,
      default: () => ['Площадка 1', 'Площадка 2', 'Площадка 3', 'Площадка 4', 'Площадка 5']
    },
    subtitle: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    haveDatepicker: {
      type: Boolean,
      default: false
    },
    telInputLeft: {
      type: Boolean,
      default: true
    },
    chooseAreaSelect: {
      type: Boolean,
      default: true
    },
    btnLeft: {
      type: Boolean,
      default: false
    },
    haveTimeInput: {
      type: Boolean,
      default: false
    },
    forOfficeDemoSliderBlc: {
      type: Boolean,
      default: false
    },
    mailInputLeft: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showErrors: false,
      office: {
        chooseArea: '',
        tel: '',
        peopleAmount: '',
        fromTime: '',
        toTime: '',
        email: ''
      }
    }
  },
  validations: {
    office: {
      chooseArea: {},
      tel: {
        required
      },
      email: {
        required, email
      },
      peopleAmount: {},
      fromTime: {},
      toTime: {}
    }
  },
  methods: {
    async sendForm () {
      this.$v.$touch()
      setTimeout(() => this.$v.$reset(), 3000)
      if (this.$v.$invalid) {
        return
      }
      const newVar = {
        locationName: this.office.chooseArea,
        phone: this.office.tel,
        peopleCount: this.office.peopleAmount,
        date: this.office.date,
        fromTime: this.office.fromTime,
        toTime: this.office.toTime,
        email: this.office.email
      }
      if (!(newVar.phone)) {
        return
      }
      await this.$http.post('/api/site/v1/location/send-request', newVar)
      this.$store.commit('layout/SET_THANKS_MODAL_STATE', true)
      this.office = {}
      window.dataLayer.push({ event: 'FORM' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-order-form {
    /*position: absolute;*/
    /*<!--bottom: -100px;-->*/
    /*left: 0;*/
    /*right: 0;*/
    display: flex;
    align-items: stretch;
    margin-top: 100px;

    &__left {
      width: 50%;
      padding: 40px 48px 40px 80px;
      background-image: url("~static/img/main_order_form_bg.jpg");
      background-repeat: no-repeat;
      background-position: bottom right;
      background-size: cover;

      @include r-max(1700) {
        padding: 40px 48px;
        background-size: 136%;
        background-position: bottom center;
      }

      @include r-max(700) {
        background-size: 100%;
      }

      @include r-max(900) {
        padding: 25px;
      }

      @include r-max(750) {
        padding-left: 4.5vw;
      }

      @include r-max(700) {
        width: 100%;
      }

      @include r-max(480) {
        padding: 21px 16px 24px;
      }
    }

    &__right {
      display: flex;
      z-index: 1;
      align-items: center;
      justify-content: space-between;
      width: 50%;
      padding: 50px 80px 50px;
      background-color: $dark-blue;

      @include r-max(1700) {
        padding: 40px 32px;
      }

      @include r-max(900) {
        padding: 20px 25px;
      }

      @include r-max(700) {
        width: 100%;
      }

      @include r-max(480) {
        padding: 40px 16px 71px;
      }
    }

    &__main {
      display: flex;
      width: 100%;
      justify-content: space-between;
      opacity: 0;
      transform: translateY(15px);
      transition: all .5s ease-out 0.75s;

      @include r-max(480) {
        position: relative;
        display: block;
      }
    }

    .blc-subtitle,
    .blc-title,
    .blc-dscr {
      color: $dark-blue;
    }

    .blc-title {
      padding-left: 0;
      margin-bottom: 19px;
      letter-spacing: 0.25px;
      line-height: 128.9%;
      transform: translateY(-25px);
      opacity: 0;

      @include r-max(1700) {
        margin-bottom: 22px;
        font-size: 24px;
        line-height: 130%;
        word-spacing: 5px;
      }

      @include r-max(900) {
        margin-bottom: 15px;
        font-size: 18px;
      }

      @include r-max(480) {
        margin-bottom: 11px;
        font-size: 24px;
      }
    }

    .blc-dscr {
      transform: translateY(25px);
      opacity: 0;
    }

    &__input-wrap {
      max-width: 315px;
      width: 100%;
      margin-right: 10px;
      margin-left: 10px;

      &:last-child {
        margin-right: 0;
      }

      &:first-child {
        margin-left: 0;
      }

      @include r-max(1700) {
        width: 48%;
        margin-right: 8px;
        margin-left: 8px;
      }

      @include r-max(480) {
        width: 100%;
        max-width: 100%;
        margin: 0;
      }
    }

    .main-input {
      margin-bottom: 36px;

      &:last-child {
        @include r-min(481) {
          margin-bottom: 0;
        }
      }

      @include r-max(1700) {
        margin-bottom: 25px;
      }

      @include r-max(480) {
        margin-bottom: 16px;
      }
    }

    .main-datepicker {
      z-index: 1;
      margin-bottom: 36px;

      @include r-max(1700) {
        margin-bottom: 25px;
      }

      @include r-max(480) {
        margin-bottom: 16px;
      }
    }

    .main-select {
      position: relative;
      z-index: 1;
      margin-bottom: 36px;

      @include r-max(1700) {
        margin-bottom: 25px;
      }

      @include r-max(480) {
        margin-bottom: 16px;
      }
    }

    .btn-blue {
      margin-top: 21px;

      &.left-btn {
        margin-top: 0;
      }

      &__wrap {
        padding-top: 1px;

        @include r-max(480) {
          position: absolute;
          left: 0;
          right: 0;
          // позиционуем абсолютом, так как есть компоненты, где после того, как инпуты становятся в столбец, кнопка (когда она
          // изначально слева) оказывается по центру формы, и ее тоже надо сдвигать в самый конец)
          bottom: -30px;
        }
      }

      @include r-max(1700) {
        margin-top: 14px;
      }

      @include r-max(480) {
        margin-top: 0;
      }
    }

    .input-label {
      color: #FFF;
    }

    .time-input {
      margin-bottom: 36px;

      .input-label {
        padding-bottom: 0;
      }

      &__main {
        display: flex;
      }

      &__wrap {
        display: flex;
        align-items: center;
      }

      .main-input {
        @include r-max(480) {
          width: 80px;
        }
      }

      &__subtitle-from,
      &__subtitle-to {
        display: block;
        font-size: 14px;
        color: #FFF;
        letter-spacing: 0.66px;

        @include r-max(1700) {
          padding-top: 5px;
          font-size: 12px;
        }

        @include r-max(480) {
          padding-top: 0;
          margin-top: -13px;
        }
      }

      &__subtitle-to {
        min-width: 32px;
        text-align: center;
      }

      @include r-max(1700) {
        margin-bottom: 25px;
      }

      @include r-max(480) {
        margin-bottom: 0;
      }
    }

    &.animated-mode {
      .blc-title,
      .blc-dscr {
        transform: translateY(0);
        opacity: 1;
        transition: all .5s ease-out .25s;
      }

      .main-order-form__main {
        transform: translateY(0);
        opacity: 1;
      }
    }

    &.new-style {
      bottom: 0; //добавили блоку-обертке(родителю) педдинг 100, чтобы была возможностб задать фон не прозрачный, а как у блока ниже

      @include r-min-max(751, 1700) {
        /*position: static;*/
        /*<!--margin-top: -26px;-->*/
      }
    }

    @include r-max(1700) {
      /*<!--bottom: -82px;-->*/
      margin-top: 80px;
    }

    @include r-max(1100) {
      /*position: static;*/
      /*<!--margin-top: -70px;-->*/
    }

    @include r-max(900) {
      margin-top: 40px;
    }

    @include r-min-max(481, 750) {
      padding: 0;
    }

    @include r-max(750) {
      margin-top: 0;
    }

    @include r-max(700) {
      flex-direction: column;
      padding-top: 24px;
    }
  }
</style>
