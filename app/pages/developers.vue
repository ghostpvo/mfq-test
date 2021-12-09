<template>
  <div>
    <developers-cooperation />
    <realized-projects
      v-if="false"
      :items="realizedProjects"
    />
    <our-benefits />
    <map-main />
  </div>
</template>

<script>
import OurBenefits from '../components/Global/OurBenefits/OurBenefits'
import MapMain from '../components/Global/MapMain/MapMain'
import DevelopersCooperation from '../components/Global/DevelopersCooperation/DevelopersCooperation'
import RealizedProjects from '../components/Global/RealizedProjects/RealizedProjects'

export default {
  name: 'Developers',
  components: { RealizedProjects, DevelopersCooperation, MapMain, OurBenefits },
  data () {
    return {
      realizedProjects: [
        {
          pic: '/img/realized_projects_pic.png',
          title: 'Поклонная гора',
          dscr: 'Для начинающих команд у нас есть недорогие оборудованные рабочие места с WiFi и всем необходимым для старта',
          authorPosition: 'Дизайнер',
          authorName: 'pokraslampas'
        }
      ]
    }
  },
  head () {
    return {
      title: 'MANUFAQTURY Девелоперам',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Manufaqtury'
        },
        { hid: 'keywords', name: 'keywords', content: 'manufaqtury' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Manufaqtury' },
        { property: 'og:description', content: 'Manufaqtury' },
        { property: 'og:url', content: '' },
        { property: 'og:image', content: '' },
        { property: 'fb:app_id', content: '' },
        { property: 'og:locale', content: 'ru_RU' }
      ]
    }
  },
  async asyncData (context) {
    await context.store.dispatch('fetching/fetchMainData')
  }
}
</script>

<style lang="scss" scoped>

</style>
