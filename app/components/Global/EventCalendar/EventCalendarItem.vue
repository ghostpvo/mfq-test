<template>
  <li
    class="event-calendar__item"
  >
    <!--Обрезка 400х230-->
    <div
      v-observe-visibility="{
        callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'pic'),
        once: true
      }"
      :class="{ 'animated-mode': blocksVisibility.pic }"
      class="lazy-image lazy-image--bottom"
    >
      <img
        :src="item.pic"
        class="event-calendar__item-pic"
        alt=""
      >
    </div>
    <span
      v-observe-visibility="{
        callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'title'),
        once: true
      }"
      :class="{ 'animated-mode': blocksVisibility.title }"
      class="event-calendar__item-title"
    >
      {{ item.title }}
    </span>
    <p
      v-observe-visibility="{
        callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'text'),
        once: true
      }"
      :class="{ 'animated-mode': blocksVisibility.text }"
      class="event-calendar__item-dscr"
    >
      {{ item.dscr }}
    </p>
  </li>
</template>

<script>
import mixins from '~/plugins/mixins'

export default {
  name: 'EventCalendarItem',
  mixins: [ mixins.visibility ],
  props: {
    item: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      blocksVisibility: {
        calendar: false,
        pic: false,
        title: false,
        text: false
      }
    }
  }
}
</script>
