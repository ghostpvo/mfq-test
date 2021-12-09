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
        Обратная связь
      </h3>
      <p class="modal-window__dscr">
        Оставьте свои контакты и наш менеджер свяжется с Вами в ближайшее время!
      </p>
      <main-input
        :title="'ФИО'"
        :placeholder="'ФИО'"
        :error="error.name"
        v-model="feedback.name"
      />
      <main-input
        :title="'Номер телефона'"
        :placeholder="'+7(___)___-__-__'"
        :type="'tel'"
        :error="error.phone"
        v-model="feedback.phone"
      />
      <main-checkbox
        :id="'qwsd20dsi0xa-w'"
        :label="'Хочу получать новости MANUFAQTORY'"
        :value="'Хочу получать новости MANUFAQTORY'"
        :checked="false"
        v-model="feedback.news"
      />
      <main-checkbox
        :id="'zwsdd20di0xayy'"
        :label="'Согласен с&nbsp;<a href=\'/docs/policy.pdf\' target=\'_blank\'>политикой конфиденциальности</a>'"
        :value="'Согласен с политикой конфиденциальности'"
        :checked="false"
        :error="error.policy"
        v-model="feedback.policy"
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

export default {
  name: 'FeedbackPopup',
  components: { MainCheckbox, MainInput },
  props: {
    state: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      feedback: {
        news: false,
        policy: false,
        phone: '',
        name: ''
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
        this.feedback = {
          news: false,
          policy: false,
          phone: '',
          name: ''
        }
        window.dataLayer.push({ event: 'FORM' })
      }
    },
    validate () {
      let state = true
      if (!this.feedback.policy) {
        this.error.policy = true
        state = false
      } else {
        this.error.policy = false
      }
      if (this.feedback.name.length === 0) {
        this.error.name = true
        state = false
      } else {
        this.error.name = false
      }
      if (this.feedback.phone.length === 0) {
        this.error.phone = true
        state = false
      } else {
        this.error.phone = false
      }
      return state
    },
    sendForm () {
      return this.$http.post('/api/site/v1/application/create', { name: this.feedback.name, phone: this.feedback.phone })
    }
  }
}
</script>
