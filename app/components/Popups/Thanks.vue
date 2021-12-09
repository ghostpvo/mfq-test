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
        Ваша заявка принята
      </h3>
      <p class="modal-window__dscr">
        В ближайшее время с Вами свяжется наш менеджер
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThanksPopup',
  props: {
    state: {
      type: Boolean,
      default: false
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
    }
  }
}
</script>
