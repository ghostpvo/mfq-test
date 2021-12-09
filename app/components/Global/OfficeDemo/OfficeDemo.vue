<template>
  <div
    v-observe-visibility="{
      callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'officeDemo'),
      once: true,
      throttle: 500
    }"
    :id="officeId"
    :style="{background: backgroundColor}"
    :class="{ 'animated-mode': blocksVisibility.officeDemo }"
    class="office-demo__wrap"
  >
    <!--haveForm - добавляем педдинг блоку, когда внизу есть форма, которая наезжает на него
        qHallBlc - клас для изменения контента под блок Q-Hall в макете
        isMainBlc - клас для изменения контента под блок Поклонная гора в слайдере
        isMainBanner - стили для блока в роли главного баннера (страница конкретной площадки)-->
    <div
      :class="{ 'have-bottom-form': haveForm, 'q-hall' : qHallBlc, 'main-blc' : isMainBlc, 'main-banner' : isMainBanner}"
      :style="{flexDirection: flexDirection}"
      class="office-demo b-wrap"
    >
      <div class="office-demo__txt-side">
        <div class="office-demo__txt-side-content">
          <h6
            :style="{color: mainTextColor}"
            class="blc-subtitle"
          >
            {{ mainSubtitle }}
          </h6>
          <h3
            :style="{color: mainTextColor}"
            v-html="mainTitle"
            class="blc-title"
          />
          <location-blc
            v-if="showLocation"
            :locationName="locationName"
          />
          <p
            :style="{color: mainTextColor}"
            class="blc-dscr"
          >
            {{ mainDscr }}
          </p>
          <div class="office-demo__list-wrap">
            <div v-for="list in lists" :key="list.id" v-if="list.title !== ''" class="office-demo__list">
              <span class="office-demo__list-title">
                {{ list.title }}
              </span>
              <ul>
                <li v-for="point in list.points" :key="point.id" class="office-demo__list-item list-items">
                  {{ point.txt }}
                </li>
              </ul>
            </div>
          </div>
          <ul class="offer-list">
            <li v-for="offer in offers" :key="offer.id" v-if="offer.title !== ''" class="offer-list__item">
              <div
                v-if="offer.instStory"
                @click="$store.commit('layout/SET_STORIES_MODAL_STATE', true)"
                class="offer-list__link clickable-unit"
              >
                <div class="offer-list__insta-story">
                  <!--instStory - добавление градиентного border как в историях в инмтаграмме-->
                  <img :src="offer.pic" class="offer-list__pic">
                </div>
                <div class="offer-list__content">
                  <span v-html="offer.title" class="offer-list__title">
                    List title
                  </span>
                  <ul class="offer-list__subtitle-list">
                    <li v-for="subtitle in offer.subtitles" class="offer-list__subtitle-item">
                      <vue-markdown>{{ subtitle.title }}</vue-markdown>
                    </li>
                  </ul>
                </div>
              </div>
              <div v-else class="offer-list__link">
                <div>
                  <img :src="offer.pic" class="offer-list__pic" alt="">
                </div>
                <div class="offer-list__content">
                  <span class="offer-list__title">
                    <vue-markdown>offer.title</vue-markdown>
                  </span>
                  <ul class="offer-list__subtitle-list">
                    <li v-for="subtitle in offer.subtitles" class="offer-list__subtitle-item">
                      <vue-markdown>{{ subtitle.title }}</vue-markdown>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
          <div class="main-link__wrap">
            <nuxt-link
              v-if="haveButton"
              :to="linkTo"
              class="main-link clickable-unit"
            >
              {{ buttonTitle }}
            </nuxt-link>
            <span
              v-else-if="isPopupButton"
              @click="$store.commit('layout/SET_FEEDBACK_MODAL_STATE', true)"
              class="main-link clickable-unit"
            >
              {{ buttonTitle }}
            </span>
          </div>
        </div>
      </div>
      <div class="office-demo__pic-side lazy-image lazy-image--left">
        <!--Обрезка 3840х3760 или пропорционально 960х940-->
        <img :src="mainPic" class="office-demo__pic">
      </div>
    </div>
  </div>
</template>

<script>
import LocationBlc from '../../Elements/LocationBlc/LocationBlc'
import mixins from '~/plugins/mixins'

export default {
  name: 'OfficeDemo',
  components: { LocationBlc },
  mixins: [ mixins.visibility ],
  props: {
    officeId: {
      type: String,
      default: ''
    },
    backgroundColor: {
      type: String,
      default: '#F2F2F2'
    },
    mainTitle: {
      type: String,
      default: ''
    },
    mainTextColor: {
      type: String,
      default: ''
    },
    mainDscr: {
      type: String,
      default: ''
    },
    mainSubtitle: {
      type: String,
      default: ''
    },
    buttonTitle: {
      type: String,
      default: ''
    },
    linkTo: {
      type: String,
      default: ''
    },
    mainPic: {
      type: String,
      default: '/img/office_placeholder.jpg'
    },
    haveForm: {
      type: Boolean,
      default: false
    },
    flexDirection: {
      type: String,
      default: 'row'
    },
    qHallBlc: {
      type: Boolean,
      default: false
    },
    showLocation: {
      type: Boolean,
      default: false
    },
    locationName: {
      type: String,
      default: ''
    },
    lists: {
      type: Array,
      default: () => []
    },
    points: {
      type: Array,
      default: () => []
    },
    isMainBlc: {
      type: Boolean,
      default: false
    },
    offers: {
      type: Array,
      default: () => []
    },
    subtitles: {
      type: Array,
      default: () => []
    },
    isMainBanner: {
      type: Boolean,
      default: false
    },
    haveButton: {
      type: Boolean,
      default: false
    },
    isPopupButton: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      blocksVisibility: {
        officeDemo: false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .office-demo {
    display: flex;
    padding: 0;
    font-size: 0;

    &__txt-side {
      display: flex;
      flex-direction: column;
      width: 50%;
      padding: 50px 20px 50px 112px;
      justify-content: center;

      &-content {
        max-width: 530px;
        margin-left: 4.2vw;

        @include r-min(2000){
          margin-left: 80px;
        }

        @include r-max(1700) {
          max-width: 450px;
          margin-left: 48px;
        }

        @include r-max(1100) {
          margin-left: 15px;
        }

        @include r-max(700) {
          max-width: 90%;
          margin-left: 0;
        }

        @include r-max(480) {
          max-width: 100%;
        }
      }

      .blc-title {
        padding-left: 0;
        letter-spacing: -1.5px;

        @include r-max(1700) {
          font-size: 30px;
        }

        @include r-max(480){
          line-height: 140%;
        }
      }

      .blc-dscr {
        margin-top: 24px;

        @include r-max(1700) {
          margin-top: 22px;
        }

        @include r-max(480) {
          margin-top: 24px;
        }
      }

      .main-link {
        margin-top: 34px;

        @include r-max(700) {
          margin-top: 20px;
        }

        @include r-max(480) {
          margin-top: 34px;
        }
      }

      .location-blc {
        margin-top: 17px;
      }

      @include r-max(1700) {
        padding-left: 6.4vw;
      }

      @include r-max(900) {
        padding-left: 4.5vw;
        padding-top: 20px;
        padding-bottom: 20px;
      }

      @include r-max(700) {
        order: 2;
        width: 100%;
        padding: 4.5vw 0;
      }

      @include r-max(480) {
        padding: 40px 0;
      }
    }

    &__pic-side {
      width: 50%;

      @include r-max(700) {
        order: 1;
        width: 100%;
        padding: 0;
      }

      @include r-max(480) {
        padding: 0;
      }
    }

    &__pic {
      max-width: 100%;
      width: 100%;
      min-height: 49vw;
      height: 100%;
      object-fit: cover;

      @include r-min(2000){
        min-height: 940px;
      }

      @include r-max(1700) {
        min-height: 56.8vw;
      }

      @include r-max(1100) {
        min-height: 76.8vw;
      }

      @include r-max(480) {
        min-height: 93.8vw;
      }
    }

    &__list {
      opacity: 0;
      transform: translateY(25px);

      &-title {
        display: block;
        padding-top: 16px;
        font-size: 20px;
        line-height: 160%;
        letter-spacing: 0.44px;

        @include r-max(1700) {
          font-size: 18px;
        }

        @include r-max(900) {
          font-size: 14px;
        }

        @include r-max(480) {
          font-size: 18px;
        }
      }

      &-item {
        margin-top: 4px;

        @include r-max(900) {
          margin-top: 2px;
        }
      }
    }

    &.have-bottom-form {
      .office-demo {
        &__txt-side {
          padding-bottom: 232px;

          @include r-max(1700) {
            padding-bottom: 207px;
          }

          @include r-max(1100) {
            padding-bottom: 80px;
          }

          @include r-max(750) {
            padding-bottom: 20px;
          }

          @include r-max(480) {
            padding-bottom: 40px;
          }
        }
      }
    }

    &.q-hall {
      .office-demo {
        &__txt-side {
          &-content {
            margin-left: 7vw;

            @include r-min(2000){
              margin-left: 135px;
            }

            @include r-max(1700) {
              margin-left: 0;
            }
          }

          .blc-title {
            font-size: 86px;

            @include r-max(1700) {
              font-size: 70px;
            }

            @include r-max(900) {
              font-size: 48px;
            }

            @include r-max(480) {
              font-size: 70px;
            }
          }

          .blc-subtitle {
            margin-bottom: 0;
          }

          .main-link {
            min-width: 208px;

            @include r-max(1700) {
              min-width: auto;
            }
          }
        }
      }
    }

    &.main-blc {
      .office-demo {
        &__txt-side {
          padding-bottom: 124px;

          &-content {
            max-width: 100%;
            margin-left: 2.4vw;

            @include r-max(1700) {
              margin-left: 0;
            }
          }

          .blc-title {
            position: relative;
            z-index: 1;
            margin-left: -414px;
            font-size: 120px;
            line-height: normal;
            word-spacing: 25px;

            @include r-max(1700) {
              margin-left: -156px;
              font-size: 70px;
            }

            @include r-max(1100) {
              margin-left: -256px;
            }

            @include r-max(900) {
              margin-left: -114px;
              font-size: 48px;
            }

            @include r-max(760) {
              margin-left: 0;
            }

            @include r-max(480) {
              font-size: 35px;
            }
          }

          .blc-subtitle {
            margin-bottom: 0;
          }

          .blc-dscr {
            max-width: 530px;

            @include r-max(1700) {
              max-width: 450px;
            }

            @include r-max(700) {
              max-width: 90%;
            }

            @include r-max(480) {
              max-width: 100%;
            }
          }

          .offer-list {
            max-width: 530px;

            @include r-max(1700) {
              max-width: 450px;
            }

            @include r-max(700) {
              max-width: 90%;
            }

            @include r-max(480) {
              max-width: 100%;
            }
          }

          .main-link {
            &__wrap {
              @include r-max(480) {
                display: block;
              }
            }
          }

          @include r-max(900) {
            padding-bottom: 20px;
          }
        }
      }
    }

    &__wrap {
      .blc-title {
        opacity: 0;
        transform: translateY(-50px);
      }

      .blc-dscr {
        opacity: 0;
        transform: translateY(25px);
      }

      .main-link,
      .location-blc {
        opacity: 0;
      }

      &.animated-mode {
        .location-blc {
          opacity: 1;
          transition: all .5s ease 2s;
        }

        .main-link {
          opacity: 1;
          transition: all .5s ease 1.5s;
        }

        .blc-title,
        .blc-dscr {
          opacity: 1;
          transform: translateY(0);
        }

        .blc-title {
          transition: all 1s ease 1s;
        }

        .blc-dscr {
          transition: all .75s ease 2s;
        }

        .office-demo__list-wrap {
          > * {
            opacity: 1;
            transform: translateY(0);

            &:nth-child(1) {
              transition: all .75s ease 2.75s;
            }

            &:nth-child(2) {
              transition: all .75s ease 3.5s;
            }
          }
        }
      }
    }

    &.main-banner {
      .office-demo {
        &__pic {}
      }
    }

    @include r-max(700) {
      flex-direction: column!important;
      padding: 4.5vw 4.5vw 0;
    }

    @include r-max(480) {
      padding: 25px 16px 0;
    }
  }
</style>
