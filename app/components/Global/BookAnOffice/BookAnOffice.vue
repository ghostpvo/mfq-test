<template>
  <div class="b-wrap book-office__wrap">
    <div class="book-office">
      <h6 class="blc-title">
        {{ title }}
      </h6>
      <p class="blc-dscr">
        {{ txt }}
      </p>
      <div @click="$emit('clicked')" class="btn-blue clickable-unit">
        {{ btn }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookAnOffice',
  props: {
    title: {
      type: String,
      default: ''
    },
    txt: {
      type: String,
      default: ''
    },
    btn: {
      type: String,
      default: 'Забронировать'
    }
  }
}
</script>

<style lang="scss" scoped>
  .book-office {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 45px 80px 35px;
    margin-top: 100px;
    background-image: url("~static/img/book_office_bg_desktop.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center bottom;

    &__wrap {
      opacity: 0;
      transform: translateY(25px);

      &.animated-mode {
        opacity: 1;
        transform: translateY(0);
        transition: all .5s ease .5s;
      }
    }

    .blc-title {
      display: block;
      width: 53%;
      padding-left: 0;
      padding-right: 3vw;
      color: $dark-blue;
      letter-spacing: 0.25px;
      line-height: 128.9%;

      @include r-max(1700) {
        width: 50%;
        padding-right: 2vw;
        margin-bottom: 10px;
        font-size: 24px;
      }

      @include r-max(1000) {
        width: 100%;
      }
    }

    .blc-dscr {
      display: block;
      width: 28%;
      padding-right: 1vw;
      color: $dark-blue;

      @include r-max(1700) {
        width: 30%;
        padding-right: 4.5vw;
        margin-bottom: 20px;
      }

      @include r-max(1000) {
        width: 100%;
      }
    }

    .btn-blue {
      width: 22%;

      @include r-max(1700) {
        width: 23%;
      }

      @include r-max(1000) {
        width: 250px;
        max-width: 100%;
      }

      @include r-max(480) {
        width: 100%;
      }
    }

    @include r-max(1700) {
      padding: 40px 48px;
      margin-top: 80px;
      background-image: url("~static/img/main_order_form_bg.jpg");
      background-position: center 76%;
    }

    @include r-max(1000) {
      display: block;
      background-position: center bottom;
    }

    @include r-max(900) {
      margin-top: 40px;
    }

    @include r-max(480) {
      padding: 20px 16px 40px;
      margin-top: 24px;
      background-size: 155%;
    }
  }
</style>
