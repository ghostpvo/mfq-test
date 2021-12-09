<template>
  <div>
    <map-main :contactsPage="true" />
  </div>
</template>

<script>
import MapMain from '../components/Global/MapMain/MapMain'

export default {
  name: 'Contacts',
  components: { MapMain },
  async fetch (context) {
    await context.store.dispatch('fetching/fetchMainData')
  },
  head () {
    return {
      title: 'MANUFAQTURY Контакты',
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
  }
}
</script>

<style scoped>

</style>
