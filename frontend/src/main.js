import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import * as VueGoogleMaps from "vue2-google-maps";
import './registerServiceWorker'
// import vuejQuery from 'vue-jquery';
import moment from 'moment'
// import '@/assets/helpers.css'
// import '@/assets/reset.css'
import '@/assets/scss/main.scss'

Vue.config.productionTip = false


// Vue.use(vuejQuery)







Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAgcwE2EgqZISSXQma3bRdzRngFp7kkMrI",
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
