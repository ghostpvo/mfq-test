<template>
  <div
    id="for-developers"
    class="for-developers__wrap"
  >
    <div class="for-developers b-wrap">
      <div class="for-developers__txt-side">
        <div class="for-developers__txt-side-content">
          <img src="~static/img/manufaqtory_txt_title.svg" class="for-developers__txt-side-pic-title">
          <!--Надпись MANUFAQTURY картинкой-->
          <h3 class="blc-title">
            {{ title }}
          </h3>
          <p class="blc-dscr">
            {{ text }}
          </p>
          <div class="main-link__wrap clickable-unit">
            <nuxt-link to="/developers" class="main-link clickable-unit">
              ПОДРОБНЕЕ
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="for-developers__pic-side">
        <!--Обрезка 960х698-->
        <img src="~static/img/office_placeholder_6.jpg" class="for-developers__pic">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForDevelopers',
  props: {
    title: {
      type: String,
      default: 'ДЛЯ ДЕВЕЛОПЕРОВ'
    },
    link: {
      type: String,
      default: '/developers'
    },
    text: {
      type: String,
      default: 'MANUFAQTURY работает с владельцами недвижимости и девелоперами. На базе БЦ и МФК команда создает\n' +
        '            востребованные пространства для технологических компаний. Это становится источником дохода, привлекает\n' +
        '            новую аудиторию и заполняет клиентами всю сервисную инфраструктуру.'
    }
  }
}
</script>

<style lang="scss" scoped>
  .for-developers {
    display: flex;
    padding: 0;
    font-size: 0;

    &__wrap {
      background-color: #F2F2F2;
    }

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

      &-pic-title {
        max-width: 100%;
        margin-bottom: 10px;

        @include r-max(1700) {
          max-width: 218px;
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
        padding: 4.5vw;
      }

      @include r-max(480) {
        padding: 40px 16px;
      }
    }

    &__pic-side {
      width: 50%;

      @include r-max(700) {
        order: 1;
        width: 100%;
        padding: 4.5vw 4.5vw 0;
      }

      @include r-max(480) {
        padding: 25px 16px 0;
      }
    }

    &__pic {
      max-width: 100%;
      width: 100%;
      min-height: 36.4vw;
      height: 100%;
      object-fit: cover;

      @include r-min(2000){
        min-height: 698px;
      }

      @include r-max(1700) {
        min-height: 44vw;
      }

      @include r-max(1100) {
        min-height: 55vw;
      }

      @include r-max(480) {
        min-height: 93.8vw;
      }
    }

    @include r-max(700) {
      flex-direction: column;
    }
  }
</style>
