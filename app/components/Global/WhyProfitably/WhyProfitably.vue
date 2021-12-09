<template>
  <div
    :class="{ 'animated-mode': blocksVisibility.gVisibility }"
    class="p"
  >
    <h3 class="blc-title">
      Почему это выгодно?
    </h3>
    <div class="p__sides">
      <ul class="p__bad">
        <li
          v-for="(item, index) in officeSteps"
          :key="`officeStep${index}`"
          :class="`p__bad-item-p${item.importance}`"
          class="p__bad-item"
        >
          <span
            :style="`transition: all .3s ease ${0.25 * (officeSteps.length - index)}s`"
            class="p__bad-text"
          >
            {{ item.title }}
          </span>
          <div
            :style="`transition: all .3s ease ${0.25 * (officeSteps.length - index)}s`"
            class="p__bad-graph"
          >
            <span
              v-if="item.description"
              class="p__bad-cat"
            >{{ item.description }}</span>
          </div>
        </li>
      </ul>
      <div
        :style="`transition: all 1s ease-out ${0.25 * (officeSteps.length) + .25}s`"
        class="p__nice"
      >
        <div class="p__nice-blk">
          <span class="p__nice-logo">
            <img src="~static/img/main_logo.svg" alt="">
          </span>
          <strong class="p__nice-text">Один договор на оказание услуг</strong>
        </div>
        <div class="p__profit">
          <h5 class="p__profit-title">
            Экономия
          </h5>
          <strong class="p__profit-money">
            25 М
          </strong>
          <small class="p__profit-term">
            за 3 года
          </small>
        </div>
      </div>
    </div>
    <p
      v-observe-visibility="{
        callback: (isVisible, entry) => visibilityListener(isVisible, entry, 'gVisibility'),
        once: true
      }"
      class="p__dscr"
    >
      * Расчеты сделаны из предположения средней площади для субаренды 2 000 м2 в течение 3 лет на основе среднерыночных цен по услугам
    </p>
  </div>
</template>

<script>
import mixins from '~/plugins/mixins'

export default {
  name: 'WhyProfitability',
  mixins: [ mixins.visibility ],
  data () {
    return {
      officeSteps: [
        {
          title: 'Страхование имущества и гражданской ответственности',
          importance: '1'
        },
        {
          title: 'Хозяйственные расходы',
          importance: '2'
        },
        {
          title: 'Интернет',
          importance: '3'
        },
        {
          title: 'Community management (2 администратора)',
          importance: '4'
        },
        {
          title: 'Организация клининга',
          importance: '5'
        },
        {
          title: 'Организация охраны',
          importance: '6'
        },
        {
          title: 'Коммунальные платежи',
          importance: '7'
        },
        {
          title: 'Парковка',
          importance: '8'
        },
        {
          title: 'Эксплуатирующие организации',
          importance: '9'
        },
        {
          title: 'Аренда',
          importance: '10',
          description: 'OPEX'
        },
        {
          title: 'Меблирование офиса',
          importance: '12'
        },
        {
          title: 'Создание дизайн-концепции',
          importance: '11'
        },
        {
          title: 'Ремонт',
          importance: '13',
          description: 'CAPEX'
        }
      ],
      blocksVisibility: {
        gVisibility: false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "why-profitably";
</style>
