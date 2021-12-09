<template>
  <div :class="{'logo-list-caption' : haveLogoListCaption}" class="our-mission b-wrap">
    <p class="our-mission__txt">
      {{ text }}
    </p>
    <div class="our-mission__logo">
      <img src="~/static/img/our_mission_logo_line.svg" class="our-mission__logo-pic">
      <span v-if="!haveLogoListCaption" class="our-mission__logo-txt">Ваша команда <br><mark>MANUFAQTURY</mark></span>
      <ul v-else>
        <li
          v-for="(item, index) in items"
          :key="`item-${index}`"
          class="our-mission__logo-txt"
        >
          {{ item.txt }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OurMission',
  props: {
    text: {
      type: String,
      default: 'Офисные пространства MANUFAQTORY создаются на базе анализа потребностей\n' +
              '      основной рабочей силы современности – миллениалов. Пространства спроектированы таким образом, чтобы одновременно\n' +
              '      создать творческую и рабочую среды, учесть все бытовые потребности, помогать развиваться корпоративной культуре,\n' +
              '      развивать сотрудников и поддерживать ценности корпоративных брендов'
    },
    haveLogoListCaption: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
  .our-mission {
    display: flex;
    align-items: flex-start;
    padding-top: 197px;
    padding-bottom: 206px;

    &__txt {
      display: block;
      max-width: 988px;
      margin-left: 80px;
      margin-right: 84px;
      font-size: 34px;
      line-height: 140%;
      opacity: 0;
      transform: translateY(35px);

      @include r-max(1700) {
        max-width: 688px;
        margin-left: 48px;
        margin-right: 32px;
        font-size: 30px;
      }

      @include r-max(1100) {
        margin-left: 0;
      }

      @include r-max(900) {
        font-size: 20px;
      }

      @include r-max(600) {
        margin-right: 0;
      }

      @include r-max(480) {
        font-size: 18px;
      }
    }

    &__logo {
      display: flex;
      align-items: center;
      margin-top: 19px;
      opacity: 0;
      transform: scale(0);

      &-pic {
        @include r-max(1700) {
          max-width: 64px;
        }

        @include r-max(900) {
          max-width: 55px;
        }

        @include r-max(480) {
          max-width: 64px;
        }
      }

      &-txt {
        display: block;
        font-family: 'Fugue New', sans-serif;
        margin-left: 20px;
        margin-top: -10px;
        font-size: 16px;
        line-height: 187%;
        letter-spacing: 0.44px;

        mark {
          font-size: 20px;
          font-family: 'Fugue New', sans-serif;

          @include r-max(1700) {
            font-size: 18px;
          }

          @include r-max(900) {
            font-size: 15px;
          }

          @include r-max(480) {
            font-size: 18px;
          }
        }

        @include r-max(1700) {
          margin-left: 14px;
          margin-top: 0;
          font-size: 14px;
        }

        @include r-max(900) {
          font-size: 12px;
        }

        @include r-max(480) {
          font-size: 14px;
        }
      }

      @include r-max(1700) {
        margin-top: 3px;
      }

      @include r-max(900) {
        margin-top: 20px;
      }

      @include r-max(600) {
        margin-top: 50px;
      }

      @include r-max(480) {
        margin-top: 31px;
      }
    }

    &.logo-list-caption {
      .our-mission {
        &__logo {
          align-items: flex-start;

          &-txt {
            max-width: 288px;
            padding-top: 30px;
            line-height: 160%;

            &:first-child {
              padding-top: 14px;

              @include r-max(1700) {
                padding-top: 0px;
              }
            }

            @include r-max(1700) {
              max-width: 224px;
              padding-top: 10px;
              font-size: 16px;
            }

            @include r-max(900) {
              width: 285px;
              font-size: 14px;
            }

            @include r-max(600) {
              width: 80%;
              max-width: 100%;
            }

            @include r-max(480) {
              width: auto;
              font-size: 16px;
            }
          }
        }
      }

      @include r-max(480) {
        padding-top: 40px;
        padding-bottom: 40px;
      }
    }

    &.animated-mode {
      .our-mission__txt {
        opacity: 1;
        transform: translateY(0);
        transition: all .5s ease .5s;
      }

      .our-mission__logo {
        opacity: 1;
        transform: translateY(0);
        transition: all 1s ease 1s;
      }
    }

    @include r-max(1700) {
      padding-top: 157px;
      padding-bottom: 162px;
    }

    @include r-max(900) {
      padding-top: 100px;
      padding-bottom: 100px;
    }

    @include r-max(600) {
      display: block;
    }

    @include r-max(480) {
      padding-top: 60px;
      padding-bottom: 60px;
    }
  }
</style>
