<template>
  <div class="main-footer__wrap">
    <div class="b-wrap main-footer">
      <nav class="main-footer__left">
        <div class="main-footer__logo">
          <nuxt-link to="/">
            <img class="clickable-unit" src="~/static/img/main_logo_white.svg">
          </nuxt-link>
          <div class="main-footer__docs desktop">
            <a href="/docs/agreement.pdf" target="_blank" class="clickable-unit">Пользовательское соглашение.</a>
            <a href="/docs/policy.pdf" target="_blank" class="clickable-unit">Соглашение об обработке персональных данных.</a>
            <span class="main-footer__docs-rights">All rights received (с) MANUFAQTURY</span>
          </div>
        </div>
        <ul class="main-footer__menu-list">
          <li
            v-for="(item, index) in leftItems"
            :key="`item-${index}`"
            class="main-footer__menu-item"
          >
            <!--ЗАМЕНИТЬ НА nuxt-link КОГДА И НА ГЛАВНОЙ БУДЕТ ВЕРХНЕЕ ВЕРНОЕ МЕНЮ-->
            <nuxt-link :to="item.link" class="clickable-unit">
              {{ item.title }}
            </nuxt-link>
            <!--<a v-else v-scroll-to="item.link" href="#">{{ item.title }}</a>-->
          </li>
        </ul>
        <ul class="main-footer__menu-list">
          <li
            v-for="(item, index) in rightItems"
            :key="`item-${index}`"
            class="main-footer__menu-item"
          >
            <!--ЗАМЕНИТЬ НА nuxt-link КОГДА И НА ГЛАВНОЙ БУДЕТ ВЕРХНЕЕ ВЕРНОЕ МЕНЮ-->
            <nuxt-link :to="item.link" class="clickable-unit">
              {{ item.title }}
            </nuxt-link>
            <!--<a v-else v-scroll-to="item.link" href="#">{{ item.title }}</a>-->
          </li>
        </ul>
      </nav>
      <div class="main-footer__right">
        <div class="main-footer__contact">
          <span class="main-footer__contact-title">Телефон</span>
          <a
            :href="'tel:' + $store.getters['fetching/mapped/GET_CONTACTS'].phoneNormalized"
            class="main-footer__contact-content clickable-unit"
          >
            {{ $store.getters['fetching/mapped/GET_CONTACTS'].phone }}
          </a>
        </div>
        <div class="main-footer__contact">
          <span class="main-footer__contact-title">E-mail</span>
          <a
            :href="'mailto:' + $store.getters['fetching/mapped/GET_CONTACTS'].email"
            class="main-footer__contact-content clickable-unit"
          >
            {{ $store.getters['fetching/mapped/GET_CONTACTS'].email }}
          </a>
        </div>
        <div
          @click="$store.commit('layout/SET_FEEDBACK_MODAL_STATE', true)"
          class="main-footer__btn clickable-unit"
        >
          <span>Оставить заявку</span>
        </div>
        <div class="main-footer__docs mobile">
          <a href="/docs/agreement.pdf" target="_blank" class="clickable-unit">Пользовательское соглашение.</a>
          <a href="/docs/policy.pdf" target="_blank" class="clickable-unit">Соглашение об обработке персональных данных.</a>
          <span class="main-footer__docs-rights">All rights received (с) MANUFAQTURY</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainFooter',
  data () {
    return {
      contactUsPopup: false,
      leftItems: [
        /* {
          title: 'помещения',
          link: '/workspaces'
        }, */
        {
          title: 'премиальные офисы',
          link: '/offices'
        },
        {
          title: 'площадки для мероприятий',
          link: '/events'
        }
      ],
      rightItems: [
        /* {
          title: 'business boutique',
          link: '#boutique-blc'
        }, */
        /* {
          title: 'маркетплейс'
        },
        {
          title: 'технологии'
        }, */
        {
          title: 'создай офис мечты',
          link: '/dream-office'
        },
        {
          title: 'девелоперам',
          link: '/developers'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-footer {
    display: flex;
    padding-top: 72px;
    padding-bottom: 45px;
    justify-content: space-between;

    &__wrap {
      padding-top: 192px;
      margin-top: -192px;
      background-color: #1D1D1D;

      @include r-max(1700) {
        padding-top: 82px;
        margin-top: -82px;
      }

      @include r-max(900) {
        padding-top: 0;
        margin-top: 0;
      }
    }

    &__docs {
      max-width: 256px;
      padding-top: 54px;
      font-size: 14px;
      line-height: 160%;
      letter-spacing: 0.44px;
      color: #494949;

      &.desktop {
        @include r-max(900) {
          display: none;
        }
      }

      &.mobile {
        display: none;

        @include r-max(900) {
          display: block;
          max-width: 100%;
          padding-top: 30px;
        }

        @include r-max(480) {
          padding-top: 18px;
          text-align: center;
        }
      }

      a {
        display: block;
        color: #494949;
      }

      &-rights {
        display: block;
        margin-top: 23px;

        @include r-max(1700) {
          margin-top: 19px;
        }
      }

      @include r-max(1700) {
        max-width: 218px;
        padding-top: 79px;
        font-size: 12px;
      }
    }

    &__left {
      display: flex;
      flex: 1;

      @include r-max(900) {
        flex-wrap: wrap;
        padding-bottom: 39px;
        border-bottom: 1px solid #FFF;
      }
    }

    &__right {
      max-width: 256px;
      width: 100%;

      @include r-max(1100) {
        max-width: 220px;
      }

      @include r-max(900) {
        margin: 0 auto;
        margin-top: 40px;
      }

      @include r-max(480) {
        max-width: 256px;
        margin-top: 36px;
      }
    }

    &__logo {
      margin-right: 175px;

      img {
        max-width: 100%;

        @include r-max(1700) {
          max-width: 160px;
          width: 100%;
        }
      }

      @include r-max(1700) {
        max-width: 256px;
        width: 100%;
        margin-right: 32px;
      }

      @include r-max(900) {
        max-width: 100%;
        margin-bottom: 50px;
        margin-right: 0;
        text-align: center;
      }

      @include r-max(480) {
        margin-bottom: 10px;
      }
    }

    &__menu {
      &-list {
        max-width: 303px;
        width: 100%;
        margin-right: 64px;

        @include r-max(1700) {
          max-width: 256px;
          margin-right: 30px;
        }

        @include r-max(900) {
          width: 50%;
          max-width: 100%;
          padding-right: 10px;
          margin-right: 0;
          text-align: center;
        }

        @include r-max(480) {
          width: 100%;
          padding-right: 0;
        }
      }

      &-item {
        margin-top: 30px;
        font-size: 14px;
        letter-spacing: 0.75px;
        text-transform: uppercase;

        &:first-child {
          margin-top: 0;

          @include r-max(480) {
            margin-top: 25px;
          }
        }

        a {
          position: relative;
          padding-bottom: 7px;
          color: #FFF;

          &:hover {
            &:before {
              opacity: 1;
              transform: translateY(0px);
            }
          }

          &:before {
            position: absolute;
            left: 0px;
            bottom: 0;
            width: 100%;
            height: 2px;
            background: $blue;
            content: "";
            opacity: 0;
            transition: all 0.3s;
            transform: translateY(-10px);
          }
        }

        @include r-max(1700) {
          margin-top: 25px;
          font-size: 12px;
          line-height: 160%;
        }
      }
    }

    &__contact {
      margin-bottom: 12px;

      &-title {
        display: block;
        font-size: 16px;
        color: #FFF;
        line-height: 160%;
        letter-spacing: 0.44px;

        @include r-max(1700) {
          font-size: 14px;
        }
      }

      &-content {
        font-size: 20px;
        color: #FFF;
        line-height: 160%;
        letter-spacing: 0.44px;

        @include r-max(1700) {
          font-size: 18px;
        }
      }

      @include r-max(1700) {
        margin-bottom: 20px;
      }

      @include r-max(480) {
        margin-bottom: 10px;
        text-align: center;
      }
    }

    &__btn {
      display: flex;
      align-items: center;
      width: 256px;
      max-width: 100%;
      height: 44px;
      margin-top: 30px;
      font-size: 14px;
      letter-spacing: 0.75px;
      justify-content: center;
      text-transform: uppercase;
      color: #FFF;
      border: 1px solid #FFF;
      transition: all .4s ease;

      &:hover {
        color: $txt-color;
        background-color: #FFF;
        border-color: #FFF;
      }

      @include r-max(1700) {
        height: 32px;
        margin-top: 38px;
        font-size: 12px;
      }

      @include r-max(480) {
        width: 100%;
        margin-top: 24px;
      }
    }

    @include r-max(1700) {
      padding-top: 78px;
      padding-bottom: 78px;
    }

    @include r-max(900) {
      display: block;
    }

    @include r-max(480) {
      padding-top: 40px;
      padding-bottom: 41px;
    }
  }
</style>
