<template>
  <div
    ref="mf-event"
    class="mf-event"
  >
    <div class="b-wrap">
      <div class="mf-event__content">
        <h6
          class="blc-subtitle"
        >
          Организация мероприятий
        </h6>
        <div
          v-observe-visibility="{
            callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'title'),
            once: true
          }"
          :class="{ 'animated-mode': blocksVisibility.title }"
          class="mf-event__title"
        >
          <h5
            class="blc-title"
          >
            Мероприятие в
          </h5>
          <img src="~static/img/manufaqtory_txt_title_white.svg" class="mf-event__pic-title">
          <!--Надпись MANUFAQTURY картинкой-->
        </div>
        <p
          v-observe-visibility="{
            callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'dscr'),
            once: true
          }"
          :class="{ 'animated-mode': blocksVisibility.dscr }"
          class="blc-dscr"
        >
          Ваше идеальное событие «под ключ» с возможностью сосредоточиться на главном
        </p>
        <div class="main-link__wrap">
          <a
            v-observe-visibility="{
              callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'link'),
              once: true
            }"
            @click="$store.commit('layout/SET_FEEDBACK_MODAL_STATE', true)"
            :class="{ 'animated-mode': blocksVisibility.link }"
            class="main-link clickable-unit"
          >Получить презентацию</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from '~/plugins/mixins'

export default {
  name: 'EventInManufaqtury',
  mixins: [ mixins.parallax, mixins.visibility ],
  data () {
    return {
      blocksVisibility: {
        title: false,
        dscr: false,
        link: false
      }
    }
  },
  mounted () {
    this.parallax('mf-event')
    window.addEventListener('scroll', () => this.parallax('mf-event'))
  }
}
</script>

<style lang="scss" scoped>
  .mf-event {
    position: relative;
    padding: 100px 0 210px;
    background-image: url("~static/img/mf_event_bg.jpg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: $dark-blue;

    &:after {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      content: '';
      background: linear-gradient(90deg, #093049 0%, rgba(9, 48, 73, 0) 52.55%);

      @include r-max(900) {
        background: linear-gradient(0deg, #093049 0%, rgba(9, 48, 73, 0) 81.55%);
      }
    }

    &__content {
      position: relative;
      z-index: 1;
      width: 547px;
      max-width: 100%;
      margin-left: 80px;

      @include r-max(1700) {
        width: 450px;
        margin-left: 46px;
      }

      @include r-max(900) {
        width: 390px;
        margin-left: 20px;
      }

      @include r-max(480) {
        width: 100%;
        margin-left: 0;
      }
    }

    &__title {
      padding-bottom: 35px;
      opacity: 0;
      transform: translateY(50px);

      &.animated-mode {
        opacity: 1;
        transform: translateY(0);
        transition: all .5s ease .5s;
      }

      @include r-max(1700) {
        padding-bottom: 29px;
      }

      @include r-max(900) {
        padding-bottom: 15px;
      }
    }

    &__pic-title {
      padding-top: 13px;

      @include r-max(1700) {
        max-width: 224px;
      }

      @include r-max(900) {
        padding-top: 8px;
      }

      @include r-max(480) {
        padding-top: 12px;
      }
    }

    .blc-subtitle {
      color: #FFF;
    }

    .blc-title {
      padding-left: 0;
      line-height: 128.9%;
      color: #FFF;

      @include r-max(1700) {
        font-size: 30px;
      }
    }

    .blc-dscr {
      color: #FFF;
      opacity: 0;
      transform: translateY(50px);

      &.animated-mode {
        opacity: 1;
        transform: translateY(0);
        transition: all .5s ease .5s;
      }
    }

    .main-link {
      opacity: 0;

      &.animated-mode {
        opacity: 1;
        transition: all .5s ease 1.5s;
      }

      &__wrap {
        margin-top: 36px;
      }
    }

    @include r-max(1700) {
      padding-top: 80px;
      padding-bottom: 80px;
    }

    @include r-max(1279) {
      background-size: 140%;
    }

    @include r-max(900) {
      padding: 212px 0 38px;
      background-position: center !important;
      background-size: cover;
    }

    @include r-max(480) {
      background-size: 373%;
      background-position: center -115px !important;
    }
  }
</style>
