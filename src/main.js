import '@fortawesome/fontawesome-free/css/all.min.css'
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  BootstrapVue,
  router,
  IconsPlugin,
  render: h => h(App)
}).$mount('#app')
