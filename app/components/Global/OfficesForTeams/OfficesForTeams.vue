<template>
  <div :id="blcId" class="teams-offices b-wrap">
    <!--Изначально с большими фото под блок на главной странице "Офисы для любой команды"
        isBoutiqueBlc - размеры шрифтов, фото под блок Boutique
        isTeamsOfficesBlc - размеры фото и шрифтов под блок на главной странице "Офисы для любой команды"-->
    <h3 class="blc-title">
      {{ mainTitle }}
    </h3>
    <p
      v-observe-visibility="{
        callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'blockDescr'),
        once: true
      }"
      v-if="mainDescr !== ''"
      :class="{ 'animated-mode': blocksVisibility.blockDescr }"
      class="blc-dscr teams-offices__dscr"
    >
      {{ mainDescr }}
    </p>
    <div :class="{active : isActive}">
      <office-list
        :items="getItems"
        :isTeamsOfficesBlc="isTeamsOfficesBlc"
        :showShortInfo="showShortInfo"
        @clicked="$emit('clicked')"
      />
    </div>
  </div>
</template>

<script>
import OfficeList from '../../Elements/OfficeListOfItems/OfficeList'
import mixins from '~/plugins/mixins'

export default {
  name: 'OfficesForTeams',
  components: { OfficeList },
  mixins: [ mixins.visibility ],
  props: {
    blcId: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => []
    },
    mainTitle: {
      type: String,
      default: ''
    },
    mainDescr: {
      type: String,
      default: ''
    },
    isTeamsOfficesBlc: {
      type: Boolean,
      default: false
    },
    showShortInfo: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isActive: false,
      blocksVisibility: {
        blockDescr: false
      }
    }
  },
  computed: {
    getItems () {
      // const arr = []
      // this.items.forEach(({ fullData, id }) => {
      //   if (fullData) {
      //     arr.push({
      //       id,
      //       pic: fullData.photo,
      //       title: fullData.title,
      //       dscr: fullData.text,
      //       link: fullData.link
      //     })
      //   }
      // })
      // return arr

      return this.items
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
  .teams-offices {
    padding-top: 97px;
    padding-bottom: 44px;

    &__dscr {
      max-width: 1040px;
      margin-left: 80px;
      margin-top: 22px;
      opacity: 0;
      transform: translateY(25px);

      &.animated-mode {
        opacity: 1;
        transform: translateY(0);
        transition: all .5s ease .5s;
      }

      @include r-max(1700) {
        margin-left: 48px;
        margin-top: 15px;
      }

      @include r-max(900) {
        margin-left: 25px;
      }

      @include r-max(480) {
        margin-left: 0;
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

    @include r-max(1700) {
      padding-top: 76px;
      padding-bottom: 40px;
    }

    @include r-max(900) {
      padding-top: 55px;
      padding-bottom: 40px;
    }

    @include r-max(480) {
      padding-top: 40px;
      padding-bottom: 3px;
    }
  }
</style>
