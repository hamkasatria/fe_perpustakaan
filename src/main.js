import '@fortawesome/fontawesome-free/css/all.min.css'
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import NowUiKit from './plugins/now-ui-kit';
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(NowUiKit);

new Vue({
  BootstrapVue,
  router,
  IconsPlugin,
  store,
  render: h => h(App)
}).$mount('#app')
