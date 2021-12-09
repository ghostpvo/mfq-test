<template>
  <div class="care-of-details__wrap b-wrap">
    <div ref="care-of-details" class="care-of-details">
      <div class="care-of-details__content">
        <div
          v-observe-visibility="(isVisible, entry) => visibilityListener(isVisible, entry, 'title')"
          :class="{ 'animated-mode': blocksVisibility.title }"
          class="care-of-details__title"
        >
          <h5
            class="blc-title"
          >
            БОЛЬШЕ НЕ НУЖНО ДУМАТЬ О БЫТОВЫХ ВЕЩАХ, МЫ УЖЕ ПОЗАБОТИЛИСЬ ОБО ВСЕХ ДЕТАЛЯХ
          </h5>
          <p
            v-observe-visibility="(isVisible, entry) => visibilityListener(isVisible, entry, 'dscr')"
            :class="{ 'animated-mode': blocksVisibility.dscr }"
            class="blc-dscr"
          >
            Мы встретим и проводим ваших клиентов и партнеров, предложим чашечку чая или кофе, а также примем документы и посылки
          </p>
        </div>
        <!--Картинка в моб версию-->
        <div class="care-of-details__mob-pic">
          <img src="~/static/img/care_of_details_pic.jpg">
        </div>
        <ul class="care-of-details__list">
          <li
            v-for="(item, index) in items"
            :key="`item-${index}`"
            class="care-of-details__item"
          >
            {{ item.txt }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from '~/plugins/mixins'

export default {
  name: 'CareOfDetails',
  mixins: [ mixins.parallax, mixins.visibility ],
  data () {
    return {
      blocksVisibility: {
        title: false,
        dscr: false,
        link: false
      },
      items: [
        {
          txt: 'Обслуживание офисного пространства (клининг, охрана, интернет, мебель, паркинг)'
        },
        {
          txt: 'Community management'
        },
        {
          txt: 'Concierge-сервис'
        },
        {
          txt: 'Автоматизация процессов управления офисами'
        },
        {
          txt: 'Развитие сотрудников за счет программ '
        }
      ]
    }
  },
  mounted () {
    this.parallax('care-of-details')
    window.addEventListener('scroll', () => this.parallax('care-of-details'))
  }
}
</script>

<style lang="scss" scoped>
  .care-of-details {
    position: relative;
    height: 40vw;
    max-width: 1750px;
    margin: 145px 0 110px 48px;
    transform: translateX(100%);
    transition: transform .75s ease-out;
    background-image: url("~static/img/care_of_details_pic.jpg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: $dark-blue;

    &:before {
      position: absolute;
      z-index: 1;
      left: -61px;
      bottom: -56px;
      width: 111px;
      height: 108px;
      content: '';
      background-image: url("~static/img/short_logo.svg");
      background-repeat: no-repeat;
      background-size: contain;

      @include r-max(1700) {
        left: -42px;
        bottom: -35px;
        width: 72px;
        height: 68px;
      }

      @include r-max(1000) {
        display: none;
      }
    }

    &:after {
      position: absolute;
      left: -1px;
      right: 0;
      top: -1px;
      bottom: 0;
      content: '';
      background-image: url("~static/img/triangle.svg");
      background-repeat: no-repeat;
      background-size: contain;

      @include r-max(1200) {
        top: 0;
      }

      @include r-max(1000) {
        display: none;
      }
    }

    &__wrap {
      padding-right: 0;
      overflow: hidden;

      &.animated-mode {
        .care-of-details {
          transform: translateX(0);

          .blc-title,
          .blc-dscr {
            @include show-it;
          }

          &__item {
            opacity: 1;

            &:nth-child(1) {
              transition: all .3s ease 1s;
            }

            &:nth-child(2) {
              transition: all .3s ease 1.3s;
            }

            &:nth-child(3) {
              transition: all .3s ease 1.6s;
            }

            &:nth-child(4) {
              transition: all .3s ease 1.9s;
            }

            &:nth-child(5) {
              transition: all .3s ease 2.2s;
            }
          }
        }
      }
    }

    &__title {
      position: relative;
      z-index: 1;
      max-width: 530px;
      padding-left: 19px;

      @include r-max(1700) {
        position: absolute;
        top: -26px;
        max-width: 466px;
        max-height: 261px;
        padding-left: 0;
        overflow: hidden;
      }

      @include r-max(1200) {
        top: -119px;
      }

      @include r-max(1100) {
        top: -150px;
      }

      @include r-max(1000) {
        position: static;
        max-width: 69%;
        max-height: none;
        margin-left: -23px;
      }

      @include r-max(480) {
        max-width: 100%;
        padding-right: 16px;
        margin-left: 0;
      }
    }

    .blc-title {
      padding-left: 0;
      padding-bottom: 24px;
      opacity: 0;
      transform: translateY(-25px);
      transition: all .3s ease 2.2s;

      @include r-max(1700) {
        font-size: 30px;
        letter-spacing: -1.5px;
      }

      @include r-max(480) {
        line-height: 140%;
      }
    }

    .blc-dscr {
      opacity: 0;
      transition: all .3s ease 2.5s;
    }

    &__list {
      @include r-max(1000) {
        margin-top: 60px;
        margin-left: -23px;
      }

      @include r-max(480) {
        padding-right: 16px;
        margin-left: 0;
      }
    }

    &__item {
      position: absolute;
      z-index: 1;
      max-width: 268px;
      font-size: 16px;
      text-align: right;
      line-height: 160%;
      letter-spacing: 0.44px;
      opacity: 0;

      &:after {
        position: absolute;
        right: -12px;
        bottom: -32px;
        @include sq(24px);
        border: 3px solid #FFF;
        content: '';
        background-color: $blue;
        border-radius: 50%;

        @include r-max(1000) {
          right: auto;
          left: 0;
          bottom: auto;
          top: 0px;
        }

        @include r-max(480) {
          top: 1px;
        }
      }

      &:nth-child(1) {
        bottom: 8.8vw;
        left: 4%;

        @include r-min(1900) {
          bottom: 168.96px;
        }

        @include r-max(1800) {
          bottom: 9.6vw;
        }

        @include r-max(1700) {
          bottom: 9.2vw;
        }

        @include r-max(1500) {
          bottom: 9.1vw;
        }

        @include r-max(1280) {
          left: 4.5%;
        }
      }

      &:nth-child(2) {
        bottom: 15.4vw;
        left: 25.5%;

        @include r-min(1900) {
          bottom: 295.68px;
        }

        @include r-max(1800) {
          bottom: 16vw;
        }

        @include r-max(1700) {
          bottom: 15.9vw;
        }

        @include r-max(1600) {
          bottom: 16.1vw;
        }

        @include r-max(1500) {
          bottom: 16.3vw;
        }

        @include r-max(1440) {
          bottom: 16.6vw;
        }

        @include r-max(1366) {
          bottom: 17vw;
        }

        @include r-max(1280) {
          left: 21.1%;
          bottom: 15.8vw;
        }
      }

      &:nth-child(3) {
        bottom: 21.9vw;
        left: 44.8%;

        @include r-min(1900) {
          bottom: 420.48px;
        }

        @include r-max(1800) {
          bottom: 22.5vw;
        }

        @include r-max(1800) {
          bottom: 22.7vw;
        }

        @include r-max(1440) {
          bottom: 22.9vw;
        }

        @include r-max(1366) {
          bottom: 23.3vw;
        }

        @include r-max(1280) {
          left: 41.5%;
          bottom: 22.3vw;
        }

        @include r-max(1200) {
          bottom: 22.5vw;
        }

        @include r-max(1100) {
          bottom: 23.5vw;
        }
      }

      &:nth-child(4) {
        bottom: 28.6vw;
        left: 53.5%;

        @include r-min(1900) {
          bottom: 549.12px;
        }

        @include r-max(1800) {
          bottom: 29.6vw;
        }

        @include r-max(1700) {
          bottom: 28.9vw;
        }

        @include r-max(1280) {
          left: 54.5%;
        }

        @include r-max(1100) {
          bottom: 29.4vw;
        }
      }

      &:nth-child(5) {
        bottom: 35.2vw;
        left: 70%;

        @include r-min(1900) {
          bottom: 675.84px;
        }

        @include r-max(1800) {
          bottom: 36.3vw;
        }

        @include r-max(1700) {
          bottom: 35.5vw;
        }

        @include r-max(1280) {
          left: 71%;
        }

        @include r-max(1100) {
          bottom: 36vw;
        }
      }

      @include r-max(1700) {
        max-width: 13.4vw;
        font-size: 14px;
      }

      @include r-max(1280) {
        max-width: 12.4vw;
      }

      @include r-max(1000) {
        position: relative;
        bottom: auto!important;
        left: auto!important;
        max-width: 100%;
        padding-left: 40px;
        margin-bottom: 10px;
        font-size: 16px;
        text-align: left;
      }

      @include r-max(480) {
        margin-bottom: 16px;
        font-size: 14px;
      }
    }

    &__mob-pic {
      position: relative;
      display: none;

      img {
        max-width: 100%;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &:before {
        @include r-max(1000) {
          position: absolute;
          z-index: 1;
          left: -42px;
          bottom: -35px;
          width: 72px;
          height: 68px;
          content: '';
          background-image: url("~static/img/short_logo.svg");
          background-repeat: no-repeat;
          background-size: contain;
        }
      }

      &:after {
        @include r-max(1000) {
          position: absolute;
          left: -1px;
          right: 0;
          top: -1px;
          bottom: 0;
          content: '';
          background-image: url("~static/img/triangle.svg");
          background-repeat: no-repeat;
          background-size: contain;
        }
      }

      @include r-max(1000) {
        display: block;
        height: 40vw;
      }

      @include r-max(900) {
        height: 39.5vw;
      }

      @include r-max(480) {
        height: 38.5vw;
        margin-left: 43px;
      }

      @include r-max(400) {
        height: 37vw;
      }

      @include r-max(350) {
        height: 35.5vw;
      }
    }

    @include r-min(1900) {
      height: 768px;
    }

    @include r-max(1400) {
      height: 39.4vw;
    }

    @include r-max(1200) {
      height: 40.3vw;
    }

    @include r-max(1100) {
      margin-top: 200px;
      margin-left: 0;
    }

    @include r-max(1000) {
      height: auto;
      margin-top: 50px;
      margin-bottom: 70px;
      background: none;
    }

    @include r-max(480) {
      margin-top: 40px;
      margin-left: 0;
      margin-bottom: 40px;
    }
  }
</style>
