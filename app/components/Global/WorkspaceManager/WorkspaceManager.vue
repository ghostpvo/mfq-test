<template>
  <div class="manager__wrap b-wrap">
    <div
      v-observe-visibility="{
        callback: (isVisible) => visibilityListener(isVisible),
        once: true
      }"
      :class="{ 'animated-mode': gVisibility }"
      class="manager"
    >
      <!--Обрезка 400х241-->
      <img :src="manager.pic" class="manager__pic">
      <div class="manager__info">
        <div class="manager__main">
          <span class="blc-subtitle">{{ manager.position }}</span>
          <span class="manager__name">{{ info.fullData.director_fio }}</span>
          <div class="manager__contact">
            <div class="manager__contact-item">
              <span class="manager__contact-title">Телефон</span>
              <a :href="info.fullData.director_phone" class="manager__contact-main">{{ info.fullData.director_phone }}</a>
            </div>
            <div class="manager__contact-item">
              <span class="manager__contact-title">E-mail</span>
              <a :href="'mailto:' + info.fullData.director_email" class="manager__contact-main">{{ info.fullData.director_email }}</a>
            </div>
          </div>
        </div>
        <ul class="manager__social">
          <li
            v-for="(item, index) in manager.items"
            :key="`item-${index}`"
            class="manager__social-item"
          >
            <a :href="item.linkTo" class="manager__social-link">
              <img :src="item.logo" class="manager__social-logo">
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from '~/plugins/mixins'

export default {
  name: 'WorkspaceManager',
  mixins: [ mixins.visibility ],
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      manager: {
        pic: '/img/manager_pic.jpg',
        position: 'Руководитель площадки',
        name: 'Дарья Малышева',
        phone: '+7 926 653 60 80',
        linkTel: 'tel:+79266536080',
        mail: 'dm@manufaqtury.com',
        linkMail: 'mailto:dm@manufaqtury.com',
        items: [
          {
            // logo: '/img/soc-fb.svg',
            linkTo: '#'
          },
          {
            // logo: '/img/soc-inst.svg',
            linkTo: '#'
          },
          {
            // logo: '/img/soc-vk.svg',
            linkTo: '#'
          }
        ]
      },
      gVisibility: false
    }
  },
  methods: {
    visibilityListener () {
      this.gVisibility = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .manager {
    display: flex;
    max-width: 1152px;
    margin: 100px auto 0;
    background-color: #F2F2F2;
    opacity: 0;
    transform: scale(1.25);
    transition: all .5s ease-out;

    &.animated-mode {
      opacity: 1;
      transform: scale(1);
    }

    &__wrap {
      overflow: hidden;
    }

    &__pic {
      max-width: 400px;
      width: 100%;
      object-fit: cover;

      @include r-max(1700) {
        max-width: 352px;
      }

      @include r-max(480) {
        max-width: 480px;
        min-height: 164px;
        width: 100%;
        object-fit: cover;
      }
    }

    &__name {
      display: block;
      padding-top: 13px;
      font-size: 34px;
      letter-spacing: 0.44px;

      @include r-max(1700) {
        font-size: 30px;
      }

      @include r-max(480) {
        padding-top: 10px;
        font-size: 24px;
      }
    }

    &__info {
      display: flex;
      flex: 1;
      align-items: center;
      padding: 37px 48px 40px;
      justify-content: space-between;

      @include r-max(1700) {
        padding-bottom: 44px;
      }

      @include r-max(1260) {
        padding: 25px 30px;
      }

      @include r-max(900) {
        text-align: left;
      }

      @include r-max(600) {
        display: block;
        max-width: 352px;
        padding-left: 0;
        padding-right: 0;
        margin: 0 auto;
      }

      @include r-max(480) {
        max-width: 100%;
        padding-top: 19px;
      }
    }

    &__contact {
      display: flex;
      padding-top: 29px;

      &-item {
        margin-right: 34px;
        max-width: 50%;

        &:last-child {
          margin-right: 0;

          @include r-max(1260) {
            padding-bottom: 0;
          }
        }

        @include r-max(1260) {
          max-width: none;
          padding-bottom: 10px;
        }

        @include r-max(480) {
          padding-bottom: 1px;
        }
      }

      &-title {
        display: block;
        font-size: 16px;
        line-height: 160%;
        letter-spacing: 0.44px;

        @include r-max(1700) {
          font-size: 14px;
        }

        @include r-max(900) {
          font-size: 12px;
        }

        @include r-max(480) {
          display: inline-block;
          padding-right: 1px;
          font-size: 14px;

          &:after {
            content: ':';
          }
        }
      }

      &-main {
        font-size: 20px;
        line-height: 160%;
        letter-spacing: 0.44px;

        @include r-max(1700) {
          font-size: 18px;
        }

        @include r-max(900) {
          font-size: 16px;
        }

        @include r-max(480) {
          display: inline-block;
          font-size: 18px;
        }
      }

      @include r-max(1700) {
        padding-top: 25px;
      }

      @include r-max(1260) {
        display: block;
        padding-top: 15px;
      }

      @include r-max(480) {
        padding-top: 20px;
      }
    }

    &__social {
      display: flex;
      margin-left: 22px;

      &-item {
        margin-right: 22px;

        &:last-child {
          margin-right: 0;
        }

        @include r-max(1260) {
          margin-right: 15px;
        }

        @include r-max(480) {
          margin-right: 20px;
        }
      }

      &-link {
        display: flex;
        align-items: center;
        @include sq(63px);
        justify-content: center;
        background-color: #C4C4C4;
        border-radius: 50%;
        overflow: hidden;
        transition: all .3s ease;

        &:hover {
          background-color: $blue;
        }

        @include r-max(1700) {
          @include sq(60px)
        }

        @include r-max(1100) {
          @include sq(50px)
        }

        @include r-max(480) {
          @include sq(60px)
        }
      }

      &-logo {
        max-width: 63px;
        max-height: 63px;

        @include r-max(1100) {
          max-width: 50%;
          max-height: 80%;
        }
      }

      @include r-max(600) {
        margin-left: 0;
        margin-top: 20px;
      }

      @include r-max(480) {
        margin-top: 14px;
      }
    }

    @include r-max(1700) {
      max-width: 1104px;
      margin-top: 80px;
    }

    @include r-max(900) {
      display: block;
      padding-top: 26px;
      text-align: center;
    }

    @include r-max(600) {
      max-width: 400px;
    }

    @include r-max(480) {
      max-width: 100%;
      padding-left: 16px;
      padding-right: 16px;
    }
  }
</style>
