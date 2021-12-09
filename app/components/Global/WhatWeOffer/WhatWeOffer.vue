<template>
  <div class="we-offer">
    <div class="b-wrap">
      <h3 class="we-offer__title blc-title">
        Что мы предлагаем?
      </h3>
      <section class="we-offer__data">
        <ul class="we-offer__items">
          <li
            v-for="(item, index) in getItems"
            :key="`item-${index}`"
            :class="{ 'we-offer__item-slash-cell': item.slashCell, 'we-offer__item-empty-cell': item.emptyCell, 'we-offer__item-r-slash-cell': item.reverseSlashCell }"
            class="we-offer__item"
          >
            <div
              v-if="item.title && item.text"
              class="we-offer__item-data"
            >
              <h5 class="we-offer__item-title">
                {{ item.title }}
              </h5>
              <p class="we-offer__item-text">
                {{ item.text }}
              </p>
            </div>
            <span v-else-if="item.slashCell" class="we-offer__item-decoration">/</span>
            <span v-else-if="item.reverseSlashCell" class="we-offer__item-decoration">\</span>
          </li>
        </ul>
        <div class="we-offer__demo lazy-image lazy-image--left">
          <img src="~static/img/ex/we-offer.jpg" alt="" class="we-offer__demo-pic">
        </div>
      </section>
    </div>
  </div>
</template>

<script>

export default {
  name: 'WhatWeOffer',
  props: {
    items: {
      type: Array,
      default: () => [
        {
          title: 'Современные представительские офисы по адекватной цене',
          text: 'Представительские офисы в деловом квартале класса А по адекватной цене'
        },
        {
          emptyCell: true
        },
        {
          title: 'Интеллектуальное управление офисом',
          text: 'Каждый офис оборудован автоматизированной системой управления офисом'
        },
        {
          emptyCell: true
        },
        {
          slashCell: true
        },
        {
          title: 'Интеллектуальное управление офисом',
          text: 'Каждый офис оборудован автоматизированной системой управления офисом'
        },
        {
          title: 'Интеллектуальное управление офисом',
          text: 'Каждый офис оборудован автоматизированной системой управления офисом'
        },
        {
          title: 'Интеллектуальное управление офисом',
          text: 'Каждый офис оборудован автоматизированной системой управления офисом'
        },
        {
          title: 'Интеллектуальное управление офисом',
          text: 'Каждый офис оборудован автоматизированной системой управления офисом'
        },
        {
          title: 'Интеллектуальное управление офисом',
          text: 'Каждый офис оборудован автоматизированной системой управления офисом'
        },
        {
          reverseSlashCell: true
        },
        {
          slashCell: true
        }
      ]
    }
  },
  computed: {
    getItems () {
      const arr = []
      this.items.forEach((el) => {
        if (el.fullData && el.fullData.type) {
          if (el.fullData.type === 'textCell') {
            arr.push({ title: el.fullData.title, text: el.fullData.text })
          }
          if (el.fullData.type === 'emptyCell') {
            arr.push({ emptyCell: true })
          }
          if (el.fullData.type === 'slashCell') {
            arr.push({ slashCell: true })
          }
          if (el.fullData.type === 'reverseSlashCell') {
            arr.push({ reverseSlashCell: true })
          }
        }
      })
      if (arr.length === 0) {
        return this.items
      }
      return arr
    }
  }
}
</script>

<style lang="scss">
    @import "what-we-offer";
</style>
