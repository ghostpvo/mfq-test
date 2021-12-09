<!--
<template>
  <div :class="{'boutique' : isBoutiqueBlc, 'for-teams' : isTeamsOfficesBlc}" class="office-blc">
    <ul :class="{active : isActive}" class="office-blc__list">
      <li
        v-for="item in items"
        :key="item.id"
        class="office-blc__item"
      >
        <nuxt-link :to="item.link">
          <div>
            &lt;!&ndash;Обрезка 544х500&ndash;&gt;
            <div
              v-observe-visibility="(isVisible, entry) => visibilityListener(isVisible, entry, 'pic')"
              :class="{ 'animated-mode': blocksVisibility.pic }"
              class="lazy-image lazy-image&#45;&#45;bottom"
            >
              <img
                :src="item.pic"
                class="office-blc__item-pic"
                alt="office"
              >
            </div>
            <span
              v-observe-visibility="(isVisible, entry) => visibilityListener(isVisible, entry, 'title')"
              :class="{ 'animated-mode': blocksVisibility.title }"
              class="office-blc__item-title"
            >
              {{ item.title }}
            </span>
            <p
              v-observe-visibility="(isVisible, entry) => visibilityListener(isVisible, entry, 'dscr')"
              :class="{ 'animated-mode': blocksVisibility.dscr }"
              class="office-blc__item-dscr blc-dscr"
            >
              {{ item.dscr }}
            </p>
          </div>
          <img
            v-if="item.logo !== undefined"
            :src="item.logo"
            class="office-blc__item-logo"
          >
        </nuxt-link>
      </li>
    </ul>
    <span @click="showMore" v-if="!isActive" class="office-blc__show-more">Показать еще</span>
  </div>
</template>

<script>
import mixins from '~/plugins/mixins'

export default {
  name: 'OfficeItem',
  mixins: [ mixins.visibility ],
  props: {
    items: {
      type: Array,
      default: () => []
    },
    isTeamsOfficesBlc: {
      type: Boolean,
      default: false
    },
    isBoutiqueBlc: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isActive: false,
      blocksVisibility: {
        pic: false,
        title: false,
        dscr: false
      }
    }
  },
  methods: {
    showMore () {
      this.isActive = !this.isActive
    }
  }
}
</script>

<style lang="scss" scoped>
  .office-blc {
    &__list {
      display: flex;
      flex-wrap: wrap;
      padding-top: 46px;
      justify-content: space-between;

      &.active {
        .office-blc__item {
          @include r-max(480) {
            display: block;
          }
        }
      }

      @include r-max(1700) {
        padding-top: 40px;
      }

      @include r-max(900) {
        flex-wrap: wrap;
        padding-top: 30px;
        justify-content: space-between;
      }

      @include r-max(480) {
        padding-top: 25px;
      }
    }

    &__item {
      width: 31.8%;
      margin-left: 16px;
      margin-right: 16px;
      margin-bottom: 58px;
      font-size: 0;

      &:first-child {
        margin-left: 0;

        @include r-max(480) {
          display: block;
        }
      }

      &:last-child {
        margin-right: 0;
      }

      &:nth-child(3n+3) {
        @include r-min(901) {
          margin-right: 0;
        }
      }

      &:nth-child(3n+4) {
        @include r-min(901) {
          margin-left: 0;
        }
      }

      &:nth-child(2n+2) {
        @include r-max(900) {
          margin-right: 0;
        }
      }

      &:nth-child(2n+3) {
        @include r-max(900) {
          margin-left: 0;
        }
      }

      &:hover {
        .office-blc__item-title {
          &:after {
            margin-left: 30px;

            @include r-max(480) {
              margin-left: 25px;
            }
          }
        }

        .office-blc__item-logo {
          opacity: 1;
          filter: grayscale(0%);
        }
      }

      a {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        height: 100%;
      }

      &-pic {
        max-width: 544px;
        max-height: 20vw;
        width: 100%;
        height: 100%;
        object-fit: cover;

        @include r-min(2000) {
          max-height: 384px;
        }

        @include r-max(900) {
          max-height: 35vw;
        }

        @include r-max(480) {
          max-height: 61.5vw;
        }
      }

      &-title {
        position: relative;
        display: inline-block;
        padding-top: 35px;
        padding-right: 40px;
        margin-bottom: 16px;
        font-size: 24px;
        line-height: 128.91%;
        letter-spacing: 0.25px;
        opacity: 0;
        transform: translateY(25px);

        &.animated-mode {
          opacity: 1;
          transform: translateY(0);
          transition: all .5s linear .5s;
        }

        &:after {
          position: absolute;
          display: inline-block;
          bottom: 6px;
          width: 9px;
          height: 16px;
          margin-left: 8px;
          content: '';
          font-size: 0;
          background-image: url("~static/img/arrow_right_black.svg");
          background-repeat: no-repeat;
          background-size: contain;
          transition: all .4s ease;

          @include r-max(1700) {
            bottom: 3px;
            margin-left: 12px;
          }

          @include r-max(900) {
            bottom: 4px;
          }

          @include r-max(480) {
            bottom: 5px;
            height: 11px;
            width: 6px;
            margin-left: 8px;
          }
        }

        @include r-max(1700) {
          padding-top: 29px;
          margin-bottom: 12px;
          font-size: 20px;
        }

        @include r-max(900) {
          padding-top: 20px;
          font-size: 20px;
        }

        @include r-max(480) {
          padding-top: 24px;
          padding-right: 30px;
          margin-bottom: 16px;
        }
      }

      &-dscr {
        max-width: 496px;
        opacity: 0;
        transform: translateY(25px);

        &.animated-mode {
          opacity: 1;
          transform: translateY(0);
          transition: all .5s linear .5s;
        }

        @include r-max(1700) {
          max-width: 26.25vw;
        }

        @include r-max(900) {
          max-width: 96%;
        }
      }

      &-logo {
        display: block;
        margin-top: 36px;
        max-width: 92px;
        max-height: 92px;
        transition: all .4s ease;
        filter: grayscale(100%);
        opacity: .25;

        @include r-max(1700) {
          margin-top: 22px;
        }

        @include r-max(480) {
          margin-top: 23px;
        }
      }

      @include r-max(1700) {
        width: 31.4%;
        margin-bottom: 40px;
      }

      @include r-max(1279) {
        width: 30.4%;
      }

      @include r-max(900) {
        width: 48%;
        margin-left: 8px;
        margin-right: 8px;
        margin-bottom: 25px;
      }

      @include r-max(480) {
        display: none;
        width: 100%;
        margin: 0;
        margin-bottom: 30px;
      }
    }

    &__show-more {
      display: none;

      @include r-max(480) {
        display: flex;
        align-items: center;
        width: 100%;
        height: 32px;
        margin-bottom: 40px;
        font-size: 12px;
        letter-spacing: 0.75px;
        justify-content: center;
        text-transform: uppercase;
        border-top: 2px solid $txt-color;
      }
    }

    &.for-teams {
      .office-blc {
        &__item {
          &-pic {
            max-height: 26.05vw;

            @include r-min(2000) {
              max-height: 500px;
            }

            @include r-max(1700) {
              max-height: 25.5vw;
            }

            @include r-max(900) {
              max-height: 39.5vw;
            }

            @include r-max(480) {
              max-height: 61.5vw;
            }
          }

          &-title {
            font-size: 34px;

            &:after {
              bottom: 10px;

              @include r-max(1700) {
                bottom: 5px;
              }

              @include r-max(900) {
                bottom: 4px;
              }

              @include r-max(480) {
                bottom: 5px;
                height: 11px;
                width: 6px;
              }
            }

            @include r-max(1700) {
              font-size: 24px;
            }

            @include r-max(900) {
              font-size: 20px;
            }
          }

          @include r-max(480) {
            display: block;
          }
        }

        &__show-more {
          @include r-max(480) {
            display: none;
          }
        }
      }
    }
  }
</style>
-->
