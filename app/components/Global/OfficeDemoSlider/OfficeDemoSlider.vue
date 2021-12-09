<template>
  <div class="office-slider__wrap">
    <div
      :class="{ 'have-bottom-form': haveForm}"
      class="office-slider b-wrap"
    >
      {{ fixedItems }}
      <!--haveForm - добавляем педдинг блоку, когда внизу есть форма, которая наезжает на него-->
      <slick ref="slick" :options="slickOptions">
        <div
          v-observe-visibility="{
            callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'sliderNav'),
            once: true,
            throttle: 500
          }"
          :class="{ 'animated-mode': blocksVisibility.sliderNav }"
          v-for="item in fixedItems"
          :key="item.id"
          class="office-slider__slide"
        >
          <div class="office-slider__txt-side">
            <div class="office-slider__txt-side-content">
              <span class="office-slider__txt-side-nav">{{ item.title }}</span>
              <h6 class="blc-subtitle">
                {{ item.mainSubtitle }}
              </h6>
              <h3
                v-observe-visibility="{
                  callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'blcTitle'),
                  once: true,
                  throttle: 500
                }"
                :class="{ 'animated-mode': blocksVisibility.blcTitle }"
                class="blc-title"
              >
                {{ item.title }}
              </h3>
              <location-blc
                :locationName="item.locationName"
                v-observe-visibility="{
                  callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'location'),
                  once: true,
                  throttle: 500
                }"
                :class="{ 'animated-mode': blocksVisibility.location }"
              />
              <p
                v-observe-visibility="{
                  callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'blcDescription'),
                  once: true,
                  throttle: 500
                }"
                :class="{ 'animated-mode': blocksVisibility.blcDescription }"
                class="blc-dscr"
              >
                {{ item.dscr }}
              </p>
              <div v-if="item.benefitTitle !== undefined" class="office-slider__benefits">
                <span
                  v-observe-visibility="{
                    callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'benefitsTittle'),
                    once: true,
                    throttle: 500
                  }"
                  :class="{ 'animated-mode': blocksVisibility.benefitsTittle }"
                  class="office-slider__benefits-title"
                >{{ item.benefitTitle }}</span>
                <ul
                  v-observe-visibility="{
                    callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'benefitsList'),
                    once: true,
                    throttle: 500
                  }"
                  :class="{ 'animated-mode': blocksVisibility.benefitsList }"
                  class="office-slider__benefits-list"
                >
                  <li
                    v-for="(benefit, index) in item.benefits"
                    :key="`benefit-${index}`"
                    class="list-items"
                  >
                    {{ benefit.point }}
                  </li>
                </ul>
              </div>
              <div
                v-observe-visibility="{
                  callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'shortInfo'),
                  once: true,
                  throttle: 500
                }"
                :class="{ 'animated-mode': blocksVisibility.shortInfo }"
                class="short-info__main"
              >
                <div class="short-info__content">
                  <span class="short-info__title">Вместимость</span>
                  <span class="short-info__data">{{ item.capacity }}</span>
                </div>
                <div class="short-info__content">
                  <span class="short-info__title">Метраж</span>
                  <span v-html="item.meter" class="short-info__data" />
                </div>
              </div>
              <div
                v-observe-visibility="{
                  callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'mainLink'),
                  once: true,
                  throttle: 500
                }"
                :class="{ 'animated-mode': blocksVisibility.mainLink }"
                class="main-link__wrap"
              >
                <a @click="$store.commit('layout/SET_SCHEDULE_MODAL_STATE', true)" class="main-link clickable-unit" target="_blank">{{ buttonTitle }}</a>
              </div>
            </div>
          </div>
          <div
            v-observe-visibility="{
              callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'mainPic'),
              once: true,
              throttle: 500
            }"
            :class="{ 'animated-mode': blocksVisibility.mainPic }"
            class="office-slider__pic-side lazy-image lazy-image--left"
          >
            <!--Обрезка 3840х3760 или пропорционально 960х940-->
            <img :src="item.pic" class="office-slider__pic">
          </div>
        </div>
      </slick>
    </div>
  </div>
</template>

<script>
import LocationBlc from '../../Elements/LocationBlc/LocationBlc'
import mixins from '~/plugins/mixins'

export default {
  name: 'OfficeDemoSlider',
  components: { LocationBlc },
  mixins: [ mixins.visibility ],
  props: {
    items: {
      type: Array,
      default: () => []
    },
    buttonTitle: {
      type: String,
      default: 'Записаться на просмотр'
    },
    linkTo: {
      type: String,
      default: ''
    },
    benefits: {
      type: Array,
      default: () => []
    },
    haveForm: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      fixedItems: [],
      slickOptions: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        infinite: false,
        fade: true,
        cssEase: 'linear',
        speed: 200
      },
      blocksVisibility: {
        sliderNav: false,
        blcTitle: false,
        location: false,
        blcDescription: false,
        benefitsTittle: false,
        benefitsList: false,
        shortInfo: false,
        mainLink: false,
        mainPic: false
      }
    }
  },
  beforeMount () {
    this.fixedItems = JSON.parse(JSON.stringify(this.items))
  }
}
</script>

<style lang="scss" scoped>
  .office-slider {
    position: relative;
    padding: 0;
    margin-top: 42px;
    /*margin-bottom: 50px;*/
    font-size: 0;

    &__wrap {
      background-color: $dark-blue;
    }

    &__slide {
      display: flex!important;
      height: 100%;

      @include r-max(700) {
        flex-direction: column;
      }

      &.animated-mode {
        .office-slider__txt-side-nav,
        .slick-arrow {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }

    .slick-arrow {
      opacity: 0;
      transition: all .3s ease-out .5s;

      &.slick-next {
        transform: translateX(15px);
      }

      &.slick-prev {
        transform: translateX(-15px);
      }
    }

    &__txt-side {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 50%;
      padding: 90px 20px 90px 112px;
      justify-content: center;

      &-content {
        max-width: 530px;
        margin-left: 4.2vw;

        .animated-mode {
          opacity: 1!important; // Не переписывать
          transform: translate(0)!important; // Не переписывать
        }

        @include r-min(2000) {
          margin-left: 80px;
          margin-top: -52px;
        }

        @include r-max(1700) {
          max-width: 450px;
          margin-top: 0;
          margin-left: 48px;
        }

        @include r-max(1100) {
          margin-left: 15px;
        }

        @include r-max(700) {
          max-width: 90%;
          padding-top: 45px;
          margin-left: 0;
        }

        @include r-max(480) {
          max-width: 100%;
        }
      }

      &-nav {
        position: absolute;
        top: 44px;
        left: 5.5vw;
        display: flex;
        align-items: center;
        height: 44px;
        max-width: 340px;
        width: 100%;
        padding: 0 10px;
        margin-left: 112px;
        justify-content: center;
        font-size: 14px;
        line-height: 124%;
        letter-spacing: 0.25px;
        text-align: center;
        text-transform: uppercase;
        color: #FFF;
        opacity: 0;
        transform: translateY(15px);
        transition: all .3s ease-out .5s;

        @include r-min(2000) {
          left: 106px;
        }

        @include r-max(1700) {
          left: 7.5vw;
          top: 23px;
          height: 40px;
          max-width: 17.5vw;
          margin-left: 48px;
          font-size: 12px;
        }

        @include r-max(1100) {
          max-width: 227px;
          margin-left: 15px;
        }

        @include r-max(900) {
          left: 6vw;
        }

        @include r-max(700) {
          left: 0;
          top: calc(76.8vw + 30px + 40px); // высота картинки + отступа сверху + самого текста
          max-width: none;
          padding: 0 70px;
          margin-top: 2.5vw;
          margin-left: 0;
        }

        @include r-max(480) {
          top: calc(93.8vw + 25px + 15px);
          padding: 0 42px;
        }
      }

      .blc-title {
        padding-left: 0;
        color: #FFF;
        letter-spacing: -1.5px;
        opacity: 0;
        transform: translateY(15px);
        transition: all .5s ease-out;

        @include r-max(1700) {
          font-size: 30px;
        }

        @include r-min-max(701, 900) {
          font-size: 20px;
        }

        @include r-max(480){
          line-height: 140%;
        }
      }

      .blc-subtitle {
        color: #FFF;
        opacity: 0;
        transition: all .5s ease-out;
      }

      .blc-dscr {
        margin-top: 31px;
        color: #FFF;
        opacity: 0;
        transform: translateY(15px);
        transition: all .5s ease-out;

        @include r-max(1700) {
          margin-top: 29px;
        }

        @include r-max(900) {
          margin-top: 20px;
        }

        @include r-max(480) {
          margin-top: 31px;
        }
      }

      .main-link {
        margin-top: 34px;

        &__wrap {
          opacity: 0;
          transform: translateY(15px);
          transition: all .5s ease-out;
        }

        @include r-max(700) {
          margin-top: 20px;
        }

        @include r-max(480) {
          margin-top: 34px;
        }
      }

      .location-blc {
        margin-top: 28px;
        color: #FFF;
        opacity: 0;
        transition: all .5s ease-out;

        @include r-max(900) {
          margin-top: 15px;
        }

        @include r-max(480) {
          margin-top: 26px;
        }
      }

      .short-info {
        &__main {
          margin-top: 24px;
          opacity: 0;
          transition: all .5s ease-out;

          @include r-max(900) {
            margin-top: 15px;
          }
        }

        &__title {
          color: #FFF;

          @include r-max(900) {
            font-size: 12px;
          }

          @include r-max(480) {
            font-size: 14px;
          }
        }

        &__data {
          color: #FFF;
        }

        &__content {
          border-color: #FFF;
        }
      }

      @include r-max(1700) {
        padding-top: 60px;
        padding-left: 6.4vw;
        padding-bottom: 60px;
      }

      @include r-max(900) {
        padding-left: 4.5vw;
        padding-top: 20px;
        padding-bottom: 20px;
      }

      @include r-max(700) {
        position: static;
        order: 2;
        width: 100%;
        padding: 30px 4.5vw;
      }

      @include r-max(480) {
        padding: 40px 16px;
      }
    }

    &__benefits {
      padding-top: 16px;

      &-title {
        font-size: 20px;
        line-height: 160%;
        letter-spacing: 0.44px;
        color: #FFF;

        @include r-max(1700) {
          font-size: 18px;
        }

        @include r-max(900) {
          font-size: 16px;
        }

        @include r-max(480) {
          font-size: 18px;
        }
      }

      &-list {
        padding-top: 8px;

        @include r-max(900) {
          padding-top: 4px;
        }

        @include r-max(480) {
          padding-top: 8px;
        }
      }

      .list-items {
        line-height: 140%;
        margin-bottom: 4px;
        color: #FFF;

        @include r-max(900) {
          margin-bottom: 0;
        }

        @include r-max(480) {
          margin-bottom: 6px;
        }
      }

      @include r-max(900) {
        padding-top: 6px;
      }

      @include r-max(480) {
        padding-top: 16px;
        padding-bottom: 1px;
      }
    }

    &__pic-side {
      width: 50%;

      @include r-max(700) {
        order: 1;
        width: 100%;
        padding: 30px 4.5vw 0;
      }

      @include r-max(480) {
        padding: 25px 16px 0;
      }
    }

    &__pic {
      max-width: 100%;
      width: 100%;
      min-height: 49vw;
      height: 100%;
      object-fit: cover;

      @include r-min(2000){
        min-height: 940px;
      }

      @include r-max(1700) {
        min-height: 56.8vw;
      }

      @include r-max(1100) {
        min-height: 76.8vw;
      }

      @include r-max(480) {
        min-height: 93.8vw;
      }
    }

    &.have-bottom-form {
      margin-bottom: 0;

      .office-slider {
        &__txt-side {
          @include r-min(1701) {
            padding-bottom: 232px;
            padding-top: 125px;
          }

          /*@include r-max(1100) {
            padding-bottom: 80px;
          }

          @include r-max(750) {
            padding-bottom: 20px;
          }

          @include r-max(480) {
            padding-bottom: 40px;
          }*/
        }
      }
    }

    @include r-max(1700) {
      /*margin-bottom: 40px;*/
    }
  }
</style>

<style lang="scss">
  @import "office-demo-slider.scss";
</style>
