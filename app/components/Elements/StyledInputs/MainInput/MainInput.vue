<template>
  <div
    :class="{'white-colors' : haveWhiteLabel, 'text-align-center' : centerTxt, 'error-input': error}"
    class="main-input clickable-unit"
  >
    <!--haveWhiteLabel - изменение стилей для инпутов на темном фоне (label и ввод текста в input белого цвета)
        centerTxt - выравнивание текста в инпуте по центру
        error - стили для незаполненного инпута-->
    <label :class="{'white-label' : haveWhiteLabel}" class="input-label">{{ title }}</label>
    <no-ssr v-if="telInput">
      <i-mask-component
        :value="value"
        @accept="(data) => updateValue(data)"
        :placeholder="placeholder"
        :type="type"
        :mask="[
          {
            mask: '{8}(000)000-00-00'
          },
          {
            mask: '+{7}(000)000-00-00'
          }
        ]"
        class="main-input__field clickable-unit"
      />
    </no-ssr>
    <input
      v-else
      :value="value"
      @input="updateValue($event.target.value)"
      :placeholder="placeholder"
      :type="type"
      :required="required"
      class="main-input__field clickable-unit"
    >
    <span v-if="error === true" class="error-txt">необходимо заполнить поле</span>
  </div>
</template>

<script>
export default {
  name: 'MainInput',
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
    },
    error: {
      type: Boolean,
      default: false
    },
    isLightBg: {
      type: Boolean,
      default: false
    },
    centerTxt: {
      type: Boolean,
      default: false
    },
    telInput: {
      type: Boolean,
      default: false
    },
    haveWhiteLabel: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    updateValue (value) {
      this.$emit('input', value)
    },
    input (value, event) {
      this.$emit('input', value)
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-input {
    &__field {
      display: block;
      width: 100%;
      height: 40px;
      padding-left: 16px;
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

      @include r-max(1700) {
        height: 31px;
        padding-left: 8px;
        font-size: 14px;
      }

      @include r-max(900) {
        font-size: 12px;
      }

      @include r-max(480) {
        font-size: 14px;
      }
    }

    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type=number] {
      -moz-appearance:textfield;
    }

    &.error-input {
      position: relative;

      .main-input__field {
        border-color: $red;
      }

      .error-txt {
        position: absolute;
        bottom: -12px;
        right: 0;
        font-size: 11px;
        letter-spacing: 0.66px;
        color: $red;

        @include r-max(1700) {
          bottom: -10px;
          font-size: 9px;
        }

        @include r-max(900) {
          font-size: 7px;
        }

        @include r-max(480) {
          bottom: -11px;
          font-size: 10px;
        }
      }
    }

    &.text-align-center {
      .main-input__field {
        text-align: center;
        padding-left: 5px;
        padding-right: 5px;
      }
    }

    &.white-colors {
      .main-input {
        &__field {
          color: #FFF;
        }
      }
    }
  }
</style>
