import Vue from 'vue'
import {App} from '~/components/'
import VueRouter from 'vue-router'
import SuiVue from 'semantic-ui-vue'
import 'semantic-ui-css/semantic.min.css'
import router from './router/'
import store from './store/'

Vue.config.productionTip = false
Vue.use(SuiVue)
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
