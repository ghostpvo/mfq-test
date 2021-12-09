<template>
  <li class="office-blc__item clickable-unit">
    <!--isBigItem - карточка офиса больше в 2 раза, как на странице мероприятия-->
    <div @click="click" class="office-blc__item-link">
      <div>
        <!--Обрезка 736х677-->
        <div
          v-observe-visibility="{
            callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'pic'),
            once: true
          }"
          :class="{ 'animated-mode': blocksVisibility.pic }"
          class="lazy-image lazy-image--bottom"
        >
          <img
            :src="data.pic"
            class="office-blc__item-pic"
            alt="office"
          >
        </div>
        <span
          v-observe-visibility="{
            callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'title'),
            once: true
          }"
          :class="{ 'animated-mode': blocksVisibility.title }"
          class="office-blc__item-title"
        >
          {{ data.title }}
        </span>
        <location-blc
          v-if="showLocationInItem"
          :locationName="data.locationName"
        />
        <div
          v-if="showShortInfo"
          v-observe-visibility="{
            callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'shortInfo'),
            once: true,
            throttle: 250
          }"
          :class="[
            { 'short-info__reverse': data.bestChoiceTitle !== undefined },
            { 'animated-mode': blocksVisibility.shortInfo }
          ]"
          class="short-info"
        >
          <!--'.short-info__reverse' - класс для стилизации блока, когда пристутствует марка bestChoice-->
          <div v-if="data.bestChoiceTitle !== undefined" class="best-choice">
            <span class="best-choice__title">{{ data.bestChoiceTitle }}</span>
            <!--Сделано через тег имг, чтобы была возможность в будущем менять и текст и иконку пользователем-->
            <img :src="data.bestChoicePic" class="best-choice__pic">
          </div>
          <div class="short-info__main">
            <div class="short-info__content">
              <span class="short-info__title">Вместимость</span>
              <span class="short-info__data">{{ data.capacity }}</span>
            </div>
            <div class="short-info__content">
              <span class="short-info__title">Метраж</span>
              <span v-html="data.meter" class="short-info__data" />
            </div>
          </div>
        </div>
        <p
          v-observe-visibility="{
            callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'dscr'),
            once: true
          }"
          :class="{ 'animated-mode': blocksVisibility.dscr }"
          class="office-blc__item-dscr blc-dscr"
        >
          {{ data.dscr }}
        </p>
        <ul class="offer-list">
          <li v-for="offer in data.offers" :key="offer.id" v-if="offer.title !== ''" class="offer-list__item">
            <div class="offer-list__link">
              <div>
                <img :src="offer.pic" class="offer-list__pic">
              </div>
              <div class="offer-list__content">
                <span v-html="offer.title" class="offer-list__title" />
                <ul class="offer-list__subtitle-list">
                  <li v-for="subtitle in offer.subtitles" class="offer-list__subtitle-item">
                    {{ subtitle.title }}
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <img
        v-if="data.logo !== undefined"
        :src="data.logo"
        class="office-blc__item-logo"
      >
    </div>
    <div v-if="data.isBigItem" class="office-blc__slogan">
      <img class="office-blc__slogan-pic" src="~/static/img/event_slogan_pic.svg">
      <p class="office-blc__slogan-txt">
        {{ data.slogan }}
      </p>
    </div>
  </li>
</template>

<script>
import LocationBlc from '../LocationBlc/LocationBlc'
import mixins from '~/plugins/mixins'

export default {
  name: 'OfficeItem',
  components: { LocationBlc },
  mixins: [ mixins.visibility ],
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    isTeamsOfficesBlc: {
      type: Boolean,
      default: false
    },
    isBoutiqueBlc: {
      type: Boolean,
      default: false
    },
    showShortInfo: {
      type: Boolean,
      default: false
    },
    showLocationInItem: {
      type: Boolean,
      default: false
    },
    haveBiggerTitle: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isActive: false,
      blocksVisibility: {
        pic: false,
        title: false,
        dscr: false,
        shortInfo: false
      }
    }
  },
  methods: {
    click () {
      // this.$emit('clicked')
      this.$store.commit('layout/SET_FEEDBACK_MODAL_STATE', true)
    }
  }
}
</script>

<style lang="scss" scoped>
  .office-blc {
    &__item {
      width: 31.8%;
      margin-left: 16px;
      margin-right: 16px;
      margin-bottom: 58px;
      font-size: 0;

      &:first-child {
        margin-left: 0;

        @include r-max(480) {
          display: block;
        }
      }

      &:last-child {
        margin-right: 0;
      }

      &:nth-child(3n+3) {
        @include r-min(901) {
          margin-right: 0;
        }
      }

      &:nth-child(3n+4) {
        @include r-min(901) {
          margin-left: 0;
        }
      }

      &:nth-child(2n+2) {
        @include r-max(900) {
          margin-right: 0;
        }
      }

      &:nth-child(2n+3) {
        @include r-max(900) {
          margin-left: 0;
        }
      }

      &:hover {
        .office-blc__item-logo {
          opacity: 1;
          filter: grayscale(0%);
        }

        .office-blc__item-pic {
          opacity: 0.9;
          transform: translateZ(0) scale(1.07);
        }
      }

      &.big-item {
        display: flex;
        width: 100%;
        margin-left: 0;
        margin-right: 0;

        .office-blc__item-link {
          width: calc(63.6% + 32px);
          margin-right: 16px;

          @include r-max(1700) {
            width: calc(62.8% + 32px);
          }

          @include r-max(1279) {
            width: calc(60.8% + 32px);
          }

          @include r-max(900) {
            width: 100%;
            height: auto;
          }
        }

        .office-blc__item-pic {
          max-width: 100%;
          width: 100%;

          @include r-min-max(1280, 1700){
            max-height: 21vw;
          }

          @include r-min-max(1101, 1279) {
            max-height: 20.5vw;
          }

          @include r-min-max(900, 1100) {
            max-height: 21vw;
          }
        }

        @include r-max(900) {
          display: block;
        }

        @include r-max(480) {
          display: none;
        }
      }

      &.show-items {
        &.big-item {
          @include r-max(480) {
            display: block;
          }
        }

        @include r-max(480) {
          display: block;
        }
      }

      &-link {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        height: 100%;

        &:hover {
          .office-blc__item-title {
            &:after {
              margin-left: 30px;

              @include r-max(480) {
                margin-left: 25px;
              }
            }
          }
        }
      }

      &-pic {
        max-width: 544px;
        max-height: 21vw;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform .4s ease;

        @include r-min(2000) {
          max-height: 384px;
        }

        @include r-max(1700) {
          max-height: 20vw;
        }

        @include r-max(900) {
          max-height: 35vw;
        }

        @include r-max(480) {
          max-height: 61.5vw;
        }
      }

      &-title {
        position: relative;
        display: block;
        padding-top: 35px;
        padding-right: 40px;
        margin-bottom: 16px;
        font-size: 24px;
        line-height: 128.91%;
        letter-spacing: 0.25px;
        opacity: 0;
        transform: translateY(25px);

        &.animated-mode {
          opacity: 1;
          transform: translateY(0);
          transition: all .5s linear .5s;
        }

        &:after {
          position: absolute;
          display: inline-block;
          bottom: 5px;
          width: 9px;
          height: 16px;
          margin-left: 8px;
          content: '';
          font-size: 0;
          background-image: url("~static/img/arrow_right_black.svg");
          background-repeat: no-repeat;
          background-size: contain;
          transition: all .4s ease;

          @include r-max(1700) {
            bottom: 3px;
            margin-left: 12px;
          }

          @include r-max(900) {
            bottom: 4px;
          }

          @include r-max(480) {
            bottom: 5px;
            height: 11px;
            width: 6px;
            margin-left: 8px;
          }
        }

        @include r-max(1700) {
          padding-top: 29px;
          margin-bottom: 12px;
          font-size: 20px;
        }

        @include r-max(900) {
          padding-top: 20px;
          font-size: 20px;
        }

        @include r-max(480) {
          padding-top: 24px;
          padding-right: 30px;
          margin-bottom: 16px;
        }
      }

      &-dscr {
        max-width: 496px;
        opacity: 0;
        transform: translateY(25px);

        &.animated-mode {
          opacity: 1;
          transform: translateY(0);
          transition: all .5s linear .5s;
        }

        @include r-max(1700) {
          max-width: 26.25vw;
        }

        @include r-max(900) {
          max-width: 96%;
        }
      }

      &-logo {
        display: block;
        margin-top: 36px;
        max-width: 92px;
        max-height: 92px;
        transition: all .4s ease;
        filter: grayscale(100%);
        opacity: .25;

        @include r-max(1700) {
          margin-top: 22px;
        }

        @include r-max(480) {
          margin-top: 23px;
        }
      }

      @include r-max(1700) {
        width: 31.4%;
        margin-bottom: 40px;
      }

      @include r-max(1279) {
        width: 30.4%;
      }

      @include r-max(900) {
        width: 48%;
        margin-left: 8px;
        margin-right: 8px;
        margin-bottom: 25px;
      }

      @include r-max(480) {
        display: none;
        width: 100%;
        margin: 0;
        margin-bottom: 30px;
      }
    }

    .best-choice {
      display: flex;
      align-items: center;
      max-width: 185px;

      &__title {
        display: block;
        padding-right: 10px;
        font-size: 12px;
        text-transform: uppercase;
        text-align: center;
        color: $red;
        letter-spacing: 1.5px;

        @include r-max(1700) {
          padding-right: 6px;
          font-size: 10px;
          line-height: 140%;
          text-align: right;
        }
      }

      &__pic {
        @include r-max(1700) {
          max-width: 13.5px;
          object-fit: contain;
        }

        @include r-max(1200) {
          margin-right: 6px;
        }
      }

      @include r-max(1700) {
        margin-right: 17px;
      }

      @include r-max(1350) {
        width: 66px;
      }

      @include r-max(1200) {
        flex-direction: row-reverse;
        width: 100%;
        max-width: 100%;
        padding-bottom: 15px;
        justify-content: flex-end;
      }

      @include r-max(480) {
        padding-bottom: 17px;
      }
    }

    .short-info {
      display: flex;
      align-items: center;
      padding-top: 12px;
      padding-bottom: 21px;
      justify-content: space-between;
      opacity: 0;
      transition: all .3s ease;

      &.animated-mode {
        opacity: 1;
      }

      &__main {
        min-width: 220px;

        @include r-max(1350) {
          min-width: auto;
          margin-right: 5px;
        }
      }

       &__reverse {
        flex-direction: row-reverse;

        @include r-max(1200) {
          flex-direction: column;
        }
      }

      @include r-max(1700) {
        padding-bottom: 16px;
      }

      @include r-max(1200) {
        flex-direction: column;
        align-items: flex-start;
        padding-top: 0;
        padding-bottom: 18px;
      }
    }

    &__slogan {
      width: 31.8%;
      margin-left: 16px;
      margin-top: -50px;

      &-txt {
        padding-left: 2.8vw;
        font-size: 34px;
        line-height: 140%;

        @include r-min(2000) {
          padding-left: 54px;
        }

        @include r-max(1700) {
          padding-left: 1.5vw;
          font-size: 24px;
        }

        @include r-max(900) {
          padding-top: 150px;
          font-size: 21px;
        }

        @include r-max(700) {
          padding-left: 0;
          padding-top: 0;
        }
      }

      &-pic {
        max-width: 544px;
        max-height: calc(21vw + 50px);
        width: 100%;
        height: 100%;
        margin-bottom: 14px;
        object-fit: contain;

        @include r-min(2000) {
          max-height: 439px;
        }

        @include r-max(1700) {
          max-height: calc(21vw + 40px);
        }

        @include r-max(900) {
          max-height: none;
          height: auto;
          max-width: 50%;
        }

        @include r-max(700) {
          max-width: 350px;
        }
      }

      @include r-max(1700) {
        width: 31.4%;
        margin-top: -38px;
      }

      @include r-max(1279) {
        width: 30.4%;
      }

      @include r-max(1100) {
        margin-top: -32px;
      }

      @include r-max(900) {
        display: flex;
        align-items: flex-start;
        width: 100%;
        margin-left: 0;
        margin-top: 20px;
      }

      @include r-max(700) {
        display: block;
      }

      @include r-max(480) {
        display: none;
      }
    }

    .location-blc {
      margin-top: 10px;

      @include r-max(480) {
        margin-top: 5px;
      }
    }

    .offer-list {
      @include r-max(480) {
        &__pic {
          display: none;
        }

        &__link {
          align-items: flex-start;
        }

        &__content {
          text-align: left;
        }
      }
    }

    &.for-teams {
      .office-blc {
        &__item {
          &-pic {
            max-height: 26.05vw;

            @include r-min(2000) {
              max-height: 500px;
            }

            @include r-max(1700) {
              max-height: 25.5vw;
            }

            @include r-max(900) {
              max-height: 39.5vw;
            }

            @include r-max(480) {
              max-height: 61.5vw;
            }
          }

          &-title {
            font-size: 34px;

            &:after {
              bottom: 10px;

              @include r-max(1700) {
                bottom: 5px;
              }

              @include r-max(900) {
                bottom: 4px;
              }

              @include r-max(480) {
                bottom: 5px;
                height: 11px;
                width: 6px;
              }
            }

            @include r-max(1700) {
              font-size: 24px;
            }

            @include r-max(900) {
              font-size: 20px;
            }
          }

          @include r-max(480) {
            display: block;
          }
        }
      }
    }

    &.big-title {
      .office-blc {
        &__item {
          &-title {
            font-size: 34px;

            &:after {
              bottom: 10px;

              @include r-max(1700) {
                bottom: 5px;
              }

              @include r-max(900) {
                bottom: 4px;
              }

              @include r-max(480) {
                bottom: 5px;
                height: 11px;
                width: 6px;
              }
            }

            @include r-max(1700) {
              font-size: 24px;
            }
          }
        }
      }
    }
  }
</style>
