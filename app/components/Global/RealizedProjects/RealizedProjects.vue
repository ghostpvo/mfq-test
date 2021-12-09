<template>
  <div id="realized" class="realized-projects__wrap">
    <div class="realized-projects">
      <div
        class="b-wrap realized-projects__header"
      >
        <h6
          v-observe-visibility="{
            callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'header'),
            once: true,
            throttle: 700
          }"
          :class="{ 'animated-mode': blocksVisibility.header }"
          class="blc-title"
        >
          {{ mainTitle }}
        </h6>
        <div
          v-observe-visibility="{
            callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'header'),
            once: true,
            throttle: 700
          }"
          :class="{ 'animated-mode': blocksVisibility.header }"
          class="realized-projects__btns"
        >
          <nuxt-link to="/offices" class="main-link clickable-unit">
            Посмотреть все офисы
          </nuxt-link>
          <span class="realized-projects__btns-tip">или</span>
          <span
            v-if="dreamOfficePage"
            @click="$store.commit('layout/SET_FEEDBACK_MODAL_STATE', true)"
            class="btn-blue clickable-unit"
          >
            Следовать за мечтой
          </span>
          <nuxt-link
            v-else
            to="/dream-office"
            class="btn-blue clickable-unit"
          >
            Следовать за мечтой
          </nuxt-link>
        </div>
      </div>
      <slick
        v-observe-visibility="{
          callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'slider'),
          once: true
        }"
        :class="{ 'animated-mode': blocksVisibility.slider }"
        :options="slickOptions"
      >
        <div
          v-for="(item, index) in items"
          :key="`item-${index}`"
          class="realized-projects__item clickable-unit"
        >
          <!--Обрезка ширина х 684-->
          <div class="lazy-pic lazy-image lazy-image--left">
            <img :src="item.pic" class="realized-projects__pic" alt="">
          </div>
          <div class="realized-projects__txt">
            <div class="realized-projects__main">
              <span class="realized-projects__txt-title">{{ item.title }}</span>
              <p class="blc-dscr">
                {{ item.dscr }}
              </p>
            </div>
            <div class="realized-projects__author">
              <span class="realized-projects__author-position blc-dscr">{{ item.authorPosition }}</span>
              <span class="realized-projects__author-name">{{ item.authorName }}</span>
            </div>
          </div>
        </div>
      </slick>
    </div>
  </div>
</template>

<script>
import mixins from '~/plugins/mixins'

export default {
  name: 'RealizedProjects',
  mixins: [ mixins.visibility ],
  props: {
    dreamOfficePage: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => []
    },
    mainTitle: {
      type: String,
      default: 'Реализованные проекты'
    }
  },
  data () {
    return {
      slickOptions: {
        slidesToShow: 2,
        infinite: false,
        variableWidth: true,
        arrows: false,
        centerPadding: '112px',
        responsive: [
          {
            breakpoint: 741,
            settings: {
              slidesToShow: 1,
              variableWidth: false,
              centerMode: true,
              centerPadding: '4.5vw'
            }
          },
          {
            breakpoint: 481,
            settings: {
              slidesToShow: 1,
              variableWidth: false,
              centerMode: true,
              centerPadding: '26px'
            }
          }
        ]
      },
      blocksVisibility: {
        header: false,
        slider: false,
        dscr: false,
        author: false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .realized-projects {
    position: relative;
    max-width: 1920px;
    padding: 100px 0;
    margin: 0 auto;

    &__wrap {
      background-color: #F2F2F2;

      @include r-max(1240) {
        padding-bottom: 100px;
      }

      @include r-max(480) {
        padding-bottom: 40px;
      }
    }

    &__header {
      display: flex;
      padding-bottom: 48px;
      justify-content: space-between;

      @include r-max(1700) {
        padding-bottom: 41px;
      }

      @include r-max(1240) {
        display: block;
      }

      @include r-max(480) {
        padding-bottom: 24px;
      }
    }

    .blc-title {
      opacity: 0;
      transform: translateY(25px);
      transition: all .3s ease-out;

      &.animated-mode {
        opacity: 1;
        transform: translateY(0);
      }
    }

    &__btns {
      display: flex;
      padding-top: 4px;
      margin-right: 80px;
      opacity: 0;
      transform: translateY(25px);
      transition: all .3s ease-out;

      &.animated-mode {
        opacity: 1;
        transform: translateY(0);
      }

      &-tip {
        display: flex;
        align-items: center;
        width: 96px;
        height: 40px;
        font-size: 14px;
        justify-content: center;
        letter-spacing: 0.75px;
        text-transform: uppercase;

        @include r-max(1700) {
          height: 32px;
          width: 56px;
          font-size: 12px;
        }

        @include r-max(900) {
          font-size: 11px;
        }

        @include r-max(740) {
          width: 100%;
          margin: 5px 0;
        }

        @include r-max(480) {
          margin: 0;
          font-size: 12px;
        }
      }

      .main-link {
        width: 288px;
        color: $txt-color;
        border-color: $txt-color;

        &:before,
        &:after {
          background-image: url("~static/img/arrow_right_black.svg");
        }

        @include r-max(1700) {
          width: 221px;
          padding-right: 30px;
        }

        @include r-max(1240) {
          width: 250px;
        }

        @include r-max(740) {
          width: 100%;
        }
      }

      .btn-blue {
        width: 320px;
        padding-top: 0;

        @include r-min(1701) {
          font-size: 14px;
        }

        @include r-max(1700) {
          width: 207px;
        }

        @include r-max(1240) {
          width: 250px;
        }

        @include r-max(740) {
          width: 100%;
        }
      }

      @include r-max(1700) {
        margin-right: 48px;
      }

      @include r-max(1300) {
        margin-right: 30px;
      }

      @include r-max(1240) {
        position: absolute;
        bottom: 0;
        left: 6.4vw;
        right: 6.4vw;
        margin: 0 auto;
      }

      @include r-max(1100) {
        left: 4.5vw;
        right: 4.5vw;
      }

      @include r-max(740) {
        flex-direction: column;
        width: 400px;
        max-width: 100%;
      }

      @include r-max(480) {
        width: auto;
        left: 16px;
        right: 16px;
      }
    }

    &__item {
      display: flex!important;
      flex-direction: column;
      height: 100%;

      &:hover {
        .realized-projects__pic {
          opacity: .9;
          transform: translateZ(0) scale(1.07);
        }
      }
    }

    &__pic {
      width: 100%;
      height: 35.63vw;
      max-height: 684px;
      object-fit: cover;
      transition: transform .4s ease;

      @include r-max(1700) {
        height: 25.2vw;
      }

      @include r-max(900) {
        height: 35vw;
      }

      @include r-max(740) {
        height: 50vw;
      }

      @include r-max(480) {
        height: 61.4vw;
      }
    }

    &__txt {
      display: flex;
      flex-direction: column;
      flex: 1;
      max-width: 535px;
      padding-top: 32px;
      justify-content: space-between;

      &-title {
        display: block;
        padding-bottom: 16px;
        font-size: 24px;
        letter-spacing: 0.25px;
        opacity: 0;
        transform: translateY(-15px);
        transition: all .5s ease-out;

        @include r-max(1700) {
          padding-bottom: 13px;
          font-size: 20px;
        }

        @include r-max(480) {
          font-size: 18px;
        }
      }

      .blc-dscr {
        opacity: 0;
        transition: all .5s ease-out;

        @include r-max(1700) {
          letter-spacing: 0.29px;
        }
      }

      @include r-max(1700) {
        max-width: 26vw;
        padding-top: 29px;
      }

      @include r-max(740) {
        max-width: 85%;
        padding-left: 3px;
      }

      @include r-max(480) {
        max-width: 100%;
        padding-top: 22px;
      }
    }

    &__author {
      padding-top: 18px;

      &-position {
        display: block;
        opacity: 0;
        transform: translateY(-15px);
        transition: all .5s ease-out;

        @include r-max(480) {
          display: inline-block;
        }
      }

      &-name {
        display: block;
        padding-top: 3px;
        font-size: 20px;
        letter-spacing: 0.44px;
        opacity: 0;
        transition: all .5s ease-out;

        @include r-max(1700) {
          font-size: 18px;
        }

        @include r-max(900) {
          font-size: 16px;
        }

        @include r-max(480) {
          display: inline-block;
          font-size: 17px;
        }
      }

      @include r-max(1700) {
        padding-top: 13px;
      }

      @include r-max(480) {
        padding-top: 17px;
      }
    }

    .animated-mode {
      .realized-projects__txt-title,
      .blc-dscr,
      .realized-projects__author-position,
      .realized-projects__author-name {
        @include show-it;
      }
    }

    @include r-max(1700) {
      padding-top: 56px;
      padding-bottom: 66px;
    }

    @include r-max(1240) {
      padding-bottom: 80px;
    }

    @include r-max(740) {
      padding-bottom: 135px;
    }

    @include r-max(480) {
      padding-top: 40px;
      padding-bottom: 123px;
    }
  }
</style>

<style lang="scss">
  @import "realized-projects";
</style>
