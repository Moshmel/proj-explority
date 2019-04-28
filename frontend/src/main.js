import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as VueGoogleMaps from "vue2-google-maps";
import './registerServiceWorker'
import moment from 'moment'

// // import { library } from '@fortawesome/fontawesome-svg-core'
// // import { faLinkedinIn} from '@fortawesome/free-solid-svg-icons'
// // import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// // library.add(faLinkedinIn)


//  Vue.component('font-awesome-icon', FontAwesomeIcon)
// import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.1/css/all.min.css'
import '@/assets/scss/main.scss'

Vue.config.productionTip = false


// Vue.use(vuejQuery)







Vue.use(VueGoogleMaps, {
  load: {
    key: "",
    libraries: "places" // necessary for places input
  }
});

Vue.prototype.moment = moment
Vue.use(require('vue-moment'))

Vue.use(require('vue-star-rating'))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
