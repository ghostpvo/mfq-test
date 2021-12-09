<template>
  <div
    :class="{'white-colors' : haveWhiteLabel}"
    class="main-datepicker clickable-unit"
  >
    <label :class="{'white-label' : haveWhiteLabel}" class="input-label">{{ title }}</label>
    <v-date-picker
      :min-date="new Date()"
      :locale="{ id: 'ru', firstDayOfWeek: 2, masks: { weekdays: 'WW', L: 'DD/MM/YYYY' } }"
      :input-props="{placeholder: placeholder, class: inputClass}"
      @input="input"
      :value="value"
    />
  </div>
</template>

<script>
export default {
  name: 'MainDatepicker',
  props: {
    value: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Выберите дату'
    },
    inputClass: {
      type: String,
      default: 'main-datepicker__input'
    },
    haveWhiteLabel: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      model: {
        date: ''
      }
    }
  },
  methods: {
    input (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss">
  .main-datepicker {
    position: relative;

    &:after {
      position: absolute;
      right: 16px;
      bottom: 12px;
      width: 16px;
      height: 16px;
      content: '';
      background-image: url("~static/img/datepicker_input_pic.svg");
      background-repeat: no-repeat;
      background-size: contain;
      pointer-events: none;

      @include r-max(1700) {
        right: 8px;
        bottom: 9px;
        width: 13px;
        height: 13px;
      }
    }

    &__input {
      width: 100%;
      height: 40px;
      padding-left: 16px;
      padding-right: 47px;
      font-family: 'Fugue', sans-serif;
      font-size: 16px;
      color: $txt-color;
      letter-spacing: 0.6px;
      border: none;
      border-bottom: 1px solid $blue;
      background-color: transparent;
      border-radius: 0;
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
        padding-right: 30px;
        font-size: 14px;
      }

      @include r-max(900) {
        font-size: 12px;
      }

      @include r-max(480) {
        font-size: 14px;
      }
    }

    &.white-colors {
      .main-datepicker__input {
        color: #FFF;
      }
    }

    .vc-grid-container.grid > .vc-grid-cell {
      margin: 0;
    }

    .vc-popover-caret {
      display: none!important;
    }

    .vc-popover-content-wrapper {
      transition: none!important;

      * {
        transition: none!important;
      }

      @include r-max(480) {
        right: 0;
      }
    }

    .vc-popover-content {
      min-width: 280px;
      border-radius: 0;

      &.direction-bottom {
        margin-top: 6px!important;
      }

      @include r-max(370) {
        min-width: 280px;
      }

      @include r-max(320) {
        position: absolute;
        left: -12px;
      }
    }

    .vc-container {
      width: 320px;
      max-width: 100%;
      border-radius: 0;

      @include r-max(480) {
        width: 100%;
      }
    }

    .vc-title {
      font-family: 'Fugue', sans-serif;
      font-size: 14px;
      font-weight: 400;
      text-transform: capitalize;
      color: #1A051D;
    }

    .vc-header {
      position: relative;

      &:after {
        position: absolute;
        left: 10px;
        right: 10px;
        bottom: -41px;
        content: '';
        height: 1px;
        background-image: url("~static/img/datepicker_header_divider.png");
      }
    }

    .vc-arrows-container {
      .vc-flex {
        position: relative;
        color: #1A051D;

        &:before { // увеличение области захвата стрелочек
          position: absolute;
          width: 25px;
          height: 25px;
          content: '';
        }

        &.vc-opacity-25 {
          opacity: 1;
          color: #D0D1D1;
        }
      }
      .vc-svg-icon {
        width: 7px;
        height: 20px;
      }
    }

    .vc-weeks {
      font-weight: 400;

      .vc-weekday {
        font-family: 'Fugue', sans-serif;
        font-size: 12px;
        font-weight: 400;
        text-transform: uppercase;
        color: #D0D1D1;
      }
    }

    .vc-day {
      .vc-day-content {
        font-family: 'Fugue', sans-serif;
        font-size: 12px;
        font-weight: 400;

        &:focus {
          background-color: transparent;
          font-weight: 400;
        }

        &:hover {
          color: #FFF;
          background-color: rgba(74,183,174,0.5);
          border-radius: 0;
        }

        &.vc-text-gray-400 {
          color: #D0D1D1;

          &:hover {
            background-color: transparent;
          }
        }
      }
    }

    .vc-grid-cell {
      margin: 5px;
    }

    .vc-highlights {
      .vc-highlight {
        width: 32px;
        height: 32px;
        background: $blue;
        border-radius: 0;
      }
    }

    .vc-popover-content {
      background: #FFF;
      color: $txt-color;
      border-color: #c5c1c1;

      .vc-nav-container {
        .vc-grid-cell {
          span {
            font-family: 'Fugue', sans-serif;

            &.vc-text-blue-900 {
              color: $txt-color;

              &:hover {
                color: #FFF;
              }
            }
          }
        }

        .focus\:vc-border-blue-600:focus {
          border-color: $blue;
          color: $txt-color;
        }

        .hover\:vc-bg-gray-900:hover {
          background: $blue;
          color: #FFF;
        }

        .vc-grid-cell {
          margin: 6px;
        }

        .vc-text-blue-100 {
          color: $txt-color;
        }
      }

      &.direction-top {
        margin-bottom: 0!important;
      }
    }
  }
</style>
