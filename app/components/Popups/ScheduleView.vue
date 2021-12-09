<template>
  <div
    v-if="state"
    @click="overlayListener($event)"
    class="modal-window"
  >
    <div class="modal-window__content">
      <span
        @click="closeWind"
        class="modal-window__close clickable-unit"
      >
        close
      </span>
      <h3 class="modal-window__title">
        Запланировать просмотр
      </h3>
      <p class="modal-window__dscr">
        Заполните, пожалуйста, несколько полей необходимых для организации просмотра. Спасибо!
      </p>
      <main-input
        :title="'ФИО'"
        :placeholder="'ФИО'"
        :error="error.name"
        v-model="viewPlan.name"
      />
      <main-input
        :title="'Номер телефона'"
        :placeholder="'+7(___)___-__-__'"
        :type="'tel'"
        :error="error.phone"
        v-model="viewPlan.phone"
      />
      <main-input
        :title="'E-mail'"
        :placeholder="'E-mail'"
        :type="'email'"
        v-model="viewPlan.mail"
      />
      <main-input
        :title="'Предпочтения по местоположению офиса'"
        :placeholder="'Предпочтения по местоположению'"
        v-model="viewPlan.location"
      />
      <main-input
        :title="'Количество человек в компании'"
        :placeholder="'от 2 до 1 200'"
        v-model="viewPlan.peopleAmount"
      />
      <main-datepicker
        :title="'Дата просмотра'"
        :placeholder="'Дата просмотра'"
        v-model="viewPlan.date"
      />
      <main-checkbox
        :id="'qwsd20dsi0xa-w'"
        :label="'Хочу получать новости MANUFAQTORY'"
        :value="'Хочу получать новости MANUFAQTORY'"
        :checked="false"
        v-model="viewPlan.news"
      />
      <main-checkbox
        :id="'zwsdd20di0xayy'"
        :label="'Согласен с&nbsp;<a href=\'/docs/policy.pdf\' target=\'_blank\'>политикой конфиденциальности</a>'"
        :value="'Согласен с политикой конфиденциальности'"
        :checked="false"
        :error="error.policy"
        v-model="viewPlan.policy"
      />
      <button
        @click="successForm"
        type="submit"
        class="btn-blue clickable-unit"
      >
        Отправить
      </button>
    </div>
  </div>
</template>

<script>
import MainInput from '../Elements/StyledInputs/MainInput/MainInput'
import MainCheckbox from '../Elements/StyledInputs/MainCheckbox/MainCheckbox'
import MainDatepicker from '../Elements/StyledInputs/MainDatepicker/MainDatepicker'
export default {
  name: 'ScheduleView',
  components: { MainDatepicker, MainCheckbox, MainInput },
  props: {
    state: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      viewPlan: {
        news: false,
        policy: false,
        phone: '',
        name: '',
        mail: '',
        location: '',
        peopleAmount: ''
      },
      error: {
        phone: false,
        name: false,
        policy: false
      }
    }
  },
  methods: {
    closeWind () {
      this.$emit('close')
    },
    overlayListener (e) {
      if (!e.target.closest('.modal-window__content')) {
        this.$emit('close')
      }
    },
    async successForm () {
      if (this.validate()) {
        await this.sendForm()
        this.closeWind()
        this.$store.commit('layout/SET_THANKS_MODAL_STATE', true)
        this.viewPlan = {
          news: false,
          policy: false,
          phone: '',
          name: ''
        }
        window.dataLayer.push({ event: 'FORM' })
      } else {
        // console.log('fff')
      }
    },
    validate () {
      let state = true
      if (!this.viewPlan.policy) {
        this.error.policy = true
        state = false
      } else {
        this.error.policy = false
      }
      if (this.viewPlan.name.length === 0) {
        this.error.name = true
        state = false
      } else {
        this.error.name = false
      }
      if (this.viewPlan.phone.length === 0) {
        this.error.phone = true
        state = false
      } else {
        this.error.phone = false
      }
      return state
    },
    sendForm () {
      const data = {
        name: this.viewPlan.name,
        phone: this.viewPlan.phone,
        formData: this.viewPlan
      }
      delete data.formData.phone
      delete data.formData.name
      return this.$http.post('/api/site/v1/application/create', data)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
