<template>
  <div class="flexible-offices b-wrap">
    <div class="blc-title__wrap">
      <h6 class="blc-title">
        ЗАЧЕМ ГИБКИЕ ОФИСЫ КРУПНЫМ КОМПАНИЯМ?
      </h6>
    </div>
    <ul class="flexible-offices__list">
      <li
        v-for="(item, index) in items"
        :key="`item-${index}`"
        :class="{'with-pic' : item.pic !== undefined}"
        class="flexible-offices__item"
      >
        <!--Обрезка ширина х 316px-->
        <img v-if="item.pic !== undefined" :src="item.pic" class="flexible-offices__pic">
        <div v-else class="flexible-offices__txt">
          <span class="flexible-offices__txt-num"><mark>{{ item.num }}</mark> {{ item.measure }} </span>
          <p class="blc-dscr">
            {{ item.dscr }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FlexibleOffices',
  data () {
    return {
      items: [
        {
          pic: this.$store.getters['fetching/mapped/GET_DREAM_OFFICE_INFO'].photo_2.fullUrl
        },
        {
          num: '35',
          measure: '%',
          dscr: 'В среднем рост производительности сотрудников по оценкам руководителей международных опросов'
        },
        {
          pic: this.$store.getters['fetching/mapped/GET_DREAM_OFFICE_INFO'].photo_3.fullUrl
        },
        {
          num: '15',
          measure: '%',
          dscr: 'Снижение расходов на содержание офиса'
        },
        {
          pic: this.$store.getters['fetching/mapped/GET_DREAM_OFFICE_INFO'].photo_4 && this.$store.getters['fetching/mapped/GET_DREAM_OFFICE_INFO'].photo_4.fullUrl
        },
        {
          num: '0',
          measure: 'ч',
          dscr: 'Не надо тратить время на поиск и организацию офиса. Офисы готовы к размещению компаний'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .flexible-offices {
    padding: 96px 0 86px;
    overflow: hidden;

    .blc-title {
      &__wrap {
        padding: 0 112px;

        @include r-max(1700) {
          padding: 0 6.4vw;
        }

        @include r-max(1100) {
          padding: 0 4.5vw;
        }

        @include r-max(1000) {
          padding: 0;
        }
      }
    }

    &__list {
      display: flex;
      flex-wrap: wrap;
      padding-top: 47px;

      @include r-max(1700) {
        padding-top: 42px;
      }

      @include r-max(480) {
        padding-top: 25px;
      }
    }

    &__item {
      margin-bottom: 24px;
      opacity: 0;

      &:nth-child(1) {
        width: 34.2%;
        transition: all .5s ease;
      }

      &:nth-child(2) {
        width: 24.1%;
        transition: all .5s ease 1.5s;
      }

      &:nth-child(3) {
        width: 41.7%;
        transition: all .5s ease 2s;
      }

      &:nth-child(4) {
        width: 28.3%;
        transition: all .5s ease .5s;

        .flexible-offices__txt {
          margin-left: auto;
          margin-right: 10px;
        }
      }

      &:nth-child(5) {
        width: 43.3%;
        transition: all .5s ease 1s;

        @include r-max(1700) {
          width: 45.3%;
        }
      }

      &:nth-child(6) {
        width: 28.4%;
        transition: all .5s ease 2.5s;

        @include r-max(1700) {
          width: 26.4%;
        }
      }

      &.with-pic {
        transform: scale(1.3);

        @include r-max(1000) {
          display: none;

          &:first-child {
            display: block;
          }
        }

        @include r-max(480) {
          margin-bottom: 19px;
        }
      }

      @include r-max(1700) {
        margin-bottom: 14px;
      }

      @include r-max(1000) {
        width: 100%!important;
      }

      @include r-max(480) {
        margin-bottom: 25px;
      }
    }

    &__pic {
      width: 100%;
      height: 100%;
      object-fit: cover;

      @include r-max(1700) {
        min-height: 266px;
      }

      @include r-max(480) {
        min-height: 56vw;
      }
    }

    &__txt {
      width: 100%;
      max-width: 256px;
      margin-left: 64px;

      &-num {
        font-size: 36px;
        color: $dark-blue;

        mark {
          font-size: 120px;
          color: $dark-blue;

          @include r-max(1700) {
            font-size: 100px;
          }

          @include r-max(900) {
            font-size: 85px;
          }

          @include r-max(480) {
            font-size: 40px;
          }
        }

        @include r-max(1700) {
          font-size: 34px;
        }

        @include r-max(1000) {
          display: inline-block;
          min-width: 153px;
          margin-right: 20px;
          vertical-align: top;
          text-align: right;
        }

        @include r-max(900) {
          min-width: 140px;
        }

        @include r-max(480) {
          min-width: 73px;
          margin-right: 16px;
          font-size: 21px;
        }
      }

      @include r-max(1700) {
        max-width: 224px;
        margin-left: 32px;
      }

      @include r-max(1100) {
        max-width: 200px;
        margin-left: 25px;
      }

      @include r-max(1000) {
        display: flex;
        align-items: center;
        max-width: 100%;
        margin-left: 0;
      }

      @include r-max(480) {
        align-items: flex-start;
      }
    }

    .blc-dscr {
      display: block;
      padding-top: 6px;

      @include r-max(1000) {
        display: inline-block;
        vertical-align: top;
        font-size: 21px;
      }

      @include r-max(900) {
        font-size: 16px;
      }

      @include r-max(480) {
        padding-top: 2px;
        font-size: 14px;
      }
    }

    &.animated-mode {
      .flexible-offices__item {
        opacity: 1;
        transform: scale(1);
      }
    }

    @include r-max(1700) {
      padding: 76px 0;
    }

    @include r-max(1000) {
      padding: 76px 4.5vw;
    }

    @include r-max(900) {
      padding: 50px 4.5vw 35px;
    }

    @include r-max(480) {
      padding: 39px 16px 15px;
    }
  }
</style>
