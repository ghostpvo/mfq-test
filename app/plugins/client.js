import Vue from 'vue'
import Slick from 'vue-slick'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import VCalendar from 'v-calendar'
import VueMask from 'v-mask'
import VueObserveVisibility from 'vue-observe-visibility'
import VueScrollTo from 'vue-scrollto'
import * as VueGoogleMaps from 'vue2-google-maps'
import { IMaskComponent } from 'vue-imask'

Vue.component('slick', Slick)
Vue.component('v-select', vSelect)
Vue.component('i-mask-component', IMaskComponent)
Vue.use(VueMask)
Vue.use(VCalendar)
Vue.use(VueObserveVisibility)
Vue.use(VueScrollTo)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBUFfa5-T7tatIm7yTcSV42MyOnNeMBfYQ',
    libraries: 'places'
  }
})
