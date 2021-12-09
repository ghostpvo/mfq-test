<template>
  <div class="styled-textarea">
    <label class="input-label">{{ title }}</label>
    <textarea
      :value="value"
      @input="updateValue($event.target.value)"
      :placeholder="placeholder"
      :type="type"
      class="styled-textarea__field clickable-unit"
    />
  </div>
</template>

<script>
export default {
  name: 'StyledTextarea',
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: null
    }
  },
  methods: {
    updateValue (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped>
  .styled-textarea {
    position: relative;

    &__field {
      display: block;
      min-height: 106px;
      max-height: 185px;
      width: 100%;
      max-width: 100%;
      min-width: 100%;
      padding-left: 16px;
      margin-top: 10px;
      font-family: 'Fugue', sans-serif;
      font-size: 16px;
      color: $txt-color;
      letter-spacing: 0.6px;
      border: none;
      border-bottom: 1px solid $blue;
      background-color: transparent;
      @include placeholder() {
        font-family: 'Fugue', sans-serif;
        color: #4C728B;
        font-size: 16px;

        @include r-max(1700) {
          font-size: 14px;
        }

        @include r-max(900) {
          font-size: 12px;
        }

        @include r-max(480) {
          font-size: 14px;
        }
      }

      &::-webkit-resizer {
        display: none;
        border: transparent;
      }

      @include r-max(1700) {
        max-height: 175px;
        padding-left: 8px;
        margin-top: 6px;
        font-size: 14px;
      }

      @include r-max(900) {
        font-size: 12px;
      }

      @include r-max(480) {
        font-size: 14px;
      }
    }

    &:after {
      position: absolute;
      right: 0;
      bottom: 3px;
      width: 0;
      height: 0;
      border-bottom: 8px solid $blue;
      border-left: 8px solid transparent;
      content: '';
      pointer-events: none;
    }
  }
</style>
