<template>
  <div
    :class="{'white-colors' : haveWhiteLabel}"
    class="main-select clickable-unit"
  >
    <!--haveWhiteLabel - изменение стилей для инпутов на темном фоне-->
    <label :class="{'white-label' : haveWhiteLabel}" class="input-label">{{ title }}</label>
    <v-select
      :options="options"
      :clearable="false"
      :placeholder="placeholder"
      :value="value"
      :searchable="searchable"
      @input="input"
      class="clickable-unit"
    />
  </div>
</template>

<script>
export default {
  name: 'MainSelect',
  props: {
    title: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: null
    },
    searchable: {
      type: Boolean,
      default: false
    },
    haveWhiteLabel: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    input (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

<style lang="scss">
  .main-select {
    .v-select {
      display: block;
      transition: all .3s ease!important;
    }

    .vs__open-indicator {
      width: 14px;
      height: 9px;
      background: url('~static/img/arrow_down_select.svg');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
      transition-timing-function: cubic-bezier(1,-.115,.975,.855)!important;

      path {
        display: none;
      }

      @include r-max(900) {
        width: 10px;
      }

      @include r-max(480) {
        width: 13px;
      }
    }

    .vs__actions {
      transition: all .3s ease!important;
    }

    .vs__dropdown-toggle {
      height: 40px;
      padding-left: 10px;
      padding-right: 10px;
      border: none;
      border-bottom: 1px solid $blue;
      border-radius: 0;

      @include r-max(1700) {
        height: 31px;
        padding-left: 2px;
        padding-right: 2px;
      }

      @include r-max(900) {
        padding-right: 0;
      }
    }

    .vs--open {
      .vs__dropdown-toggle {
        border-bottom: 1px solid $blue;
      }
    }

    .vs__search {
      padding-left: 4px;
      font-size: 16px;
      line-height: normal;
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

      &:focus {
        padding-left: 4px;
        line-height: normal;
        outline-offset: 0;

        @include r-max(900) {
          padding-left: 3px;
        }
      }

      @include r-max(1700) {
        font-size: 14px;
      }

      @include r-max(900) {
        padding-right: 0;
        padding-left: 3px;
        font-size: 12px;
      }

      @include r-max(480) {
        font-size: 14px;
      }
    }

    .vs__selected {
      display: block;
      /*margin-top: 8px;*/
      color: $txt-color;
      font-size: 16px;
      letter-spacing: 0.6px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

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

    .vs__selected-options {
      flex-wrap: nowrap;
      align-items: center;
      width: calc(100% - 23px);
    }

    .vs--single.vs--open {
      .vs__selected {
        position: static;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .vs__dropdown-menu {
      z-index: 1;
      top: calc(100% - -7px);
      min-width: auto;
      transition: none!important;
    }

    .vs__dropdown-option {
      padding-top: 5px;
      padding-bottom: 5px;
      font-size: 14px;
      color: $txt-color;
      white-space: normal;
      letter-spacing: 0.66px;
      transition: none!important;

      &--highlight {
        color: #FFF;
        background-color: $blue;
      }

      @include r-max(900) {
        padding: 5px 10px;
      }
    }

    &.white-colors {
      .vs__selected {
        color: #FFF;
      }
    }
  }
</style>
