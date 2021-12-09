<template>
  <li class="benefits__item">
    <!--Если картинка статичная, везде одинаковая: ~/static/img/benefits_item.svg-->
    <img
      v-observe-visibility="{
        callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'picture'),
        once: true,
        throttle: 300
      }"
      :class="{ 'animated-mode': blocksVisibility.picture }"
      :src="pic"
      class="benefits__item-pic"
    >
    <span
      v-observe-visibility="{
        callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'title'),
        once: true,
        throttle: 300
      }"
      :class="{ 'animated-mode': blocksVisibility.title }"
      class="benefits__item-title"
    >{{ title }}</span>
    <p
      v-observe-visibility="{
        callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'dscr'),
        once: true,
        throttle: 300
      }"
      :class="{ 'animated-mode': blocksVisibility.dscr }"
      class="blc-dscr"
    >
      {{ dscr }}
    </p>
  </li>
</template>

<script>
import mixins from '~/plugins/mixins'

export default {
  name: 'OurBenefitsItem',
  mixins: [ mixins.visibility ],
  props: {
    title: {
      type: String,
      default: ''
    },
    dscr: {
      type: String,
      default: ''
    },
    pic: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      blocksVisibility: {
        picture: false,
        title: false,
        dscr: false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .benefits {
    &__item {
      width: 16.6%;
      padding-right: 31px;
      padding-left: 31px;
      margin-bottom: 50px;

      &:nth-child(3n+1) {
        @include r-min-max(901, 1700) {
          padding-left: 32px;
        }
      }

      &:nth-child(2n+1) {
        @include r-max(900) {
          padding-left: 0;
        }
      }

      &:nth-child(2n+2) {
        @include r-max(900) {
          padding-right: 0;
        }
      }

      &-pic {
        display: block;
        width: 68px;
        height: 68px;
        margin-bottom: 30px;
        object-fit: cover;
        border-radius: 50%;
        opacity: 0;
        transform: scale(1.25);
        transition: all .5s ease-out;

        &.animated-mode {
          opacity: 1;
          transform: scale(1);
        }

        @include r-max(1700) {
          margin-bottom: 23px;
        }

        @include r-max(480) {
          margin-bottom: 14px;
        }
      }

      &-title {
        display: block;
        margin-bottom: 19px;
        font-size: 24px;
        letter-spacing: 0.25px;
        line-height: 129%;
        opacity: 0;
        transform: translateY(15px);
        transition: all .5s ease-out;

        &.animated-mode {
          @include show-it;
        }

        @include r-max(1700) {
          margin-bottom: 17px;
          font-size: 20px;
        }

        @include r-max(900) {
          font-size: 18px;
        }
      }

      .blc-dscr {
        letter-spacing: 0.25px;
        line-height: 168%;
        opacity: 0;
        transform: translateY(15px);
        transition: all .5s ease-out;

        &.animated-mode {
          @include show-it;
        }

        @include r-max(1700) {
          line-height: 160%;
        }
      }

      @include r-max(1700) {
        width: 33.3%;
        padding-right: 25.5px;
        padding-left: 39.5px;
        margin-bottom: 35px;
      }

      @include r-max(900) {
        width: 50%;
        padding-left: 30px;
        padding-right: 30px;
      }

      @include r-max(480) {
        width: 100%;
        padding: 0;
        margin-bottom: 31px;
      }
    }
  }
</style>
