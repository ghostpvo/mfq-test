<template>
  <div id="main-header" :class="{ active: isActive }" class="main-header">
    <div class="b-wrap">
      <ul @click="isActive = false" class="main-header__top-list">
        <li class="main-header__top-item main-header__tel">
          <a :href="'tel:' + $store.getters['fetching/mapped/GET_CONTACTS'].phoneNormalized">{{ $store.getters['fetching/mapped/GET_CONTACTS'].phone }}</a>
          <!--Поле для ссылки на телефон, который в админке добавляется без знака + -->
          <!--<a :href="'tel:+' + $store.state.fetching.mapped.phone.replace(/\s+/g, '')">{{ $store.state.fetching.mapped.phone }}</a>-->
        </li>
        <li class="main-header__top-item">
          <span
            @click="$store.commit('layout/SET_FEEDBACK_MODAL_STATE', true)"
            class="clickable-unit"
          >
            Оставить заявку
          </span>
        </li>
        <li v-if="false" class="main-header__top-item">
          <a href="" class="clickable-unit">Вход</a>
        </li>
        <li @click="preventClosing" v-if="false" class="main-header__top-item">
          <span @click="chosenLanguage = 1" :class="[chosenLanguage === 1 ? 'active' : 'clickable-unit']">RU</span>
          /
          <span @click="chosenLanguage = 2" :class="[chosenLanguage === 2 ? 'active' : 'clickable-unit']">ENG</span>
        </li>
      </ul>
      <div class="main-header__center">
        <div class="main-header__logo">
          <nuxt-link to="/">
            <img
              src="~/static/img/main_logo.svg"
              alt="logo"
              class="clickable-unit"
            >
          </nuxt-link>
        </div>
        <img v-if="!isActive" @click="openMenu" class="main-header__burger" src="~/static/img/header_burger.svg" alt="open menu">
        <img v-if="isActive" @click="openMenu" class="main-header__burger" src="~/static/img/header_close_menu.svg" alt="close menu">
      </div>
      <div class="main-header__bottom">
        <nuxt-link to="/" class="clickable-unit">
          <img class="main-header__short-logo" src="~/static/img/short_logo.svg">
        </nuxt-link>
        <ul v-if="$store.state.header.header.menuType === 'main-menu'" @click="isActive = false" class="main-header__main-menu-list">
          <li v-for="item in items" :key="item.id" class="main-header__main-menu-item">
            <a
              v-scroll-to="item.scrollToLink"
              href="#"
              class="clickable-unit"
            >{{ item.title }}</a>
          </li>
        </ul>
        <ul v-else @click="isActive = false" class="main-header__main-menu-list">
          <li v-for="item in menuItems" :key="item.id" class="main-header__main-menu-item">
            <nuxt-link :to="item.link" class="clickable-unit">
              {{ item.title }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainHeader',
  data () {
    return {
      items: [
        {
          id: 1,
          title: 'премиальные офисы',
          scrollToLink: '#premium-offices'
        },
        {
          id: 2,
          title: 'площадки для мероприятий',
          scrollToLink: '#event-areas'
        },
        /* {
          id: 3,
          title: 'создай офис мечты',
          link: ''
        }, */
        {
          id: 4,
          title: 'девелоперам',
          scrollToLink: '#for-developers'
        },
        /* {
          id: 5,
          title: 'технологии',
          link: ''
        }, */
        {
          id: 6,
          title: 'контакты',
          scrollToLink: '#map-main'
        }
      ],
      menuItems: [
        {
          id: 1,
          title: 'премиальные офисы',
          link: '/offices'
        },
        {
          id: 2,
          title: 'площадки для мероприятий',
          link: '/events'
        },
        {
          id: 3,
          title: 'создайте офис мечты',
          link: '/dream-office'
        },
        {
          id: 4,
          title: 'девелоперам',
          link: '/developers'
        },
        /* {
          id: 5,
          title: 'технологии',
          link: ''
        }, */
        {
          id: 6,
          title: 'контакты',
          link: '/contacts'
        }
      ],
      isActive: false,
      chosenLanguage: 1
    }
  },
  mounted () {
    window.onscroll = function changeNav () {
      const header = document.getElementById('main-header')
      const scrollPosY = window.pageYOffset
      if (window.innerWidth > 900) {
        if (scrollPosY > 100) {
          header.classList.add('fixed-header')
        } else if (scrollPosY <= 100) {
          header.classList.remove('fixed-header')
        }
      }
    }
  },
  methods: {
    openMenu () {
      this.isActive = !this.isActive
    },
    preventClosing () {
      event.stopPropagation()
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-header {
    position: fixed;
    top: 0;
    /*left: 50%;*/
    z-index: 3;
    width: 100%;
    /*transform: translateX(-50%);*/
    background-color: #FFF;

    &.fixed-header {
      .main-header {
        &__logo {
          display: none;
        }

        &__top-list {
          display: none;
        }

        &__main-menu-list {
          padding-right: 49px;
          text-align: right;
        }

        &__short-logo {
          position: absolute;
          left: 35px;
          top: 50%;
          display: block;
          width: 40px;
          height: 40px;
          margin-top: -20px;
          object-fit: contain;
        }
      }

      .b-wrap {
        padding-top: 30px;
        padding-bottom: 30px;

        @include r-max(1500) {
          padding-top: 20px;
          padding-bottom: 20px;
        }
      }
    }

    &.active {
      @include r-max(900) {
        .main-header__main-menu-list {
          display: block;
        }

        .main-header__top-list {
          display: block;
        }
      }
    }

    .b-wrap {
      padding: 14px 0 32px;

      @include r-max(1500) {
        padding-top: 7px;
        padding-bottom: 21px;
      }

      @include r-max(900) {
        padding: 25px 4.5vw;
      }

      @include r-max(480) {
        padding: 15px 16px;
      }
    }

    &__top {
      &-list {
        padding: 0 32px 14px;
        border-bottom: 1px solid #F3F3F3;
        font-size: 0;
        text-align: right;

        @include r-max(1700) {
          padding-bottom: 6px;
        }

        @include r-max(900) {
          position: absolute;
          z-index: 2;
          display: none;
          top: 56px;
          left: 0;
          right: 0;
          padding: 22px 0 15px;
          text-align: center;
          background-color: #FFF;
        }

        @include r-max(480) {
          top: 46px;
        }
      }

      &-item {
        display: inline-block;
        padding-right: 32px;
        font-size: 10px;
        letter-spacing: 0.75px;
        text-transform: uppercase;

        &:last-child {
          padding-right: 0;
        }

        a,
        span {
          color: $txt-color;
          transition: all .3s ease;

          &:hover {
            color: $blue;
          }
        }

        span {
          &.active {
            color: $blue;
          }
        }

        @include r-max(1700) {
          padding-right: 26px;
          font-size: 8px;
          letter-spacing: 0.66px;
        }

        @include r-max(900) {
          font-size: 10px;
        }
      }
    }

    &__tel {
      font-size: 11px;

      a {
        &:hover {
          color: $txt-color;
        }
      }

      @include r-max(1700) {
        font-size: 10px;
      }
    }

    &__center {
      @include r-max(900) {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }

    &__bottom {
      position: relative;

      @include r-max(900) {
        position: static;
      }
    }

    &__logo {
      max-width: 257px;
      margin: 40px auto 36px;
      font-size: 0;

      img {
        max-width: 100%;
      }

      @include r-max(1700) {
        max-width: 221.5px;
        margin-top: 23px;
        margin-bottom: 26px;
      }

      @include r-max(900) {
        max-width: 176px;
        margin: 0;
      }

      @include r-max(480) {
        max-width: 136px;
      }
    }

    &__main-menu {
      &-list {
        text-align: center;
        transition: all .5s ease;

        @include r-max(900) {
          position: absolute;
          z-index: 1;
          display: none;
          top: 56px;
          left: 0;
          right: 0;
          padding-top: 78px;
          background-color: #FFF;
          transition: none;
        }

        @include r-max(480) {
          top: 46px;
          padding-bottom: 10px;
        }
      }

      &-item {
        display: inline-block;
        padding-right: 4vw;
        font-size: 12px;
        letter-spacing: 0.75px;
        text-transform: uppercase;

        &:last-child {
          padding-right: 0;
        }

        a {
          position: relative;
          padding-bottom: 7px;
          color: $txt-color;

          &:hover {
            &:before {
              opacity: 1;
              transform: translateY(0px);
            }
          }

          &:active {
            color: $blue;
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

        @include r-min(2000) {
          padding-right: 80px;
        }

        @include r-max(1700) {
          padding-right: 5.3vw;
          font-size: 10px;
          letter-spacing: 0.66px;
        }

        @include r-max(1100) {
          padding-right: 2.3vw;
        }

        @include r-max(900) {
          display: block;
          padding-bottom: 25px;
          padding-right: 0;
          font-size: 12px;
        }

        @include r-max(480) {
          padding-bottom: 32px;
          font-size: 10px;
        }
      }
    }

    &__short-logo {
      position: absolute;
      left: -200px;
      top: 50%;
      display: block;
      width: 0px;
      height: 0px;
      margin-top: -20px;
      object-fit: contain;
      transition: left .5s ease;
    }

    &__burger {
      display: none;

      @include r-max(900) {
        display: block;
        width: 20px;
        height: 17px;
        object-fit: contain;
      }
    }
  }
</style>
