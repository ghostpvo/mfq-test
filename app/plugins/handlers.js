import fileStorage from 'obvu-file-storage'
import Vuelidate from 'vuelidate'
import Vue from 'vue'
import VueMarkdown from 'vue-markdown'
Vue.use(Vuelidate)
Vue.component('vue-markdown', VueMarkdown)

export default ({ app }, inject) => {
  fileStorage.baseUrl = process.env.SITE_API_HOST + '/'
  const $handlers = {
    fileStorage
  }
  inject('handlers', $handlers)
}
