<template>
  <div
    v-if="state"
    @click="overlayListener($event)"
    class="modal-window modal-inst-stories"
  >
    <div class="modal-window__content">
      <span
        @click="closeWind"
        class="modal-window__close clickable-unit"
      >
        close
      </span>
      <slick
        :options="slickOptions"
        @setPosition="handleSetPosition"
        @afterChange="handleAfterChange"
        class="stories-slides"
      >
        <div
          v-for="slide in slides"
          :key="slide.id"
          :class="{ 'go-animation': goAnimation }"
          class="stories-slides__slide"
        >
          <!--Обрезка 1280x960-->
          <span v-if="state" class="loader-bar">
            loader
          </span>
          <img :src="slide.pic" alt="Story">
        </div>
      </slick>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoriesPopup',
  props: {
    state: {
      type: Boolean,
      default: false
    },
    slides: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      goAnimation: false,
      slickOptions: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        swipe: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4300,
        pauseOnFocus: false,
        pauseOnHover: false,
        speed: 0
      },
      slidesA: [
        {
          pic: '/img/ex/pic1.jpg'
        },
        {
          pic: '/img/ex/pic2.jpg'
        },
        {
          pic: '/img/ex/pic3.jpg'
        }
      ]
    }
  },
  watch: {
    state (val) {
      this.$nextTick(() => {
        this.goAnimation = val
      })
    }
  },
  methods: {
    handleAfterChange () {
      this.goAnimation = false
      this.$nextTick(() => {
        this.goAnimation = true
      })
    },
    closeWind () {
      this.$emit('close')
    },
    overlayListener (e) {
      if (!e.target.closest('.modal-window__content')) {
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="scss">
  .modal-inst-stories {
    background: #262626;

    .modal-window {
      &__content {
        position: relative;
        width: 470px;
        padding: 0;
        margin-left: -235px;
        background: transparent;
      }

      &__close {
        top: 17px;
        z-index: 5;

        &:before,
        &:after {
          background: #E7E7E7;
        }

        @include r-max(1500) {
          top: 0;
        }
      }
    }

    .stories-slides {
      font-size: 0;

      .slick-slide {
        text-align: center;
      }

      &__slide {
        position: relative;
        display: inline-block;
        width: auto !important;

        .loader-bar {
          position: relative;
          z-index: 2;
          display: block;
          height: 3px;
          width: 100%;
          margin-bottom: 14px;
          content: "";
          border-radius: 1px;
          background: #6B6B6B;

          &:after {
            position: absolute;
            top: 0;
            right: 100%;
            left: 0;
            z-index: 3;
            display: block;
            height: 100%;
            content: "";
            border-radius: 1px;
            background: #E7E7E7;
          }
        }

        img {
          display: inline-block;
          max-width: 100%;
          max-height: calc(90vh - 17px);
        }
      }
    }

    .go-animation {
      .loader-bar:after {
        right: 0;
        transition: all 4s linear;
      }
    }

    @include r-max(720) {
      .modal-window {
        &__close {
          top: 20px;
          right: 10px;
        }

        &__content {
          position: static;
          max-width: 100%;
          margin: 0 auto;

          .stories-slides {
            &__slide {
              &:before {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 1;
                width: 100%;
                height: 60px;
                content: "";
                background: rgba(0, 0, 0, 1);
                background: -moz-linear-gradient(top, rgba(0, 0, 0, 1) 0%, rgba(231, 56, 39, 0) 100%);
                background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(100%, rgba(231, 56, 39, 0)));
                background: -webkit-linear-gradient(top, rgba(0, 0, 0, 1) 0%, rgba(231, 56, 39, 0) 100%);
                background: -o-linear-gradient(top, rgba(0, 0, 0, 1) 0%, rgba(231, 56, 39, 0) 100%);
                background: -ms-linear-gradient(top, rgba(0, 0, 0, 1) 0%, rgba(231, 56, 39, 0) 100%);
                background: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(231, 56, 39, 0) 100%);
                filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#000000', endColorstr='#e73827', GradientType=0);
              }

              .loader-bar {
                position: absolute;
                top: 10px;
                right: 10px;
                left: 10px;
                z-index: 3;
                width: auto;
              }

              img {
                max-height: 100vh;
              }
            }
          }

          .slick-next {
            z-index: 4;
            top: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            transform: translate(0);

            &:before {
              font-size: 0;
            }
          }
        }
      }

      .slick-initialized .slick-active {
        .loader-bar:after {
          right: 0;
        }
      }
    }
  }
</style>
