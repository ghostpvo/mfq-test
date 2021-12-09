<template>
  <div
    ref="page-wrapper"
    class="page-wrapper"
  >
    <main-header />
    <div class="page-wrapper">
      <nuxt />
    </div>
    <div
      :class="[
        'g-cursor',
        {
          'g-cursor-hover': hoverCursor,
          'g-cursor-next': cursorNext,
          'g-cursor-prev': cursorPrev
        }
      ]"
    >
      <div ref="point" :style="cursorPoint" class="g-cursor__point" />
    </div>
    <main-footer />
    <feedback-popup
      :state="$store.state.layout.feedbackModalState"
      @close="$store.commit('layout/SET_FEEDBACK_MODAL_STATE', false)"
    />
    <thanks-popup
      :state="$store.state.layout.thanksModalState"
      @close="$store.commit('layout/SET_THANKS_MODAL_STATE', false)"
    />
    <schedule-view-popup
      :state="$store.state.layout.scheduleViewModalState"
      @close="$store.commit('layout/SET_SCHEDULE_MODAL_STATE', false)"
    />
  </div>
</template>

<script>
import MainHeader from '../components/Global/MainHeader/MainHeader'
import MainFooter from '../components/Global/MainFooter/MainFooter'
import FeedbackPopup from '../components/Popups/Feedback'
import ThanksPopup from '../components/Popups/Thanks'
import ScheduleViewPopup from '../components/Popups/ScheduleView'

export default {
  components: { ScheduleViewPopup, ThanksPopup, FeedbackPopup, MainFooter, MainHeader },
  data () {
    return {
      xChild: 0,
      yChild: 0,
      xParent: 0,
      yParent: 0,
      hoverCursor: false,
      cursorNext: false,
      cursorPrev: false
    }
  },
  computed: {
    cursorPoint () {
      return `transform: translateX(${this.xChild - 3}px) translateY(${this.yChild - 3}px) translateZ(0) translate3d(0, 0, 0);`
    },
    bodyPopupMode () {
      return this.$store.state.layout.feedbackModalState || this.$store.state.layout.scheduleViewModalState || this.$store.state.layout.thanksModalState
    }
  },
  watch: {
    bodyPopupMode () {
      document.querySelector('body').style.overflow = this.bodyPopupMode ? 'hidden' : 'auto'
      this.initCursor()
    },
    '$route.fullPath' () {
      setTimeout(() => this.initCursor(), 2000)
    }
  },
  mounted () {
    setTimeout(() => this.initCursor(), 2000)
  },
  methods: {
    initCursor () {
      this.hoverCursor = false
      this.cursorNext = false
      this.cursorPrev = false
      this.$nextTick(() => {
        if ('ontouchstart' in document.documentElement) {
          document.querySelector('body').classList.add('touchscreen-mode')
        } else {
          document.addEventListener('mousemove', this.moveCursor)

          const clickable = document.querySelectorAll('.clickable-unit, .office-slider .slick-arrow')
          // console.log(clickable)
          const slickPrev = document.querySelector('.main-banner .slick-prev')
          const slickNext = document.querySelector('.main-banner .slick-next')

          slickPrev && slickPrev.addEventListener('mouseenter', () => {
            this.cursorPrev = true
          })

          slickPrev && slickPrev.addEventListener('mouseleave', () => {
            this.cursorPrev = false
          })

          slickNext && slickNext.addEventListener('mouseenter', () => {
            this.cursorNext = true
          })

          slickNext && slickNext.addEventListener('mouseleave', () => {
            this.cursorNext = false
          })

          for (let i = 0; i < clickable.length; i++) {
            clickable[i].addEventListener('mouseenter', () => {
              this.hoverCursor = true
            })

            clickable[i].addEventListener('mouseleave', () => {
              this.hoverCursor = false
            })
          }
        }
      })
    },
    moveCursor (e) {
      this.xChild = e.clientX
      this.yChild = e.clientY
      setTimeout(() => {
        this.xParent = e.clientX - 15
        this.yParent = e.clientY - 15
      }, 100)
    }
  }
}
</script>

<style lang="scss">
  .touchscreen-mode {
    .g-cursor {
      display: none;
    }
  }

  .g-cursor {
    &__point {
      top: 0;
      left: 0;
      position: fixed;
      width: 10px;
      height: 10px;
      pointer-events: none;
      user-select: none;
      border-radius: 50%;
      background: $blue;
      z-index: 12;
      backface-visibility: hidden;
      will-change: transform;
      transition: box-shadow .3s ease;

      &:after {
        position: absolute;
        top: -10px;
        left: -10px;
        width: 30px;
        height: 30px;
        content: '';
        box-shadow: 0 0 0 4px rgba(9, 48, 73, 0.1);
        border-radius: 50%;
      }

      &:before {
        position: absolute;
        top: 0;
        left: 0;
        width: 10px;
        height: 10px;
        content: '';
        box-shadow: 0 0 0 10px rgba(255, 255, 255, 0.5);
        background-color: transparent;
        border-radius: 50%;
      }
    }

    &-hover {
      .g-cursor__point {
        box-shadow: 0 0 0 7px $blue;

        &:before {
          top: -7px;
          left: -7px;
          width: 24px;
          height: 24px;
          box-shadow: 0 0 0 10px rgba(9, 48, 73, 0.1);
        }

        &:after {
          top: -17px;
          left: -17px;
          width: 44px;
          height: 44px;
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
        }
      }
    }

    &-prev {
      .g-cursor__point {
        width: 70px;
        height: 70px;
        margin: -35px 0 0 -35px;
        background-color: #fff;
        background-image: url("~static/img/cursor-prev.svg");
        background-position: center center;
        background-repeat: no-repeat;
        box-shadow: none;

        &:before,
        &:after {
          opacity: 0;
        }
      }
    }

    &-next {
      .g-cursor__point {
        width: 70px;
        height: 70px;
        margin: -35px 0 0 -35px;
        background-color: #fff;
        background-image: url("~static/img/cursor-next.svg");
        background-position: center center;
        background-repeat: no-repeat;
        box-shadow: none;

        &:before,
        &:after {
          opacity: 0;
        }
      }
    }
  }

  .page-wrapper {
    margin-top: 194px;

    @include r-max(1700) {
      margin-top: 154px;
    }

    @include r-max(1700) {
      margin-top: 136px;
    }

    @include r-max(900) {
      margin-top: 67.5px;
    }

    @include r-max(480) {
      margin-top: 47px;
    }
  }

  @import '~/assets/scss/main.scss';
  @import '~/node_modules/slick-carousel/slick/slick.css';
  @import '~/node_modules/slick-carousel/slick/slick-theme.css';
</style>
