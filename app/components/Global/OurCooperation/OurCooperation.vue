<template>
  <div class="our-cooperation">
    <div class="b-wrap">
      <h6 class="blc-title">
        Мы сотрудничаем
      </h6>
      <div class="our-cooperation__slider-wrap">
        <slick :options="slickNavOptions" class="logos">
          <div
            v-for="(item, index) in partners"
            :key="`item-${index}`"
            class="clickable-unit logos__item"
          >
            <div class="logos__pic-wrap">
              <img :src="item.pic" class="logos__pic">
            </div>
          </div>
        </slick>
        <slick :options="slickOptions" class="cooperation-info">
          <div
            v-for="(item, index) in information"
            :key="`item-${index}`"
            class="cooperation-info__main"
          >
            <div class="cooperation-info__txt">
              <span class="cooperation-info__title">{{ item.title }}</span>
              <p class="blc-dscr">
                {{ item.dscr }}
              </p>
              <a v-if="false" :href="linkTo" class="main-link clickable-unit">Подробнее</a>
            </div>
            <div class="cooperation-info__pic-wrap lazy-image lazy-image--bottom">
              <!--Обрезка 943х500-->
              <img :src="item.pic" class="cooperation-info__pic">
            </div>
          </div>
        </slick>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
export default {
  name: 'OurCooperation',
  data () {
    return {
      slickOptions: {
        asNavFor: '.logos',
        slidesToShow: 1,
        arrows: false,
        // autoplay: true,
        infinite: false
      },
      slickNavOptions: {
        asNavFor: '.cooperation-info',
        slidesToShow: 5,
        slidesToScroll: 1,
        focusOnSelect: true,
        infinite: false,
        vertical: true,
        // autoplay: false,
        draggable: false,
        responsive: [
          {
            breakpoint: 1001,
            settings: {
              vertical: false
            }
          },
          {
            breakpoint: 751,
            settings: {
              vertical: false,
              slidesToShow: 4
            }
          },
          {
            breakpoint: 601,
            settings: {
              vertical: false,
              slidesToShow: 3
            }
          }
        ]
      },
      partners: [
        {
          pic: '/img/lebedev_logo.png'
        },
        {
          pic: '/img/main_logo.svg'
        },
        {
          pic: '/img/marker.svg'
        },
        {
          pic: '/img/slash.svg'
        },
        {
          pic: '/img/slash-r.svg'
        }
      ],
      information: [
        {
          title: 'Студия Артемия Лебедева',
          dscr: 'Студия Артемия Лебедева основана в 1995 году в Москве.\n' +
            'Основные направления — промышленный дизайн, городской дизайн, графический дизайн, дизайн среды, системы навигации, создание сайтов, проектирование интерфейсов, создание шрифтов, дизайн паттернов, архитектура и книгоиздание.',
          linkTo: '#',
          pic: '/img/our_cooperation_pic.png'
        },
        {
          title: 'Студия main_logo',
          dscr: 'Студия Артемия Лебедева основана в 1995 году в Москве.\n' +
            'Основные направления — промышленный дизайн, городской дизайн, графический дизайн, дизайн среды, системы навигации, создание сайтов, проектирование интерфейсов, создание шрифтов, дизайн паттернов, архитектура и книгоиздание.',
          linkTo: '#',
          pic: '/img/office_placeholder.jpg'
        },
        {
          title: 'Студия marker',
          dscr: 'Студия Артемия Лебедева основана в 1995 году в Москве.\n' +
            'Основные направления — промышленный дизайн, городской дизайн, графический дизайн, дизайн среды, системы навигации, создание сайтов, проектирование интерфейсов, создание шрифтов, дизайн паттернов, архитектура и книгоиздание.',
          linkTo: '#',
          pic: '/img/banner_slide.jpg'
        },
        {
          title: 'Студия slash',
          dscr: 'Студия Артемия Лебедева основана в 1995 году в Москве.\n' +
            'Основные направления — промышленный дизайн, городской дизайн, графический дизайн, дизайн среды, системы навигации, создание сайтов, проектирование интерфейсов, создание шрифтов, дизайн паттернов, архитектура и книгоиздание.',
          linkTo: '#',
          pic: '/img/our_cooperation_pic.png'
        },
        {
          title: 'Студия slash-r',
          dscr: 'Студия Артемия Лебедева основана в 1995 году в Москве.\n' +
            'Основные направления — промышленный дизайн, городской дизайн, графический дизайн, дизайн среды, системы навигации, создание сайтов, проектирование интерфейсов, создание шрифтов, дизайн паттернов, архитектура и книгоиздание.',
          linkTo: '#',
          pic: '/img/mf_event_bg.jpg'
        }
      ]
    }
  }
  /* mounted () {
    const cooperationInfo = $('.cooperation-info')
    const logos = $('.logos')

    cooperationInfo.on('afterChange', function (event, slick, currentSlide) {
      // Remove current class from second slider
      logos.find('.slick-current').removeClass('slick-current')

      // Add current class to the current slide
      logos.find('.slick-slide').eq(currentSlide).addClass('slick-current')
    })
  } */
}
</script>

<style lang="scss" scoped>
  .our-cooperation {
    padding-top: 100px;
    padding-bottom: 100px;
    background-color: #F2F2F2;
    overflow: hidden;

    .b-wrap {
      padding-right: 0;

      @include r-max(750) {
        padding-right: 4.5vw;
      }
    }

    .blc-title {
      @include r-max(1700) {
        padding-left: 82px;
      }

      @include r-max(1000) {
        padding-left: 25px;
      }

      @include r-max(480) {
        padding-left: 0;
      }
    }

    &__slider-wrap {
      padding-top: 31px;
      margin-left: 45px;
      font-size: 0;

      @include r-max(1700) {
        margin-left: 0;
      }

      @include r-max(480) {
        padding-top: 14px;
      }
    }

    .logos {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      max-width: 216px;

      &:before {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 4.5px;
        width: 1px;
        content: '';
        background-color: #D0D1D1;

        @include r-max(1000) {
          top: auto;
          right: 0;
          left: 0;
          bottom: 3px;
          width: auto;
          height: 1px;
        }
      }

      &__item {
        display: flex!important;
        align-items: center;
        height: 100%;
      }

      &__pic {
        display: block;
        max-height: 41px;
        width: 100%;
        max-width: 120px;
        filter: grayscale(1);
        object-fit: contain;
        transform: translateX(-300px);
        opacity: 0;
        transition: all .5s linear;

        &-wrap {
          padding-right: 60px;

          @include r-max(1700) {
            padding-right: 30px;
          }

          @include r-max(1000) {
            padding-right: 0;
          }
        }

        @include r-max(1700) {
          max-height: 30px;
        }

        @include r-max(480) {
          max-width: 63px;
          max-height: 25px;
        }
      }

      @include r-max(1700) {
        max-width: 164px;
      }

      @include r-max(1000) {
        display: block;
        max-width: 100%;
        margin-right: 4.5vw;
      }

      @include r-max(750) {
        margin-right: 0;
      }
    }

    .cooperation-info {
      display: inline-block;
      vertical-align: middle;
      width: calc(100% - 219px);
      padding-top: 12px;

      &__main {
        display: flex!important;
        align-items: center;

        @include r-max(750) {
          flex-direction: column-reverse;
        }
      }

      &__pic {
        width: 100%;
        height: 26vw;
        object-fit: cover;

        &-wrap {
          width: 60%;

          @include r-max(1700) {
            width: 50%;
          }

          @include r-max(1100) {
            width: 40%;
          }

          @include r-max(750) {
            width: auto;
            max-width: 100%;
          }
        }

        @include r-max(1700) {
          height: 375px;
        }

        @include r-max(1000) {
          height: 33vw;
        }

        @include r-max(750) {
          height: 48vw;
        }

        @include r-max(480) {
          height: 38vw;
        }
      }

      &__txt {
        width: 40%;
        padding-left: 76px;
        padding-right: 80px;
        opacity: 0;
        transform: translateY(25px);
        transition: all .5s ease .5s;

        @include r-max(1700) {
          width: 50%;
          padding-left: 60px;
          padding-right: 92px;
        }

        @include r-max(1100) {
          width: 60%;
        }

        @include r-max(1000) {
          padding-left: 5px;
          padding-right: 50px;
        }

        @include r-max(750) {
          width: 100%;
          padding: 26px 0 0;
        }
      }

      &__title {
        display: block;
        padding-bottom: 20px;
        font-size: 34px;
        line-height: 128.9%;
        letter-spacing: 0.25px;

        @include r-max(1700) {
          font-size: 24px;
        }

        @include r-max(900) {
          padding-bottom: 15px;
          font-size: 20px;
        }

        @include r-max(480) {
          padding-bottom: 21px;
        }
      }

      .main-link {
        max-width: 176px;
        margin-top: 32px;

        @include r-max(1700) {
          max-width: 160px;
        }
      }

      @include r-max(1700) {
        width: calc(100% - 164px);
        padding-top: 0;
      }

      @include r-max(1000) {
        display: block;
        width: 100%;
        padding-top: 34px;
      }
    }

    &.animated-mode {
      .logos__pic,
      .cooperation-info__txt {
        @include show-it;
      }
    }

    @include r-max(1700) {
      padding-top: 76px;
      padding-bottom: 80px;
    }

    @include r-max(480) {
      padding-top: 40px;
      padding-bottom: 44px;
    }
  }
</style>

<style lang="scss">
  @import "our-cooperation";
</style>
