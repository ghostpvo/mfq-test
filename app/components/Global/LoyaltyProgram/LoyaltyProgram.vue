<template>
  <div
    ref="loyalty-program"
    class="loyalty-program"
  >
    <div class="b-wrap">
      <div class="loyalty-program__content">
        <h5
          v-observe-visibility="{
            callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'title'),
            once: true
          }"
          v-html="title"
          :class="[ 'blc-title', {'animated-mode': blocksVisibility.title} ]"
        >
          loyalty program title
        </h5>
        <p
          v-observe-visibility="{
            callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'dscr'),
            once: true
          }"
          v-html="text"
          :class="{ 'animated-mode': blocksVisibility.dscr }"
          class="blc-dscr"
        >
          loyalty program text
        </p>
        <div class="main-link__wrap">
          <a
            v-observe-visibility="{
              callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'link'),
              once: true
            }"
            :class="{ 'animated-mode': blocksVisibility.link }"
            :href="link"
            class="main-link clickable-unit"
          >Хотите узнать подробнее?</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from '~/plugins/mixins'

export default {
  name: 'LoyaltyProgram',
  mixins: [ mixins.parallax, mixins.visibility ],
  props: {
    title: {
      type: String,
      default: 'Программа лояльности Q-LOYALTY'
    },
    link: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: 'Мы все знаем, как это работает. Но у нас это работает по-другому. Если Вы один раз порекомендовали нам\n' +
              '          клиента, мы будем платить Вам за первые 3 транзакции этого клиента.'
    }
  },
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
    this.parallax('loyalty-program')
    window.addEventListener('scroll', () => this.parallax('loyalty-program'))
  }
}
</script>

<style scoped>
  .loyalty-program >>> mark {
    font-weight: 700;
  }
</style>

<style lang="scss" scoped>
  .loyalty-program {
    padding: 100px 0;
    background-image: url("~static/img/loyalty_program_bg.jpg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: auto 900px;
    background-color: #E2B985;

    &__content {
      width: 550px;
      max-width: 100%;
      margin-left: 80px;

      @include r-max(1700) {
        margin-left: 0;
      }
    }

    .blc-title {
      padding-bottom: 24px;
      padding-left: 0;
      line-height: 128.9%;
      opacity: 0;
      transform: translateY(50px);

      &.animated-mode {
        opacity: 1;
        transform: translateY(0);
        transition: all .5s ease .5s;
      }

      @include r-max(1700) {
        font-size: 30px;
      }
    }

    .blc-dscr {
      opacity: 0;
      transform: translateY(50px);

      &.animated-mode {
        opacity: 1;
        transform: translateY(0);
        transition: all .5s ease .5s;
      }
    }

    .main-link {
      display: none; // TODO временно, пока нет ссылки
      color: $txt-color;
      border-color: $txt-color;
      opacity: 0;

      &.animated-mode {
        opacity: 1;
        transition: all .5s ease 1.5s;
      }

      &:before,
      &:after {
        background-image: url("~static/img/arrow_right_black.svg");
      }

      &__wrap {
        margin-top: 36px;
      }
    }

    @include r-max(800) {
      padding: 159px 0 38px;
      background-position: center bottom -567px !important;
      background-image: url("~static/img/loyalty_program_bg_mb.jpg");
      background-size: auto 1550px;
    }

    @include r-max(470) {
      background-position: center bottom -147px !important;
      background-size: auto 910px;
    }
  }
</style>
