export default {
  parallax: {
    methods: {
      parallax (ref) {
        const wSpace = this.$refs[ref]
        if (!wSpace) { return }
        const w = window

        if (w.scrollY + w.innerHeight > wSpace.offsetTop) {
          const diff = w.scrollY + w.innerHeight - wSpace.offsetTop

          wSpace.style.backgroundPosition = `center bottom -${diff / 3}px`
        }
      }
    }
  },
  visibility: {
    methods: {
      visibilityListener (isVisible, entry, ref) {
        this.blocksVisibility[ref] = isVisible
      }
    }
  }
}
