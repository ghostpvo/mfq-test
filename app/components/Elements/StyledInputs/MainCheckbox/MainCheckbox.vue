<template>
  <div
    @click="check"
    :class="{ 'main-checkbox--active': isActive, 'error-input': error }"
    class="main-checkbox clickable-unit"
  >
    <input
      ref="input"
      :id="id"
      :value="value"
      class="main-checkbox__input"
      type="checkbox"
    >
    <label :for="id" v-html="label" class="main-checkbox__label" />
    <span v-if="error === true" class="error-txt"> необходимо заполнить поле</span>
  </div>
</template>

<script>
export default {
  name: 'MainCheckbox',
  props: {
    id: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    error: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isActive: false
    }
  },
  methods: {
    check () {
      const state = this.$refs.input.checked

      if (state) {
        this.isActive = true
      } else {
        this.isActive = false
      }
      this.$emit('input', state)
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-checkbox {
    &__label {
      position: relative;
      display: flex;
      align-items: center;
      min-height: 32px;
      padding-left: 48px;
      font-size: 16px;
      line-height: 19px;
      letter-spacing: 0.66px;
      color: #4C728B;
      cursor: pointer;

      &:before {
        position: absolute;
        left: 0;
        top: 50%;
        @include sq(32px);
        margin-top: -16px;
        content: '';
        border: 1px solid $blue;
      }

      &:after {
        position: absolute;
        left: 8px;
        top: 50%;
        display: none;
        width: 17px;
        height: 14px;
        margin-top: -7px;
        content: '';
        background-image: url('~static/img/checkbox_checked.svg');
        background-size: contain;
        background-repeat: no-repeat;
      }

      @include r-max(1700) {
        padding-left: 42px;
        font-size: 14px;
        line-height: 17px;
      }
    }

    &__input {
      display: none;
    }

    &--active {
      .main-checkbox__label {
        &:after {
          display: block;
        }
      }
    }

    &.error-input {
      position: relative;

      .main-checkbox {
        &__label {
          &:before {
            border-color: $red;
          }
        }
      }

      .error-txt {
        position: absolute;
        bottom: -12px;
        left: 0;
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
  }
</style>

<style scoped>
  .main-checkbox >>> a {
    color: #4C728B;
    text-decoration: underline;
  }

  .main-checkbox >>> a:hover {
    text-decoration: none;
  }
</style>
