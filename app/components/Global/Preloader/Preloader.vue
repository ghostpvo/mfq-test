<template>
  <div
    :class="{'preloader--hide': pageLoaded}"
    class="preloader"
  >
    <span class="preloader__intro-text">MANUFAQTURY</span>
    <span class="preloader__curtain">
      <span class="preloader__progress-bar" />
    </span>
    <img class="preloader__logo" src="/preloader/animated-logo.gif" alt="">
  </div>
</template>

<script>
export default {
  name: 'Preloader',
  data () {
    return {
      pageLoaded: false
    }
  },
  mounted () {
    // console.log('mounted')
    this.pageLoaded = true
    document.querySelector('body').style.overflow = 'auto'
  }
}
</script>

<style lang="scss">
  @import "preloader";
</style>
