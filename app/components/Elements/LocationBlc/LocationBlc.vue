<template>
  <div class="location-blc">
    <span class="location-blc__title">{{ locationName }}</span>
  </div>
</template>

<script>
export default {
  name: 'LocationBlc',
  props: {
    locationName: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .location-blc {
    position: relative;
    display: block;
    padding-left: 40px;

    &__title {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.75px;

      @include r-max(1700) {
        font-size: 10px;
      }
    }

    &:before {
      position: absolute;
      top: 50%;
      left: 0;
      width: 32px;
      height: 32px;
      content: '';
      background-image: url("~static/img/location_marker.svg");
      background-repeat: no-repeat;
      background-size: contain;
      transform: translateY(-50%);
    }

    @include r-max(1700) {
      padding-left: 35px;
    }
  }
</style>
