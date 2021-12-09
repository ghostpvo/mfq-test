<template>
  <div
    :class="{'with-title' : haveTitle, 'have-subtitle' : haveSubtitle}"
    class="main-banner"
  >
    <!--haveTitle - имеет подпись внизу баннера
        haveSubtitle - имеет доп подпись внизу слева-->
    <div class="main-banner__slider-wrap">
      <div class="main-banner__slider">
        <slick :options="slickOptions" @setPosition="handleSetPosition" class="slider">
          <div v-for="slide in slides" :key="slide.id" class="main-banner__slide">
            <!--Обрезка 1280x960-->
            <img :src="slide.pic" alt="slide">
          </div>
        </slick>
        <div class="main-banner__slider-counter">
          <span class="main-banner__slider-counter-active" />
          <span class="main-banner__slider-counter-total" />
        </div>
      </div>
      <div v-if="haveTitle" class="main-banner__txt-blc">
        <div v-if="haveSubtitle" class="main-banner__subtxt">
          <p class="blc-dscr">
            {{ bannerSubtitle }}
          </p>
          <span @click="$store.commit('layout/SET_FEEDBACK_MODAL_STATE', true)" class="main-link clickable-unit">{{ bannerBtnTitle }}</span>
        </div>
        <h2 class="main-banner__title">
          {{ bannerTitle }}
        </h2>
      </div>
      <span v-if="haveArrowDown" class="main-banner__arrow-down" />
    </div>
    <!--for-mob - для текста на баннере на моб блоках-->
    <div v-if="haveTitle" class="main-banner__txt-blc for-mob">
      <h2 class="main-banner__title">
        {{ bannerTitle }}
      </h2>
      <div v-if="haveSubtitle" class="main-banner__subtxt">
        <p class="blc-dscr">
          {{ bannerSubtitle }}
        </p>
        <span @click="$store.commit('layout/SET_FEEDBACK_MODAL_STATE', true)" class="main-link">{{ bannerBtnTitle }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'MainBanner',
  props: {
    haveTitle: {
      type: Boolean,
      default: false
    },
    haveSubtitle: {
      type: Boolean,
      default: false
    },
    bannerTitle: {
      type: String,
      default: ''
    },
    bannerBtnTitle: {
      type: String,
      default: 'Получить презентацию'
    },
    bannerSubtitle: {
      type: String,
      default: ''
    },
    bannerBtnLink: {
      type: String,
      default: ''
    },
    haveArrowDown: {
      type: Boolean,
      default: true
    },
    slides: {
      type: Array,
      default () {
        return [
          {
            id: 1,
            pic: '/img/banner_slide.jpg'
          },
          {
            id: 2,
            pic: '/banner2.jpg'
          },
          {
            id: 3,
            pic: '/banner3.jpeg'
          }
        ]
      }
    }
  },
  data () {
    return {
      slickOptions: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        infinite: false,
        responsive: [
          {
            breakpoint: 1280,
            settings: {
              arrows: false
            }
          }
        ]
      }
    }
  },
  mounted () {
    /* const status = document.querySelector('.main-banner__slider-counter-active')
    const commonSlides = document.querySelector('.main-banner__slider-counter')
    const slickElement = document.querySelector('.slider')

    slickElement.addEventListener('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
      debugger
      const i = (currentSlide ? isNaN(currentSlide) || currentSlide : 0) + 1
      commonSlides.innerHTML = '/' + slick.slideCount
      status.innerHTML = i
    }) */
  },
  methods: {
    handleSetPosition () {
      const $status = $('.main-banner__slider-counter-active')
      const $commonSlides = $('.main-banner__slider-counter-total')
      const $slickElement = $('.slider')
      $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        // currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        const i = (currentSlide ? isNaN(currentSlide) || currentSlide : 0) + 1
        $status.text(i)
        $commonSlides.text('/' + slick.slideCount)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-banner {
    position: relative;
    max-width: 1920px;
    margin: 0 auto 10px;
    font-size: 0;

    &__slider-wrap {
      position: relative;
      height: calc(100vh - 194px);
      padding-left: 112px;
      overflow: hidden;

      @include r-min(2600) {
        height: auto;
      }

      @include r-max(1700) {
        height: calc(100vh - 136.3px);
        padding-left: 6.4vw;
      }

      @include r-max(1279) {
        height: 55vh;
      }

      @include r-max(1100) {
        padding-left: 4.5vw;
      }

      @include r-max(600) {
        padding-left: 0;
      }

      @include r-max(480) {
        height: calc(100vh - 47px);
        min-height: 500px;
      }
    }

    &__slider {
      position: relative;
      height: 100%;
    }

    &__slide {
      height: 100%;

      img {
        max-width: 100%;
        width: 100%;
        max-height: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__slider-counter {
      position: absolute;
      top: 50%;
      left: -112px;
      width: 112px;
      text-align: center;
      transform: translateY(-50%);

      &-total {
        font-size: 20px;

        @include r-max(1700) {
          font-size: 18px;
        }

        @include r-max(1100) {
          font-size: 10px;
        }

        @include r-max(600) {
          font-size: 18px;
        }
      }

      &-active {
        display: inline-block;
        min-width: 18.7px;
        font-size: 34px;

        @include r-max(1700) {
          font-size: 30px;
        }

        @include r-max(1100) {
          min-width: 11.56px;
          font-size: 21px;
        }

        @include r-max(600) {
          min-width: 16.5px;
          font-size: 30px;
        }
      }

      @include r-max(1700) {
        left: -6.4vw;
        width: 6.4vw;
      }

      @include r-max(1100) {
        left: -4.5vw;
        width: 4.5vw;
      }

      @include r-max(600) {
        top: auto;
        left: 0;
        bottom: 110px;
        width: 64px;
        background-color: #FFF;
      }
    }

    &__txt-blc {
      position: absolute;
      display: flex;
      align-items: center;
      bottom: 0;
      left: 112px;
      right: 0;
      z-index: 1;
      /*height: 30vh;*/
      min-height: 300px;
      padding: 10px 112px 10px 0;
      text-align: right;
      background-color: #FFF;

      &.for-mob {
        display: none;

        @include r-max(700) {
          display: block;
        }

        @include r-max(480) {
          min-height: 119px;
        }
      }

      @include r-max(1700) {
        left: 6.4vw;
        min-height: 210px;
        padding-right: 6.4vw;
      }

      @include r-max(1100) {
        left: 4.5vw;
        padding-right: 4.5vw;
      }

      @include r-max(700) {
        display: none;
        position: relative;
        left: auto;
        right: auto;
        padding-left: 4.5vw;
      }

      @include r-max(480) {
        padding-top: 16px;
        padding-bottom: 33px;
        margin-top: -130px;
      }
    }

    &__title {
      display: block;
      max-width: 1380px;
      margin-left: auto;
      font-size: 120px;
      line-height: 142px;
      letter-spacing: -1.5px;
      text-transform: uppercase;

      @include r-max(1700) {
        max-width: 840px;
        font-size: 70px;
        line-height: 83px;
      }

      @include r-max(1279) {
        font-size: 57px;
        line-height: 71px;
      }

      @include r-max(480) {
        font-size: 30px;
        line-height: 35px;
      }
    }

    &__subtxt {
      max-width: 400px;
      margin-right: 5px;
      text-align: left;

      @include r-max(700) {
        display: block;
        max-width: 100%;
        margin-top: 20px;
      }

      @include r-max(480) {
        margin-top: 47px;
      }
    }

    &__arrow-down {
      position: absolute;
      bottom: 12px;
      left: 0;
      width: 112px;
      height: 66px;
      background-image: url("~static/img/long_dark_arrow.svg");
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;

      @include r-max(1700) {
        bottom: 28px;
        width: 6.4vw;
        height: 52px;
      }

      @include r-max(1100) {
        bottom: 9px;
        width: 4.5vw;
      }

      @include r-max(900) {
        height: 45px;
      }

      @include r-max(600) {
        display: none;
      }
    }

    .main-link {
      max-width: 280px;
      margin-top: 32px;

      @include r-max(1700) {
        max-width: 256px;
        margin-top: 14px;
      }

      @include r-max(480) {
        margin-top: 30px;
      }
    }

    &.with-title {
      min-height: 300px;

      .main-banner {
        &__slider {
          height: 49vh;

          @include r-min(2600) {
            height: auto;
          }

          @include r-min-max(2000, 2599) {
            height: 62vh;
          }

          @include r-max(1700) {
            min-height: 300px;
          }

          @include r-max(700) {
            height: 100%;
          }
        }

        &__slider-wrap {
          min-height: 300px;

          @include r-max(1700) {
            min-height: 460px;
          }

          @include r-max(1279) {
            height: 70vh;
          }

          @include r-max(700) {
            height: 55vh;
          }

          @include r-max(480) {
            height: calc(100vh - 47px);
            min-height: 500px;
          }
        }

        &__slide {
          img {
            @include r-max(480) {
              height: calc(100% - 130px);
            }
          }
        }
      }

      &.have-subtitle {
        .main-banner {
          &__title {
            max-width: 1200px;

            @include r-max(1700) {
              max-width: 680px;
            }
          }
        }
      }
    }
  }
</style>

<style lang="scss">
  @import 'main-banner-slider';
</style>
