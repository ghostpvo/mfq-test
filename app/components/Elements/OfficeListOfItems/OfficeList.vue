<template>
  <div :class="{'boutique' : isBoutiqueBlc, 'for-teams' : isTeamsOfficesBlc, 'big-title' : haveBiggerTitle}" class="office-blc">
    <!--haveBiggerTitle - увеличенный размер шрифта заголовка-->
    <ul class="office-blc__list">
      <office-item
        v-for="item in items"
        :key="item.id"
        :class="{'big-item' : item.isBigItem, 'show-items' : showAllItems}"
        :data="item"
        :isTeamsOfficesBlc="isTeamsOfficesBlc"
        :isBoutiqueBlc="isBoutiqueBlc"
        :showShortInfo="showShortInfo"
        :showLocationInItem="showLocationInItem"
        :haveBiggerTitle="haveBiggerTitle"
        @clicked="$emit('clicked')"
      />
    </ul>
    <span @click="showMore" v-if="!showAllItems" class="office-blc__show-more">Показать еще</span>
  </div>
</template>

<script>
import OfficeItem from './OfficeItem'
export default {
  name: 'OfficeList',
  components: { OfficeItem },
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
    },
    showShortInfo: {
      type: Boolean,
      default: false
    },
    showLocationInItem: {
      type: Boolean,
      default: false
    },
    haveBiggerTitle: {
      type: Boolean,
      default: false
    },
    showAllItems: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    showMore () {
      this.showAllItems = !this.showAllItems
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

      &.active {
        .office-blc__item {
          &.big-item {
            @include r-max(480) {
              display: block;
            }
          }

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
        &__show-more {
          @include r-max(480) {
            display: none;
          }
        }
      }
    }
  }
</style>
